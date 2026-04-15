---
summary: "Uninstall Crabfork completely (CLI, service, state, workspace)"
read_when:
  - You want to remove Crabfork from a machine
  - The gateway service is still running after uninstall
title: "Uninstall"
---

# Uninstall

Two paths:

- **Easy path** if `crabfork` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
crabfork uninstall
```

Non-interactive (automation / npx):

```bash
crabfork uninstall --all --yes --non-interactive
npx -y crabfork uninstall --all --yes --non-interactive
```

Manual steps (same result):

1. Stop the gateway service:

```bash
crabfork gateway stop
```

2. Uninstall the gateway service (launchd/systemd/schtasks):

```bash
crabfork gateway uninstall
```

3. Delete state + config:

```bash
rm -rf "${CRABFORK_STATE_DIR:-$HOME/.crabfork}"
```

If you set `CRABFORK_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4. Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/.crabfork/workspace
```

5. Remove the CLI install (pick the one you used):

```bash
npm rm -g crabfork
pnpm remove -g crabfork
bun remove -g crabfork
```

6. If you installed the macOS app:

```bash
rm -rf /Applications/Crabfork.app
```

Notes:

- If you used profiles (`--profile` / `CRABFORK_PROFILE`), repeat step 3 for each state dir (defaults are `~/.crabfork-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `crabfork` is missing.

### macOS (launchd)

Default label is `ai.crabfork.gateway` (or `ai.crabfork.<profile>`; legacy `com.crabfork.*` may still exist):

```bash
launchctl bootout gui/$UID/ai.crabfork.gateway
rm -f ~/Library/LaunchAgents/ai.crabfork.gateway.plist
```

If you used a profile, replace the label and plist name with `ai.crabfork.<profile>`. Remove any legacy `com.crabfork.*` plists if present.

### Linux (systemd user unit)

Default unit name is `crabfork-gateway.service` (or `crabfork-gateway-<profile>.service`):

```bash
systemctl --user disable --now crabfork-gateway.service
rm -f ~/.config/systemd/user/crabfork-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `Crabfork Gateway` (or `Crabfork Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "Crabfork Gateway"
Remove-Item -Force "$env:USERPROFILE\.crabfork\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.crabfork-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://crabfork.ai/install.sh` or `install.ps1`, the CLI was installed with `npm install -g crabfork@latest`.
Remove it with `npm rm -g crabfork` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `crabfork ...` / `bun run crabfork ...`):

1. Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2. Delete the repo directory.
3. Remove state + workspace as shown above.
