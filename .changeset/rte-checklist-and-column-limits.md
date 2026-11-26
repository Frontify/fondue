---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): let a host keep content the legacy format cannot hold out of new documents. Every default stays as it is.

- `checkListPlugin` takes `inProgress` and `nested` (both default `true`) to leave out in-progress items and lists inside an item.
- `columnBreakPlugin` and `columnBreakContent` take `emptyColumns` (default `true`). With `false`, inserting a column break at the start of the document or right after another break does nothing.
- New block field `separator` in plugin definitions: a void block that only stands between content. The editor does not insert it first in the document or next to another block of its type. `emptyColumns: false` sets it on the column break.
