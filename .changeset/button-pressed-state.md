---
"@frontify/fondue-components": minor
"@frontify/fondue": minor
---

feat(Button): add a pressed state. A `Button` with `aria-pressed="true"` or `aria-checked="true"` (with `role="radio"`) lays 9% of its own text colour over its background, and `aria-pressed="mixed"` lays 4.5%, so every variant and emphasis keeps its tone. A `Button` that already passes one of these attributes shows the new look without a code change. `Card.ActionButton` now renders a weak, small, square `Button`; it no longer accepts a `role` prop and no longer keeps a highlighted look while its menu is open.
