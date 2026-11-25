---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor): add `validateDocument`, which tells whether a stored value is a structurally valid document without the editor, the DOM or ProseMirror, so it runs in Node. It returns `{ valid: true, document }` or `{ valid: false, issues }`, each issue a `reason` (`not-an-object`, `unsupported-version`, `not-an-array`, `missing-type`, `malformed-text`, `cycle`) and the JSON Pointer `path` of the offending value. It reports at most 100 issues, the first ones in document order, with a repeated node's issues at every path, and never throws on parsed JSON. Unknown block, inline and mark types and extra keys pass, because the editor keeps them.
