# Contraprova

**The answer sounds good. How do you know?**

A free educational application conceived by **Sidiney Rodrigues** to investigate AI responses, compare claims with sources, and document changes in understanding.

[Documentação em português](README.md)

## Version 0.1.0

Six editable stages: question and initial explanation; pasted AI response with optional provenance; claim cards; evidence; justified comparison; revised conclusion, remaining questions, and before/after comparison.

Create, rename, continue, and delete investigations. Drafts save automatically in IndexedDB. Create claims manually or from selected response text. Export one investigation or all records as versioned JSON; import independent copies without overwriting existing records. Export Markdown reports or print, including incomplete drafts. Three read-only demonstrations use explicitly simulated responses and verified sources; create an editable copy to practice.

The interface is **Brazilian Portuguese only**. Documentation is available in Portuguese and English. `i18n.js` provides an initial foundation for future authored translations; remaining UI strings would also need externalization. There is no English interface yet.

This application organizes records. It does not automatically establish truth, detect AI authorship, assess intellectual ability, or score critical thinking. Completion checks required fields, not learning or reasoning quality. Educational effectiveness has not been evaluated.

## Run locally

Use a modern browser with JavaScript and IndexedDB enabled. Serve the `dist` folder:

```sh
python -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Do not open through `file://`: the application uses JavaScript modules. No installation, production dependencies, backend, credentials, or external API is required. Publish the contents of `dist` on a static host. Offline installation, account features and synchronization are not implemented.

Records belong to the browser profile and origin (protocol, host and port). Export and import JSON when moving to another address.

## Architecture

| File | Responsibility |
| --- | --- |
| `dist/index.html` | Semantic structure and metadata |
| `dist/assets/app.js` | User interface and six-stage workflow |
| `dist/assets/core.js` | Data model, validation, import and Markdown report |
| `dist/assets/storage.js` | IndexedDB transactions |
| `dist/assets/examples.js` | Demonstrations and sources |
| `dist/assets/i18n.js` | Initial future translation foundation |
| `dist/assets/styles.css` | Responsive layout, focus and printing |
| `dist/assets/owl.webp` | Original AI-assisted owl illustration |

## Format and limits

JSON fields: `format: "contraprova"`, `version: 1`, `exportedAt`, `investigations`. The entire import is validated before an atomic transaction. New identifiers prevent overwrites.

Limits: 2 MB per JSON file, 100 local investigations, 100 claims per investigation, 50 evidence entries per claim, and 100,000 characters per long text. JSON exports enforce the same size limit so they can be reimported. Printed sources may omit their URL. Completed records require an evidence relationship and justification.

## Privacy and security

Application records remain in local IndexedDB without encryption. The code does not transmit them or fetch source URLs. The host still receives file requests and may retain access logs. External sources opened by the user have their own privacy policies. Other people using the same browser profile can access local records. Browser cleanup, private browsing, quota limits or eviction can destroy them: export backups regularly.

Untrusted content enters the DOM through `textContent` or `value`. Clickable URLs accept HTTP/HTTPS without embedded credentials. Imports reject unsupported versions, unknown fields, invalid structures and excessive sizes. Markdown reports escape input HTML and Markdown syntax; this does not guarantee every third-party viewer's behavior. See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md).

## Validation and contribution

Node.js 20 or later:

```sh
npm test
npm run check
```

Optional development-only browser tests:

```sh
npm install
npx playwright install chromium
npm run test:browser
```

Read [VALIDATION.md](VALIDATION.md), [CONTRIBUTING.md](CONTRIBUTING.md), [SOURCES.md](SOURCES.md), and [PILOT.md](PILOT.md). Tests do not establish educational effectiveness or a complete accessibility audit.

## Credits and licenses

Concept and direction: Sidiney Rodrigues. Development, writing, and illustration assisted by AI under human responsibility. References imply no institutional endorsement.

Code: [MIT](LICENSE). Original educational content: [CC BY 4.0](LICENSE-CONTENT.md). External sources retain their own rights. Demonstrations contain attributed paraphrases rather than full copied texts.
