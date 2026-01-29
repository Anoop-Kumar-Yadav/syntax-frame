# Syntax Frame — Architecture

This document explains **how Syntax Frame is designed** and **why it works this way**.

---

## Problem Statement

Syntax Frame serves **two different audiences** with conflicting needs:

### Maintainers & Contributors
- Want clean, readable, language-specific snippet files
- Want easy editing and review
- Want scalability (more features, more languages)

### End Users
- Want the easiest possible install
- Do not care about internal structure
- Just want snippets to work everywhere

**Solution**: Separate these concerns through architecture.

---

## Three-Layer Architecture

Syntax Frame is built as **three distinct layers**:

```
SOURCE LAYER   →   BUILD LAYER   →   DISTRIBUTION LAYER
(for you)          (automation)       (for users)
```

Each layer has **one responsibility only**.

---

## Layer 1: Source Layer (Human-Friendly)

### Purpose
This is where **all real work happens**:
- Write snippets
- Review snippets
- Add features
- Add languages

### Characteristics
- Language-separated files
- Easy to read and diff in Git
- No installation concerns
- Simple structure

### Location
```
snippets/
├── javascript.json
├── python.json
├── html.json
├── css.json
└── java.json
```

### What You Edit
- Individual language files
- Clear, maintainable structure
- One language per file

### What You Never Think About
- Global snippet format
- User installation
- File collisions

---

## Layer 2: Build Layer (Automation)

### Purpose
This is the **bridge** between maintainers and users:
- Read all source snippets
- Validate them
- Combine them
- Generate installable output

### Characteristics
- No snippets authored here
- No manual editing
- Pure automation
- Deterministic output

### How It Works
Think of it like a **compiler**:
- **Input**: Source snippets
- **Output**: Global snippet file

### Location
```
build/
├── generate.js           # or generate.py
└── README.md            # build rules
```

---

## Layer 3: Distribution Layer (User-Friendly)

### Purpose
This is **what users consume**:
- Simple install
- Zero thinking
- One file (or one folder)

### Characteristics
- Generated, not written
- Disposable (can be regenerated anytime)
- Never manually edited
- Single source of truth for users

### Location
```
dist/
└── syntax-frame.code-snippets
```

If deleted → regenerate it with the build layer.

---

## Complete Flow: End-to-End

Let's walk through **one real change**.

### Example: Adding a new snippet `optimize`

#### Step 1 — Source Layer
You add the snippet to language-specific files:
```
snippets/javascript.json
snippets/python.json
snippets/java.json
```

#### Step 2 — Build Layer
You run:
```bash
node build/generate.js
```

#### Step 3 — Distribution Layer
The build script regenerates:
```
dist/syntax-frame.code-snippets
```

#### Step 4 — User Installation
User downloads **one file** and installs it.

**Result**:
- ✅ Clean
- ✅ Predictable
- ✅ No duplication
- ✅ No confusion

---

## Repository Structure

```
syntax-frame/
│
├── snippets/                 # SOURCE LAYER (edit here)
│   ├── javascript.json
│   ├── python.json
│   ├── html.json
│   ├── css.json
│   └── java.json
│
├── build/                    # BUILD LAYER (automation)
│   ├── generate.js           # or generate.py
│   └── README.md             # explains build rules
│
├── dist/                     # DISTRIBUTION LAYER (generated)
│   └── syntax-frame.code-snippets
│
├── install/                  # OPTIONAL convenience
│   └── vscode/
│       ├── javascript.json
│       ├── python.json
│       ├── html.json
│       ├── css.json
│       └── java.json
│
├── docs/
│   ├── USAGE_GUIDE.md
│   └── ARCHITECTURE.md       # (this document)
│
├── README.md
└── LICENSE
```

---

## Why This Architecture Works

### ✅ Separation of Concerns
- Editing ≠ building ≠ installing
- Each layer has one job

### ✅ Scales Cleanly
- Add languages → only modify `snippets/`
- Add features → only modify `snippets/`
- Change install → only modify `dist/`

### ✅ Contributor-Friendly
- No one touches generated files
- Easy PR reviews
- Clear ownership of each file

### ✅ Future-Proof
This structure works for:
- VS Code extension
- Website generator
- CLI installer
- Any future distribution method

---

## Common Questions

### Why not edit `dist/` directly?
Because:
- It will be overwritten by the build
- It causes divergence between source and output
- It breaks automation

### Why not give users `snippets/` directly?
Because:
- Too many files to manage
- More thinking required
- Higher friction for installation

### Is this over-engineering?
No. This is **minimum architecture** once you care about:
- Quality
- Scale
- Longevity
- Maintainability

---

## Design Principles

### Single Source of Truth
- Source snippets are the only manually edited files
- Everything else is generated

### Automation Over Manual Work
- Build layer prevents human error
- Consistency guaranteed

### User Experience First
- Distribution layer optimized for simplest install
- Source layer optimized for maintainability

### Clear Boundaries
- Each layer has explicit responsibilities
- No overlap or confusion

---

## For Contributors

When contributing to Syntax Frame:

1. **Edit only `snippets/` files**
2. **Run the build script**
3. **Commit both source and generated files**
4. **Never manually edit `dist/`**

This ensures consistency and prevents conflicts.

---

## Summary

Syntax Frame's architecture separates **what maintainers work with** from **what users install**.

This separation:
- Makes development cleaner
- Makes installation simpler
- Makes the project sustainable long-term

The build layer is the bridge that makes both sides work perfectly.