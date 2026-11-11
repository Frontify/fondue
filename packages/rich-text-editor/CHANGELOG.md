# @frontify/fondue-rich-text-editor

## 0.1.0-beta.1

### Minor Changes

- [#3008](https://github.com/Frontify/fondue/pull/3008) [`52723d6`](https://github.com/Frontify/fondue/commit/52723d6c051eea35913062818ec469a6c650ef7c) Thanks [@fondue-release-bot](https://github.com/apps/fondue-release-bot)! - Bring in the rich text editor changes from main:

  - feat(RichTextEditor): clean up pastes from Word, Outlook and Google Docs
  - feat(RichTextEditor): add `[x] ` and `[~] ` (in progress) to-do shortcuts, autolink on Enter and Shift-Enter, and a drop cursor
  - fix(RichTextEditor): open documents from a newer format version read-only
  - fix(RichTextEditor): keep stored attributes no plugin declares
  - fix(RichTextEditor): replace a font colour in one undo step
  - fix(RichTextEditor): draw an unknown block among a list's items as an item of its own in the reader and export
  - fix(RichTextEditor): keep an unknown block's stored data out of the selection snapshot

## 0.1.0-beta.0

### Minor Changes

- [`a1e088f`](https://github.com/Frontify/fondue/commit/a1e088f019e10c42b338c45ba1f53d9d703dc023) Thanks [@noahwaldner](https://github.com/noahwaldner)! - feat: publish `@frontify/fondue-rich-text-editor` and re-export it from `@frontify/fondue/rich-text-editor` (styles: `@frontify/fondue/rich-text-editor/styles`)
