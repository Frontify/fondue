---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): let hosts set the look of list markers per nesting level. `bulletListPlugin()` and `numberedListPlugin()` take `{ looks }` to set the marker, its colour, its size (bullets only) and the indent of the first three levels, which repeat deeper down. `bulletListContent({ looks })` and `numberedListContent({ looks })` take the same, so a renderer given only content draws them. A marker with no colour or size of its own takes the body text's, so it matches its item under a body look.
