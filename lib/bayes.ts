export type BayesInputs = {
  prior: number;
  sensitivity: number;
  specificity: number;
};

export function bayesPosterior({
  prior,
  sensitivity,
  specificity,
}: BayesInputs): number {
  const fpr = 1 - specificity;
  const numerator = sensitivity * prior;
  const denominator = sensitivity * prior + fpr * (1 - prior);
  if (denominator === 0) return 0;
  return numerator / denominator;
}

export function fmtPct(v: number, digits = 1): string {
  return `${(v * 100).toFixed(digits)}%`;
}

export function bayesBreakdown({ prior, sensitivity, specificity }: BayesInputs) {
  const fpr = 1 - specificity;
  const tp = sensitivity * prior;
  const fp = fpr * (1 - prior);
  const pPos = tp + fp;
  const posterior = pPos === 0 ? 0 : tp / pPos;
  return { tp, fp, pPos, posterior };
}
