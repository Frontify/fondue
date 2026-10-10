# `core`

The document, paragraphs, text, hard breaks, undo history and block moves that every model installs.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `core` | `paragraph.set`, `text.insert` with `{ text }`, `hard-break.insert`, `history.undo`, `history.redo`, `block.move.up`, `block.move.down` | `mac:Mod-Alt-0` and `other:Ctrl-Shift-0` for `paragraph.set`; `Mod-z` for `history.undo`; `Mod-Shift-z` and `other:Ctrl-y` for `history.redo`; `Shift-Enter` for `hard-break.insert`; `Mod-Alt-ArrowUp` and `Mod-Alt-ArrowDown` for `block.move.up` and `block.move.down` | Normal text in the text style picker; Undo and Redo; Move up and Move down in the More menu | none | Holds `doc`, `paragraph`, `text` and `hard_break`; typing inserts text, and `text.insert` replaces the selection with its `text`; `hard-break.insert` inserts `hard_break`, or a newline in a code block; `paragraph.set` turns textblocks into paragraphs and keeps inline content and block attributes; `history.undo` and `history.redo` undo and redo one step; the block moves swap the blocks at the selection with their previous or next sibling as one undo step |
