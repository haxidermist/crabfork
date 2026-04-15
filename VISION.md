## Crabfork Vision

Crabfork is an AI that has its own computer.

Not a chatbot. Not a sandboxed tool. A user — with a machine, a shell, and the ability to act.

### The idea

Most AI assistants are tools that humans operate. Crabfork inverts that: the AI is the resident, and humans are the ones sending it requests.

It runs on a dedicated machine (a Mac Mini, a server, a VM — whatever you give it). People reach it through messaging channels they already use: WhatsApp, Discord, Telegram, Slack, etc. When someone asks it to do something, it does it — writes code, creates files, runs commands, looks things up, generates images.

The machine's own user permissions are the security boundary. No additional sandboxing, approval gates, or permission theater.

### What matters

- **Local-first** — runs on its own hardware with local LLMs. Cloud is optional, not required.
- **Full agency** — no exec allowlists, no tool policy filtering, no approval dialogs. If the OS allows it, Crabfork can do it.
- **Multi-channel** — one AI, reachable from anywhere. WhatsApp, Discord, Telegram, email, shared directories, whatever.
- **Simple** — strip complexity that exists to solve problems a solo AI operator doesn't have.

### Where it came from

Forked from [OpenClaw](https://github.com/openclaw/openclaw), which is an excellent multi-channel AI assistant framework. OpenClaw is designed for a human owner with an AI tool that needs guardrails. Crabfork takes the channel infrastructure and model integration, removes the security theater, and rebuilds around a different trust model: the AI is the user.

### Current state

- Rebranded and building clean
- Security/sandbox/approval layers stripped
- Deployed on Mac Mini M4 with Ollama (qwen3:8b)
- Gateway running, tool use confirmed, speech working
- Local models are the default path

### What's next

- Connect messaging channels (WhatsApp, Discord, Telegram)
- Persistent task management — Crabfork remembering and following up on things
- Better workspace awareness — understanding its own filesystem and projects
- Multi-model support — use cloud when available, fall back to local when not
- Self-maintenance — Crabfork updating itself, managing its own machine
