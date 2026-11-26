---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): add `collapse` to `columnBreakContent` and `columnBreakPlugin`. With `collapse: true` the columns show as one column in a narrow container, below 440px for 2 columns and 740px for more, as the legacy editor did; the element around the content then becomes an inline-size container, so a parent that shrinks to fit its content must give it a width. Without it, nothing changes.
