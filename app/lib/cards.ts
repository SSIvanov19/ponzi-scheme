import { OfferCard } from './types';

export const OFFER_CARDS: OfferCard[] = [
  {
    id: 'C01',
    title: 'Guaranteed 2% Weekly "AI Arbitrage"',
    pitch: 'Guaranteed 2% weekly. Market-neutral AI bot. Zero drawdowns. Invite-only.',
    promisedReturn: { type: 'weekly', value: 0.02, guaranteed: true },
    returnHistoryMonthlyPct: [8.0, 8.0, 8.1, 8.0, 8.0, 8.0, 8.0, 8.1, 8.0, 8.0, 8.0, 8.0],
    docsLevel: 0,
    registrationStatus: 'not_found',
    sellerLicenseStatus: 'not_found',
    withdrawalFriction: 2,
    pressureLevel: 3,
    secrecyLevel: 3,
    referralContext: 'discord_dm',
    assetVerifiability: 0,
    checkResults: {
      askSourceOfReturns: "Vague jargon + 'proprietary secret'. No clear revenue source.",
      requestDocs: "Promises an audit 'soon'. Sends a 2-page marketing PDF only.",
      testWithdrawal: "First small withdrawal succeeds, second becomes 'pending maintenance'.",
      checkRegistration: 'Entity not found; name resembles a legitimate firm.',
    },
    hiddenTruth: 'ponzi',
    teachingTags: ['guarantees', 'overly_consistent_returns', 'secrecy', 'missing_docs', 'withdrawal_issues'],
  },
  {
    id: 'C02',
    title: 'Community Real-Estate Notes (Affinity Pitch)',
    pitch: "Trusted community member: 'Everyone here is earning 3% monthly. Keep it in the group.'",
    promisedReturn: { type: 'monthly', value: 0.03, guaranteed: true },
    returnHistoryMonthlyPct: [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
    docsLevel: 1,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 2,
    pressureLevel: 2,
    secrecyLevel: 2,
    referralContext: 'friend_introducer',
    assetVerifiability: 1,
    checkResults: {
      requestDocs: 'Provides promissory note templates but no verifiable borrower list.',
      verifyAssets: "Shows property photos; can't link them to liens or recorded filings.",
      checkLicense: "Seller avoids questions: 'We're private, don't need that.'",
      testWithdrawal: "Withdrawals start taking longer 'because projects are rolling over'.",
    },
    hiddenTruth: 'ponzi',
    teachingTags: ['affinity', 'guarantees', 'consistent_returns', 'weak_asset_verification', 'withdrawal_delays'],
  },
  {
    id: 'C03',
    title: 'Invoice Factoring Fund (Looks Boring on Purpose)',
    pitch: 'We buy invoices at a discount; returns vary. Here are contracts and audited statements.',
    promisedReturn: { type: 'annual', value: 0.10, guaranteed: false },
    returnHistoryMonthlyPct: [0.6, 1.2, -0.3, 1.0, 0.4, 0.9, 0.1, 1.1, -0.2, 0.8, 0.5, 0.7],
    docsLevel: 3,
    registrationStatus: 'registered',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 1,
    pressureLevel: 0,
    secrecyLevel: 0,
    referralContext: 'public_website',
    assetVerifiability: 3,
    checkResults: {
      requestDocs: 'Provides audited financials + custodian details + clear fee schedule.',
      verifyAssets: 'Gives anonymized invoice pool data + third-party servicing report.',
      testWithdrawal: 'Works within stated window; small fee disclosed upfront.',
    },
    hiddenTruth: 'legit',
    teachingTags: ['documentation', 'realistic_returns', 'verifiable_assets', 'no_pressure'],
  },
  {
    id: 'C04',
    title: 'Gold Storage + "Guaranteed Yield"',
    pitch: 'Your gold is stored in a vault AND you get 18% annually, paid monthly. No risk.',
    promisedReturn: { type: 'annual', value: 0.18, guaranteed: true },
    returnHistoryMonthlyPct: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
    docsLevel: 1,
    registrationStatus: 'not_found',
    sellerLicenseStatus: 'not_found',
    withdrawalFriction: 2,
    pressureLevel: 2,
    secrecyLevel: 1,
    referralContext: 'cold_call',
    assetVerifiability: 1,
    checkResults: {
      verifyAssets: "Vault 'audit' is a self-made PDF; no independent custodian confirmation.",
      requestDocs: "Refuses to disclose vault location; says it's for 'security reasons'.",
      testWithdrawal: "Cash withdrawal delayed; offered bonuses to 'roll over'.",
    },
    hiddenTruth: 'ponzi',
    teachingTags: ['guarantees', 'consistent_returns', 'unverified_custody', 'withdrawal_delays'],
  },
  {
    id: 'C05',
    title: '"Bank Deposit Alternative" High-Interest Club',
    pitch: "Safer than a bank. 4% monthly. We pool member money and 'lend it out'.",
    promisedReturn: { type: 'monthly', value: 0.04, guaranteed: true },
    returnHistoryMonthlyPct: [4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0],
    docsLevel: 0,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 3,
    pressureLevel: 3,
    secrecyLevel: 2,
    referralContext: 'telegram_group',
    assetVerifiability: 0,
    checkResults: {
      checkRegistration: 'No clear legal entity or offering documents.',
      askSourceOfReturns: "Claims 'private lending' but no borrower evidence.",
      testWithdrawal: 'Withdrawal blocked unless you recruit 2 new members.',
    },
    hiddenTruth: 'pyramid_like_or_ponzi',
    teachingTags: ['guarantees', 'recruitment_dependency', 'no_docs', 'withdrawal_blocked'],
  },
  {
    id: 'C06',
    title: 'Carbon Credit Pre-Sale (Ambiguous)',
    pitch: 'Buy carbon credits early; sell later to corporates. Returns estimated, not guaranteed.',
    promisedReturn: { type: 'annual', value: 0.20, guaranteed: false },
    returnHistoryMonthlyPct: [2.0, -1.0, 3.5, -2.5, 1.0, 0.0, 2.5, -1.5, 4.0, -3.0, 1.5, 0.5],
    docsLevel: 2,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 2,
    pressureLevel: 1,
    secrecyLevel: 1,
    referralContext: 'conference_booth',
    assetVerifiability: 2,
    checkResults: {
      requestDocs: 'Provides project docs but quality varies; some third-party references exist.',
      verifyAssets: 'You can verify part of the inventory; not all items are traceable.',
      testWithdrawal: 'Slow because market is illiquid; terms disclose lock-up.',
    },
    hiddenTruth: 'unclear_high_risk_not_necessarily_ponzi',
    teachingTags: ['illiquidity', 'partial_verification', 'not_guaranteed', 'complex_product'],
  },
  {
    id: 'C07',
    title: 'Private Credit Fund (Boring, Transparent)',
    pitch: "Senior secured lending to SMEs. Returns are variable. Here's the risk disclosure.",
    promisedReturn: { type: 'annual', value: 0.12, guaranteed: false },
    returnHistoryMonthlyPct: [0.9, 1.1, 0.7, 0.6, 1.3, -0.4, 0.8, 0.9, 0.5, 1.0, 0.2, 0.7],
    docsLevel: 3,
    registrationStatus: 'registered',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 2,
    pressureLevel: 0,
    secrecyLevel: 0,
    referralContext: 'regulated_broker',
    assetVerifiability: 3,
    checkResults: {
      requestDocs: 'Audited financials + portfolio summary + clear default policy.',
      verifyAssets: 'Third-party administrator confirms holdings.',
      testWithdrawal: 'Permitted quarterly per stated lock-up.',
    },
    hiddenTruth: 'legit',
    teachingTags: ['realistic_variable_returns', 'strong_docs', 'liquidity_terms_clear'],
  },
  {
    id: 'C08',
    title: '"Consistent 1.2% Monthly" Retirement Booster',
    pitch: "Perfectly stable 1.2% monthly. No down months in 7 years. 'Like a savings account.'",
    promisedReturn: { type: 'monthly', value: 0.012, guaranteed: true },
    returnHistoryMonthlyPct: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
    docsLevel: 1,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'not_found',
    withdrawalFriction: 2,
    pressureLevel: 1,
    secrecyLevel: 1,
    referralContext: 'facebook_ad',
    assetVerifiability: 0,
    checkResults: {
      checkLicense: "Salesperson is 'financial coach' with no license.",
      requestDocs: 'Gives glossy brochure; no audited statements.',
      askSourceOfReturns: "Claims 'proprietary strategy' + refuses details.",
    },
    hiddenTruth: 'ponzi_or_unregistered_fraud',
    teachingTags: ['overly_consistent_returns', 'unlicensed_seller', 'missing_docs', 'vague_strategy'],
  },
  {
    id: 'C09',
    title: 'Art Fractional Shares (Pump-y, Not a Ponzi)',
    pitch: 'Buy shares of art pieces. Potential upside, but no guaranteed yield.',
    promisedReturn: { type: 'annual', value: 0.25, guaranteed: false },
    returnHistoryMonthlyPct: [5.0, -4.0, 6.5, -8.0, 7.0, -6.0, 4.0, -5.5, 9.0, -10.0, 3.0, -2.0],
    docsLevel: 2,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 3,
    pressureLevel: 1,
    secrecyLevel: 0,
    referralContext: 'influencer_sponsor',
    assetVerifiability: 2,
    checkResults: {
      requestDocs: 'Some disclosure exists; fees are high; liquidity is limited.',
      testWithdrawal: 'Hard to sell quickly; secondary market thin.',
    },
    hiddenTruth: 'speculative_not_ponzi',
    teachingTags: ['illiquidity', 'high_fees', 'volatility', 'no_guarantees'],
  },
  {
    id: 'C10',
    title: '"Early Access" DeFi Staking with Referral Bonuses',
    pitch: 'Stake tokens for 40% APY. Extra 10% if you refer 3 friends. Withdraw anytime*',
    promisedReturn: { type: 'annual', value: 0.40, guaranteed: false },
    returnHistoryMonthlyPct: [6.0, 5.5, 6.2, 5.8, 6.1, 6.0, 5.9, 6.0, 6.1, 1.0, -4.0, -12.0],
    docsLevel: 1,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 2,
    pressureLevel: 2,
    secrecyLevel: 1,
    referralContext: 'crypto_influencer',
    assetVerifiability: 1,
    checkResults: {
      requestDocs: 'Smart contract exists but audits are old/partial; team anonymous.',
      testWithdrawal: "Works early; later 'liquidity pool imbalance' delays exits.",
      askSourceOfReturns: 'A mix of real yield + heavy reliance on new token buyers.',
    },
    hiddenTruth: 'can_mimic_ponzi_dynamics',
    teachingTags: ['high_returns', 'referral_incentives', 'liquidity_risk', 'withdrawal_risk'],
  },
  // New cards C11-C20
  {
    id: 'C11',
    title: 'Offshore "Prime Bank Notes" 30% Guaranteed',
    pitch: 'Exclusive offshore prime bank notes. 30% annual guaranteed. No market risk. Confidential.',
    promisedReturn: { type: 'annual', value: 0.30, guaranteed: true },
    returnHistoryMonthlyPct: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
    docsLevel: 0,
    registrationStatus: 'not_found',
    sellerLicenseStatus: 'not_found',
    withdrawalFriction: 3,
    pressureLevel: 3,
    secrecyLevel: 3,
    referralContext: 'private_email_forward',
    assetVerifiability: 0,
    checkResults: {
      askSourceOfReturns: "Claims 'bank instruments' but refuses details due to 'NDAs'.",
      requestDocs: 'Only marketing slides; no audited statements, no custodian, no legal entity clarity.',
      checkRegistration: 'Offering not found; entity name changes slightly across documents.',
      testWithdrawal: "Withdrawal requires a 'release fee' and then stays pending.",
    },
    hiddenTruth: 'ponzi',
    teachingTags: ['guarantees', 'secrecy', 'missing_docs', 'unregistered', 'withdrawal_issues'],
  },
  {
    id: 'C12',
    title: 'Charity Endowment "Monthly Stipend" Plan',
    pitch: 'Donate to our endowment and receive a monthly stipend forever. Helping others while earning 2% monthly.',
    promisedReturn: { type: 'monthly', value: 0.02, guaranteed: true },
    returnHistoryMonthlyPct: [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
    docsLevel: 1,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 2,
    pressureLevel: 2,
    secrecyLevel: 2,
    referralContext: 'community_event',
    assetVerifiability: 0,
    checkResults: {
      requestDocs: 'Provides emotional testimonials and a brochure; no audited financials.',
      verifyAssets: 'No verifiable endowment holdings; bank statements are redacted screenshots.',
      askSourceOfReturns: "Says 'our supporters keep it going' and pivots to guilt/mission.",
      testWithdrawal: "Stipend arrives early; later becomes 'delayed due to system upgrade'.",
    },
    hiddenTruth: 'ponzi',
    teachingTags: ['affinity', 'guarantees', 'consistent_returns', 'weak_verification', 'withdrawal_delays'],
  },
  {
    id: 'C13',
    title: 'Covered Call ETF (Transparent, Boring)',
    pitch: 'Exchange-traded covered call strategy. Returns can vary. Prospectus and holdings published.',
    promisedReturn: { type: 'annual', value: 0.09, guaranteed: false },
    returnHistoryMonthlyPct: [1.1, 0.4, -0.8, 1.6, 0.2, 0.9, -0.3, 1.2, 0.7, -0.5, 1.0, 0.3],
    docsLevel: 3,
    registrationStatus: 'registered',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 0,
    pressureLevel: 0,
    secrecyLevel: 0,
    referralContext: 'public_exchange_listing',
    assetVerifiability: 3,
    checkResults: {
      requestDocs: 'Prospectus + fees + risks + daily holdings link.',
      verifyAssets: 'Holdings and NAV verifiable through multiple independent sources.',
      testWithdrawal: 'Sell anytime during market hours; settlement per normal rules.',
    },
    hiddenTruth: 'legit',
    teachingTags: ['registered', 'verifiable_assets', 'variable_returns', 'no_pressure'],
  },
  {
    id: 'C14',
    title: 'High-Yield Savings Promo (Regulated, But Has Fine Print)',
    pitch: 'Earn 5% on savings—insured up to limits. Rate applies only up to a cap; variable after promo period.',
    promisedReturn: { type: 'annual', value: 0.05, guaranteed: false },
    returnHistoryMonthlyPct: [0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.15, 0.15, 0.15, 0.15],
    docsLevel: 3,
    registrationStatus: 'registered',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 0,
    pressureLevel: 0,
    secrecyLevel: 0,
    referralContext: 'bank_website',
    assetVerifiability: 3,
    checkResults: {
      requestDocs: 'Clear T&Cs: cap, promo end date, variable rate clause.',
      askSourceOfReturns: "Interest from bank operations; not framed as an 'investment product'.",
      testWithdrawal: 'Works instantly within stated bank rules.',
    },
    hiddenTruth: 'legit',
    teachingTags: ['read_fine_print', 'regulated_entity', 'not_investment_like_returns'],
  },
  {
    id: 'C15',
    title: 'Forex Managed Account "Never a Losing Month"',
    pitch: 'Professional FX desk. Never a losing month in 4 years. 1.8% monthly target. Low risk.',
    promisedReturn: { type: 'monthly', value: 0.018, guaranteed: true },
    returnHistoryMonthlyPct: [1.8, 1.8, 1.9, 1.8, 1.8, 1.8, 1.8, 1.9, 1.8, 1.8, 1.8, 1.8],
    docsLevel: 1,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'not_found',
    withdrawalFriction: 2,
    pressureLevel: 2,
    secrecyLevel: 2,
    referralContext: 'instagram_dm',
    assetVerifiability: 0,
    checkResults: {
      checkLicense: "Manager claims 'international exemption'—no verifiable license.",
      requestDocs: "Only screenshots of 'account statements' without broker verification.",
      askSourceOfReturns: "Claims 'bank liquidity access' and avoids specifics.",
      testWithdrawal: "Small withdrawal works once; then 'risk controls' block larger withdrawals.",
    },
    hiddenTruth: 'ponzi_or_fraud',
    teachingTags: ['overly_consistent_returns', 'unlicensed_seller', 'missing_docs', 'withdrawal_issues'],
  },
  {
    id: 'C16',
    title: 'Solar Panel Lease Notes (Illiquid, Could Be Real)',
    pitch: 'Finance solar panel leases. Estimated 14% annual, not guaranteed. 12-month lock-up.',
    promisedReturn: { type: 'annual', value: 0.14, guaranteed: false },
    returnHistoryMonthlyPct: [2.0, -1.5, 1.0, 0.8, 1.5, -0.9, 1.1, 0.4, 1.8, -1.2, 0.9, 0.6],
    docsLevel: 2,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 2,
    pressureLevel: 1,
    secrecyLevel: 1,
    referralContext: 'startup_pitch_night',
    assetVerifiability: 2,
    checkResults: {
      requestDocs: 'Provides lease templates and a project list; audit not available yet.',
      verifyAssets: 'Some sites verifiable; cashflow projections optimistic.',
      testWithdrawal: 'Blocked by lock-up (disclosed). Secondary market unclear.',
    },
    hiddenTruth: 'unclear_high_risk_not_necessarily_ponzi',
    teachingTags: ['illiquidity', 'partial_verification', 'early_stage_risk'],
  },
  {
    id: 'C17',
    title: 'Local Infrastructure Bond (Low Drama)',
    pitch: 'Municipal-style infrastructure note. Returns modest. Full offering document and risk disclosure.',
    promisedReturn: { type: 'annual', value: 0.06, guaranteed: false },
    returnHistoryMonthlyPct: [0.45, 0.48, 0.46, 0.50, 0.44, 0.47, 0.43, 0.49, 0.45, 0.46, 0.44, 0.48],
    docsLevel: 3,
    registrationStatus: 'registered',
    sellerLicenseStatus: 'verified',
    withdrawalFriction: 1,
    pressureLevel: 0,
    secrecyLevel: 0,
    referralContext: 'regulated_broker',
    assetVerifiability: 3,
    checkResults: {
      requestDocs: 'Offering circular + use of proceeds + audited issuer statements.',
      verifyAssets: 'Issuer identity and disclosures verifiable; independent credit info exists.',
      testWithdrawal: 'Sellable, but price may vary with rates/liquidity.',
    },
    hiddenTruth: 'legit',
    teachingTags: ['documentation', 'verifiable_issuer', 'realistic_returns'],
  },
  {
    id: 'C18',
    title: 'Peer-to-Peer "Lending Circle" With Referral Unlocks',
    pitch: 'Earn 3% monthly by lending to members. Withdrawals unlocked after you refer 2 new lenders.',
    promisedReturn: { type: 'monthly', value: 0.03, guaranteed: true },
    returnHistoryMonthlyPct: [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
    docsLevel: 0,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 3,
    pressureLevel: 3,
    secrecyLevel: 2,
    referralContext: 'whatsapp_group',
    assetVerifiability: 0,
    checkResults: {
      askSourceOfReturns: 'No clear borrower underwriting; focuses on recruiting.',
      requestDocs: "No contracts; rules change based on 'community votes'.",
      testWithdrawal: 'Blocked unless referral condition met.',
    },
    hiddenTruth: 'pyramid_like_or_ponzi',
    teachingTags: ['recruitment_dependency', 'no_docs', 'withdrawal_blocked', 'guarantees'],
  },
  {
    id: 'C19',
    title: 'Startup SAFE + "Quarterly Buyback Promise"',
    pitch: "Invest via SAFE. Company promises quarterly buybacks at +10%—'liquidity guaranteed'.",
    promisedReturn: { type: 'quarterly', value: 0.10, guaranteed: true },
    returnHistoryMonthlyPct: [0.0, 0.0, 10.0, 0.0, 0.0, 10.0, 0.0, 0.0, 10.0, 0.0, 0.0, 10.0],
    docsLevel: 1,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 2,
    pressureLevel: 2,
    secrecyLevel: 2,
    referralContext: 'pitch_deck_forward',
    assetVerifiability: 1,
    checkResults: {
      requestDocs: 'Deck is polished but financials are unaudited; cash runway unclear.',
      askSourceOfReturns: "Buybacks allegedly funded by 'new strategic investors'.",
      checkRegistration: 'No clear offering compliance; legal structure unclear.',
      testWithdrawal: "Buyback 'window' repeatedly postponed.",
    },
    hiddenTruth: 'ponzi_like_liquidity_trap',
    teachingTags: ['guaranteed_liquidity', 'vague_funding_source', 'missing_docs', 'withdrawal_delays'],
  },
  {
    id: 'C20',
    title: 'Tokenized "Treasury Vault" With Instant Exits*',
    pitch: "Earn T-bill yield via token. 'Instant exits anytime' *subject to liquidity*. Audits partial.",
    promisedReturn: { type: 'annual', value: 0.08, guaranteed: false },
    returnHistoryMonthlyPct: [0.7, 0.6, 0.8, 0.7, 0.7, 0.6, 0.8, 0.7, 0.7, 0.2, -0.6, -1.4],
    docsLevel: 2,
    registrationStatus: 'unknown',
    sellerLicenseStatus: 'unknown',
    withdrawalFriction: 2,
    pressureLevel: 1,
    secrecyLevel: 1,
    referralContext: 'crypto_conference',
    assetVerifiability: 2,
    checkResults: {
      requestDocs: 'Proof-of-reserves exists but scope is limited; audit firm not top-tier.',
      verifyAssets: 'Some wallet addresses published; linkage to custody not fully clear.',
      testWithdrawal: "Works in calm periods; fails during market stress due to 'liquidity limits'.",
    },
    hiddenTruth: 'ambiguous_can_create_ponzi_like_dynamics',
    teachingTags: ['liquidity_risk', 'partial_verification', 'complex_structure', 'stress_withdrawals'],
  },
];

// Helper functions
export function getCardById(id: string): OfferCard | undefined {
  return OFFER_CARDS.find((card) => card.id === id);
}

export function isPonziLike(truth: string): boolean {
  return [
    'ponzi',
    'pyramid_like_or_ponzi',
    'ponzi_or_unregistered_fraud',
    'can_mimic_ponzi_dynamics',
    'ponzi_or_fraud',
    'ponzi_like_liquidity_trap',
    'ambiguous_can_create_ponzi_like_dynamics',
  ].includes(truth);
}

export function isDefinitelyPonzi(truth: string): boolean {
  return ['ponzi', 'ponzi_or_fraud', 'ponzi_or_unregistered_fraud'].includes(truth);
}

export function isAmbiguous(truth: string): boolean {
  return [
    'unclear_high_risk_not_necessarily_ponzi',
    'speculative_not_ponzi',
    'can_mimic_ponzi_dynamics',
    'ponzi_like_liquidity_trap',
    'ambiguous_can_create_ponzi_like_dynamics',
  ].includes(truth);
}

export function isLegit(truth: string): boolean {
  return truth === 'legit';
}

export function formatReturn(promisedReturn: { type: string; value: number; guaranteed: boolean }): string {
  const percentage = (promisedReturn.value * 100).toFixed(1);
  const period = promisedReturn.type;
  const guarantee = promisedReturn.guaranteed ? ' (Guaranteed!)' : '';
  return `${percentage}% ${period}${guarantee}`;
}

export function calculateRedFlagScore(card: OfferCard): number {
  let score = 0;
  
  // Guaranteed returns
  if (card.promisedReturn.guaranteed) score += 20;
  
  // High returns
  const annualizedReturn = card.promisedReturn.type === 'weekly' 
    ? card.promisedReturn.value * 52 
    : card.promisedReturn.type === 'monthly' 
    ? card.promisedReturn.value * 12 
    : card.promisedReturn.value;
  if (annualizedReturn > 0.20) score += 15;
  if (annualizedReturn > 0.40) score += 15;
  
  // Consistent returns (low variance in history)
  const variance = calculateVariance(card.returnHistoryMonthlyPct);
  if (variance < 0.5) score += 20;
  
  // Missing docs
  score += (3 - card.docsLevel) * 5;
  
  // Registration issues
  if (card.registrationStatus === 'not_found') score += 15;
  if (card.sellerLicenseStatus === 'not_found') score += 10;
  
  // Withdrawal friction
  score += card.withdrawalFriction * 5;
  
  // Pressure & secrecy
  score += card.pressureLevel * 5;
  score += card.secrecyLevel * 5;
  
  // Asset verifiability
  score += (3 - card.assetVerifiability) * 5;
  
  return Math.min(100, score);
}

function calculateVariance(numbers: number[]): number {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const squaredDiffs = numbers.map((n) => Math.pow(n - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
}
