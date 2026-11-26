---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): show `columnBreakContent` columns as one column in a narrow container, below 440px for 2 columns and 740px for more, as the legacy editor did. The element around the content becomes an inline-size container, so a parent that shrinks to fit its content must give it a width.
