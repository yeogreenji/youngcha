/**
 * 평단가 엘리베이터 계산 — 실제로 동작하는 계산 로직
 *
 * 개념: 종목마다 '1층'의 가격이 정해져 있습니다(예: 하이닉스 1층 = 1,000원).
 *   · 평단가가 21,400원이면 21층 대원
 *   · 현재가가 19,900원이면 19층
 *   · 구조(본전)까지 남은 층 = ceil((평단가 - 현재가) / 1층 가격)
 *
 * 주의:
 *  · 수수료·세금·환전 비용은 반영하지 않습니다.
 *  · 투자 권유나 목표가 예측이 아니라, 입력한 숫자로 하는 산수입니다.
 */

export interface ElevatorInput {
  avgPrice: number | null;
  shares: number | null;
  currentPrice: number | null;
  targetPrice?: number | null;
  floorUnit: number;
}

export interface ElevatorResult {
  invested: number;
  value: number;
  pnl: number;
  pnlPct: number;
  avgFloor: number;
  currentFloor: number;
  /** 본전까지 남은 층. 이미 위면 0 */
  floorsToGo: number;
  rescued: boolean;
  targetFloor: number | null;
  targetFloors: number | null;
}

/** 가격 → 층 (내림). 21,900원 / 1,000원 = 21층 */
export function floorOf(price: number, floorUnit: number): number {
  if (!Number.isFinite(price) || !Number.isFinite(floorUnit) || floorUnit <= 0) return 0;
  return Math.floor(price / floorUnit + 1e-9);
}

export function calculateElevator(input: ElevatorInput): ElevatorResult | null {
  const { avgPrice, shares, currentPrice, targetPrice, floorUnit } = input;
  if (avgPrice === null || currentPrice === null) return null;
  if (!(avgPrice > 0) || !(currentPrice > 0) || !(floorUnit > 0)) return null;

  const quantity = shares !== null && shares > 0 ? shares : 1;
  const invested = avgPrice * quantity;
  const value = currentPrice * quantity;
  const pnl = value - invested;
  const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;

  const avgFloor = floorOf(avgPrice, floorUnit);
  const currentFloor = floorOf(currentPrice, floorUnit);
  const rescued = currentPrice >= avgPrice;
  const floorsToGo = rescued ? 0 : Math.ceil((avgPrice - currentPrice) / floorUnit - 1e-9);

  const validTarget = targetPrice !== null && targetPrice !== undefined && targetPrice > 0 ? targetPrice : null;
  const targetFloor = validTarget === null ? null : floorOf(validTarget, floorUnit);
  const targetFloors =
    validTarget === null || validTarget <= currentPrice ? null : Math.ceil((validTarget - currentPrice) / floorUnit - 1e-9);

  return {
    invested,
    value,
    pnl,
    pnlPct,
    avgFloor,
    currentFloor,
    floorsToGo,
    rescued,
    targetFloor,
    targetFloors,
  };
}

/** 엘리베이터 그림에서 현재 칸의 위치(%) — 평단가를 100으로 봅니다. */
export function elevatorPosition(currentPrice: number, avgPrice: number): number {
  if (avgPrice <= 0) return 0;
  const ratio = (currentPrice / avgPrice) * 100;
  return Math.max(4, Math.min(100, ratio));
}
