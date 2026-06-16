---
"@frontify/fondue-components": minor
---

feat(Card.Root): forward `className`

`Card.Root` now forwards a `className` onto its root element, merged after the
internal styles. This enables layout hooks such as Tailwind's `group` (e.g. to
drive `group-hover:` styles on descendants) without an extra wrapper element.
