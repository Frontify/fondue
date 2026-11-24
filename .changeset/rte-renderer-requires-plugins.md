---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor)!: `RichTextRenderer`, `serializeToHtml`, `parseHtml` and `toPlainText` require `plugins` and no longer fall back to `defaultContent`, so a read-only view bundles only the plugins it passes. Pass `defaultContent` from `@frontify/fondue-rich-text-editor/plugins` to keep every shipped plugin. The editor still defaults to `defaultPlugins`.
