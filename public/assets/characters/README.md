# 자체 동물 대원 캐릭터 자산 (뼈대 자리)

영차의 구조대 캐릭터 4종입니다. **모두 이 프로젝트에서 직접 그린 SVG**이며,
기존 게임·브랜드 캐릭터를 복제하지 않았습니다. (지침 Ⅲ-9)

| 파일 | 캐릭터 | 역할 |
| --- | --- | --- |
| `rabbit-crew.svg` | 토끼대원 | 처음 온 대원을 안내하는 리더 |
| `bear-crew.svg` | 곰대원 | 오래 버틴 대원. 느긋한 응원 담당 |
| `hamster-crew.svg` | 햄찌대원 | 숫자와 계산을 챙기는 대원 |
| `cat-crew.svg` | 냥이대원 | 관제·상담(헤드셋) 담당 |

- 원본 크기: `160 × 160` viewBox, 배경 원 포함
- 화면에서는 18~44px 원형으로 쓰입니다. 작은 크기에서도 읽히도록 얼굴을 크게, 디테일은 최소로.
- 교체 시 **파일 이름과 경로를 그대로** 두면 코드 수정 없이 반영됩니다.
  경로: `public/assets/characters/{rabbit|bear|hamster|cat}-crew.svg`
  연결 코드: `src/components/ui/CharacterAvatar.tsx`
- 색은 `src/styles/tokens.css`의 토큰과 맞춰 주세요(주색 `--yc-primary`, 강조 `--yc-accent`).
- 최종 일러스트는 240×240 이상 PNG/WebP로 받아도 되지만, 파일 이름 규칙은 유지합니다.
  (교체 시 이 README의 표와 제작자·라이선스 표기를 함께 갱신해 주세요.)
