const config = require('./config');

// Simple in-memory cost tracker. Resets monthly.
// In production, persist to disk or a database.
let currentMonth = new Date().getMonth();
let totalTokensThisMonth = 0;

// Rough cost estimate: GPT-4o-mini pricing
// ~$0.15/1M input, ~$0.60/1M output. Average ~$0.38/1M blended.
const COST_PER_1M_TOKENS_CENTS = 38;

function estimateCostCents(tokens) {
  return (tokens / 1_000_000) * COST_PER_1M_TOKENS_CENTS;
}

function trackTokens(tokens) {
  const now = new Date();
  if (now.getMonth() !== currentMonth) {
    currentMonth = now.getMonth();
    totalTokensThisMonth = 0;
  }
  totalTokensThisMonth += tokens;
}

function getCurrentCostCents() {
  return estimateCostCents(totalTokensThisMonth);
}

function isBudgetExceeded() {
  return getCurrentCostCents() >= config.cost.monthlyBudgetCents;
}

function isAlertThreshold() {
  const pct = (getCurrentCostCents() / config.cost.monthlyBudgetCents) * 100;
  return pct >= config.cost.alertPercent;
}

function getStatus() {
  const costCents = getCurrentCostCents();
  return {
    totalTokensThisMonth,
    costCents: Math.round(costCents),
    budgetCents: config.cost.monthlyBudgetCents,
    percentUsed: Math.round((costCents / config.cost.monthlyBudgetCents) * 100),
    exceeded: isBudgetExceeded(),
    alerting: isAlertThreshold(),
  };
}

module.exports = { trackTokens, isBudgetExceeded, isAlertThreshold, getStatus };
