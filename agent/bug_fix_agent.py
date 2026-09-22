"""
╔══════════════════════════════════════════════════════════════════════════════╗
║          NAGAR NERVE — Continuous Bug-Fix Agent                             ║
║          Powered by Google Antigravity SDK + Gemini                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

This agent continuously:
  1. Monitors both frontend and backend source files for changes
  2. Runs TypeScript type-checks and looks for compile errors
  3. Hits the live backend health API to detect runtime regressions
  4. Reads every changed file, reasons about bugs, and autonomously fixes them
  5. Verifies the fix compiles / the server is still healthy
  6. Writes a timestamped fix report to agent/reports/

Usage:
  cd "Nagar Nerve"
  python agent/bug_fix_agent.py

Environment: Set GEMINI_API_KEY in backend/.env or as environment variable.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from google.antigravity import Agent, LocalAgentConfig
from google.antigravity.hooks import policy
from google.antigravity.triggers import on_file_change, every, TriggerContext

# ── Paths ─────────────────────────────────────────────────────────────────────
WORKSPACE = Path(__file__).parent.parent.resolve()
FRONTEND  = WORKSPACE / "frontend"
BACKEND   = WORKSPACE / "backend"
REPORTS   = WORKSPACE / "agent" / "reports"
REPORTS.mkdir(parents=True, exist_ok=True)
NODE_BIN  = r"C:\node\node-v20.12.2-win-x64"
BACKEND_URL = "http://localhost:3001"

logging.basicConfig(level=logging.INFO,
    format="%(asctime)s  [%(levelname)s]  %(message)s", datefmt="%H:%M:%S")
log = logging.getLogger("NagarNerveAgent")

# ── Custom Tools ──────────────────────────────────────────────────────────────

def run_tsc_check(project: str) -> str:
    """Run TypeScript type-check on a project directory and return the output.

    Args:
        project: Absolute path to the project directory containing tsconfig.json.
    """
    env = os.environ.copy()
    env["PATH"] = NODE_BIN + os.pathsep + env.get("PATH", "")
    try:
        result = subprocess.run(
            ["npx.cmd", "tsc", "--noEmit", "--pretty", "false"],
            cwd=project, capture_output=True, text=True, timeout=60,
            env=env, shell=False,
        )
        output = (result.stdout + result.stderr).strip()
        if result.returncode == 0:
            return f"✅ TypeScript OK — no errors in {project}"
        return f"❌ TypeScript errors in {project}:\n{output}"
    except Exception as e:
        return f"⚠ Could not run tsc for {project}: {e}"

def check_backend_health() -> str:
    """Ping the backend health endpoint and return its JSON status."""
    try:
        with urllib.request.urlopen(f"{BACKEND_URL}/api/health", timeout=5) as r:
            data = json.loads(r.read().decode())
            return f"✅ Backend healthy: {json.dumps(data, indent=2)}"
    except Exception as e:
        return f"❌ Backend unreachable: {e}"

def list_source_files(directory: str) -> str:
    """List all TypeScript/TSX source files (excluding node_modules/dist).

    Args:
        directory: Absolute path to scan.
    """
    base = Path(directory)
    files = []
    for ext in ("*.ts", "*.tsx", "*.json", "*.css"):
        for p in base.rglob(ext):
            if any(x in p.parts for x in ("node_modules", "dist", ".git")):
                continue
            files.append(str(p.relative_to(WORKSPACE)))
    return "\n".join(sorted(files)) if files else "No source files found."

def write_fix_report(title: str, description: str) -> str:
    """Save a bug-fix report to agent/reports/.

    Args:
        title: Short title of the bug/fix.
        description: Full markdown description of what was found and fixed.
    """
    ts  = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in title)[:60]
    path = REPORTS / f"{ts}_{safe}.md"
    path.write_text(f"# {title}\n\n**Fixed:** {datetime.now().isoformat()}\n\n{description}\n", encoding="utf-8")
    return f"📝 Report saved: {path.name}"

def get_recent_reports(limit: int = 3) -> str:
    """Return the most recent fix reports.

    Args:
        limit: Number of reports to return.
    """
    reports = sorted(REPORTS.glob("*.md"), reverse=True)[:limit]
    if not reports:
        return "No fix reports yet."
    return "\n\n---\n\n".join(r.read_text(encoding="utf-8") for r in reports)

# ── Triggers ──────────────────────────────────────────────────────────────────

async def on_source_change(ctx: TriggerContext, changes) -> None:
    changed = [str(Path(c.path).relative_to(WORKSPACE)) for c in changes]
    log.info(f"📂 Source change: {', '.join(changed)}")
    await ctx.send(
        f"**Files changed:** {', '.join(changed)}\n\n"
        "1. View each changed file\n"
        "2. Run TypeScript check on the affected project\n"
        "3. Identify and fix any bugs or type errors\n"
        "4. Re-run TypeScript check to confirm it passes\n"
        "5. Check backend health if backend files changed\n"
        "6. Write a fix report"
    )

async def periodic_audit(ctx: TriggerContext) -> None:
    log.info("⏱ Running periodic 5-minute audit…")
    await ctx.send(
        "**Scheduled 5-minute full audit:**\n"
        "1. TypeScript check on frontend and backend\n"
        "2. Backend health check\n"
        "3. Review all source files for bugs, type issues, API mismatches\n"
        "4. Fix everything found\n"
        "5. Write comprehensive audit report"
    )

# ── System Instructions ────────────────────────────────────────────────────────
SYSTEM = f"""You are the Nagar Nerve Bug-Fix Agent — a senior TypeScript and React engineer.

