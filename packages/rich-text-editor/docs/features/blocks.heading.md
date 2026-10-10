# `blocks.heading`

Headings `h1` to `h6`. A stored heading keeps its level, even one the policy's `creatableHeadingLevels` leaves out, while `heading.set` with such a level returns `not-allowed`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `blocks.heading` | `heading.set` with `{ level }` | `mac:Mod-Alt-1` to `mac:Mod-Alt-6`, `other:Ctrl-Shift-1` to `other:Ctrl-Shift-6`, each passing its `{ level }`: `mac:Mod-Alt-1`, `mac:Mod-Alt-2`, `mac:Mod-Alt-3`, `mac:Mod-Alt-4`, `mac:Mod-Alt-5`, `mac:Mod-Alt-6`, `other:Ctrl-Shift-1`, `other:Ctrl-Shift-2`, `other:Ctrl-Shift-3`, `other:Ctrl-Shift-4`, `other:Ctrl-Shift-5`, `other:Ctrl-Shift-6` | Creatable heading levels in the text style picker: Heading 1, Heading 2, Heading 3, Heading 4, Heading 5, Heading 6 | `heading.hashes` | Turns textblocks into a `heading` of that level, keeping inline content and block attributes |
