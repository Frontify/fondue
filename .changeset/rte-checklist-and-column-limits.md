---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor): let a host keep content the legacy format cannot hold out of new documents. The check list options default to today's behaviour.

- `checkListPlugin` takes `inProgress` and `nested` (both default `true`) to leave out in-progress items and lists inside an item.
- Inserting a column break at the start of the document or next to another break does nothing, as it would only make an empty column.
- New block field `separator` in plugin definitions: a void block that only stands between content. The editor does not insert it first in the document or next to another block of its type. The column break sets it.
- Fix: below the document root, a stored block its parent cannot hold now loads and is kept unchanged instead of failing to load. For example, a list in a check item with `nested: false`. A list holding something other than its items still fails to load.
