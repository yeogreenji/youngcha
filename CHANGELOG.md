# 변경 기록 (CHANGELOG)

형식: `[버전] 날짜 — 요약` / Added · Changed · Fixed · Known

---

## [0.1.0] 2026-11-26 — 뼈대 구축 (담당: 피클)

**만든 것**
- 저장소 구조: `projects/youngcha` (Vite 7 + React 19 + TypeScript 5.9 + Tailwind CSS v4 + lucide-react)
- 빌드/배포 설정: `vite.config.ts`(dev 5184 / preview 4184), `vercel.json`, `tsconfig.api.json`
- 디자인 토큰 분리: `src/styles/tokens.css` (색·글꼴·모서리·그림자 단일 변경 지점)
- 다국어 구조: `src/i18n/ko.ts`(기본) · `en.ts` · `index.tsx`(`useI18n`, `{변수}` 치환, 타입으로 키 누락 방지)
- 샘플 데이터: `src/data/crews.ts`(8종목·층 단위), `messages.ts`(대화 29개), `signals.ts`(신호 7건), `earnings.ts`, `news.ts`
- 자체 동물 대원 캐릭터 SVG 4종: 토끼·곰·햄찌·냥이 (`public/assets/characters/`), 교체 안내 README
- 화면: `AppHeader`(데스크톱 탭·마음 보호·언어), 모바일 `TabBar`, `SampleNotice`
- 구조대 탭: 검색·시장 필터·관심(별)·최근 대화·층 배지·데스크톱 2단/모바일 1단 채팅
- 채팅방: 샘플 대화 안내, 방 번호, 기기 저장 메모 전송, reactions 표시
- 도구: 영차영차 응원(횟수·게이지·헬기 연출·구조 요청·출석), **평단가 엘리베이터 계산기(실계산)**, 세 줄 뉴스
- 주식 나침반: 시장 자리(값 없음·미연결), 신호 7종 카드(이유·사용 데이터·기준일), 배지 읽는 법, 관심 종목, 보유 자리, 실적 일정, 준비 중 목록
- 마음 보호 모드: 층 배지·계산 결과 가림, localStorage 유지
- 서버리스: `api/health.ts`(모드·기능 플래그·환경변수 설정 여부만), `src/api/client.ts`
- 검증: `scripts/verify.py` — Playwright 21개(데스크톱/모바일·검색·필터·채팅·계산기·마음보호·탭·영어 전환·콘솔 오류)
- 문서: README · PROJECT_SPEC · ROADMAP · BACKLOG · TEST_REPORT · `.env.example` · `docs/ASSET_GUIDE.md`
- 스크린샷 7장: `docs/screenshots/`

**바꾼 것(뼈대 안에서 정리한 값)**
- 층 단위: SK하이닉스·삼성전자·NAVER·카카오 1층=1,000원, 현대차 1층=10,000원, 미국 종목 1층=1달러 — 배지 예시와 일치하도록 통일
- 계산기 보유 수량 단위를 `주`로 표시(금액 단위와 구분)

**의도적으로 하지 않은 것**
- 계정·로그인, 실시간 채팅 DB, 실시세·차트, 결제·광고, 원격 푸시, 배포

**Known**
- preview 서버에는 서버리스 함수가 없어 `/api/health`가 404입니다(배포 시 정상). 검증은 이 404만 예외 처리합니다.
- 샘플 대화·인원·신호는 모두 예시이며 실제 정보가 아닙니다.
- 응원·메모·관심은 이 기기에만 저장됩니다(계정 없음).

---

## 다음에 기록할 것

- 0.2.0: 로렌 디자인·캐릭터 교체, 토큰 확정
- 0.3.0: 실제 종목 검색·시세 연결
- 0.4.0: 계정·실시간 채팅(공개 전 필수 안전 기능 포함)


## [개발 브랜치 / 미출시] 2026-11-28 — 로렌 콘텐츠 보강
- Added: 가정 매수 계산기, 공식 공시 링크, 3분 주식학교 3개 콘텐츠, ko/en 번역.
- Fixed: 잘못된 숫자 입력 결과 숨김, 모호한 입력 거절, 빈 수량 1주 가정 고지.
- Changed: 경쟁 서비스 조사 및 신규 콘텐츠 후보 BACKLOG 정리.
- Known: 빌드·브라우저 회귀 테스트 미실행, 실제 계정/시세/채팅 미연결. main 및 운영 배포 변경 없음. 추가 비용 없음.
