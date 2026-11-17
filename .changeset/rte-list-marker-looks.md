---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): let hosts set the look of list markers per nesting level. `bulletListPlugin` and `numberedListPlugin` are now functions: call `bulletListPlugin()` where you passed `bulletListPlugin`, and pass `{ levels }` to set the marker, its colour, its size (bullets only) and the indent of the first three levels. A list item now takes the body text look, so where no level look is set its marker follows the body colour and size.
