import type { EarningsEvent } from '../types';

/**
 * 실적·경제 일정 — 샘플
 * ⚠️ 실제 공시·발표 일정이 아닙니다. 연결 후 공식 출처(거래소 공시, 기업 IR)로 교체합니다.
 */
export const earningsEvents: EarningsEvent[] = [
  {
    id: 'ev-1',
    date: '2026-12-02',
    ticker: 'MACRO',
    name: { ko: '시장 전체', en: 'Whole market' },
    event: { ko: '미국 고용 보고서 발표 (예시 일정)', en: 'US jobs report (sample date)' },
    sample: true,
  },
  {
    id: 'ev-2',
    date: '2026-12-09',
    ticker: 'MACRO',
    name: { ko: '시장 전체', en: 'Whole market' },
    event: { ko: '미국 기준금리 결정 (예시 일정)', en: 'US rate decision (sample date)' },
    sample: true,
  },
  {
    id: 'ev-3',
    date: '2026-12-15',
    ticker: '005930',
    name: { ko: '삼성전자', en: 'Samsung Electronics' },
    event: { ko: '분기 실적 발표 예정 (예시)', en: 'Quarterly earnings (sample)' },
    sample: true,
  },
  {
    id: 'ev-4',
    date: '2027-01-06',
    ticker: 'NVDA',
    name: { ko: '엔비디아', en: 'NVIDIA' },
    event: { ko: 'CES 기간 주요 발표 (예시)', en: 'CES announcements (sample)' },
    sample: true,
  },
  {
    id: 'ev-5',
    date: '2027-01-27',
    ticker: '000660',
    name: { ko: 'SK하이닉스', en: 'SK hynix' },
    event: { ko: '분기 실적 발표 예정 (예시)', en: 'Quarterly earnings (sample)' },
    sample: true,
  },
];
