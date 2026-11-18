---
"@frontify/fondue-rich-text-editor": minor
---

feat(RichTextEditor)!: every plugin is now a function. Call `boldPlugin()`, `linkPlugin()`, `bulletListPlugin()` and so on instead of passing `boldPlugin`; this applies to `boldPlugin`, `italicPlugin`, `underlinePlugin`, `strikethroughPlugin`, `codePlugin`, `subscriptPlugin`, `superscriptPlugin`, `fontColorPlugin`, `linkPlugin`, `alignPlugin`, `bulletListPlugin`, `numberedListPlugin`, `checkListPlugin`, `quotePlugin`, `historyPlugin`, `resetFormattingPlugin`, `softBreakPlugin` and `blurOnBreakPlugin`. `defaultPlugins` stays a list.
