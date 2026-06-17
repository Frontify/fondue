---
"@frontify/fondue-components": minor
---

feat(Card.Banner): add a `tone` prop

`Card.Banner` now accepts `tone="dim" | "inverted"`. `inverted` renders the dark
drop-target state (near-black background, white icon), while `dim` pins the
background and opts out of the implicit hover/active background shift that
otherwise applies when a `Card.BannerIcon` is nested. Leaving `tone` unset
preserves the previous behavior, so existing consumers are unaffected.
