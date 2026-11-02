---
"@frontify/fondue-rte": patch
---

fix(RichTextEditor): wrap long words and URLs instead of scrolling horizontally

Long unbreakable strings (URLs, long words) wrap inside shrink-wrapping containers, such as a `ScrollArea` viewport, while editing and in serialized HTML. Serialized HTML carries the class `[overflow-wrap:anywhere]` where it carried `tw-break-words`.
