import type { Crew } from '../types';

/**
 * 종목별 구조대 — 샘플 데이터
 *
 * ⚠️ 여기 숫자(대원 수·접속 수·최근 대화 시각)는 전부 화면 확인용 샘플입니다.
 *    실제 이용자 수나 실제 시세가 아닙니다. (지침 Ⅴ: 가상의 이용자 수를 실제 정보로 표시하지 않는다)
 *    실제 연결은 src/api/client.ts의 미연결 지점을 채우면서 교체합니다.
 *
 * 층 단위(floorUnit)만은 실제 종목 특성에 맞춘 '설정값'입니다.
 *  · SK하이닉스·삼성전자·NAVER·카카오: 1층 = 1,000원
 *  · 현대차: 1층 = 10,000원
 *  · 미국 종목: 1층 = 1달러
 * 배지 예시(68층·70층 등)도 이 단위와 맞춰 두었습니다.
 */
export const crews: Crew[] = [
  {
    id: 'sk-hynix',
    ticker: '000660',
    name: { ko: 'SK하이닉스', en: 'SK hynix' },
    market: 'KR',
    sector: { ko: '반도체', en: 'Semiconductors' },
    currency: 'KRW',
    floorUnit: 1000,
    character: 'bear',
    tone: 'green',
    membersSample: 1284,
    onlineSample: 96,
    rooms: 3,
    lastMessage: {
      ko: '오늘 21층까지 내려왔네요. 다들 저녁 드셨어요?',
      en: 'We slipped to the 21st floor today. Everyone had dinner?',
    },
    lastActivityMinutes: 3,
    summary: {
      ko: '고점 부근에서 들어온 대원이 많은 방이에요. 층수 이야기와 응원이 주로 오가요.',
      en: 'Many here bought near the high. Mostly floor talk and cheers.',
    },
    aliases: ['하이닉스', '하닉', 'hynix', '000660'],
    badgeSamples: [{ type: 'floor', floor: 21 }, { type: 'floor', floor: 22 }, { type: 'done' }],
  },
  {
    id: 'samsung',
    ticker: '005930',
    name: { ko: '삼성전자', en: 'Samsung Electronics' },
    market: 'KR',
    sector: { ko: '반도체·가전', en: 'Semiconductors & devices' },
    currency: 'KRW',
    floorUnit: 1000,
    character: 'rabbit',
    tone: 'blue',
    membersSample: 2417,
    onlineSample: 182,
    rooms: 5,
    lastMessage: {
      ko: '1번 방 정원 찼대요. 2번 방으로 오세요!',
      en: 'Room 1 is full — come to room 2!',
    },
    lastActivityMinutes: 6,
    summary: {
      ko: '가장 큰 구조대예요. 초보 대원 질문도 편하게 올라와요.',
      en: 'The biggest crew. Beginner questions are welcome here.',
    },
    aliases: ['삼전', '삼성', 'samsung', '005930'],
    badgeSamples: [{ type: 'floor', floor: 68 }, { type: 'floor', floor: 70 }, { type: 'done' }],
  },
  {
    id: 'tesla',
    ticker: 'TSLA',
    name: { ko: '테슬라', en: 'Tesla' },
    market: 'US',
    sector: { ko: '전기차', en: 'Electric vehicles' },
    currency: 'USD',
    floorUnit: 1,
    character: 'cat',
    tone: 'rose',
    membersSample: 986,
    onlineSample: 74,
    rooms: 2,
    lastMessage: {
      ko: '밤에 변동성 큰 날은 마음 보호 모드 켜 두세요.',
      en: 'On wild nights, turn on mind guard mode.',
    },
    lastActivityMinutes: 11,
    summary: {
      ko: '미국장 시간에 대화가 몰려요. 환율 이야기도 함께 나와요.',
      en: 'Busiest during US market hours. FX talk shows up too.',
    },
    aliases: ['테슬라', 'tsla', 'tesla'],
    badgeSamples: [{ type: 'floor', floor: 412 }, { type: 'floor', floor: 430 }, { type: 'rookie' }],
  },
  {
    id: 'nvidia',
    ticker: 'NVDA',
    name: { ko: '엔비디아', en: 'NVIDIA' },
    market: 'US',
    sector: { ko: '반도체', en: 'Semiconductors' },
    currency: 'USD',
    floorUnit: 1,
    character: 'hamster',
    tone: 'green',
    membersSample: 1733,
    onlineSample: 128,
    rooms: 4,
    lastMessage: {
      ko: '실적 발표 전에는 조용히 지켜보는 분위기네요.',
      en: 'Quiet before earnings — everyone is watching.',
    },
    lastActivityMinutes: 24,
    summary: {
      ko: '실적 시즌에 대화가 크게 늘어요. 뉴스 링크 공유가 많아요.',
      en: 'Chat spikes in earnings season. Lots of news links.',
    },
    aliases: ['엔비디아', '엔비', 'nvda', 'nvidia'],
    badgeSamples: [{ type: 'floor', floor: 178 }, { type: 'floor', floor: 195 }, { type: 'done' }],
  },
  {
    id: 'naver',
    ticker: '035420',
    name: { ko: 'NAVER', en: 'NAVER' },
    market: 'KR',
    sector: { ko: '인터넷', en: 'Internet' },
    currency: 'KRW',
    floorUnit: 1000,
    character: 'hamster',
    tone: 'green',
    membersSample: 412,
    onlineSample: 31,
    rooms: 1,
    lastMessage: {
      ko: '이번 주는 조용하네요. 다들 쉬는 중?',
      en: 'Quiet this week. Everyone resting?',
    },
    lastActivityMinutes: 48,
    summary: {
      ko: '차분한 방이에요. 배당·장기 보유 이야기가 자주 나와요.',
      en: 'A calm room. Often dividend and long-hold talk.',
    },
    aliases: ['네이버', 'naver', '035420'],
    badgeSamples: [{ type: 'floor', floor: 215 }, { type: 'rookie' }],
  },
  {
    id: 'kakao',
    ticker: '035720',
    name: { ko: '카카오', en: 'Kakao' },
    market: 'KR',
    sector: { ko: '인터넷', en: 'Internet' },
    currency: 'KRW',
    floorUnit: 1000,
    character: 'rabbit',
    tone: 'amber',
    membersSample: 538,
    onlineSample: 40,
    rooms: 2,
    lastMessage: {
      ko: '오늘도 같은 층에서 만났네요 ㅎㅎ',
      en: 'Same floor again today, haha.',
    },
    lastActivityMinutes: 61,
    summary: {
      ko: '오래 버틴 대원이 많은 방이에요. 자조 섞인 농담이 오가요.',
      en: 'Many long-time holders. Self-deprecating jokes welcome.',
    },
    aliases: ['카카오', 'kakao', '035720'],
    badgeSamples: [{ type: 'floor', floor: 48 }, { type: 'floor', floor: 55 }],
  },
  {
    id: 'apple',
    ticker: 'AAPL',
    name: { ko: '애플', en: 'Apple' },
    market: 'US',
    sector: { ko: '소비자 전자', en: 'Consumer electronics' },
    currency: 'USD',
    floorUnit: 1,
    character: 'cat',
    tone: 'blue',
    membersSample: 1205,
    onlineSample: 88,
    rooms: 3,
    lastMessage: {
      ko: '신제품 이야기는 여기 말고 뉴스 방에서 해요~',
      en: 'Product talk goes to the news room, not here~',
    },
    lastActivityMinutes: 15,
    summary: {
      ko: '장기 보유 대원이 많아요. 배당과 신제품 일정 이야기가 섞여요.',
      en: 'Lots of long-term holders. Dividends and product calendar.',
    },
    aliases: ['애플', 'apple', 'aapl'],
    badgeSamples: [{ type: 'floor', floor: 232 }, { type: 'done' }],
  },
  {
    id: 'hyundai',
    ticker: '005380',
    name: { ko: '현대차', en: 'Hyundai Motor' },
    market: 'KR',
    sector: { ko: '자동차', en: 'Automobiles' },
    currency: 'KRW',
    floorUnit: 10000,
    character: 'bear',
    tone: 'amber',
    membersSample: 366,
    onlineSample: 22,
    rooms: 1,
    lastMessage: {
      ko: '환율 때문에 밤에 못 자는 대원 손 🙋',
      en: 'Hands up if FX keeps you awake 🙋',
    },
    lastActivityMinutes: 92,
    summary: {
      ko: '한산하지만 질문이 오면 답이 금방 달려요.',
      en: 'Quiet, but questions get answered fast.',
    },
    aliases: ['현대차', '현차', 'hyundai', '005380'],
    badgeSamples: [{ type: 'floor', floor: 24 }, { type: 'rookie' }],
  },
];

export function findCrew(id: string | null): Crew | undefined {
  if (!id) return undefined;
  return crews.find((crew) => crew.id === id);
}

export function searchCrews(query: string, market: 'ALL' | 'KR' | 'US'): Crew[] {
  const normalized = query.trim().toLowerCase();
  return crews.filter((crew) => {
    if (market !== 'ALL' && crew.market !== market) return false;
    if (!normalized) return true;
    return (
      crew.aliases.some((alias) => alias.toLowerCase().includes(normalized)) ||
      crew.ticker.toLowerCase().includes(normalized) ||
      crew.name.ko.toLowerCase().includes(normalized) ||
      crew.name.en.toLowerCase().includes(normalized)
    );
  });
}
