---
"@frontify/fondue-components": minor
"@frontify/fondue": minor
---

feat(Button): add a pressed state. A `Button` with `aria-pressed="true"`, `aria-pressed="mixed"`, `aria-checked="true"` (with `role="radio"`) or `aria-expanded="true"` keeps the colours it shows while held down, in every variant and emphasis. A `Button` that already passes one of these attributes shows the new look without a code change. Default weak `Button` now uses the surface tokens on hover (`--color-surface-hover`) and when pressed (`--color-surface-active`), as in the Button design. `Card.ActionButton` now renders a default-emphasis, small, square `Button`, so it is filled at rest and shows that look while its menu is open; it no longer accepts a `role` prop.
