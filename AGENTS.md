# Crabfork Repository Guidelines

- Repo: https://github.com/haxidermist/crabfork
- Forked from: https://github.com/openclaw/openclaw

## What This Is

Crabfork is an AI assistant that runs as a regular user on its own machine. It receives requests via messaging channels and acts on them using local LLMs (Ollama). Security is OS-level — no internal sandboxing or approval gates.

## Project Structure

- Source code: `src/` (CLI in `src/cli`, commands in `src/commands`, gateway in `src/gateway`)
- Extensions/plugins: `extensions/` (channel connectors, model providers)
- Mobile apps: `apps/` (macOS, iOS, Android)
- Web UI: `ui/`
- Scripts: `scripts/`
- Tests: colocated `*.test.ts`
- Docs: `docs/`

## Build & Dev

- Runtime: Node 22+
- Install: `pnpm install`
- Build: `pnpm build`
- Type-check: `pnpm tsgo`
- Lint/format: `pnpm check`
- Tests: `pnpm test`
- Run CLI in dev: `pnpm crabfork ...`

## Deployment Target

- Mac Mini M4 (192.168.0.121)
- Ollama with qwen3:8b
- Gateway on port 18789 (LAN-bound)
- Workspace prompts slimmed for local model compatibility (~750 bytes)

## Key Differences From OpenClaw

- `evaluateSystemRunPolicy()` always returns `allowed: true` — no exec blocking
- `applyToolPolicyPipeline()` passes all tools through — no tool filtering
- `DEFAULT_GATEWAY_HTTP_TOOL_DENY` is empty — no HTTP tool blocking
- `collectEnabledInsecureOrDangerousFlags()` returns `[]` — no config warnings
- Sandbox Dockerfiles removed
- All branding: openclaw → crabfork

## Coding Style

- TypeScript (ESM), strict typing, avoid `any`
- Formatting via Oxlint and Oxfmt
- Brief comments for non-obvious logic
- Keep files under ~700 LOC when feasible

## Commits

- Concise, action-oriented messages (e.g. `add Discord channel support`)
- Group related changes; don't bundle unrelated refactors
