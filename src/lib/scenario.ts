/** Hypothetical weighted average. Pure local arithmetic; no data transmission. */
export function calculateScenario(avg: number | null, shares: number | null, price: number | null, quantity: number | null) {
  if (![avg, shares, price, quantity].every(v => typeof v === 'number' && Number.isFinite(v) && v > 0)) return null;
  if (avg === null || shares === null || price === null || quantity === null) return null;
  const cash = price * quantity;
  const total = avg * shares + cash;
  const count = shares + quantity;
  const average = total / count;
  return [cash,total,count,average].every(Number.isFinite) ? {cash,average,count} : null;
}
