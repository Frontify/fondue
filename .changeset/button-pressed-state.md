---
"@frontify/fondue-components": minor
"@frontify/fondue": minor
---

feat(Button): add a pressed state. A `Button` with `aria-pressed="true"`, `aria-pressed="mixed"` or `aria-checked="true"` (with `role="radio"`) shows a pressed background in every variant and emphasis. A `Button` that already passes one of these attributes shows the new look without a code change. `Card.ActionButton` now renders a weak, small, square `Button`; it no longer accepts a `role` prop and no longer keeps a highlighted look while its menu is open.
