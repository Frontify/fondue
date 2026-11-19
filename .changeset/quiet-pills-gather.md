---
"@frontify/fondue-components": minor
"@frontify/fondue": minor
---

feat(RadioList): add a `pill` variant. `RadioList.Root variant="pill"` renders each `RadioList.RadioButton` as a pill with its children inside and a checkmark when selected. `RadioList.RadioButton` now renders its children.

```tsx
<RadioList.Root variant="pill" aria-label="Page size" value={size} onValueChange={setSize}>
    <RadioList.RadioButton id="a4" value="a4">
        A4 <Badge size="small">12</Badge>
    </RadioList.RadioButton>
    <RadioList.RadioButton id="letter" value="letter">
        Letter
    </RadioList.RadioButton>
</RadioList.Root>
```
