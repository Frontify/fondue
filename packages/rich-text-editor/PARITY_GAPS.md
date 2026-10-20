# Parity gaps with `@frontify/fondue-rte`

What the old editor (`packages/rte`) does that this package does not yet do. Each gap is either **planned** (part of the parity work) or **deferred** (known, intentionally not in scope for now).

## Deferred

| Gap | Old | Notes |
| --- | --- | --- |
| Slate → `RteDocument` importer | Stored value is Slate JSON as a string | Without it, content stored by the old editor cannot be loaded. Needs a DOM-free `fromSlate(nodes)`; old quote text style maps to the `quote` block, `lic`/`ul`/`ol` and `checkbox-item` to the new lists. |
| Text style overrides | Each text style plugin (`heading1`–`4`, `custom1`–`3`, `quote`, `imageTitle`, `imageCaption`) and the link plugin take `styles: CSSProperties` | Guidelines inject brand typography this way. `plugins/TextStyle/textStyle.module.scss` hardcodes Fondue tokens. Likely shape: a plugin option compiled to `--rte-*` custom properties via `contentProperties`, read with the current token as fallback. |
| Markdown | `SlateToMarkdown`, `MarkdownToSlate` (remark-based, with mention, link and list extensions) | Check whether any consumer still calls them before building `toMarkdown`/`fromMarkdown`. |
| Compatibility layer | `PluginComposer`, `value: string`, `onTextChange(string)` | A `LegacyRichTextEditor` that maps old plugin ids/options and props onto the new ones. Custom consumer plugins (Plate code) cannot be mapped. |

## Planned

### Features

| Gap | Old | Plan |
| --- | --- | --- |
| Mention kinds | `MentionableCategory`: `user`, `group`, `all`, plus `image` | Optional `kind` and `image` on `MentionItem`; `href` optional (`@all` has no profile). Changes the stored format (additive). |
| Emoji | `EmojiPlugin`: toolbar picker and `:` combobox, inserts plain text | `emojiPlugin()` reusing Mention's draft/picker pattern; needs a framework-free emoji dataset. |
| Typographic autoformat | `AutoformatPlugin`: arrows, fractions, ©/®/™, sub/superscript digits | New `{ kind: 'text'; match; replace }` input rule in `core/plugin.ts`, used by a `typographyPlugin()`. |
| `_x_` shortcut | Underline | Currently italic here. Decide which to keep. |
| Document helpers | `toPlaintext`, `isPlateValueEmpty`, `EMPTY_RICH_TEXT_VALUE` | `isEmpty(doc)` and `toPlainText(doc)` in `core/`; `emptyDocument()` already exists. |

### Props and plugin options

| Old | Plan |
| --- | --- |
| `position: Position.BOTTOM` | `toolbarPlacement: 'bottom'` |
| `padding: PaddingSizes` | `padding` mapped to spacing tokens |
| `border` | Covered by `showEditor`, unless the border is needed without the toolbar |
| `placeholderOpacity` | Drop unless a consumer uses `'high'` |
| `toolbarWidth`, `hideExternalFloatingModals`, `id`, `onValueChanged` | Drop |
| ColumnBreak `customClass`; default of 1 column | `className` option; default `columns` to 1 (currently 2) |
| BlurOnBreak `onBreak` | `blurOnBreakPlugin({ onBreak })` |
| Align `validTypes` | Drop: alignment applies to every block |

### Verification

A parity test: render each old fixture with the old `serializeToHtml`, parse that HTML into this editor, and compare text, marks and blocks. Covers pasting from the old editor too. Only checks what the old HTML carries (mention ids and checkbox state need checking).
