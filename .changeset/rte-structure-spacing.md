---
"@frontify/fondue-rich-text-editor": minor
---

refactor(RichTextEditor): block spacing follows the document's structure and declared `childSpacing`, the same in the stylesheet and the inline-style export; blocks that hold blocks carry `data-rte-child-spacing`, and a block hands its own margins to the document through the `--rte-own-margin-top` and `--rte-own-margin-bottom` variables. A block whose content holds blocks is spaced apart unless it declares `childSpacing: 'tight'`. A spaced element has its `margin-block` set by the document, whatever its tag, and a class of the block can override it. A block no plugin defines inside a list is now drawn in the list's item tag, and drawing throws when the list's item type has no definition.
