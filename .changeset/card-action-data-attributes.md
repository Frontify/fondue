---
"@frontify/fondue-components": minor
---

feat(Card.Action): forward arbitrary `data-*` attributes

`Card.Action` now spreads unknown props (notably `data-*` attributes, e.g. an
analytics or onboarding-tour selector) onto the rendered element, so consumers
no longer need an extra wrapper to carry them.
