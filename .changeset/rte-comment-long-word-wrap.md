---
"@frontify/fondue-rte": patch
---

fix(RichTextEditor): wrap long words and URLs instead of scrolling horizontally

Long unbreakable strings (URLs, long words) in rich text no longer force a sideways scroll. All editor content and every element of the serialized HTML use `overflow-wrap: anywhere`, which lowers the reported min-content width so the text wraps even inside a shrink-wrapping container (such as a `ScrollArea` viewport). Genuinely wide, unshrinkable content (fixed-width media, `nowrap`) still scrolls horizontally.
