/**
 * 영차 YOUNGCHA — 상태 확인용 서버리스 함수 (Vercel /api/health)
 *
 * 뼈대 단계의 역할:
 *  · 배포가 살아 있는지, 어떤 모드(샘플)로 도는지 프런트가 확인할 수 있게 합니다.
 *  · 비밀 키·개인정보는 절대 내보내지 않습니다. 환경 변수는 '설정 여부'만 불리언으로 알립니다.
 *
 * 아직 연결되지 않은 것(명시):
 *  · 실시간 시세, 종목 검색 API, 채팅 DB·인증 — 모두 미연결입니다.
 */

export const config = { runtime: 'edge' };

type HealthPayload = {
  ok: boolean;
  service: 'youngcha';
  version: string;
  mode: 'skeleton';
  features: {
    crewChat: 'sample-only';
    marketData: 'unconnected';
    stockSearch: 'local-sample';
    elevatorCalculator: 'local-working';
    accounts: 'unconnected';
    payments: 'disabled';
  };
  env: {
    marketDataKey: boolean;
    chatDatabaseUrl: boolean;
  };
  checkedAt: string;
};

export default function handler(): Response {
  // Node/Edge 런타임의 process는 타입 정의 없이도 안전하게 읽습니다.
  const env =
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

  const payload: HealthPayload = {
    ok: true,
    service: 'youngcha',
    version: '0.1.0',
    mode: 'skeleton',
    features: {
      crewChat: 'sample-only',
      marketData: 'unconnected',
      stockSearch: 'local-sample',
      elevatorCalculator: 'local-working',
      accounts: 'unconnected',
      payments: 'disabled',
    },
    env: {
      marketDataKey: Boolean(env.MARKET_DATA_API_KEY),
      chatDatabaseUrl: Boolean(env.CHAT_DATABASE_URL),
    },
    checkedAt: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
