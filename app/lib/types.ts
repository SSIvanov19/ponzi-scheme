// Game Types for Ponzi Investor

export type ReturnType = 'weekly' | 'monthly' | 'annual' | 'quarterly';

export type RegistrationStatus = 'registered' | 'not_found' | 'unknown';

export type LicenseStatus = 'verified' | 'not_found' | 'unknown';

export type ReferralContext =
  | 'discord_dm'
  | 'friend_introducer'
  | 'public_website'
  | 'cold_call'
  | 'telegram_group'
  | 'conference_booth'
  | 'regulated_broker'
  | 'facebook_ad'
  | 'influencer_sponsor'
  | 'crypto_influencer'
  | 'private_email_forward'
  | 'community_event'
  | 'public_exchange_listing'
  | 'bank_website'
  | 'instagram_dm'
  | 'startup_pitch_night'
  | 'whatsapp_group'
  | 'pitch_deck_forward'
  | 'crypto_conference';

export type HiddenTruth =
  | 'ponzi'
  | 'legit'
  | 'pyramid_like_or_ponzi'
  | 'unclear_high_risk_not_necessarily_ponzi'
  | 'ponzi_or_unregistered_fraud'
  | 'speculative_not_ponzi'
  | 'can_mimic_ponzi_dynamics'
  | 'ponzi_or_fraud'
  | 'ponzi_like_liquidity_trap'
  | 'ambiguous_can_create_ponzi_like_dynamics';

export type TeachingTag =
  | 'guarantees'
  | 'overly_consistent_returns'
  | 'secrecy'
  | 'missing_docs'
  | 'withdrawal_issues'
  | 'affinity'
  | 'consistent_returns'
  | 'weak_asset_verification'
  | 'withdrawal_delays'
  | 'documentation'
  | 'realistic_returns'
  | 'verifiable_assets'
  | 'no_pressure'
  | 'unverified_custody'
  | 'recruitment_dependency'
  | 'no_docs'
  | 'withdrawal_blocked'
  | 'illiquidity'
  | 'partial_verification'
  | 'not_guaranteed'
  | 'complex_product'
  | 'realistic_variable_returns'
  | 'strong_docs'
  | 'liquidity_terms_clear'
  | 'unlicensed_seller'
  | 'vague_strategy'
  | 'high_fees'
  | 'volatility'
  | 'no_guarantees'
  | 'high_returns'
  | 'referral_incentives'
  | 'liquidity_risk'
  | 'withdrawal_risk'
  | 'unregistered'
  | 'weak_verification'
  | 'registered'
  | 'variable_returns'
  | 'read_fine_print'
  | 'regulated_entity'
  | 'not_investment_like_returns'
  | 'early_stage_risk'
  | 'verifiable_issuer'
  | 'guaranteed_liquidity'
  | 'vague_funding_source'
  | 'complex_structure'
  | 'stress_withdrawals';

export interface PromisedReturn {
  type: ReturnType;
  value: number;
  guaranteed: boolean;
}

export interface CheckResults {
  askSourceOfReturns?: string;
  requestDocs?: string;
  testWithdrawal?: string;
  checkRegistration?: string;
  checkLicense?: string;
  verifyAssets?: string;
}

export interface OfferCard {
  id: string;
  title: string;
  pitch: string;
  promisedReturn: PromisedReturn;
  returnHistoryMonthlyPct: number[];
  docsLevel: 0 | 1 | 2 | 3; // 0 = none, 3 = full
  registrationStatus: RegistrationStatus;
  sellerLicenseStatus: LicenseStatus;
  withdrawalFriction: 0 | 1 | 2 | 3; // 0 = easy, 3 = blocked
  pressureLevel: 0 | 1 | 2 | 3;
  secrecyLevel: 0 | 1 | 2 | 3;
  referralContext: ReferralContext;
  assetVerifiability: 0 | 1 | 2 | 3;
  checkResults: CheckResults;
  hiddenTruth: HiddenTruth;
  teachingTags: TeachingTag[];
}

// Player Actions
export type InvestorAction =
  | 'checkRegistration'
  | 'checkLicense'
  | 'requestDocs'
  | 'verifyAssets'
  | 'testWithdrawal'
  | 'askSourceOfReturns';

export type InvestorDecision =
  | 'invest'
  | 'investMore'
  | 'withdraw'
  | 'walkAway'
  | 'report'
  | 'sellPosition'; // Sell a specific portfolio position

export type RegulatorTest =
  | 'isRegistered'
  | 'marketingGuarantees'
  | 'returnsConsistent'
  | 'custodyVerifiable'
  | 'withdrawalsDelayed';

