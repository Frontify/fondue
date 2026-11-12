---
"@frontify/fondue-rich-text-editor": minor
---

fix(RichTextEditor): keep typing rules out of code and technical text. `typographyPlugin` is now a function: call `typographyPlugin()` or `typographyPlugin({ groups })` instead of passing `typographyPlugin`.
