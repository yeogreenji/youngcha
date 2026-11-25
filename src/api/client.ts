/**
 * 영차 YOUNGCHA — 서버 API 클라이언트 (뼈대)
 *
 * 지금 실제로 연결된 서버 기능은 /api/health 하나뿐입니다.
 * 시세·종목 검색·채팅은 아래에 '미연결' 표시와 함께 자리만 잡아 두었습니다.
 * 실제 연결 시:
 *  · 키는 서버(api/)에서만 읽습니다. 프런트엔드 번들에 넣지 않습니다.
 *  · 실패 시 빈 화면 대신 '미연결' 상태를 그대로 보여 줍니다.
 */

export interface HealthResponse {
  ok: boolean;
  service: 'youngcha';
  version: string;
  mode: 'skeleton';
  features: Record<string, string>;
  checkedAt: string;
}

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse | null> {
  try {
    const response = await fetch('/api/health', { signal, headers: { accept: 'application/json' } });
    if (!response.ok) return null;
    return (await response.json()) as HealthResponse;
  } catch {
    return null;
  }
}

/** 실시간 시세 — 미연결 (MARKET_DATA_API_KEY 필요, 사용자 승인 전) */
export const marketData = {
  status: 'unconnected' as const,
};

/** 종목 검색 — 지금은 src/data/crews.ts의 샘플 목록에서만 찾습니다. */
export const stockSearch = {
  status: 'local-sample' as const,
};

/** 채팅 저장 — 미연결 (DB·인증 없이는 실제 다중 사용자 채팅이 아닙니다) */
export const crewChat = {
  status: 'sample-only' as const,
};
