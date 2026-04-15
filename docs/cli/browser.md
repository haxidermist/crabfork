---
summary: "CLI reference for `crabfork browser` (lifecycle, profiles, tabs, actions, state, and debugging)"
read_when:
  - You use `crabfork browser` and want examples for common tasks
  - You want to control a browser running on another machine via a node host
  - You want to attach to your local signed-in Chrome via Chrome MCP
title: "browser"
---

# `crabfork browser`

Manage Crabfork's browser control surface and run browser actions (lifecycle, profiles, tabs, snapshots, screenshots, navigation, input, state emulation, and debugging).

Related:

- Browser tool + API: [Browser tool](/tools/browser)

## Common flags

- `--url <gatewayWsUrl>`: Gateway WebSocket URL (defaults to config).
- `--token <token>`: Gateway token (if required).
- `--timeout <ms>`: request timeout (ms).
- `--expect-final`: wait for a final Gateway response.
- `--browser-profile <name>`: choose a browser profile (default from config).
- `--json`: machine-readable output (where supported).

## Quick start (local)

```bash
crabfork browser profiles
crabfork browser --browser-profile crabfork start
crabfork browser --browser-profile crabfork open https://example.com
crabfork browser --browser-profile crabfork snapshot
```

## Quick troubleshooting

If `start` fails with `not reachable after start`, troubleshoot CDP readiness first. If `start` and `tabs` succeed but `open` or `navigate` fails, the browser control plane is healthy and the failure is usually navigation SSRF policy.

Minimal sequence:

```bash
crabfork browser --browser-profile crabfork start
crabfork browser --browser-profile crabfork tabs
crabfork browser --browser-profile crabfork open https://example.com
```

Detailed guidance: [Browser troubleshooting](/tools/browser#cdp-startup-failure-vs-navigation-ssrf-block)

## Lifecycle

```bash
crabfork browser status
crabfork browser start
crabfork browser stop
crabfork browser --browser-profile crabfork reset-profile
```

Notes:

- For `attachOnly` and remote CDP profiles, `crabfork browser stop` closes the
  active control session and clears temporary emulation overrides even when
  Crabfork did not launch the browser process itself.
- For local managed profiles, `crabfork browser stop` stops the spawned browser
  process.

## If the command is missing

If `crabfork browser` is an unknown command, check `plugins.allow` in
`~/.crabfork/crabfork.json`.

When `plugins.allow` is present, the bundled browser plugin must be listed
explicitly:

```json5
{
  plugins: {
    allow: ["telegram", "browser"],
  },
}
```

`browser.enabled=true` does not restore the CLI subcommand when the plugin
allowlist excludes `browser`.

Related: [Browser tool](/tools/browser#missing-browser-command-or-tool)

## Profiles

Profiles are named browser routing configs. In practice:

- `crabfork`: launches or attaches to a dedicated Crabfork-managed Chrome instance (isolated user data dir).
- `user`: controls your existing signed-in Chrome session via Chrome DevTools MCP.
- custom CDP profiles: point at a local or remote CDP endpoint.

```bash
crabfork browser profiles
crabfork browser create-profile --name work --color "#FF5A36"
crabfork browser create-profile --name chrome-live --driver existing-session
crabfork browser create-profile --name remote --cdp-url https://browser-host.example.com
crabfork browser delete-profile --name work
```

Use a specific profile:

```bash
crabfork browser --browser-profile work tabs
```

## Tabs

```bash
crabfork browser tabs
crabfork browser tab new
crabfork browser tab select 2
crabfork browser tab close 2
crabfork browser open https://docs.crabfork.ai
crabfork browser focus <targetId>
crabfork browser close <targetId>
```

## Snapshot / screenshot / actions

Snapshot:

```bash
crabfork browser snapshot
```

Screenshot:

```bash
crabfork browser screenshot
crabfork browser screenshot --full-page
crabfork browser screenshot --ref e12
```

Notes:

- `--full-page` is for page captures only; it cannot be combined with `--ref`
  or `--element`.
- `existing-session` / `user` profiles support page screenshots and `--ref`
  screenshots from snapshot output, but not CSS `--element` screenshots.

Navigate/click/type (ref-based UI automation):

```bash
crabfork browser navigate https://example.com
crabfork browser click <ref>
crabfork browser type <ref> "hello"
crabfork browser press Enter
crabfork browser hover <ref>
crabfork browser scrollintoview <ref>
crabfork browser drag <startRef> <endRef>
crabfork browser select <ref> OptionA OptionB
crabfork browser fill --fields '[{"ref":"1","value":"Ada"}]'
crabfork browser wait --text "Done"
crabfork browser evaluate --fn '(el) => el.textContent' --ref <ref>
```

File + dialog helpers:

```bash
crabfork browser upload /tmp/crabfork/uploads/file.pdf --ref <ref>
crabfork browser waitfordownload
crabfork browser download <ref> report.pdf
crabfork browser dialog --accept
```

## State and storage

Viewport + emulation:

```bash
crabfork browser resize 1280 720
crabfork browser set viewport 1280 720
crabfork browser set offline on
crabfork browser set media dark
crabfork browser set timezone Europe/London
crabfork browser set locale en-GB
crabfork browser set geo 51.5074 -0.1278 --accuracy 25
crabfork browser set device "iPhone 14"
crabfork browser set headers '{"x-test":"1"}'
crabfork browser set credentials myuser mypass
```

Cookies + storage:

```bash
crabfork browser cookies
crabfork browser cookies set session abc123 --url https://example.com
crabfork browser cookies clear
crabfork browser storage local get
crabfork browser storage local set token abc123
crabfork browser storage session clear
```

## Debugging

```bash
crabfork browser console --level error
crabfork browser pdf
crabfork browser responsebody "**/api"
crabfork browser highlight <ref>
crabfork browser errors --clear
crabfork browser requests --filter api
crabfork browser trace start
crabfork browser trace stop --out trace.zip
```

## Existing Chrome via MCP

Use the built-in `user` profile, or create your own `existing-session` profile:

```bash
crabfork browser --browser-profile user tabs
crabfork browser create-profile --name chrome-live --driver existing-session
crabfork browser create-profile --name brave-live --driver existing-session --user-data-dir "~/Library/Application Support/BraveSoftware/Brave-Browser"
crabfork browser --browser-profile chrome-live tabs
```

This path is host-only. For Docker, headless servers, Browserless, or other remote setups, use a CDP profile instead.

Current existing-session limits:

- snapshot-driven actions use refs, not CSS selectors
- `click` is left-click only
- `type` does not support `slowly=true`
- `press` does not support `delayMs`
- `hover`, `scrollintoview`, `drag`, `select`, `fill`, and `evaluate` reject
  per-call timeout overrides
- `select` supports one value only
- `wait --load networkidle` is not supported
- file uploads require `--ref` / `--input-ref`, do not support CSS
  `--element`, and currently support one file at a time
- dialog hooks do not support `--timeout`
- screenshots support page captures and `--ref`, but not CSS `--element`
- `responsebody`, download interception, PDF export, and batch actions still
  require a managed browser or raw CDP profile

## Remote browser control (node host proxy)

If the Gateway runs on a different machine than the browser, run a **node host** on the machine that has Chrome/Brave/Edge/Chromium. The Gateway will proxy browser actions to that node (no separate browser control server required).

Use `gateway.nodes.browser.mode` to control auto-routing and `gateway.nodes.browser.node` to pin a specific node if multiple are connected.

Security + remote setup: [Browser tool](/tools/browser), [Remote access](/gateway/remote), [Tailscale](/gateway/tailscale), [Security](/gateway/security)
