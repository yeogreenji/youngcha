"""영차 YOUNGCHA 뼈대 검증 — 빌드 결과(dist)를 실제 브라우저로 열어 확인합니다.

확인 항목
  1) 데스크톱(1440×900) 기본 렌더링 · 구조대 목록 8개
  2) 종목 검색 · 시장 필터
  3) 구조대 입장 · 샘플 대화 안내 · 메모 전송(이 기기 저장)
  4) 평단가 엘리베이터 계산기 실계산(층·수익률)
  5) 마음 보호 모드(계산 결과 가림)
  6) 탭 전환(주식 나침반) · 배지 표시
  7) 한국어/영어 전환
  8) 모바일(390×844) 렌더링 · 탭바 · 구조대 입장
  9) 콘솔 오류 없음

실행:  npm run verify   (먼저 npm run build)
스크린샷: docs/screenshots/
"""

import os
import socket
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "screenshots"
PORT = 4184
BASE = f"http://127.0.0.1:{PORT}"

os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/workspace/.cache/ms-playwright")
_lib_dirs = [
    path
    for path in ("/workspace/tmp/pwlibs/usr/lib/x86_64-linux-gnu", "/workspace/.libs/usr/lib/x86_64-linux-gnu")
    if os.path.isdir(path)
]
os.environ["LD_LIBRARY_PATH"] = ":".join(_lib_dirs + ([os.environ["LD_LIBRARY_PATH"]] if os.environ.get("LD_LIBRARY_PATH") else []))

NODE_BIN = "/workspace/.local/node/bin"
os.environ["PATH"] = f"{NODE_BIN}:{os.environ.get('PATH', '')}"

from playwright.sync_api import sync_playwright  # noqa: E402

results: list[tuple[str, bool, str]] = []


def check(name: str, condition: bool, detail: str = "") -> None:
    results.append((name, bool(condition), detail))
    mark = "PASS" if condition else "FAIL"
    print(f"[{mark}] {name}" + (f" — {detail}" if detail else ""))


def port_open(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.4)
        return sock.connect_ex(("127.0.0.1", port)) == 0


