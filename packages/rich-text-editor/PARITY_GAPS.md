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

### Props and plugin options

| Old | Plan |
| --- | --- |
| `position: Position.BOTTOM` | `toolbarPlacement: 'bottom'` |
| `padding: PaddingSizes`, `border` | Drop: the editor draws no frame (border, background, inset); the host wraps it in its own box. `showEditor` only hides the toolbar and `/` menu |
| `placeholderOpacity` | Drop unless a consumer uses `'high'` |
| `toolbarWidth`, `hideExternalFloatingModals`, `id`, `onValueChanged` | Drop |
| ColumnBreak `customClass`; default of 1 column | `className` option; default `columns` to 1 (currently 2) |
| BlurOnBreak `onBreak` | `blurOnBreakPlugin({ onBreak })` |
| Align `validTypes` | Drop: alignment applies to every block |

### Verification

A parity test: render each old fixture with the old `serializeToHtml`, parse that HTML into this editor, and compare text, marks and blocks. Covers pasting from the old editor too. Only checks what the old HTML carries (mention ids and checkbox state need checking).
