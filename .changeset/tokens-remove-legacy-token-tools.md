---
"@frontify/fondue-tokens": major
---

feat!: remove the legacy token codemod. The `@frontify/fondue-tokens/legacy/tools/replaceLegacyTokens` export is gone (it pointed at a file that was never published). Use a version below 6 if you still need to migrate legacy CSS variables or Tailwind classes.
