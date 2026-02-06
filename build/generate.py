"""
Syntax Frame — Global Snippet Generator (Python)

Reads language-specific snippet files from /snippets
and generates a single VS Code global snippet file in /dist.
"""

import json
import os
import sys

# ---------- PATHS ----------
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SNIPPETS_DIR = os.path.join(ROOT_DIR, "snippets")
DIST_DIR = os.path.join(ROOT_DIR, "dist")
OUTPUT_FILE = os.path.join(DIST_DIR, "syntax-frame.code-snippets")

# ---------- LANGUAGE NAME MAP ----------
LANGUAGE_LABELS = {
    "javascript.json": "JavaScript",
    "python.json": "Python",
    "html.json": "HTML",
    "css.json": "CSS",
    "java.json": "Java",
}

# ---------- HELPERS ----------
def fail(message: str):
    print("❌ Generator Error:")
    print(message)
    sys.exit(1)

def is_object(value):
    return isinstance(value, dict)

# ---------- MAIN ----------
def generate():
    if not os.path.isdir(SNIPPETS_DIR):
        fail("Missing /snippets directory.")

    os.makedirs(DIST_DIR, exist_ok=True)

    output_snippets = {}

    files = sorted(f for f in os.listdir(SNIPPETS_DIR) if f.endswith(".json"))

    if not files:
        fail("No snippet files found in /snippets.")

    for file_name in files:
        file_path = os.path.join(SNIPPETS_DIR, file_name)
        language_label = LANGUAGE_LABELS.get(file_name)

        if not language_label:
            fail(f"No language label defined for file: {file_name}")

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                source_json = json.load(f)
        except json.JSONDecodeError:
            fail(f"Invalid JSON in {file_name}")

        if not is_object(source_json):
            fail(f"Top-level JSON must be an object in {file_name}")

        for snippet_name, snippet in source_json.items():
            # ---------- VALIDATION ----------
            if not is_object(snippet):
                fail(f'Snippet "{snippet_name}" in {file_name} is not an object')

            if "prefix" not in snippet:
                fail(f'Missing "prefix" in snippet "{snippet_name}" ({file_name})')

            if "scope" not in snippet:
                fail(f'Missing "scope" in snippet "{snippet_name}" ({file_name})')

            if "body" not in snippet:
                fail(f'Missing "body" in snippet "{snippet_name}" ({file_name})')

            body = snippet["body"]
            if not isinstance(body, (list, str)):
                fail(f'Invalid "body" type in snippet "{snippet_name}" ({file_name})')

            # ---------- KEY NAMESPACING ----------
            global_key = f"{snippet_name} — {language_label}"

            if global_key in output_snippets:
                fail(f"Duplicate global snippet key detected: {global_key}")

            # ---------- COPY AS-IS ----------
            output_snippets[global_key] = snippet

    # ---------- WRITE OUTPUT ----------
    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="\n") as f:
        json.dump(output_snippets, f, indent=2, ensure_ascii=False)

    print("OK: Syntax Frame global snippet generated successfully:")
    print(f"   {OUTPUT_FILE}")

# ---------- RUN ----------
if __name__ == "__main__":
    generate()
