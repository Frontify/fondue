---
"@frontify/fondue-components": minor
---

feat(Card.BannerImage): add a `padding` prop

`Card.BannerImage` now accepts `padding="none" | "small" | "medium" | "large"`
(none by default; small 12px, medium 24px, large 32px). Padding is applied
inside the banner and pairs best with `fit="contain"`, giving previews such as
logos or icons breathing room without dropping out of the component. Backward
compatible — existing images default to `none`.