export type RegulatorLabel = 'clear' | 'watchlist' | 'enforcement';

// Action costs
export const ACTION_COSTS: Record<InvestorAction, number> = {
  checkRegistration: 1,
  checkLicense: 1,
  requestDocs: 1,
  verifyAssets: 2,
  testWithdrawal: 1,
  askSourceOfReturns: 1,
};

// Game State
export interface InvestorRoundResult {
  cardId: string;
  actionsPerformed: InvestorAction[];
  decision: InvestorDecision;
  amountInvested: number;
  amountWithdrawn: number;
  discoveredRedFlags: string[];
}

export interface RegulatorRoundResult {
  cardId: string;
  testsPerformed: RegulatorTest[];
  label: RegulatorLabel;
}

export interface GameScores {
  netWorth: number;
  evidenceQuality: number;
  ponzisCaught: number;
  totalPonzis: number;
  legitMissed: number;
  correctReports: number;
  falseReports: number;
}

export interface PortfolioPosition {
  cardId: string;
  investedAmount: number;
  currentValue: number;
  monthInvested: number;
}

export interface RoundSummary {
  month: number;
  decisionMade: string;
  portfolioReturns: { cardId: string; returnAmount: number; collapsed: boolean }[];
  totalPortfolioValue: number;
  cashOnHand: number;
  netWorth: number;
}

export interface GameState {
  // Mode
  mode: 'investor' | 'regulator' | 'results';
  
  // Investor mode state
  investorRound: number;
  currentMonth: number; // Track time for returns
  actionPoints: number;
  playerCash: number;
  investments: Record<string, number>; // Legacy, keeping for compatibility
  portfolio: PortfolioPosition[]; // Track all investments with returns
  actionsThisRound: InvestorAction[];
  investorResults: InvestorRoundResult[];
  
  // Reported cards
  reportedCards: Set<string>;
  
  // Regulator mode state
  regulatorRound: number;
  monthlyBudget: number;
  testsThisRound: RegulatorTest[];
  regulatorResults: RegulatorRoundResult[];
  
  // Ponzi simulation
  ponziInflows: Record<string, number>; // Track inflows for collapse simulation
  ponziHealth: Record<string, number>; // 0-100, collapses at 0
  ponziCollapsed: Set<string>;
  
  // UI state
  showTeachingPopup: boolean;
  currentTeachingTags: TeachingTag[];
  roundSummary: RoundSummary | null;
  
  // Progress
  investorCompleted: boolean;
  regulatorUnlocked: boolean;
  regulatorCompleted: boolean;
  
  // Card ordering (shuffled each game)
  cardOrder: string[];
  
  // Scores
  scores: GameScores;
}

