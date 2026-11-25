# 디자인·에셋 가이드 (로렌·브리용)

이 문서는 **무엇을 어디서 바꾸면 되는지**만 담습니다. 구조를 바꾸지 않고 영차의 얼굴을 입히는 것이 목적입니다.

---

## 1. 30초 요약

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 색·글꼴·모서리·그림자 | `src/styles/tokens.css` |
| 동물 대원 그림 | `public/assets/characters/{rabbit,bear,hamster,cat}-crew.svg` |
| 화면 배치·새 컴포넌트 | `src/components/**` |
| 종목·대화·신호·뉴스 데이터 | `src/data/**` |
| UI 문구(한/영) | `src/i18n/ko.ts` + `en.ts` |
| 계산 규칙 | `src/lib/elevator.ts` |

화면 코드에는 색상 코드를 직접 쓰지 않았습니다. Tailwind 유틸(`bg-primary`, `text-ink-soft`, `border-line`)이 모두 토큰을 참조합니다.

---

## 2. 디자인 토큰

`src/styles/tokens.css`의 `:root`에서 `--yc-*` 값만 바꾸면 `@theme inline`을 통해 전체 유틸에 반영됩니다.

### 색 역할

| 토큰 | 지금 값 | 쓰임 |
| --- | --- | --- |
| `--yc-primary` | `#0f4d42` | 구조대 초록. 주요 버튼·활성 탭·층 배지 |
| `--yc-primary-soft` | `#e2efe9` | 선택 상태 배경, 안내 박스 |
| `--yc-accent` | `#ffc73f` | 영차 구호 노랑. 샘플 배지·응원 게이지 |
| `--yc-accent-ink` | `#7a5a00` | 노란 배경 위 글자(대비 확보) |
| `--yc-paper` | `#f6f2e9` | 앱 바탕(따뜻한 종이) |
| `--yc-surface` | `#ffffff` | 카드·채팅 말풍선 |
| `--yc-ink` | `#16201d` | 본문 글자 |
| `--yc-line` | `#e3ddd0` | 구분선·테두리 |
| `--yc-signal-*` | 7종 | 나침반 신호 배지(매수 검토·기다려·매도 검토·과열 주의·위기·회복 관찰·판단 보류) |

### 규칙

