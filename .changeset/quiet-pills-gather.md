---
"@frontify/fondue-components": minor
"@frontify/fondue": minor
---

feat(RadioList): add a `pill` variant. `RadioList.Root variant="pill"` renders each `RadioList.RadioButton` as a pill with its children inside and a checkmark when selected, and `RadioList.Count` adds a count badge to a pill. `RadioList.RadioButton` now forwards its ref and no longer requires an `id`.

```tsx
<RadioList.Root variant="pill" aria-label="Page size" value={size} onValueChange={setSize}>
    <RadioList.RadioButton value="a4">
        A4
        <RadioList.Count>12</RadioList.Count>
    </RadioList.RadioButton>
    <RadioList.RadioButton value="letter">Letter</RadioList.RadioButton>
</RadioList.Root>
```
