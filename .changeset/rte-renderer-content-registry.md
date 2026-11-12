---
"@frontify/fondue-rich-text-editor": minor
---

perf(RichTextEditor): the renderer, `serializeToHtml` and `toPlainText` no longer load the editing registry or the CSS colour parser; parse rules get a `read.color(property)` reader (`RtePlugin.ParseReader`)
