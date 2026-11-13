# @frontify/fondue-rich-text-editor

## 0.1.0-rc.1

### Minor Changes

- [#2981](https://github.com/Frontify/fondue/pull/2981) [`6e27664`](https://github.com/Frontify/fondue/commit/6e27664788d01d3deb813b8ff54b88a9021f91d9) Thanks [@jcosta33](https://github.com/jcosta33)! - feat(RichTextEditor): read pasted marks the way the browser does and make sub and superscript exclusive

- [#2982](https://github.com/Frontify/fondue/pull/2982) [`e65f3ea`](https://github.com/Frontify/fondue/commit/e65f3ea2cf67486e3dedf6111124ce513e69b394) Thanks [@jcosta33](https://github.com/jcosta33)! - fix(RichTextEditor): keep typing rules out of code and technical text. `typographyPlugin` is now a function: call `typographyPlugin()` or `typographyPlugin({ groups })` instead of passing `typographyPlugin`.

- [#2977](https://github.com/Frontify/fondue/pull/2977) [`f5c4140`](https://github.com/Frontify/fondue/commit/f5c4140e8c0050eb64f14dc70e6b8d9d4f0ac315) Thanks [@jcosta33](https://github.com/jcosta33)! - refactor(RichTextEditor): keep plugin content apart from editing UI; plugins move their editing UI out of content

## 0.1.0-rc.0

### Patch Changes

- [#3035](https://github.com/Frontify/fondue/pull/3035) [`cf1839b`](https://github.com/Frontify/fondue/commit/cf1839b10095b928008a8a11934056d0cf5b2581) Thanks [@noahwaldner](https://github.com/noahwaldner)! - First release candidate for Fondue v14.

## 0.1.0-beta.2

### Patch Changes

- [#3012](https://github.com/Frontify/fondue/pull/3012) [`2328458`](https://github.com/Frontify/fondue/commit/232845885a8bf906905a751a352f8e71d188939e) Thanks [@noahwaldner](https://github.com/noahwaldner)! - docs(RichTextEditor): mark the rich text editor as experimental. `@frontify/fondue-rich-text-editor` and the `@frontify/fondue/rich-text-editor` entry can change their API and document format in any release until the editor reaches 1.0.

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
