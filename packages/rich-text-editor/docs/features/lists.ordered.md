# `lists.ordered`

Numbered lists as `ordered_list`, with `start` from 0 to 1,000,000.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `lists.ordered` | `list.ordered.toggle` with `{ start }`, `list.ordered.start.edit`, `list.ordered.start.set` with `{ start }` | `Mod-Shift-7` | Numbered list toggle, which passes `{ start: 1 }`; Start numbering at in the More menu | `list.ordered.number` | As `lists.bullet`, with `ordered_list` and its `start` |
