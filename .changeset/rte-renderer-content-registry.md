---
"@frontify/fondue-rich-text-editor": minor
---

perf(RichTextEditor): the renderer, `serializeToHtml` and `toPlainText` no longer load the editing registry or the CSS colour parser; parse rules get a `read.color(property)` reader; a stored font colour that is not lowercase hex is no longer rendered
