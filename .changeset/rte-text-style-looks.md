---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): let hosts set the look of text style presets. Each text style block now carries `data-rte-own-margins`, and a block with a style this version does not know is a `<p>` with the class `unknownStyle`. Each preset class now sets all 11 look properties, so host tag rules such as `h1 { color }` no longer reach text styles.
