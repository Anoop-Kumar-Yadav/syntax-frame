# Pull Request

Thank you for contributing to **Syntax Frame** 🙌

Please fill out this template carefully. It helps maintainers review your PR efficiently and ensures architectural consistency.

---

## Summary

Provide a clear and concise summary of what this PR does.

---

## Type of Change

Select all that apply:

* [ ] Bug fix
* [ ] New snippet (existing category)
* [ ] Improvement to existing snippet
* [ ] Generator change (Node.js)
* [ ] Generator change (Python)
* [ ] Documentation update
* [ ] Other (please specify)

---

## Scope Check (Important)

Please confirm:

* [ ] This change fits within **Syntax Frame v1** scope
* [ ] This change does **not** introduce a new language
* [ ] This change does **not** introduce a new snippet category
* [ ] This change does **not** break existing prefixes

(See `ARCHITECTURE.md` and `CONTRIBUTING.md`.)

---

## What Was Changed

Describe the changes made:

* …
* …

---

## How to Test

Explain how reviewers can test this change:

1. Run `node build/generate.js` or `python build/generate.py`
2. Use snippet `...`
3. Verify output in `dist/syntax-frame.code-snippets`

---

## Checklist (Required)

Before submitting, confirm:

* [ ] Changes follow `ARCHITECTURE.md`
* [ ] Generator runs without errors
* [ ] `/dist` has been regenerated
* [ ] No manual edits to `/dist`
* [ ] Documentation updated if needed

PRs that fail this checklist may be closed without review.

---

## Additional Notes

Add any extra context, screenshots, or references here.
