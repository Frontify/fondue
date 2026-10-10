# `lists.item`

The `list_item` of bulleted and numbered lists. Enter splits an item, Enter in an empty item outdents it or, at the top level, turns it into a paragraph after the list, and Backspace at the start of an item's first paragraph does the same. Tab nests an item under its previous sibling and moves focus out of the editor when the item cannot nest.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `lists.item` | `list.indent`, `list.outdent` | `Mod-]` and `Tab`, `Mod-[` and `Shift-Tab`, in a list item | none | none | Nests or outdents `list_item` nodes, keeping children (List keys) |