1. **신호 색은 의미와 함께 씁니다.** 색만으로 구분하지 않도록 배지에 항상 글자가 있습니다.
2. **빨강은 '위험·과열', 초록은 '안전'이 아니라 '검토 구간'** 입니다. 매수=초록으로 읽히지 않게 `--yc-signal-buy`는 청록(#0e7490)입니다.
3. 새 색이 필요하면 `tokens.css`에 `--yc-...`를 추가하고 `@theme inline`에 `--color-...`를 연결합니다.

### 글꼴

```css
--yc-font-sans: 'Pretendard', ..., 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif;
```

- 지금은 기기 기본 한글 글꼴을 씁니다(웹폰트 다운로드 없음 = 무료·오프라인).
- Pretendard를 쓰려면 앞에 이름만 추가하고, 실제 파일을 `public/fonts/`에 두고 `@font-face`를 `index.css`에 넣으면 됩니다.

---

## 3. 캐릭터 자산

- 경로: `public/assets/characters/`
- 파일명 규칙: `{rabbit|bear|hamster|cat}-crew.svg` — **이름을 바꾸면 코드도 바꿔야 합니다.**
- 연결 코드: `src/components/ui/CharacterAvatar.tsx` (18~44px 원형)
- 원본 160×160 viewBox, 배경 원 포함. 240×240 이상으로 교체해도 됩니다.
- 작은 크기(18px)에서도 얼굴이 읽혀야 합니다. 눈·입은 단순한 선, 디테일은 최소.
- 새 표정·이모티콘을 추가하려면 `CharacterAvatar` 확장 대신 별도 파일을 두고 `data-*`로 매핑하는 방식을 권합니다(백로그 FU-04).

### 하지 말 것

- 기존 게임·브랜드 캐릭터를 닮게 그리지 않습니다(지침 Ⅲ-9). 모자·헬멧·색 조합도 특정 캐릭터를 연상시키지 않게.
- 실존 인물 얼굴·실명을 캐릭터에 쓰지 않습니다.
- 캐릭터에 회사 로고를 넣지 않습니다(협찬은 별도 표기 정책).

---

## 4. 문구(카피)

### UI 문구

`src/i18n/ko.ts`와 `en.ts`에 **같은 키**를 추가합니다. `en.ts`는 `Dict` 타입이라 키가 빠지면 빌드가 실패합니다(의도된 장치).

```ts
// ko.ts
'cheer.button': '영차영차!',
// en.ts
'cheer.button': 'Heave-ho!',
```

변수는 `{n}` 형태로 넣고 `t('키', { n: 3 })`로 호출합니다.

### 데이터 문구

종목명·대화·신호처럼 **데이터에 붙는 문구**는 `src/data/*`의 `{ ko, en }` 필드에 함께 적습니다.

### 톤

- 초보자에게 말하듯 쉽게. 숫자·약어는 풀어서 한 번 설명.
- 매매를 지시하는 말("사세요", "팔지 마세요") 금지.
- 자책을 부추기는 말("왜 이때 샀어요") 금지. 마음 보호 모드의 문구 톤 기준입니다.
- 겁주기·수익 보장·"무조건" 금지.

---

## 5. 데이터 추가하기 (예: 새 종목)

`src/data/crews.ts`에 항목을 추가하고, `src/data/messages.ts`에 대화를 넣으면 목록·검색·채팅·나침반 관심 종목에 자동 반영됩니다.

```ts
{
  id: 'lg-energy',
  ticker: '373220',
  name: { ko: 'LG에너지솔루션', en: 'LG Energy Solution' },
  market: 'KR',
  sector: { ko: '배터리', en: 'Batteries' },
  currency: 'KRW',
  floorUnit: 1000,
  character: 'hamster',
  tone: 'green',
  membersSample: 0,          // 샘플임을 기억: 실제 인원이 아닙니다
  onlineSample: 0,
  rooms: 1,
  lastMessage: { ko: '…', en: '…' },
  lastActivityMinutes: 0,
  summary: { ko: '…', en: '…' },
  aliases: ['엘지엔솔', 'lg에너지'],
  badgeSamples: [{ type: 'floor', floor: 400 }],
}
```

주의: `membersSample`·`onlineSample`은 화면에서 "샘플 데이터" 배지와 함께 표시됩니다. 실제 값처럼 보이는 숫자를 넣지 마세요.

---

## 6. 검증

작업 후:

```bash
npm run build     # 타입(앱+API) + 빌드
npm run verify    # Playwright 21개 + 스크린샷 갱신
```

`verify.py`는 데스크톱(1440×900)·모바일(390×844) 렌더, 탭 전환, 계산기 계산값, 마음 보호 모드를 확인합니다.
디자인을 크게 바꿨다면 `data-testid`를 유지해 주세요(검증이 그걸로 요소를 찾습니다).

---

## 7. 참고: 화면 구조 한눈에

```
App
├─ AppHeader (로고 · 탭 · 마음 보호 · KO/EN)
├─ SampleNotice (샘플 모드 안내, 접기 가능)
├─ RescueScreen
│  ├─ CrewSearch + 필터
│  ├─ CrewCard[] (아바타 · 이름 · 최근 대화 · 인원 · 층 배지)
│  └─ ChatRoom
│     ├─ 방 헤더(방 번호 · 샘플 안내 · 마음 보호 배너)
│     ├─ 메시지 목록(말풍선 · 층 배지 · reactions · 내 메모)
│     ├─ 입력창(기기 저장)
│     └─ ToolsPanel (응원 / 계산기 / 뉴스)
├─ CompassScreen (시장 · 신호 카드 · 배지 읽는 법 · 관심 · 보유 · 일정 · 준비 중)
├─ Footer (고지 · API 상태 · 버전)
└─ TabBar (모바일)
```
