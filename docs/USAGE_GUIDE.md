# Syntax Frame — Usage Guide

This guide explains **how to use Syntax Frame correctly**.

Syntax Frame is opinionated by design.  
Its value comes from **consistent usage**, not occasional shortcuts.

---

## Core Principle

Syntax Frame follows one rule:

> **One intent. One prefix. Correct syntax.**

If you remember the prefix, Syntax Frame adapts to the language.

---

## 1. File Headers (`fheader`)

### Purpose
Provide immediate context for a file:
- What it is
- Why it exists
- Who owns it
- What it is responsible for

### When to Use
- **Every source file**
- Scripts, services, utilities, configs, docs

### How to Use
At the very top of the file, type:
```
fheader
```
Fill in:
- Description
- Responsibility

### Rules
- `fheader` must be the **first thing in the file**
- Do not modify the structure
- Keep descriptions short and precise

### Why It Matters
Someone opening the file months later should understand it in **10 seconds**.

---

## 2. Code Structure (`section`, `subsec`, `end`)

Large files fail when structure is unclear.  
Syntax Frame enforces **visual hierarchy**.

---

### `section` — Major Blocks
Use for:
- Imports
- Configuration
- Core logic
- Public APIs
- Exports

Example intent:
```
SECTION: Imports
SECTION: Authentication Logic
```

---

### `subsec` — Grouped Logic
Use inside sections for:
- Related functions
- Feature-specific logic
- Internal groupings

Example intent:
```
SUBSECTION: Token Validation
SUBSECTION: Password Hashing
```

---

### `end` — Explicit Closure
Use to:
- Mark the end of a major section
- Improve scan-ability
- Avoid "where does this end?" confusion

---

### Structure Rules
- Do not over-nest sections
- Prefer fewer, clearer sections
- Use `end` only for **major sections**, not every small block

---

## 3. Documentation (`fdoc`, `fds`)

Documentation is part of the code, not an afterthought.

---

### `fdoc` — Detailed Documentation
Use for:
- Public functions or methods
- Business logic
- APIs
- Anything non-trivial

Must explain:
- What the function does
- Parameters
- Return value
- Important notes or side effects

---

### `fds` — Simple Documentation
Use for:
- Small helpers
- Internal utilities
- Self-contained logic

One clear sentence is enough.

---

### Documentation Rules
- Documentation goes **above** the function/block
- Keep language simple
- Do not restate obvious code

---

## 4. Task & Quality Markers

Syntax Frame provides standardized markers to track work and risks.

---

### `todo`
Use for:
- Planned improvements
- Missing features
- Refactors

---

### `fixme`
Use for:
- Bugs
- Incorrect logic
- Risky behavior

---

### `security`
Use for:
- Authentication logic
- Authorization checks
- Input validation
- Sensitive data handling

---

### Marker Rules (Important)
Every marker **must include**:
- Owner
- Date

Example intent:
```
TODO: Add validation [anoop, 2026-01-29]
```

This creates accountability and prevents forgotten comments.

---

## 5. Debug & Logging Helpers

Debugging should be **intentional**, not random.

---

### `debug`
Use for:
- Temporary value inspection
- Development-time debugging

Remove or reduce before production.

---

### `perf`
Use for:
- Measuring slow logic
- Identifying bottlenecks
- Performance experiments

Only measure what matters.

---

### `cgroup`
Use for:
- Grouping related logs
- Making debug output readable
- Separating logical debug phases

---

### Debugging Rules
- Do not leave excessive debug logs
- Group related logs
- Prefer clarity over volume

---

## 6. Language Awareness

Syntax Frame is **language-aware**.

This means:
- Same prefix works across languages
- Comment syntax adapts automatically
- You never think about formatting differences

Trust the system.

---

## 7. Consistency Over Cleverness

Syntax Frame works only if it is used consistently.

Bad usage:
- Random comments
- Mixed styles
- Ignoring structure

Good usage:
- Predictable headers
- Clear sections
- Visible intent

---

## Final Reminder

Syntax Frame is not about typing faster.

It is about:
- Making intent visible
- Helping teammates
- Helping future-you
- Reducing mental load

Use it with discipline.