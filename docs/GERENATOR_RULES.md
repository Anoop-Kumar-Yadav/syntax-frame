# Syntax Frame — Generator Rules (Design)

This document defines the **generator contract** for Syntax Frame.

It is the most important reference before writing or modifying any generator code.
All generators (Node.js, Python, future extension tooling) **must obey these rules**.

---

## Purpose

The generator acts as a strict contract between three layers:

* **Source layer** (`/snippets`)
* **Build layer** (`/build`)
* **Distribution layer** (`/dist`)

The generator is **mechanical and deterministic**.
It does not contain business logic or creative decisions.

---

## 1. Input Contract (Source Layer Rules)

### 1.1 Source Location

All source snippets live in:

```
/snippets/*.json
```

Rules:

* One file represents one language
* Files must be flat JSON objects

Examples:

```
snippets/javascript.json
snippets/python.json
snippets/html.json
snippets/css.json
snippets/java.json
```

---

### 1.2 Allowed Content

Each source file:

* Must be valid JSON
* Must contain **only VS Code snippet definitions**

Must NOT contain:

* Build metadata
* Version numbers
* Language names inside snippet keys

Correct:

```json
"Syntax Frame File Header": { ... }
```

Incorrect:

```json
"Syntax Frame File Header — Python": { ... }
```

Language labeling is a **build responsibility**, not a source responsibility.

---

### 1.3 Mandatory Scope

Every snippet **must define**:

```json
"scope": "<language-id>"
```

Why this is required:

* Ensures correct auto-detection in VS Code
* Allows safe merging into a global snippet file

If any snippet is missing `scope`, the generator **must fail immediately**.

---

## 2. Output Contract (Distribution Layer Rules)

### 2.1 Output Location

The generator produces exactly one file:

```
/dist/syntax-frame.code-snippets
```

Rules:

* Always overwritten
* Never edited manually
* Safe to delete and regenerate

---

### 2.2 Output Format

The output file:

* Is valid VS Code global snippet JSON
* Contains **all snippets from all languages**
* Preserves snippet fields exactly:

  * `prefix`
  * `scope`
  * `body`
  * `description`

The generator **must not modify snippet content**.

---

## 3. Naming Rules (Critical)

### 3.1 Why Naming Rules Exist

VS Code global snippet files require:

* **Unique top-level keys**

However, source files intentionally reuse names like:

```
"Syntax Frame File Header"
```

Therefore, the generator must namespace keys safely.

---

### 3.2 Global Snippet Key Format (Locked)

Final rule:

```
<Original Snippet Name> — <Language>
```

Examples:

```
Syntax Frame File Header — JavaScript
Syntax Frame File Header — Python
Syntax Frame Section — HTML
Syntax Frame TODO — Java
```

This guarantees:

* No collisions
* Clear identification
* Human-readable output

---

### 3.3 Language Name Resolution

Language names are derived from **file names**, not snippet content.

| File name       | Language label |
| --------------- | -------------- |
| javascript.json | JavaScript     |
| python.json     | Python         |
| html.json       | HTML           |
| css.json        | CSS            |
| java.json       | Java           |

This mapping is centralized inside the generator.

---

## 4. Merging Rules

### 4.1 Merge Strategy

For each file in `/snippets`:

1. Read JSON
2. Iterate over snippet entries
3. Rename snippet key using naming rules
4. Copy snippet object **as-is**

There is:

* ❌ No deep merging
* ❌ No inheritance
* ❌ No overrides

---

### 4.2 Collision Handling

If two generated keys collide:

* Generator must abort
* Print a clear error message
* Identify the conflicting snippets

**Fail fast > silent overwrite**

---

## 5. Validation Rules (Quality Gates)

Before writing output, the generator must validate:

### 5.1 JSON Validity

* Every source file parses correctly
* If any file fails → stop execution

### 5.2 Required Fields

Each snippet must define:

* `prefix`
* `scope`
* `body`

Missing fields → generator must fail

### 5.3 Body Type

`body` must be:

* An array of strings
* OR a single string

Any other type → generator must fail

---

## 6. What the Generator Must NOT Do

The generator is intentionally limited.

It must NOT:

* Modify snippet bodies
* Infer language behavior
* Add branding text
* Add version numbers
* Auto-format snippets
* Guess missing fields

The generator is **mechanical**, not intelligent.

---

## 7. Idempotency Rule

Running the generator multiple times must:

* Produce identical output
* Be independent of file order
* Be independent of environment

This guarantees:

* Stable diffs
* Predictable builds
* CI friendliness

---

## 8. Future-Proofing Guarantees

These rules intentionally support:

* VS Code extension packaging
* CLI-based installers
* Web-based snippet distribution

No rule here blocks v2 or beyond.

---

## 9. Summary — Generator Contract

In one sentence:

> **The generator is a deterministic transformer from clean, language-separated source -snippets into one collision-free global snippet file.**

No more. No less.
