---
"@frontify/fondue-components": patch
---

fix(DatePicker): report single-click edits to an existing `DatePicker.Range`

When a range is already selected, adjusting it with a single click — for example clicking a day before the current start to move it — is now reported through `onChange` immediately, instead of only after a full two-click selection. Selecting a brand-new range is unchanged (still start, then end).
