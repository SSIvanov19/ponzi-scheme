'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
  GameState,
  InvestorAction,
  InvestorDecision,
  InvestorRoundResult,
  RegulatorTest,
  RegulatorLabel,
  RegulatorRoundResult,
  TeachingTag,
  ACTION_COSTS,
  PortfolioPosition,
  RoundSummary,
} from './types';
import { OFFER_CARDS, isPonziLike, isDefinitelyPonzi } from './cards';

// Constants
const INITIAL_CASH = 10000;
const INITIAL_ACTION_POINTS = 3; // Total AP for entire game (no regen)
const TOTAL_ROUNDS = 7; // Only 7 rounds per game
const REGULATOR_BUDGET_PER_ROUND = 2;
const INITIAL_PONZI_HEALTH = 100;
const PONZI_HEALTH_DECAY_BASE = 15; // Base decay per round
const REPORT_DECAY = 40; // Major decay when reported
const CORRECT_REPORT_AP_BONUS = 1; // Gain 1 AP for correct report
const FALSE_REPORT_AP_PENALTY = 2; // Lose 2 AP for false report

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get shuffled card order (for variety each playthrough) - only 7 random cards
function getShuffledCardIds(): string[] {
  const shuffled = shuffleArray(OFFER_CARDS.map(c => c.id));
  return shuffled.slice(0, TOTAL_ROUNDS);
}

const initialState: GameState = {
  mode: 'investor',
  investorRound: 0,
  actionPoints: INITIAL_ACTION_POINTS,
  playerCash: INITIAL_CASH,
  investments: {},
  actionsThisRound: [],
  investorResults: [],
  regulatorRound: 0,
  monthlyBudget: REGULATOR_BUDGET_PER_ROUND,
  testsThisRound: [],
  regulatorResults: [],
  ponziInflows: {},
  ponziCollapsed: new Set(),
  showTeachingPopup: false,
  currentTeachingTags: [],
  investorCompleted: false,
  regulatorUnlocked: false,
  regulatorCompleted: false,
  scores: {
    netWorth: INITIAL_CASH,
    evidenceQuality: 0,
    ponzisCaught: 0,
    totalPonzis: 0,
    legitMissed: 0,
    correctReports: 0,
    falseReports: 0,
  },
  // New fields for enhanced mechanics
  currentMonth: 1,
  portfolio: [],
  reportedCards: new Set(),
  ponziHealth: {},
  roundSummary: null,
  cardOrder: getShuffledCardIds(),
};

// Action types
type GameAction =
  | { type: 'PERFORM_ACTION'; action: InvestorAction }
  | { type: 'MAKE_DECISION'; decision: InvestorDecision; amount?: number; sellCardId?: string }
  | { type: 'SELL_POSITION'; cardId: string }
  | { type: 'PERFORM_TEST'; test: RegulatorTest }
  | { type: 'MAKE_LABEL'; label: RegulatorLabel }
  | { type: 'NEXT_ROUND' }
  | { type: 'SHOW_TEACHING'; tags: TeachingTag[] }
  | { type: 'HIDE_TEACHING' }
  | { type: 'DISMISS_SUMMARY' }
  | { type: 'START_REGULATOR' }
  | { type: 'GO_TO_RESULTS' }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_STATE'; state: Partial<GameState> };

// Helper to serialize Sets for localStorage
function serializeState(state: GameState): string {
  return JSON.stringify({
    ...state,
    ponziCollapsed: Array.from(state.ponziCollapsed),
    reportedCards: Array.from(state.reportedCards),
  });
}

function deserializeState(json: string): Partial<GameState> {
  const parsed = JSON.parse(json);
  return {
    ...parsed,
    ponziCollapsed: new Set(parsed.ponziCollapsed || []),
    reportedCards: new Set(parsed.reportedCards || []),
  };
}

// Calculate monthly return for a position
function calculateMonthlyReturn(position: PortfolioPosition, ponziHealth: number, month: number): number {
  const card = OFFER_CARDS.find(c => c.id === position.cardId);
  if (!card) return 0;
  
  // Use monthly return from history (cycle through if needed)
  const monthIndex = (month - 1) % card.returnHistoryMonthlyPct.length;
  let returnPct = card.returnHistoryMonthlyPct[monthIndex] / 100;
  
  // For Ponzi schemes, returns degrade as health declines
  if (isPonziLike(card.hiddenTruth)) {
    // When health is high, pay full returns; when low, returns stop or go negative
    if (ponziHealth <= 0) {
      // Collapsed! Lose most of investment
      return -position.currentValue * 0.95;
    } else if (ponziHealth < 30) {
      // Struggling, returns cut significantly
      returnPct = returnPct * (ponziHealth / 100);
    } else if (ponziHealth < 60) {
      // Some stress, returns reduced
      returnPct = returnPct * 0.7;
    }
    // Above 60, pay full promised returns (the trap!)
  }
  
  return position.currentValue * returnPct;
}

