---
"@frontify/fondue-rich-text-editor": minor
---

refactor(RichTextEditor): block spacing follows the document's structure and declared `childSpacing`, the same in the stylesheet and the inline-style export; blocks that hold blocks carry `data-rte-child-spacing`, and exported column breaks carry `data-rte-own-margins`. A block whose content holds blocks is spaced apart unless it declares `childSpacing: 'tight'`. A spaced element without own margins has its `margin-block` set by the document, whatever its tag. A block no plugin defines inside a list is now drawn in the list's item tag, and drawing throws when the list's item type has no definition.
