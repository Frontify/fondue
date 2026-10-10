# `lists.task`

Task lists as `task_list` and `task_item`. Each item shows a native checkbox labelled by its text; a click, or Space on the focused checkbox, runs `task.setChecked`.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `lists.task` | `list.task.toggle` with `{ checked? }`, `task.toggle` (runs `task.setChecked` for the item at the selection), `task.setChecked` with `{ nodeId, checked }`, `task.indent`, `task.outdent` | `Mod-Shift-9`; `Mod-Enter` for `task.toggle`; `Mod-]` and `Tab`, `Mod-[` and `Shift-Tab`, in a task item | Task list toggle; the item checkbox | `list.task.brackets` | As `lists.bullet`, with `task_list` and `task_item`; `task.toggle` and `task.setChecked` flip `checked` as one undo step |