// Get current card based on card order
function getCurrentCard(state: GameState) {
  const cardId = state.mode === 'investor' 
    ? state.cardOrder[state.investorRound]
    : state.cardOrder[state.regulatorRound];
  return OFFER_CARDS.find(c => c.id === cardId) || null;
}

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PERFORM_ACTION': {
      const cost = ACTION_COSTS[action.action];
      if (state.actionPoints < cost) return state;
      if (state.actionsThisRound.includes(action.action)) return state;
      
      return {
        ...state,
        actionPoints: state.actionPoints - cost,
        actionsThisRound: [...state.actionsThisRound, action.action],
      };
    }

    case 'SELL_POSITION': {
      // Sell a position from portfolio WITHOUT advancing the round
      const sellCardId = action.cardId;
      if (!sellCardId) return state;
      
      let newCash = state.playerCash;
      const newPortfolio = [...state.portfolio];
      const newPonziHealth = { ...state.ponziHealth };
      
      const positionIndex = newPortfolio.findIndex(p => p.cardId === sellCardId);
      if (positionIndex === -1) return state;
      
      const position = newPortfolio[positionIndex];
      const posCard = OFFER_CARDS.find(c => c.id === sellCardId);
      const health = newPonziHealth[sellCardId] || 100;
      
      if (posCard && isPonziLike(posCard.hiddenTruth) && health <= 0) {
        // Ponzi collapsed, can't sell - just return current state
        return state;
      } else if (posCard && isPonziLike(posCard.hiddenTruth) && health < 30) {
        // Struggling Ponzi - partial sale only
        const sellable = position.currentValue * 0.3;
        newCash += sellable;
        newPortfolio.splice(positionIndex, 1);
      } else {
        // Successful sale
        newCash += position.currentValue;
        newPortfolio.splice(positionIndex, 1);
      }
      
      // Calculate total portfolio value
      const totalPortfolioValue = newPortfolio.reduce((sum, p) => sum + p.currentValue, 0);
      
      return {
        ...state,
        playerCash: newCash,
        portfolio: newPortfolio,
        scores: {
          ...state.scores,
          netWorth: newCash + totalPortfolioValue,
        },
        // DO NOT set roundSummary or showTeachingPopup - stay on current round
      };
    }

    case 'MAKE_DECISION': {
      const currentCard = getCurrentCard(state);
      if (!currentCard) return state;

      let newCash = state.playerCash;
      let newPortfolio = [...state.portfolio];
      const newPonziHealth = { ...state.ponziHealth };
      const newPonziCollapsed = new Set(state.ponziCollapsed);
      const newReportedCards = new Set(state.reportedCards);
      let newActionPoints = state.actionPoints;
      let correctReports = state.scores.correctReports;
      let falseReports = state.scores.falseReports;
      const amount = action.amount || 0;

      // Initialize Ponzi health if needed
      if (isPonziLike(currentCard.hiddenTruth) && newPonziHealth[currentCard.id] === undefined) {
        newPonziHealth[currentCard.id] = INITIAL_PONZI_HEALTH;
      }

      let roundReturn = 0;
      let decisionResult = '';

      switch (action.decision) {
        case 'invest':
        case 'investMore': {
          if (amount > 0 && amount <= newCash) {
            newCash -= amount;
            
            // Find or create portfolio position
            const existingPosition = newPortfolio.find(p => p.cardId === currentCard.id);
            if (existingPosition) {
              existingPosition.investedAmount += amount;
              existingPosition.currentValue += amount;
            } else {
              newPortfolio.push({
                cardId: currentCard.id,
                investedAmount: amount,
                currentValue: amount,
                monthInvested: state.currentMonth,
              });
            }
            
            // Investing in Ponzi increases its health slightly (new victim money!)
            if (isPonziLike(currentCard.hiddenTruth)) {
              newPonziHealth[currentCard.id] = Math.min(100, (newPonziHealth[currentCard.id] || INITIAL_PONZI_HEALTH) + 10);
            }
            
            decisionResult = `Invested $${amount.toLocaleString()}`;
          }
          break;
        }

        case 'sellPosition': {
          // Sell a specific position from portfolio
          const sellCardId = action.sellCardId;
          if (!sellCardId) break;
          
          const positionIndex = newPortfolio.findIndex(p => p.cardId === sellCardId);
          if (positionIndex === -1) break;
          
          const position = newPortfolio[positionIndex];
          const posCard = OFFER_CARDS.find(c => c.id === sellCardId);
          const health = newPonziHealth[sellCardId] || 100;
          
          if (posCard && isPonziLike(posCard.hiddenTruth) && health <= 0) {
            // Ponzi collapsed, can't sell
            decisionResult = `Sell failed - ${posCard?.title || sellCardId} has collapsed!`;
          } else if (posCard && isPonziLike(posCard.hiddenTruth) && health < 30) {
            // Struggling Ponzi - partial sale only
            const sellable = position.currentValue * 0.3;
            roundReturn = sellable - position.investedAmount;
            newCash += sellable;
            decisionResult = `Partial sale: $${sellable.toLocaleString()} from ${posCard?.title} (fund struggling)`;
            newPortfolio.splice(positionIndex, 1);
          } else {
            // Successful sale
            newCash += position.currentValue;
            roundReturn = position.currentValue - position.investedAmount;
            decisionResult = `Sold ${posCard?.title || sellCardId} for $${position.currentValue.toLocaleString()} (${roundReturn >= 0 ? '+' : ''}$${roundReturn.toLocaleString()})`;
            newPortfolio.splice(positionIndex, 1);
          }
          break;
        }

        case 'withdraw': {
          const position = newPortfolio.find(p => p.cardId === currentCard.id);
          if (position && position.currentValue > 0) {
            const health = newPonziHealth[currentCard.id] || 100;
            
            if (isPonziLike(currentCard.hiddenTruth) && health <= 0) {
              // Ponzi collapsed, can't withdraw
              decisionResult = 'Withdrawal failed - fund has collapsed!';
            } else if (isPonziLike(currentCard.hiddenTruth) && health < 30) {
              // Struggling Ponzi - partial withdrawal only
              const withdrawable = position.currentValue * 0.3;
              const originalInvested = position.investedAmount;
              newCash += withdrawable;
              roundReturn = withdrawable - originalInvested;
              decisionResult = `Partial withdrawal: $${withdrawable.toLocaleString()} (fund struggling)`;
              newPortfolio = newPortfolio.filter(p => p.cardId !== currentCard.id);
            } else {
              // Successful withdrawal
              newCash += position.currentValue;
              roundReturn = position.currentValue - position.investedAmount;
              decisionResult = `Withdrew $${position.currentValue.toLocaleString()} (${roundReturn >= 0 ? '+' : ''}$${roundReturn.toLocaleString()})`;
              newPortfolio = newPortfolio.filter(p => p.cardId !== currentCard.id);
            }
          }
          break;
        }

        case 'report': {
          newReportedCards.add(currentCard.id);
          // Reporting has major impact on Ponzi health and AP
          if (isPonziLike(currentCard.hiddenTruth)) {
            newPonziHealth[currentCard.id] = Math.max(0, (newPonziHealth[currentCard.id] || INITIAL_PONZI_HEALTH) - REPORT_DECAY);
            // Correct report: gain 1 AP
            newActionPoints = newActionPoints + CORRECT_REPORT_AP_BONUS;
            correctReports += 1;
            decisionResult = 'Reported to authorities - CORRECT! Investigation started. +1 AP';
          } else {
            // False report: lose 2 AP (min 0)
            newActionPoints = Math.max(0, newActionPoints - FALSE_REPORT_AP_PENALTY);
            falseReports += 1;
            decisionResult = 'Reported (authorities found no issues) - FALSE REPORT. -2 AP';
          }
          break;
        }

        case 'walkAway':
          decisionResult = 'Walked away from this opportunity';
          break;
      }

      // Process monthly returns for ALL portfolio positions
      const portfolioReturns: { cardId: string; returnAmount: number; collapsed: boolean }[] = [];
      
      for (const position of newPortfolio) {
        const posCard = OFFER_CARDS.find(c => c.id === position.cardId);
        if (!posCard) continue;
        
        const health = newPonziHealth[position.cardId] || 100;
        
        // Natural decay for Ponzi schemes each month
        if (isPonziLike(posCard.hiddenTruth)) {
          // Extra decay if reported
          let decayAmount = PONZI_HEALTH_DECAY_BASE;
          if (newReportedCards.has(position.cardId)) decayAmount += 10;
          
          // Random variance
          decayAmount += Math.floor(Math.random() * 10) - 5;
          
          newPonziHealth[position.cardId] = Math.max(0, health - decayAmount);
        }
        
        const monthlyReturn = calculateMonthlyReturn(position, newPonziHealth[position.cardId] || 100, state.currentMonth);
        
        if (isPonziLike(posCard.hiddenTruth) && newPonziHealth[position.cardId] <= 0 && !newPonziCollapsed.has(position.cardId)) {
          // Ponzi just collapsed!
          newPonziCollapsed.add(position.cardId);
          position.currentValue = position.currentValue * 0.05; // Lose 95%
          portfolioReturns.push({ cardId: position.cardId, returnAmount: -position.investedAmount * 0.95, collapsed: true });
        } else {
          position.currentValue += monthlyReturn;
          portfolioReturns.push({ cardId: position.cardId, returnAmount: monthlyReturn, collapsed: false });
        }
      }

      // Remove positions with zero or negative value
      newPortfolio = newPortfolio.filter(p => p.currentValue > 0);

      // Calculate total portfolio value
      const totalPortfolioValue = newPortfolio.reduce((sum, p) => sum + p.currentValue, 0);

      const roundResult: InvestorRoundResult = {
        cardId: currentCard.id,
        actionsPerformed: state.actionsThisRound,
        decision: action.decision,
        amountInvested: action.decision === 'invest' || action.decision === 'investMore' ? amount : 0,
        amountWithdrawn: action.decision === 'withdraw' || action.decision === 'sellPosition' ? roundReturn : 0,
        discoveredRedFlags: state.actionsThisRound.map(a => {
          const result = currentCard.checkResults[a as keyof typeof currentCard.checkResults];
          return result || '';
        }).filter(Boolean),
      };

      // Create round summary
      const roundSummary: RoundSummary = {
        month: state.currentMonth,
        decisionMade: decisionResult,
        portfolioReturns,
        totalPortfolioValue,
        cashOnHand: newCash,
        netWorth: newCash + totalPortfolioValue,
      };

      return {
        ...state,
        playerCash: newCash,
        portfolio: newPortfolio,
        ponziHealth: newPonziHealth,
        ponziCollapsed: newPonziCollapsed,
        reportedCards: newReportedCards,
        actionPoints: newActionPoints,
        investorResults: [...state.investorResults, roundResult],
        scores: {
          ...state.scores,
          netWorth: newCash + totalPortfolioValue,
          correctReports,
          falseReports,
        },
        roundSummary,
        showTeachingPopup: false, // Show summary first, teaching after
      };
    }

    case 'DISMISS_SUMMARY': {
      const currentCard = getCurrentCard(state);
      return {
        ...state,
        roundSummary: null,
        showTeachingPopup: true,
        currentTeachingTags: currentCard?.teachingTags || [],
      };
    }

    case 'PERFORM_TEST': {
      if (state.monthlyBudget <= 0) return state;
      if (state.testsThisRound.includes(action.test)) return state;
      
      return {
        ...state,
        monthlyBudget: state.monthlyBudget - 1,
        testsThisRound: [...state.testsThisRound, action.test],
      };
    }

    case 'MAKE_LABEL': {
      const currentCard = getCurrentCard(state);
      if (!currentCard) return state;

      let evidenceQuality = state.scores.evidenceQuality;
      let ponzisCaught = state.scores.ponzisCaught;
      let legitMissed = state.scores.legitMissed;

      // Check if this is a Ponzi-like scheme
      const isScam = isPonziLike(currentCard.hiddenTruth);
      const isDefinite = isDefinitelyPonzi(currentCard.hiddenTruth);
      
      if (action.label === 'enforcement') {
        if (isDefinite) {
          evidenceQuality += 20;
          ponzisCaught += 1;
        } else if (isScam) {
          evidenceQuality += 10;
          ponzisCaught += 1;
        } else {
          // False positive
          evidenceQuality -= 15;
          legitMissed += 1;
        }
      } else if (action.label === 'watchlist') {
        if (isScam) {
          evidenceQuality += 10;
        } else {
          // Watchlist on legit is minor issue
          evidenceQuality -= 5;
        }
      } else if (action.label === 'clear') {
        if (isScam) {
          // False negative - bad!
          evidenceQuality -= 25;
        } else {
          evidenceQuality += 15;
        }
      }

      const roundResult: RegulatorRoundResult = {
        cardId: currentCard.id,
        testsPerformed: state.testsThisRound,
        label: action.label,
      };

      return {
        ...state,
        regulatorResults: [...state.regulatorResults, roundResult],
        scores: {
          ...state.scores,
          evidenceQuality,
          ponzisCaught,
          legitMissed,
        },
        showTeachingPopup: true,
        currentTeachingTags: currentCard.teachingTags,
      };
    }

    case 'NEXT_ROUND': {
      if (state.mode === 'investor') {
        const nextRound = state.investorRound + 1;
        if (nextRound >= state.cardOrder.length) {
          // Calculate final scores
          const cardsInGame = state.cardOrder.map(id => OFFER_CARDS.find(c => c.id === id));
          const totalPonzis = cardsInGame.filter(c => c && isPonziLike(c.hiddenTruth)).length;
          return {
            ...state,
            investorCompleted: true,
            regulatorUnlocked: true,
            showTeachingPopup: false,
            scores: {
              ...state.scores,
              totalPonzis,
            },
          };
        }
        return {
          ...state,
          investorRound: nextRound,
          currentMonth: state.currentMonth + 1,
          // NO action points reset - they persist across rounds
          actionsThisRound: [],
          showTeachingPopup: false,
        };
      } else {
        const nextRound = state.regulatorRound + 1;
        if (nextRound >= state.cardOrder.length) {
          const cardsInGame = state.cardOrder.map(id => OFFER_CARDS.find(c => c.id === id));
          const totalPonzis = cardsInGame.filter(c => c && isPonziLike(c.hiddenTruth)).length;
          return {
            ...state,
            regulatorCompleted: true,
            showTeachingPopup: false,
            scores: {
              ...state.scores,
              totalPonzis,
            },
          };
        }
        return {
          ...state,
          regulatorRound: nextRound,
          monthlyBudget: REGULATOR_BUDGET_PER_ROUND,
          testsThisRound: [],
          showTeachingPopup: false,
        };
      }
    }

    case 'SHOW_TEACHING':
      return {
        ...state,
        showTeachingPopup: true,
        currentTeachingTags: action.tags,
      };

    case 'HIDE_TEACHING':
      return {
        ...state,
        showTeachingPopup: false,
      };

    case 'START_REGULATOR':
      return {
        ...state,
        mode: 'regulator',
        regulatorRound: 0,
        monthlyBudget: REGULATOR_BUDGET_PER_ROUND,
        testsThisRound: [],
        regulatorResults: [],
        // Reshuffle for regulator mode
        cardOrder: getShuffledCardIds(),
      };

    case 'GO_TO_RESULTS':
      return {
        ...state,
        mode: 'results',
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        ponziCollapsed: new Set(),
        reportedCards: new Set(),
        cardOrder: getShuffledCardIds(),
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
}

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  performAction: (action: InvestorAction) => void;
  makeDecision: (decision: InvestorDecision, amount?: number, sellCardId?: string) => void;
  sellPosition: (cardId: string) => void;
  performTest: (test: RegulatorTest) => void;
  makeLabel: (label: RegulatorLabel) => void;
  nextRound: () => void;
  hideTeaching: () => void;
  dismissSummary: () => void;
  startRegulator: () => void;
  goToResults: () => void;
  resetGame: () => void;
  currentCard: typeof OFFER_CARDS[0] | null;
  totalCards: number;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ponzi-game-state-v2');
    if (saved) {
      try {
        const parsed = deserializeState(saved);
        dispatch({ type: 'LOAD_STATE', state: parsed });
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('ponzi-game-state-v2', serializeState(state));
  }, [state]);

  const currentCard = getCurrentCard(state);

  const value: GameContextType = {
    state,
    dispatch,
    performAction: (action) => dispatch({ type: 'PERFORM_ACTION', action }),
    makeDecision: (decision, amount, sellCardId) => dispatch({ type: 'MAKE_DECISION', decision, amount, sellCardId }),
    sellPosition: (cardId) => dispatch({ type: 'SELL_POSITION', cardId }),
    performTest: (test) => dispatch({ type: 'PERFORM_TEST', test }),
    makeLabel: (label) => dispatch({ type: 'MAKE_LABEL', label }),
    nextRound: () => dispatch({ type: 'NEXT_ROUND' }),
    hideTeaching: () => dispatch({ type: 'HIDE_TEACHING' }),
    dismissSummary: () => dispatch({ type: 'DISMISS_SUMMARY' }),
    startRegulator: () => dispatch({ type: 'START_REGULATOR' }),
    goToResults: () => dispatch({ type: 'GO_TO_RESULTS' }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
    currentCard,
    totalCards: state.cardOrder.length,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
