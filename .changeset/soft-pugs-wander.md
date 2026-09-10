---
"@frontify/fondue-components": minor
"@frontify/fondue": minor
---

feat(Select): add indeterminate values to the multi-select variants

`Select.Multi` and `Select.Combobox.Multiple` accept `indeterminateValues` for values that apply to
only some of the records being edited. Those options render a dash instead of a checkmark and the
field gains a "2 mixed" badge next to the selection badges.
