/** 영차 YOUNGCHA — 공용 타입 (데이터·화면·API가 함께 쓰는 계약) */

export type Lang = 'ko' | 'en';

/** 화면에 보이는 문구는 항상 ko/en 두 벌을 함께 둡니다. (지침 Ⅲ-6·7) */
export type Localized = Record<Lang, string>;

export type CharacterId = 'rabbit' | 'bear' | 'hamster' | 'cat';
export type Market = 'KR' | 'US';
export type Currency = 'KRW' | 'USD';
export type Tone = 'green' | 'blue' | 'amber' | 'rose' | 'violet';

/**
 * 닉네임 옆 층 배지.
 *  · floor : 평단가 층 (예: 21층)
 *  · done  : 구조 완료 (현재가가 평단가 위)
 *  · rookie: 이제 들어온 신규 대원
 */
export type FloorBadge = { type: 'floor'; floor: number } | { type: 'done' } | { type: 'rookie' };

export interface Crew {
  id: string;
  ticker: string;
  name: Localized;
  market: Market;
  sector: Localized;
  currency: Currency;
  /** 1층에 해당하는 가격. 종목·통화마다 다릅니다. (지침 PROJECT 02) */
  floorUnit: number;
  character: CharacterId;
  tone: Tone;
  /** 실제 값이 아니라 화면 확인용 샘플 인원입니다. */
  membersSample: number;
  onlineSample: number;
  rooms: number;
  lastMessage: Localized;
  lastActivityMinutes: number;
  summary: Localized;
  aliases: string[];
  /** 이 방에서 흔히 보이는 층 배지 예시 (샘플) */
  badgeSamples: FloorBadge[];
}

export interface ChatMessage {
  id: string;
  crewId: string;
  author: string;
  character: CharacterId;
  badge: FloorBadge;
  time: string;
  text: Localized;
  kind: 'chat' | 'system';
  reactions?: { emoji: string; count: number }[];
  /** 이 기기에서만 만든 메모인지 (서버 미전송) */
  localOnly?: boolean;
}

export type SignalKey = 'buy' | 'wait' | 'sell' | 'heated' | 'crisis' | 'recover' | 'hold';

export interface CompassSignal {
  id: string;
  crewId: string;
  ticker: string;
  name: Localized;
  market: Market;
  signal: SignalKey;
  headline: Localized;
  reason: Localized;
  dataUsed: Localized;
  asOf: string;
  /** 뼈대 단계에서는 모두 샘플 분석입니다. */
  sample: true;
}

export interface EarningsEvent {
  id: string;
  date: string;
  ticker: string;
  name: Localized;
  event: Localized;
  sample: true;
}

export interface NewsBrief {
  id: string;
  topic: Localized;
  lines: Localized[];
  sample: true;
}
