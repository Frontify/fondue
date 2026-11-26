---
"@frontify/fondue-rich-text-editor": patch
---

fix(RichTextEditor): an inline no plugin defines keeps its text in the readonly view, the HTML export and plain text, as an unknown block does, and the editor shows the text of a known inline inside it.
