---
'@frontify/fondue-components': minor
---

feat(RadioList): allow rendering custom content as the radio via `RadioButton` children/`asChild`

`RadioList.RadioButton` now renders its `children` in place of the default dot indicator, and honours the `asChild` prop so a consumer element becomes the radio itself while keeping the radio role, checked state, roving tab order, and arrow-key navigation. This enables patterns like large selectable cards. Existing usages without `children`/`asChild` are unchanged.
