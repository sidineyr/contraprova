# Contraprova

**The answer sounds good. How do you know?**

Conceived by educator Sidiney Rodrigues. Version 0.2 helps investigate a factual claim before accepting or sharing it: enter a sentence, inspect evidence, open a source and decide what to do. No account or mandatory tutorial.

## Scope

This is **not live web search**. A zero-budget local index covers eight topics from seven institutional pages: HTTPS/Wi-Fi, Chrome Incognito, greenhouse effect, charts, correlation/causation, the Moon and generative AI risks. English sources have original Portuguese editorial paraphrases, checked October 1, 2026. Term matching retrieves topic context, not a logical verdict on arbitrary claims. Unsupported topics produce an explicit lack-of-evidence response. No API, key, paid service or backend.

Multiple sentences offer up to three editable candidates. Fact/opinion/prediction/context categories are suggestions. Results expose provenance, limitations and same-origin passages; people may sustain provisionally, revise or suspend judgment, with an optional reason. Correcting a result creates a separate revision and preserves the previous decision in history. Starter examples fill the input, then run the same search; they are not simulated live results.

## Run and test

```sh
python3 -m http.server 8000 --directory dist
npm run check
npm test
npm install --ignore-scripts
npx playwright install --with-deps chromium
npm run test:browser
```

Open http://localhost:8000. Deploy `dist/` to static HTTPS hosting. No build or production dependencies. JavaScript and IndexedDB required. The application interface is **Brazilian Portuguese only**; English documentation does not imply an English interface. Playwright is development-only. Chromium mobile emulation is not physical-device validation.

## Architecture and preservation

`app.js`: UI; `search.js` and `corpus.js`: bounded editorial retrieval; `checks.js`: new model, strict versioned JSON import/export and Markdown; `storage.js`: IndexedDB; `core.js`: retained legacy model/export; `i18n.js`: initial translation structure (remaining copy still needs extraction).

Database v2 adds `checks` without changing old `investigations` or `preferences`. Legacy v0.1 records retain every field and remain readable/exportable. They are not rewritten into automatic evidence. Keep the same deployment origin to preserve browser storage. Autosave follows a 250ms idle pause; internal navigation flushes writes. Abrupt closing during writes or storage failures can lose the latest edit. Export backups.

Import accepts strict v1/v2 JSON, up to 2MB/100 records per file, creating copies without replacing originals. Imported summaries are not authenticated. Text is rendered literally; links accept HTTP(S) without credentials; Markdown escapes untrusted content. Large backups require individual exports. Print uses the browser's PDF support.

## Privacy and limitations

Queries stay on device. Hosting may keep technical access logs but does not receive query text. Opening a source visits its external site; sources are not fetched automatically. No analytics, ads, remote fonts or AI calls. Local records can be lost; deletion and full clearing are available in history.

No truth scores, AI detection or intellectual assessments. Same-origin passages are not independent confirmations. Human decisions are situated interpretations, not votes establishing truth. Pedagogical effectiveness and superiority to chatbots have **not been established**.

See [PRODUCT.md](PRODUCT.md), [SOURCES.md](SOURCES.md), [PILOT.md](PILOT.md), [VALIDATION.md](VALIDATION.md), [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [CHANGELOG.md](CHANGELOG.md). Code: MIT. Original educational content: CC BY 4.0. Third-party material retains its rights.
