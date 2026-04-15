---
summary: "Redirect: flow commands live under `crabfork tasks flow`"
read_when:
  - You encounter crabfork flows in older docs or release notes
title: "flows (redirect)"
---

# `crabfork tasks flow`

Flow commands are subcommands of `crabfork tasks`, not a standalone `flows` command.

```bash
crabfork tasks flow list [--json]
crabfork tasks flow show <lookup>
crabfork tasks flow cancel <lookup>
```

For full documentation see [Task Flow](/automation/taskflow) and the [tasks CLI reference](/cli/index#tasks).
