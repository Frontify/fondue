---
'@frontify/fondue-tokens': minor
---

Handle value-output tokens (breakpoints) as a first-class concept instead of one-off exceptions:

- Breakpoint keys are renamed from Figma names to Tailwind-conventional names: `x-small`/`small`/`medium`/`large`/`x-large`/`xx-large` → `xs`/`sm`/`md`/`lg`/`xl`/`2xl`. This affects Tailwind `screens` variants (`sm:` instead of `small:`), keys in `semantic.json`, and ids in `manifest.json`.
- `--breakpoint-*` CSS variables are no longer emitted into `themes.module.css` (they were never valid to consume — CSS variables cannot be used in media queries).
- In `manifest.json`, every token now carries an `output` field (`'variable' | 'value'`). Value-output tokens have `cssVariable: null` (previously a non-existent variable reference) and their `value` holds the literal to use (e.g. `768px`); breakpoints report their Tailwind screen variant (e.g. `md:`) instead of a non-existent utility class.
- Unit conversion (`px`/`rem`) is now declared per token group in `config.json` instead of hardcoded token-name lists.
