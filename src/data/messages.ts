import type { ChatMessage } from '../types';

/**
 * 구조대 채팅 — 샘플 대화 (실제 이용자 대화 아님)
 * ⚠️ 실제 DB·인증이 붙기 전까지 이 배열만 화면에 그립니다. (지침 Ⅴ)
 *    닉네임은 모두 가상이며, 매매 권유·수익 보장 문구는 넣지 않습니다.
 */
export const chatMessages: ChatMessage[] = [
  // ── SK하이닉스 ─────────────────────────────────────────────────────────
  {
    id: 'hx-1',
    crewId: 'sk-hynix',
    author: '21층곰돌',
    character: 'bear',
    badge: { type: 'floor', floor: 21 },
    time: '20:58',
    kind: 'system',
    text: { ko: '3번 방이 새로 열렸어요. 자리가 비어 있습니다.', en: 'Room 3 just opened. Seats available.' },
  },
  {
    id: 'hx-2',
    crewId: 'sk-hynix',
    author: '21층곰돌',
    character: 'bear',
    badge: { type: 'floor', floor: 21 },
    time: '21:02',
    kind: 'chat',
    text: {
      ko: '오늘 21층까지 내려왔네요. 다들 저녁은 드셨어요?',
      en: 'Down to the 21st floor today. Everyone had dinner?',
    },
    reactions: [{ emoji: '🙌', count: 12 }],
  },
  {
    id: 'hx-3',
    crewId: 'sk-hynix',
    author: '버티는토끼',
    character: 'rabbit',
    badge: { type: 'floor', floor: 22 },
    time: '21:03',
    kind: 'chat',
    text: {
      ko: '저는 22층인데 오늘은 그냥 라면 먹고 잤어요. 층수는 내일 다시 보려고요.',
      en: "I'm on 22. Instant noodles and sleep tonight — floors can wait until tomorrow.",
    },
  },
  {
    id: 'hx-4',
    crewId: 'sk-hynix',
    author: '구조완료냥',
    character: 'cat',
    badge: { type: 'done' },
    time: '21:04',
    kind: 'chat',
    text: {
      ko: '작년에 여기서 같이 버틴 대원들 덕분에 버텼어요. 오늘 들어온 분들도 같이 가요.',
      en: 'The crew here got me through last year. New folks, let’s walk together too.',
    },
    reactions: [
      { emoji: '🫶', count: 24 },
      { emoji: '☕', count: 5 },
    ],
  },
  {
    id: 'hx-5',
    crewId: 'sk-hynix',
    author: '햄찌신입',
    character: 'hamster',
    badge: { type: 'rookie' },
    time: '21:06',
    kind: 'chat',
    text: {
      ko: '처음 들어왔는데 층수가 무슨 뜻이에요? 평단가를 층으로 부르는 건가요?',
      en: "I'm new — what does the floor mean? Is it the average price?",
    },
  },
  {
    id: 'hx-6',
    crewId: 'sk-hynix',
    author: '21층곰돌',
    character: 'bear',
    badge: { type: 'floor', floor: 21 },
    time: '21:07',
    kind: 'chat',
    text: {
      ko: '네, 이 방은 1층이 1,000원이에요. 평단가 21,000원이면 21층이에요. 공개는 안 해도 돼요!',
      en: 'Yes — here one floor is 1,000 won. A 21,000 won average is the 21st floor. You never have to share it!',
    },
  },
  {
    id: 'hx-7',
    crewId: 'sk-hynix',
    author: '저녁먹고온곰',
    character: 'bear',
    badge: { type: 'floor', floor: 23 },
    time: '21:09',
    kind: 'chat',
    text: {
      ko: '저는 층수만 말하고 평단가는 안 써요. 그게 편해요.',
      en: 'I only say the floor, never the price. Feels easier.',
    },
  },
  {
    id: 'hx-8',
    crewId: 'sk-hynix',
    author: '느긋한냥',
    character: 'cat',
    badge: { type: 'floor', floor: 22 },
    time: '21:11',
    kind: 'chat',
    text: {
      ko: '오늘은 여기까지. 다들 내일도 무사히 22층에서 봐요.',
      en: 'Calling it a night. See you on 22 tomorrow, safely.',
    },
    reactions: [{ emoji: '🌙', count: 9 }],
  },

  // ── 삼성전자 ───────────────────────────────────────────────────────────
  {
    id: 'ss-1',
    crewId: 'samsung',
    author: '1번방지기',
    character: 'rabbit',
    badge: { type: 'floor', floor: 68 },
    time: '20:41',
    kind: 'system',
    text: { ko: '1번 방 정원(20명)이 찼어요. 2번 방으로 이동해 주세요.', en: 'Room 1 is full (20). Please move to room 2.' },
  },
  {
    id: 'ss-2',
    crewId: 'samsung',
    author: '1번방지기',
    character: 'rabbit',
    badge: { type: 'floor', floor: 68 },
    time: '20:42',
    kind: 'chat',
    text: {
      ko: '1번 방 정원 찼대요. 2번 방으로 오세요!',
      en: 'Room 1 is full — come to room 2!',
    },
  },
  {
    id: 'ss-3',
    crewId: 'samsung',
    author: '차분한곰',
    character: 'bear',
    badge: { type: 'floor', floor: 70 },
    time: '20:44',
    kind: 'chat',
    text: {
      ko: '이 방은 초보 질문 환영이에요. 용어 물어봐도 아무도 안 웃어요.',
      en: 'Beginner questions welcome here. Nobody laughs at a term question.',
    },
    reactions: [{ emoji: '🫶', count: 31 }],
  },
  {
    id: 'ss-4',
    crewId: 'samsung',
    author: '햄찌공부중',
    character: 'hamster',
    badge: { type: 'rookie' },
    time: '20:47',
    kind: 'chat',
    text: {
      ko: '나침반 탭에 있는 배지들 뜻이 헷갈려요. ‘기다려’는 사지 말라는 건가요?',
      en: "I'm confused by the compass badges. Does 'wait' mean don't buy?",
    },
  },
  {
    id: 'ss-5',
    crewId: 'samsung',
    author: '차분한곰',
    character: 'bear',
    badge: { type: 'floor', floor: 70 },
    time: '20:49',
    kind: 'chat',
    text: {
      ko: '그건 ‘조건이 아직 안 맞는다’는 뜻이에요. 사라는 말도, 팔라는 말도 아니에요.',
      en: "It means the conditions aren't met yet — neither a buy nor a sell call.",
    },
  },
  {
    id: 'ss-6',
    crewId: 'samsung',
    author: '구조완료토끼',
    character: 'rabbit',
    badge: { type: 'done' },
    time: '20:53',
    kind: 'chat',
    text: {
      ko: '저는 68층에서 3년 있었어요. 기록해 두면 나중에 웃으면서 볼 날이 와요.',
      en: 'I sat on the 68th floor for three years. One day you’ll laugh reading this.',
    },
    reactions: [{ emoji: '📝', count: 7 }],
  },

  // ── 테슬라 ─────────────────────────────────────────────────────────────
  {
    id: 'ts-1',
    crewId: 'tesla',
    author: '밤샘냥',
    character: 'cat',
    badge: { type: 'floor', floor: 412 },
    time: '23:12',
    kind: 'chat',
    text: {
      ko: '미국장 열렸어요. 오늘은 변동성 큰 날이라 마음 보호 모드 켜 두세요.',
      en: 'US market open. Wild day — turn on mind guard mode.',
    },
    reactions: [{ emoji: '🛡️', count: 18 }],
  },
  {
    id: 'ts-2',
    crewId: 'tesla',
    author: '환율에우는곰',
    character: 'bear',
    badge: { type: 'floor', floor: 430 },
    time: '23:14',
    kind: 'chat',
    text: {
      ko: '환율까지 같이 움직이니 층수 보기가 더 어렵네요.',
      en: 'FX moves too, so reading the floor gets harder.',
    },
  },
  {
    id: 'ts-3',
    crewId: 'tesla',
    author: '햄찌첫날',
    character: 'hamster',
    badge: { type: 'rookie' },
    time: '23:16',
    kind: 'chat',
    text: {
      ko: '평단가 엘리베이터 계산기 써 봤는데 몇 층 남았는지 바로 나와서 좋네요.',
      en: 'Tried the elevator calculator — nice to see how many floors remain.',
    },
  },
  {
    id: 'ts-4',
    crewId: 'tesla',
    author: '밤샘냥',
    character: 'cat',
    badge: { type: 'floor', floor: 412 },
    time: '23:18',
    kind: 'chat',
    text: {
      ko: '계산기는 참고만 하고, 오늘 결정은 내일 아침에 하기로 해요.',
      en: "Use the calculator as reference — decide tomorrow morning.",
    },
  },

  // ── 엔비디아 ───────────────────────────────────────────────────────────
  {
    id: 'nv-1',
    crewId: 'nvidia',
    author: '실적기다리는햄',
    character: 'hamster',
    badge: { type: 'floor', floor: 178 },
    time: '22:05',
    kind: 'chat',
    text: {
      ko: '실적 발표 전에는 조용히 지켜보는 분위기네요.',
      en: 'Quiet before earnings — everyone is watching.',
    },
  },
  {
    id: 'nv-2',
    crewId: 'nvidia',
    author: '구조완료곰',
    character: 'bear',
    badge: { type: 'done' },
    time: '22:08',
    kind: 'chat',
    text: {
      ko: '발표 전에는 뉴스만 모아 두고 판단은 미루는 게 편해요.',
      en: 'Before the release, I just collect news and postpone judging.',
    },
  },
  {
    id: 'nv-3',
    crewId: 'nvidia',
    author: '차트보는냥',
    character: 'cat',
    badge: { type: 'floor', floor: 195 },
    time: '22:10',
    kind: 'chat',
    text: {
      ko: '나침반에 올라온 신호도 ‘판단 보류’라서 저는 그냥 구경만 해요.',
      en: "The compass signal says 'hold', so I'm just watching.",
    },
  },

  // ── NAVER ──────────────────────────────────────────────────────────────
  {
    id: 'nv-4',
    crewId: 'naver',
    author: '배당햄찌',
    character: 'hamster',
    badge: { type: 'floor', floor: 215 },
    time: '19:32',
    kind: 'chat',
    text: {
      ko: '이번 주는 조용하네요. 다들 쉬는 중?',
      en: 'Quiet this week. Everyone resting?',
    },
  },
  {
    id: 'nv-5',
    crewId: 'naver',
    author: '천천히토끼',
    character: 'rabbit',
    badge: { type: 'floor', floor: 222 },
    time: '19:40',
    kind: 'chat',
    text: {
      ko: '저는 5년째 그냥 두고 있어요. 층수는 잊고 살아요.',
      en: 'Five years holding. I just forget the floor.',
    },
  },

  // ── 카카오 ─────────────────────────────────────────────────────────────
  {
    id: 'kk-1',
    crewId: 'kakao',
    author: '48층토끼',
    character: 'rabbit',
    badge: { type: 'floor', floor: 48 },
    time: '20:12',
    kind: 'chat',
    text: {
      ko: '오늘도 같은 층에서 만났네요 ㅎㅎ',
      en: 'Same floor again today, haha.',
    },
  },
  {
    id: 'kk-2',
    crewId: 'kakao',
    author: '55층곰',
    character: 'bear',
    badge: { type: 'floor', floor: 55 },
    time: '20:15',
    kind: 'chat',
    text: {
      ko: '층수 바뀌는 날은 다 같이 조용해지는 게 웃겨요.',
      en: "Funny how we all go quiet when the floor changes.",
    },
    reactions: [{ emoji: '😂', count: 14 }],
  },

  // ── 애플 ───────────────────────────────────────────────────────────────
  {
    id: 'ap-1',
    crewId: 'apple',
    author: '장기보유냥',
    character: 'cat',
    badge: { type: 'done' },
    time: '21:40',
    kind: 'chat',
    text: {
      ko: '신제품 이야기는 여기 말고 뉴스 방에서 해요~',
      en: 'Product talk goes to the news room, not here~',
    },
  },
  {
    id: 'ap-2',
    crewId: 'apple',
    author: '232층햄',
    character: 'hamster',
    badge: { type: 'floor', floor: 232 },
    time: '21:44',
    kind: 'chat',
    text: {
      ko: '이 방은 조용해서 좋아요. 하루 한 번 인사만 해요.',
      en: 'I like how quiet it is. One hello a day.',
    },
  },

  // ── 현대차 ─────────────────────────────────────────────────────────────
  {
    id: 'hd-1',
    crewId: 'hyundai',
    author: '환율곰',
    character: 'bear',
    badge: { type: 'floor', floor: 24 },
    time: '18:20',
    kind: 'chat',
    text: {
      ko: '환율 때문에 밤에 못 자는 대원 손 🙋',
      en: 'Hands up if FX keeps you awake 🙋',
    },
    reactions: [{ emoji: '🙋', count: 6 }],
  },
  {
    id: 'hd-2',
    crewId: 'hyundai',
    author: '첫차토끼',
    character: 'rabbit',
    badge: { type: 'rookie' },
    time: '18:31',
    kind: 'chat',
    text: {
      ko: '여기 1층이 10,000원이면 24층은 240,000원이네요. 이제 이해했어요.',
      en: 'If one floor is 10,000 won here, 24 is 240,000. Got it now.',
    },
  },
];

export function messagesFor(crewId: string): ChatMessage[] {
  return chatMessages.filter((message) => message.crewId === crewId);
}
