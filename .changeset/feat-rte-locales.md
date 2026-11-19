---
"@frontify/fondue-rich-text-editor": minor
"@frontify/fondue": minor
---

feat(RichTextEditor)!: translate the editor and its shipped plugins into the 11 Fondue languages. Each locale in `@frontify/fondue/locales` (also served at `@frontify/fondue/components/locales`) holds the components' strings and the editor's, for `ThemeProvider`'s `locale`. A plugin `label` can be a function of the editor's language. The `labels` prop is removed
