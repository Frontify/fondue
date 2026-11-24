---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): let hosts set the look of text styles through `textStylePlugin({ look })`. Each text style class now sets all 11 look properties, so host tag rules such as `h1 { color }` no longer reach text styles. The document stylesheet alone writes block margins, so a host rule such as `.prose p { margin: 0 }` no longer changes the spacing of text styles.
