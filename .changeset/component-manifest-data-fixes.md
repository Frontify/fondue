---
"@frontify/fondue-components": patch
"@frontify/fondue": patch
---

fix: improve the component manifest data. Canonical examples of `TextInput`, `Checkbox`, `Label`, `Switch`, `Dialog`, `ThemeProvider`, `Select`, `DatePicker`, `Flyout`, `RadioList`, `Textarea` and `Tooltip` are now copy-pasteable, `Text` lists its props, `Switch` and other labelled inputs list `aria-label`/`aria-labelledby`/`aria-describedby`, `Select` no longer lists internal props or a non-existent `Select.Multi`/`Select.Menu`, and the `Checkbox.onChange` and `Select.onSelect` docs explain how to read the checked state and the `null` value on clear
