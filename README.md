# Syntax Frame

**Syntax Frame** is a disciplined, language-aware snippet system for VS Code that helps developers write **structured, readable, and maintainable code**.

It is opinionated by design.

> Code is read more than it is written.
> Syntax Frame optimizes for clarity, not shortcuts.

---

## What Syntax Frame Is

* A **VS Code snippet toolkit**
* Language-aware (same prefix, correct syntax per language)
* Focused on **structure, documentation, and intent**
* Designed for **real-world, long-lived projects**

---

## What Syntax Frame Is NOT

* ❌ A framework
* ❌ A boilerplate generator
* ❌ A syntax-learning tool
* ❌ A replacement for linters or formatters

---

## Supported Languages (v1)

* JavaScript / TypeScript
* Python
* HTML
* CSS
* Java

---

## Core Features (v1)

| Category                | Prefixes                    |
| ----------------------- | --------------------------- |
| File Header             | `fheader`                   |
| Code Structure          | `section`, `subsec`, `end`  |
| Documentation           | `fdoc`, `fds`               |
| Task & Quality Markers  | `todo`, `fixme`, `security` |
| Debug & Logging Helpers | `debug`, `perf`, `cgroup`   |

All features follow one rule:

> **One intent. One prefix. Correct syntax.**

---

## Installation

Syntax Frame is designed to be **frictionless**. Choose the installation method that fits your workflow.

---

### ⭐ Option A — Global Installation (Recommended)

Installs Syntax Frame **once** and makes it available in **all projects**.

#### Steps

1. Open the `dist/` folder in this repository
2. Download:

   ```
   syntax-frame.code-snippets
   ```
3. Open **VS Code**
4. Press:

   ```
   Ctrl + Shift + P
   ```
5. Select:

   ```
   Configure User Snippets
   ```
6. Choose **New Global Snippets file**
7. Paste the contents of `syntax-frame.code-snippets`
8. Save the file

✅ Done. Syntax Frame is now available everywhere.

---

### Option B — Project / Workspace Installation

Recommended for teams who want Syntax Frame committed into the project.

#### Steps

1. Copy:

   ```
   install/vscode/
   ```
2. Paste it into your project root as:

   ```
   .vscode/
   ```
3. Reload VS Code

Syntax Frame will now work **only in that project**.

---

## Verifying Installation

Open any supported file (for example `.js`, `.py`, `.html`) and type:

```
fheader
```

If a structured header is inserted, Syntax Frame is installed correctly.

---

## Project Architecture

Syntax Frame follows a **layered architecture**:

```
Source Layer → Build Layer → Distribution Layer
```

* **Source Layer (`/snippets`)**
  Human-written, language-specific snippet files

* **Build Layer (`/build`)**
  Generator scripts that validate and merge snippets

* **Distribution Layer (`/dist`)**
  A single global snippet file for users

You should never edit files inside `/dist` manually.

For details, see:

* `docs/ARCHITECTURE.md`
* `docs/GENERATOR_RULES.md`

---

## Documentation

* **Usage Guide:** `docs/USAGE_GUIDE.md`
* **Architecture:** `docs/ARCHITECTURE.md`
* **Generator Rules:** `docs/GENERATOR_RULES.md`
* **Contributing:** `CONTRIBUTING.md`

---

## Versioning & Status

* **Current version:** `v1.0.0`
* **Status:** Feature set frozen
* **Scope:** Snippets + generators

Planned for v2:

* VS Code extension
* Smarter context detection
* Automated installation

---

## License

MIT License
