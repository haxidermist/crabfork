---
summary: "CLI reference for `crabfork docs` (search the live docs index)"
read_when:
  - You want to search the live Crabfork docs from the terminal
title: "docs"
---

# `crabfork docs`

Search the live docs index.

Arguments:

- `[query...]`: search terms to send to the live docs index

Examples:

```bash
crabfork docs
crabfork docs browser existing-session
crabfork docs sandbox allowHostControl
crabfork docs gateway token secretref
```

Notes:

- With no query, `crabfork docs` opens the live docs search entrypoint.
- Multi-word queries are passed through as one search request.
