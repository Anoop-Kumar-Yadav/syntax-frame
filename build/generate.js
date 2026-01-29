/**
 * Syntax Frame — Global Snippet Generator
 *
 * Reads language-specific snippet files from /snippets
 * and generates a single VS Code global snippet file in /dist.
 */

const fs = require("fs");
const path = require("path");

// ---------- PATHS ----------
const ROOT_DIR = path.resolve(__dirname, "..");
const SNIPPETS_DIR = path.join(ROOT_DIR, "snippets");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const OUTPUT_FILE = path.join(DIST_DIR, "syntax-frame.code-snippets");

// ---------- LANGUAGE NAME MAP ----------
const LANGUAGE_LABELS = {
  "javascript.json": "JavaScript",
  "python.json": "Python",
  "html.json": "HTML",
  "css.json": "CSS",
  "java.json": "Java"
};

// ---------- HELPERS ----------
function fail(message) {
  console.error("❌ Generator Error:");
  console.error(message);
  process.exit(1);
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ---------- MAIN ----------
function generate() {
  if (!fs.existsSync(SNIPPETS_DIR)) {
    fail("Missing /snippets directory.");
  }

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR);
  }

  const outputSnippets = {};

  const files = fs.readdirSync(SNIPPETS_DIR).filter(f => f.endsWith(".json"));

  if (files.length === 0) {
    fail("No snippet files found in /snippets.");
  }

  for (const fileName of files) {
    const filePath = path.join(SNIPPETS_DIR, fileName);
    const languageLabel = LANGUAGE_LABELS[fileName];

    if (!languageLabel) {
      fail(`No language label defined for file: ${fileName}`);
    }

    let sourceJson;
    try {
      sourceJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      fail(`Invalid JSON in ${fileName}`);
    }

    if (!isObject(sourceJson)) {
      fail(`Top-level JSON must be an object in ${fileName}`);
    }

    for (const [snippetName, snippet] of Object.entries(sourceJson)) {
      // ---------- VALIDATION ----------
      if (!isObject(snippet)) {
        fail(`Snippet "${snippetName}" in ${fileName} is not an object`);
      }

      if (!snippet.prefix) {
        fail(`Missing "prefix" in snippet "${snippetName}" (${fileName})`);
      }

      if (!snippet.scope) {
        fail(`Missing "scope" in snippet "${snippetName}" (${fileName})`);
      }

      if (!snippet.body) {
        fail(`Missing "body" in snippet "${snippetName}" (${fileName})`);
      }

      const bodyType = typeof snippet.body;
      if (
        !Array.isArray(snippet.body) &&
        bodyType !== "string"
      ) {
        fail(`Invalid "body" type in snippet "${snippetName}" (${fileName})`);
      }

      // ---------- KEY NAMESPACING ----------
      const globalKey = `${snippetName} — ${languageLabel}`;

      if (outputSnippets[globalKey]) {
        fail(`Duplicate global snippet key detected: ${globalKey}`);
      }

      // ---------- COPY AS-IS ----------
      outputSnippets[globalKey] = snippet;
    }
  }

  // ---------- WRITE OUTPUT ----------
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(outputSnippets, null, 2),
    "utf8"
  );

  console.log("✅ Syntax Frame global snippet generated successfully:");
  console.log(`   ${OUTPUT_FILE}`);
}

// ---------- RUN ----------
generate();
