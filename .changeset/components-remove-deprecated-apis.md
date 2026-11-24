---
"@frontify/fondue-components": major
---

feat!: remove deprecated APIs

- `Accordion.Trigger`: put the content in `Accordion.Header` directly.
- `Table.Root` `sticky` (`'head' | 'col' | 'both'`): use `Table.Header sticky` for a sticky header, and `Table.Body firstColumnSticky` or `lastColumnSticky` for sticky columns.
- `Textarea` `extraActions` and the `ExtraAction` type: use `Textarea.Slot` with your own buttons.
- `ThemeProvider` `translations`: use `locale`.
