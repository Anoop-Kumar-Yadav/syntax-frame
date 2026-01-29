# Contributing to Syntax Frame

Thank you for your interest in contributing to **Syntax Frame** 🎉

Syntax Frame is an **opinionated tooling project**. Contributions are welcome, but consistency, clarity, and respect for the architecture are non-negotiable.

This guide explains **how to contribute correctly**.

---

## 1. Project Philosophy

Syntax Frame exists to enforce:

* Structure over chaos
* Readability over cleverness
* Determinism over magic

Contributions must **strengthen these goals**, not dilute them.

---

## 2. Architecture Rules (Critical)

Syntax Frame follows a strict **three-layer architecture**:

```
snippets/  →  build/  →  dist/
```

### Non-Negotiable Rules

* ✅ **Edit only `/snippets`** for snippet changes
* ❌ **Never edit `/dist` manually**
* ✅ Always regenerate `/dist` using a generator
* ❌ Do not embed build logic inside snippets

Before contributing, read:

* `docs/ARCHITECTURE.md`
* `docs/GENERATOR_RULES.md`

If a change violates these documents, it will not be accepted.

---

## 3. What You Can Contribute (v1 Scope)

### ✅ Accepted Contributions

* New snippets **within existing categories**
* Improvements to existing snippets
* Bug fixes in generators (`build/`)
* Documentation improvements

### ❌ Not Accepted in v1

* New languages
* New snippet categories
* Prefix changes
* Breaking architectural changes

These are planned for **v2**.

---

## 4. How to Add or Modify Snippets

### Step-by-Step

1. Identify the correct language file in `/snippets`
2. Follow existing naming and prefix conventions
3. Keep snippet intent identical across languages
4. Validate JSON formatting

### Regenerate Output

After making changes, run **one** generator:

```bash
node build/generate.js
```

or

```bash
python build/generate.py
```

This will regenerate:

```
dist/syntax-frame.code-snippets
```

Both source and generated files **must** be committed.

---

## 5. Commit Message Guidelines

Use clear, scoped messages:

```
Add: fdoc support improvement for Python
Fix: typo in JavaScript section snippet
Docs: clarify usage of security marker
Build: improve generator validation
```

Avoid vague messages like:

* "update snippets"
* "fix stuff"

---

## 6. Pull Request Checklist

Before opening a PR, ensure:

* [ ] Changes follow `ARCHITECTURE.md`
* [ ] Generator runs without errors
* [ ] `/dist` is regenerated
* [ ] Documentation updated (if needed)
* [ ] No unrelated formatting changes

PRs that fail this checklist may be closed without review.

---

## 7. Review Expectations

Maintainers will review for:

* Architectural correctness
* Consistency with existing snippets
* Long-term maintainability

Feedback is part of the process. Please be open to revision.

---

## 8. Code of Conduct

* Be respectful
* Be constructive
* Assume good intent

Harassment, hostility, or disrespectful behavior will not be tolerated.

---

## 9. Final Note

Syntax Frame is a **long-term tooling project**.

If you are unsure about a contribution:

* Open an issue first
* Describe the problem clearly
* Propose a solution

Thoughtful discussion is always welcome.

Thank you for contributing to Syntax Frame 🙌
