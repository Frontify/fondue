# `core`

The document, paragraphs, text, hard breaks and undo history that every model installs.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `core` | `text.insert` with `{ text }`, `history.undo`, `history.redo` | `Mod-z` for `history.undo`, `Mod-Shift-z` for `history.redo` | none | none | Holds `doc`, `paragraph`, `text` and `hard_break`; typing inserts text, and `text.insert` replaces the selection with its `text`; `history.undo` and `history.redo` undo and redo one step |