// Teaching content for popups
export const TEACHING_CONTENT: Record<TeachingTag, string> = {
  guarantees: "[RED FLAG] 'Guaranteed' returns are a major red flag. Legitimate investments carry risk and can't promise specific returns.",
  overly_consistent_returns: "[RED FLAG] Perfectly consistent returns are suspicious. Real markets have ups and downs—Ponzi schemes fake smooth lines to appear safe.",
  secrecy: "[RED FLAG] 'Keep it quiet' or 'invite-only' pressure exploits exclusivity. Legitimate investments don't require secrecy.",
  missing_docs: "[RED FLAG] Missing documentation (prospectus, audited financials, custodian details) is a warning sign. Always request written materials.",
  withdrawal_issues: "[RED FLAG] Withdrawal delays or 'pending' status often signal a Ponzi running low on new investor money.",
  affinity: "[RED FLAG] Affinity fraud targets trusted communities. Scammers exploit shared identity—don't let trust override due diligence.",
  consistent_returns: "[RED FLAG] Suspiciously consistent returns often indicate fabricated performance, not real investment gains.",
  weak_asset_verification: "[RED FLAG] Inability to verify underlying assets (properties, gold, contracts) suggests they may not exist.",
  withdrawal_delays: "[RED FLAG] Delayed withdrawals are classic Ponzi behavior—they need new money to pay old investors.",
  documentation: "[GOOD SIGN] Proper documentation (audited financials, clear fee schedules) is a positive sign of legitimacy.",
  realistic_returns: "[GOOD SIGN] Variable, realistic returns that reflect market conditions are more trustworthy than 'too good to be true' promises.",
  verifiable_assets: "[GOOD SIGN] Third-party verification of assets (custodians, administrators) adds credibility.",
  no_pressure: "[GOOD SIGN] Legitimate investments don't use high-pressure tactics or artificial urgency.",
  unverified_custody: "[RED FLAG] Claims about stored assets (gold, crypto) without independent verification are a red flag.",
  recruitment_dependency: "[RED FLAG] If withdrawals depend on recruiting new members, it's likely a pyramid scheme.",
  no_docs: "[RED FLAG] Zero documentation is a serious warning. All legitimate investments provide written disclosures.",
  withdrawal_blocked: "[RED FLAG] Blocked withdrawals mean your money is trapped—a hallmark of fraud.",
  illiquidity: "[CAUTION] Illiquid investments aren't necessarily fraudulent, but understand lock-up terms before investing.",
  partial_verification: "[CAUTION] Partial asset verification is better than none, but gaps should make you cautious.",
  not_guaranteed: "[GOOD SIGN] Honest disclosure that returns aren't guaranteed is actually a positive sign.",
  complex_product: "[CAUTION] Complex products require extra due diligence. If you don't understand it, be careful.",
  realistic_variable_returns: "[GOOD SIGN] Returns that vary month-to-month reflect real market conditions—more trustworthy than perfect lines.",
  strong_docs: "[GOOD SIGN] Strong documentation (audits, disclosures, third-party reports) indicates proper oversight.",
  liquidity_terms_clear: "[GOOD SIGN] Clear liquidity terms disclosed upfront show transparency.",
  unlicensed_seller: "[RED FLAG] Unlicensed sellers can't be held accountable. Always verify credentials with regulators.",
  vague_strategy: "[RED FLAG] 'Proprietary' or 'secret' strategies that can't be explained are often fabricated.",
  high_fees: "[CAUTION] High fees aren't fraud, but they eat into returns. Make sure you understand all costs.",
  volatility: "[CAUTION] High volatility means high risk. Not fraud, but know what you're getting into.",
  no_guarantees: "[GOOD SIGN] No guaranteed returns is honest. Real investments have real risks.",
  high_returns: "[RED FLAG] Extremely high promised returns (40%+ annually) are almost always unsustainable.",
  referral_incentives: "[RED FLAG] Heavy referral bonuses incentivize recruitment over investment quality—pyramid scheme warning.",
  liquidity_risk: "[CAUTION] Liquidity risk means you may not be able to exit when you want. Understand before investing.",
  withdrawal_risk: "[RED FLAG] 'Withdraw anytime*' with asterisks often hides restrictions that trap your money.",
  unregistered: "[RED FLAG] Unregistered securities offerings bypass investor protections. Check with regulators before investing.",
  weak_verification: "[RED FLAG] Weak or impossible asset verification is a major warning sign of potential fraud.",
  registered: "[GOOD SIGN] Registration with financial regulators provides accountability and investor protection.",
  variable_returns: "[GOOD SIGN] Variable returns reflect honest reporting of real market performance.",
  read_fine_print: "[CAUTION] Always read the fine print. Promotional rates and caps often have important limitations.",
  regulated_entity: "[GOOD SIGN] Regulated entities are subject to oversight, audits, and investor protection rules.",
  not_investment_like_returns: "[GOOD SIGN] Bank products aren't investments—they're insured deposits with different risk profiles.",
  early_stage_risk: "[CAUTION] Early-stage investments carry high risk of total loss. Only invest what you can afford to lose.",
  verifiable_issuer: "[GOOD SIGN] When you can verify the issuer's identity and track record, it adds credibility.",
  guaranteed_liquidity: "[RED FLAG] 'Guaranteed' liquidity in private investments is usually too good to be true.",
  vague_funding_source: "[RED FLAG] If they can't clearly explain where returns come from, be very suspicious.",
  complex_structure: "[CAUTION] Complex structures can hide risks or be used to obscure fraudulent activity.",
  stress_withdrawals: "[RED FLAG] Systems that work normally but fail during stress may have hidden liquidity problems.",
};

// Referral context display names
export const REFERRAL_LABELS: Record<ReferralContext, string> = {
  discord_dm: 'Discord DM',
  friend_introducer: 'Friend referral',
  public_website: 'Public website',
  cold_call: 'Cold call',
  telegram_group: 'Telegram group',
  conference_booth: 'Conference booth',
  regulated_broker: 'Regulated broker',
  facebook_ad: 'Facebook ad',
  influencer_sponsor: 'Influencer sponsor',
  crypto_influencer: 'Crypto influencer',
  private_email_forward: 'Forwarded email',
  community_event: 'Community event',
  public_exchange_listing: 'Public exchange',
  bank_website: 'Bank website',
  instagram_dm: 'Instagram DM',
  startup_pitch_night: 'Startup pitch night',
  whatsapp_group: 'WhatsApp group',
  pitch_deck_forward: 'Forwarded pitch deck',
  crypto_conference: 'Crypto conference',
};
