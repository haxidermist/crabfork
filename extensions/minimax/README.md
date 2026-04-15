# MiniMax (Crabfork plugin)

Bundled MiniMax plugin for both:

- API-key provider setup (`minimax`)
- Token Plan OAuth setup (`minimax-portal`)

## Enable

```bash
crabfork plugins enable minimax
```

Restart the Gateway after enabling.

```bash
crabfork gateway restart
```

## Authenticate

OAuth:

```bash
crabfork models auth login --provider minimax-portal --set-default
```

API key:

```bash
crabfork setup --wizard --auth-choice minimax-global-api
```

## Notes

- MiniMax OAuth uses a user-code login flow.
- OAuth currently targets the Token Plan path.
