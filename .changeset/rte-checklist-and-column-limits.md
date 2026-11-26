---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): keep content the legacy format cannot hold out of new documents. `checkListPlugin` and `checkListContent` take `inProgress` and `nested` (both default `true`) to leave out in-progress items and lists inside an item. `checkListContent` is now a function: call `checkListContent()` instead of passing `checkListContent`. Inserting a column break at the start of the document or right after another break does nothing. A stored block that its parent can no longer hold, such as a list in a check item with `nested: false`, now loads as a block the editor keeps unchanged instead of failing to load.
