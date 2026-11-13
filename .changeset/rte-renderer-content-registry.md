---
"@frontify/fondue-rich-text-editor": minor
---

perf(RichTextEditor): the renderer, `serializeToHtml` and `toPlainText` no longer load the editing registry; a plugin list with a duplicate edit view or a malformed hotkey now renders instead of throwing, and only the editor rejects it
