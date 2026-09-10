---
"@frontify/fondue-components": minor
"@frontify/fondue-sdk": patch
"@frontify/fondue": patch
---

feat(Select): add indeterminate values to the multi-select variants

`Select.Multi` and `Select.Combobox.Multiple` accept `indeterminateValues` for values that apply to
only some of the records being edited. Those options render a dash instead of a checkmark and the
field gains a "2 mixed" badge next to the selection badges.

The prop is purely visual and never reported by `onSelect`. Once the user selects such a value,
remove it from `indeterminateValues`; otherwise the dash returns as soon as it is deselected again.

In a narrow field the selection badges collapse into a "3 selected" badge instead of a lone clipped
badge, and into a single "Mixed" badge when not even the counts fit next to each other.
