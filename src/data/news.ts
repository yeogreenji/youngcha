import type { NewsBrief } from '../types';

/**
 * 오늘의 쉬운 세 줄 뉴스 — 샘플
 * ⚠️ 실제 기사 요약이 아닙니다. 뉴스 수집·요약을 붙이기 전까지는 예시 문장만 보여 줍니다.
 *    실제 연결 시 출처·발행 시각·원문 링크를 함께 표시합니다.
 */
export const newsBriefs: NewsBrief[] = [
  {
    id: 'news-1',
    topic: { ko: '반도체', en: 'Semiconductors' },
    lines: [
      { ko: '메모리 가격이 천천히 오르고 있다는 이야기가 나와요.', en: 'Talk that memory prices are rising slowly.' },
      { ko: '다만 실제 이익으로 이어지는지는 다음 실적에서 확인해야 해요.', en: 'Whether it reaches profit still needs the next earnings.' },
      { ko: '가격이 먼저 오른 종목은 변동이 커질 수 있어요.', en: 'Stocks that moved first can swing harder.' },
    ],
    sample: true,
  },
  {
    id: 'news-2',
    topic: { ko: '환율', en: 'Exchange rate' },
    lines: [
      { ko: '원·달러 환율이 흔들리면 미국 종목의 원화 평가액도 같이 흔들려요.', en: 'When KRW/USD moves, the won value of US stocks moves too.' },
      { ko: '달러로 산 종목은 수익률과 환율을 따로 봐야 해요.', en: 'For dollar buys, look at return and FX separately.' },
      { ko: '환율만 보고 오늘 사고팔 결정을 내리지는 마세요.', en: 'Do not decide today’s trade on FX alone.' },
    ],
    sample: true,
  },
  {
    id: 'news-3',
    topic: { ko: '금리', en: 'Interest rates' },
    lines: [
      { ko: '금리가 높게 유지되면 빚이 많은 기업이 더 불리해요.', en: 'High rates weigh more on companies with heavy debt.' },
      { ko: '발표 직후에는 좋은 뉴스도 다르게 해석될 수 있어요.', en: 'Right after a release, even good news can be read either way.' },
      { ko: '발표일에는 미리 정한 기준만 보고 판단해 보세요.', en: 'On release days, judge only by criteria you set in advance.' },
    ],
    sample: true,
  },
];
