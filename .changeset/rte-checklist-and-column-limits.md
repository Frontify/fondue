---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): keep content the legacy format cannot hold out of new documents.

- `checkListPlugin` and `checkListContent` take `inProgress` and `nested` (both default `true`) to leave out in-progress items and lists inside an item.
- `checkListContent` is now a function. Before: `plugins: [checkListContent]`. After: `plugins: [checkListContent()]`.
- New block field `separator` in plugin definitions: a void block that only stands between content. The editor does not insert it first in the document or next to another block of its type. The column break sets it, so inserting one at the start of the document or right after another break does nothing.
- Below the document root, any stored block its parent cannot hold, such as a list in a check item with `nested: false`, now loads and is kept unchanged instead of failing to load. A list holding something other than its items still fails to load.
