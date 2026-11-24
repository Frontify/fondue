---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): add `validateDocument`, which tells whether a stored value is a structurally valid document without the editor, the DOM or ProseMirror, so it runs in Node. It returns `{ valid: true, document }` or `{ valid: false, issues }`, each issue naming a `reason` and the JSON Pointer `path` of the offending value, and never throws. Unknown block, inline and mark types and extra keys pass, because the editor keeps them.
