import type { CharacterId } from '../../types';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import type { DictKey } from '../../i18n/ko';

const fileByCharacter: Record<CharacterId, string> = {
  rabbit: 'rabbit-crew.svg',
  bear: 'bear-crew.svg',
  hamster: 'hamster-crew.svg',
  cat: 'cat-crew.svg',
};

const nameKey: Record<CharacterId, DictKey> = {
  rabbit: 'char.rabbit',
  bear: 'char.bear',
  hamster: 'char.hamster',
  cat: 'char.cat',
};

/**
 * 자체 동물 대원 캐릭터.
 * 지금은 public/assets/characters/ 의 자체 제작 SVG를 씁니다.
 * 로렌이 최종 일러스트로 바꿀 때도 파일 이름(rabbit-crew.svg 등)만 유지하면 됩니다.
 */
export function CharacterAvatar({
  character,
  size = 36,
  className,
  decorative = true,
}: {
  character: CharacterId;
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  const { t } = useI18n();
  return (
    <img
      src={`/assets/characters/${fileByCharacter[character]}`}
      width={size}
      height={size}
      alt={decorative ? '' : t(nameKey[character])}
      aria-hidden={decorative ? true : undefined}
      className={cn('shrink-0 rounded-pill bg-surface-2 object-contain ring-1 ring-line', className)}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}
