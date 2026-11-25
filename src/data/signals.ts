import type { CompassSignal } from '../types';

/**
 * 주식 나침반 — 샘플 신호
 * ⚠️ 모두 화면 확인용 '샘플 분석'입니다. 실제 데이터가 아니며 매매 권유가 아닙니다.
 *    실제 분석을 붙일 때는 반드시 이유·사용 데이터·기준일을 함께 계산해 넣습니다.
 *    (지침 PROJECT 02: 신호의 이유와 사용한 데이터, 기준일을 함께 표시 / 고점·저점 보장 금지)
 */
export const compassSignals: CompassSignal[] = [
  {
    id: 'sig-naver',
    crewId: 'naver',
    ticker: '035420',
    name: { ko: 'NAVER', en: 'NAVER' },
    market: 'KR',
    signal: 'buy',
    headline: {
      ko: '가격 부담이 낮아진 구간, 조건을 하나씩 확인해 볼 만해요',
      en: 'Valuation pressure eased — worth checking conditions one by one',
    },
    reason: {
      ko: '최근 3개월 가격이 완만하게 내려오면서 거래량도 함께 줄었어요. 실적이 급격히 나빠진 신호는 아직 없어서, 서두르지 않고 조건을 확인해 볼 구간으로 표시했어요.',
      en: 'Prices drifted down over three months with volume shrinking too. No sign of a sharp earnings break, so this is marked as a period to check conditions — not to rush.',
    },
    dataUsed: {
      ko: '최근 3개월 일봉, 최근 2개 분기 실적, 거래량 추이',
      en: '3-month daily chart, last 2 quarters of earnings, volume trend',
    },
    asOf: '2026-11-25',
    sample: true,
  },
  {
    id: 'sig-samsung',
    crewId: 'samsung',
    ticker: '005930',
    name: { ko: '삼성전자', en: 'Samsung Electronics' },
    market: 'KR',
    signal: 'wait',
    headline: {
      ko: '가격은 올랐는데 실적 개선 폭이 따라오지 않았어요',
      en: 'Price rose, but the earnings improvement did not follow',
    },
    reason: {
      ko: '가격이 먼저 움직이고 실적 기대는 아직 숫자로 확인되지 않았어요. 이럴 때는 결과를 서둘러 판단하기보다 다음 실적 발표를 기다리는 편이 안전해요.',
      en: 'Price moved first while the earnings hope is not yet in the numbers. Waiting for the next release is safer than rushing a conclusion.',
    },
    dataUsed: {
      ko: '최근 6개월 주봉, 최근 3개 분기 실적, 업종 평균 PER(샘플)',
      en: '6-month weekly chart, last 3 quarters, sector average PER (sample)',
    },
    asOf: '2026-11-25',
    sample: true,
  },
  {
    id: 'sig-hynix',
    crewId: 'sk-hynix',
    ticker: '000660',
    name: { ko: 'SK하이닉스', en: 'SK hynix' },
    market: 'KR',
    signal: 'heated',
    headline: {
      ko: '짧은 기간에 너무 빠르게 올라 변동이 커질 수 있어요',
      en: 'Rose fast in a short window — swings may widen',
    },
    reason: {
      ko: '한 달 상승 폭이 최근 1년의 평소 움직임보다 크게 앞섰어요. 좋은 재료가 있어도 이 속도에서는 하루 변동이 커질 수 있으니, 새로 들어가기 전에 숨 고르는 구간으로 봐요.',
      en: 'The one-month gain far outpaced its usual yearly moves. Even with good news, this pace can bring bigger daily swings — a moment to breathe before entering.',
    },
    dataUsed: {
      ko: '최근 1년 일봉 변동성, 최근 1개월 상승률, 거래대금',
      en: '1-year daily volatility, 1-month gain, trading value',
    },
    asOf: '2026-11-25',
    sample: true,
  },
  {
    id: 'sig-tesla',
    crewId: 'tesla',
    ticker: 'TSLA',
    name: { ko: '테슬라', en: 'Tesla' },
    market: 'US',
    signal: 'crisis',
    headline: {
      ko: '시장 전체 위험과 환율이 겹친 구간이에요',
      en: 'Market-wide risk and FX are overlapping',
    },
    reason: {
      ko: '미국장 변동성 지표가 평소보다 높고 환율도 함께 흔들렸어요. 이럴 때는 종목 하나의 좋고 나쁨보다 시장 전체 위험을 먼저 보는 게 좋아요.',
      en: 'US volatility is above normal and FX moved too. Here, market-wide risk matters more than one stock’s story.',
    },
    dataUsed: {
      ko: '미국장 변동성 지표, 원·달러 환율, 최근 5일 거래량',
      en: 'US volatility index, KRW/USD, last 5 days of volume',
    },
    asOf: '2026-11-25',
    sample: true,
  },
  {
    id: 'sig-nvidia',
    crewId: 'nvidia',
    ticker: 'NVDA',
    name: { ko: '엔비디아', en: 'NVIDIA' },
    market: 'US',
    signal: 'hold',
    headline: {
      ko: '실적 발표 전이라 판단을 미뤘어요',
      en: 'Holding judgment until earnings',
    },
    reason: {
      ko: '큰 발표를 앞두고는 지금 숫자로 결론을 내리기 어려워요. 발표 이후 가격과 거래량이 어떻게 반응하는지 보고 다시 판단하는 게 낫습니다.',
      en: 'Before a big release, today’s numbers are a weak basis. Better to re-judge after seeing how price and volume react.',
    },
    dataUsed: {
      ko: '최근 3개월 일봉, 실적 발표 예정일(샘플), 거래량',
      en: '3-month daily chart, scheduled earnings date (sample), volume',
    },
    asOf: '2026-11-25',
    sample: true,
  },
  {
    id: 'sig-apple',
    crewId: 'apple',
    ticker: 'AAPL',
    name: { ko: '애플', en: 'Apple' },
    market: 'US',
    signal: 'recover',
    headline: {
      ko: '위기 이후 거래가 조금씩 돌아오는 단계예요',
      en: 'Trading is slowly returning after the risk-off phase',
    },
    reason: {
      ko: '가격은 아직 이전 고점 아래지만 거래량이 바닥에서 조금씩 늘고 있어요. 회복을 확인하는 단계라 성급한 결론은 미뤄요.',
      en: 'Price is still below its prior high, but volume is creeping up from the bottom. This is a confirmation phase — no rushed conclusions.',
    },
    dataUsed: {
      ko: '최근 6개월 주봉, 거래량 20일 평균, 실적 추이',
      en: '6-month weekly chart, 20-day average volume, earnings trend',
    },
    asOf: '2026-11-25',
    sample: true,
  },
  {
    id: 'sig-kakao',
    crewId: 'kakao',
    ticker: '035720',
    name: { ko: '카카오', en: 'Kakao' },
    market: 'KR',
    signal: 'sell',
    headline: {
      ko: '가진 사람이라면 한 번 점검해 볼 구간이에요',
      en: 'For holders, a moment to review the position',
    },
    reason: {
      ko: '실적 부진이 이어지는 가운데 반등이 매번 짧게 끝났어요. 팔라는 뜻이 아니라, 내 보유 이유가 아직 유효한지 적어 보라는 표시예요.',
      en: 'Earnings weakness persists and each rebound ended quickly. Not a sell order — a prompt to write down whether your reason still holds.',
    },
    dataUsed: {
      ko: '최근 1년 주봉, 최근 4개 분기 실적, 반등 지속 기간',
      en: '1-year weekly chart, last 4 quarters, rebound duration',
    },
    asOf: '2026-11-25',
    sample: true,
  },
];