def start_preview() -> subprocess.Popen:
    if port_open(PORT):
        raise SystemExit(f"port {PORT} already in use")
    proc = subprocess.Popen(
        ["npm", "run", "preview", "--", "--port", str(PORT), "--strictPort"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        env=os.environ.copy(),
    )
    for _ in range(80):
        if port_open(PORT):
            return proc
        time.sleep(0.25)
    proc.terminate()
    raise SystemExit("preview server did not start")


def main() -> int:
    if not (ROOT / "dist" / "index.html").exists():
        raise SystemExit("dist 없음 — 먼저 npm run build")

    OUT.mkdir(parents=True, exist_ok=True)
    server = start_preview()
    console_errors: list[str] = []

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()

            # ── 데스크톱 ──────────────────────────────────────────────────
            desktop = browser.new_context(viewport={"width": 1440, "height": 900}, locale="ko-KR")
            page = desktop.new_page()
            page.on("console", lambda msg: console_errors.append(f"{msg.text} @ {msg.location.get('url', '')}") if msg.type == "error" else None)
            page.on("pageerror", lambda err: console_errors.append(str(err)))

            page.goto(BASE, wait_until="networkidle")
            page.get_by_role("heading", name="종목별 구조대", exact=True).wait_for(timeout=8000)

            check("데스크톱 기본 렌더링", page.title().startswith("영차"), page.title())
            check("샘플 안내 노출", page.get_by_text("지금은 기획 확인용 샘플 화면이에요").is_visible())
            cards = page.locator("article [data-testid^='crew-']").count()
            check("구조대 목록 8개", cards == 8, f"{cards}개")
            page.screenshot(path=str(OUT / "01-rescue-desktop.png"), full_page=False)

            # 검색
            page.fill("[data-testid='crew-search']", "테슬라")
            page.wait_for_timeout(300)
            check("종목 검색(테슬라)", page.locator("article [data-testid^='crew-']").count() == 1)
            page.fill("[data-testid='crew-search']", "")
            page.wait_for_timeout(200)

            # 시장 필터
            page.click("[data-testid='filter-us']")
            page.wait_for_timeout(250)
            us_count = page.locator("article [data-testid^='crew-']").count()
            check("미국 필터 3개", us_count == 3, f"{us_count}개")
            page.click("[data-testid='filter-all']")
            page.wait_for_timeout(250)

            # 구조대 입장
            page.click("[data-testid='crew-samsung']")
            page.get_by_text("샘플 대화 · 실제 DB 미연결").first.wait_for(timeout=5000)
            check("구조대 입장·샘플 대화 안내", page.get_by_text("샘플 대화 · 실제 DB 미연결").first.is_visible())
            check("층 배지 표시", page.get_by_text("68층").first.is_visible())
            page.screenshot(path=str(OUT / "02-chat-desktop.png"), full_page=False)

            # 메모 전송 (이 기기 저장)
            page.fill("[data-testid='chat-input']", "영차영차, 오늘도 같이 버텨요!")
            page.click("[data-testid='chat-send']")
            page.wait_for_timeout(300)
            check("메모 전송(이 기기 저장)", page.get_by_text("영차영차, 오늘도 같이 버텨요!").first.is_visible())

            # 계산기
            page.click("[data-testid='tool-calculator']")
            page.fill("[data-testid='calc-avg']", "70000")
            page.fill("[data-testid='calc-shares']", "10")
            page.fill("[data-testid='calc-current']", "63000")
            page.wait_for_timeout(350)
            pnl = page.locator("[data-testid='calc-pnl']").inner_text()
            floors = page.locator("[data-testid='calc-floors']").inner_text()
            check("계산기 수익률 -10.00%", pnl.strip() == "-10.00%", pnl.strip())
            check("계산기 남은 층 7층", floors.strip().startswith("7"), floors.strip())
            check("계산기 원금 표시", page.get_by_text("700,000").first.is_visible())
            page.screenshot(path=str(OUT / "03-calculator-desktop.png"), full_page=False)

            # 마음 보호 모드
            page.click("[data-testid='mind-guard']")
            page.wait_for_timeout(300)
            check(
                "마음 보호 모드 — 결과 가림",
                page.get_by_text("마음 보호 모드가 켜져 있어 계산 결과를 가렸어요.").is_visible()
                and page.locator("[data-testid='calc-pnl']").count() == 0,
            )
            page.click("[data-testid='mind-guard']")
            page.wait_for_timeout(250)

            # 나침반 탭
            page.click("[data-testid='tab-compass']")
            page.get_by_role("heading", name="주식 나침반", exact=True).wait_for(timeout=5000)
            check("탭 전환 — 주식 나침반", page.get_by_text("오늘의 쉬운 신호").first.is_visible())
            check("신호 배지 표시", page.get_by_text("매수 검토").first.is_visible())
            check("시세 미연결 표시", page.get_by_text("실시간 시세 미연결").first.is_visible())
            page.screenshot(path=str(OUT / "04-compass-desktop.png"), full_page=False)

            # 영어 전환
            page.click("[data-testid='lang-en']")
            page.wait_for_timeout(300)
            check("영어 전환", page.get_by_role("heading", name="Stock compass", exact=True).is_visible())
            page.click("[data-testid='lang-ko']")
            page.wait_for_timeout(200)

            desktop.close()

            # ── 모바일 ────────────────────────────────────────────────────
            mobile = browser.new_context(
                viewport={"width": 390, "height": 844},
                locale="ko-KR",
                is_mobile=True,
                has_touch=True,
                device_scale_factor=2,
            )
            mpage = mobile.new_page()
            mpage.on("console", lambda msg: console_errors.append(f"{msg.text} @ {msg.location.get('url', '')}") if msg.type == "error" else None)
            mpage.on("pageerror", lambda err: console_errors.append(str(err)))

            mpage.goto(BASE, wait_until="networkidle")
            mpage.get_by_role("heading", name="종목별 구조대", exact=True).wait_for(timeout=8000)
            check("모바일 하단 탭바", mpage.locator("[data-testid='tabbar-compass']").is_visible())
            mpage.screenshot(path=str(OUT / "05-rescue-mobile.png"), full_page=False)

            mpage.click("[data-testid='crew-sk-hynix']")
            mpage.get_by_text("샘플 대화 · 실제 DB 미연결").first.wait_for(timeout=5000)
            check("모바일 구조대 입장", mpage.get_by_text("3번 방이 새로 열렸어요.").first.is_visible())
            check("모바일 도구 버튼", mpage.locator("[data-testid='open-tools']").is_visible())
            mpage.screenshot(path=str(OUT / "06-chat-mobile.png"), full_page=False)

            # 모바일에서 도구 → 계산기
            mpage.click("[data-testid='open-tools']")
            mpage.wait_for_timeout(500)
            mpage.click("[data-testid='tool-calculator']")
            mpage.fill("[data-testid='calc-avg']", "21400")
            mpage.fill("[data-testid='calc-shares']", "10")
            mpage.fill("[data-testid='calc-current']", "19900")
            mpage.wait_for_timeout(300)
            m_floors = mpage.locator("[data-testid='calc-floors']").inner_text()
            check("모바일 계산기 2층", m_floors.strip().startswith("2"), m_floors.strip())
            mpage.screenshot(path=str(OUT / "07-calculator-mobile.png"), full_page=False)

            mobile.close()
            browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()

    # preview 서버에는 서버리스 함수가 없어 /api/health 404가 정상입니다. 그 외 오류만 셉니다.
    unexpected = [error for error in console_errors if "/api/health" not in error]
    check("콘솔 오류 없음", len(unexpected) == 0, "; ".join(unexpected[:3]))

    passed = sum(1 for _, ok, _ in results if ok)
    total = len(results)
    print(f"\n{passed}/{total} 통과")
    if passed != total:
        print("실패:", ", ".join(name for name, ok, _ in results if not ok))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
