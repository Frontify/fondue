---
"@frontify/fondue-components": patch
"@frontify/fondue-rte": patch
---

fix(RichTextEditor, ScrollArea): wrap long words and URLs instead of scrolling horizontally

Long unbreakable strings in rich text no longer force a sideways scroll. `RichTextEditor` paragraphs and list items now carry a break rule so typed text wraps, and list items are capped at the container width so their `inline-flex` box can no longer shrink-wrap to a long word. `ScrollArea` no longer lets its Radix viewport shrink-wrap to content width, so a break-enabled paragraph wraps to the visible width. Genuinely wide, unshrinkable content (fixed-width media, `nowrap`) still scrolls horizontally.