Workspace root: {WORKSPACE}
Frontend (React 18 + Vite 5 + TailwindCSS 3): {FRONTEND}
Backend  (Node.js + Express + @google/genai):  {BACKEND}

## Responsibilities
- Zero TypeScript errors in both projects
- Frontend types in src/types.ts must exactly mirror backend src/types/index.ts
- All React hooks rules must be followed (no missing deps, no conditional hooks)
- Backend API routes must match frontend API calls exactly
- Gemini service must always have fallback data on errors
- Dijkstra routing must not crash on disconnected graphs

## Workflow (on every trigger)
1. view_file the changed/relevant files
2. run_tsc_check on both projects
3. check_backend_health
4. edit_file to fix every bug found — minimal surgical edits
5. re-run run_tsc_check to verify the fix
6. write_fix_report with full details

Never introduce new bugs. Always verify your fixes compile.
"""

# ── Main ──────────────────────────────────────────────────────────────────────

async def main() -> None:
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key or api_key == "your_gemini_api_key_here":
        env_file = BACKEND / ".env"
        if env_file.exists():
            for line in env_file.read_text().splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    api_key = line.split("=", 1)[1].strip()
    if not api_key or api_key == "your_gemini_api_key_here":
        log.error("❌ GEMINI_API_KEY not set. Get one at: https://aistudio.google.com/app/api-keys")
        sys.exit(1)

    log.info("🚀 Nagar Nerve Bug-Fix Agent starting…")

    fe_trigger = on_file_change(str(FRONTEND / "src"), on_source_change,
                                glob_pattern="**/*.{ts,tsx,json,css}")
    be_trigger = on_file_change(str(BACKEND / "src"), on_source_change,
                                glob_pattern="**/*.{ts,json}")
    audit = every(300, periodic_audit)

    config = LocalAgentConfig(
        api_key=api_key,
        system_instructions=SYSTEM,
        workspaces=[str(WORKSPACE)],
        policies=[policy.allow_all()],
        triggers=[fe_trigger, be_trigger, audit],
        tools=[run_tsc_check, check_backend_health, list_source_files,
               write_fix_report, get_recent_reports],
    )

    async with Agent(config) as agent:
        log.info("✅ Agent active — watching frontend/src and backend/src")
        log.info("   Reports → agent/reports/  |  Ctrl+C to stop\n")

        # Startup audit
        resp = await agent.chat(
            "Startup audit: list_source_files for both frontend/src and backend/src, "
            "run TypeScript checks on both projects, check backend health, "
            "review all files for bugs, fix everything found, write a comprehensive report."
        )
        async for chunk in resp:
            print(chunk, end="", flush=True)
        print("\n")

        log.info("✅ Startup audit complete. Watching for changes…")
        try:
            while True:
                await asyncio.sleep(60)
        except KeyboardInterrupt:
            log.info("👋 Agent stopped.")

if __name__ == "__main__":
    asyncio.run(main())
