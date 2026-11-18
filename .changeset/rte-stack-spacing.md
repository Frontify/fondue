---
"@frontify/fondue-rich-text-editor": minor
---

refactor(RichTextEditor): the document spaces its blocks as a layout stack, whatever their tags, so a block from a new plugin gets the gap between blocks. A block that holds blocks spaces them itself with the `stack` mixin; list and to-do items keep theirs tight, and table cells use the document gap. Margins a block's look hands over through `--rte-own-margin-top` and `--rte-own-margin-bottom` still replace the gap.
