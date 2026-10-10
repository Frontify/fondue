# `input-rules`

The typography input rules, each off until the `typography` option lists its ID, such as `inputRules({ typography: ['typography.dashes'] })`. Every other rule is in its own feature's row. The editor's `inputRules` prop turns all rules off or excludes some by ID.

| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |
|---|---|---|---|---|---|
| `input-rules` | none | none | none | `typography.quotes`, `typography.ellipsis`, `typography.dashes`, `typography.symbols`, `typography.numeric` | Replaces the typed text with the rule's result as one undo step, which the first Mod+Z reverts: quotes for the language at the caret, `...` to an ellipsis, `--` before a space or punctuation to an en dash, `(c)`, `(r)` and `(tm)` to their symbols, and a whole token `1/2`, `1/4`, `3/4`, digits with `^2` or `^3`, or digits `x` digits before a space to ½, ¼, ¾, ², ³ or × |
