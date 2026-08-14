/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type RteBlock } from './documentFormat';
import { type RteBlockNode } from './domain';
import {
    RichTextEditor as StructuralRichTextEditor,
    type RichTextEditorProps as StructuralRichTextEditorProps,
} from './ui';

/**
 * The package's public API, and the composition root: the editor component, the
 * built-in plugins, and the official document format assembled from them.
 *
 * The layers behind it, innermost first — each may import the ones above it and
 * none of the ones below, which the linter enforces:
 *
 * - `domain/`    what a document, a plugin and the editing commands are
 * - `ports/`     how a live editor is driven, and how a render becomes DOM
 * - `adapters/`  `prosemirror/` implements the engine, `reactProbe/` the render
 * - `ui/`        the React shell driving it; its hooks are the application logic
 * - `plugins/`   the features, each written against `domain/` alone
 *
 * Swapping the engine means writing one more `CreateEditor` and nothing else.
 *
 * `serializeToHtml.ts` sits beside this file for the same reason `documentFormat.ts`
 * does — choosing the engine and the probe that draw a document is the
 * composition root's job, and it is the second place (after the editor's own
 * hook) where that choice is made.
 *
 * `documentFormat.ts` sits beside this file rather than in a layer: closing the
 * open document skeleton over the blocks and marks that actually ship is the
 * composition root's job, and it is the only other file allowed to know the
 * shipped plugin list. So `RteDocument` means "a document made of the blocks
 * and marks that ship with this editor" and needs no type arguments. Consumer
 * plugins widen the parameters (see `RteBlock`), which is the only place type
 * arguments appear.
 *
 * Nothing else is exported: everything left out is either contextually typed at
 * the call site (plugin options, the schema specs) or reachable through a type
 * that is exported (`FloatingSpec` through `RtePlugin`, the built-in blocks
 * through `RteBlock`).
 */

// The plugin contract — the four types a plugin cannot be written without: the
// declaration itself, the two its extracted components take as props (the API a
// toolbar drives the editor through, the context floating content is handed),
// and the `children` type of a block it contributes. A plugin is a function
// returning an `RtePlugin`, which is how every built-in below is written too:
// `boldPlugin()`, `mentionPlugin({ items })`.
export { type EditorControlApi, type FloatingContext, type RteInlineNode, type RtePlugin } from './domain';

// The built-in plugins. Every one is a function, whether or not it takes
// options; compose your own list, or start from `defaultPlugins`, which bundles
// the zero-configuration ones in toolbar order. Nothing is mounted
// automatically — the `plugins` prop is the complete, explicit list.
export { defaultPlugins } from './plugins';
export { alignPlugin } from './plugins/Align';
export { autoformatPlugin } from './plugins/Autoformat';
export { blurOnBreakPlugin } from './plugins/BlurOnBreak';
export { boldPlugin } from './plugins/Bold';
export { checkListPlugin } from './plugins/CheckList';
export { codePlugin } from './plugins/Code';
export { columnBreakPlugin } from './plugins/ColumnBreak';
export { fontColorPlugin } from './plugins/FontColor';
export { italicPlugin } from './plugins/Italic';
export { linkPlugin } from './plugins/Link';
export { bulletListPlugin, numberedListPlugin } from './plugins/List';
// `MentionItem` is the one plugin option that is data rather than
// configuration: who can be mentioned is the app's, so it builds the array and
// needs the type.
export { mentionPlugin, type MentionItem } from './plugins/Mention';
export { quotePlugin } from './plugins/Quote';
export { resetFormattingPlugin } from './plugins/ResetFormatting';
export { softBreakPlugin } from './plugins/SoftBreak';
export { strikethroughPlugin } from './plugins/Strikethrough';
export { subscriptPlugin } from './plugins/Subscript';
export { superscriptPlugin } from './plugins/Superscript';
export { textStylePlugin } from './plugins/TextStyle';
export { underlinePlugin } from './plugins/Underline';

// The official document format: the wire format of a document written by these
// plugins, assembled in `documentFormat.ts` from the fragment each one
// declares. One type per level an app annotates at — a document, a block, a
// text run — and each is also the escape hatch a consumer plugin widens:
// `RteDocument<RteBlock | CalloutBlock>` for an extra block,
// `RteBlock<RteText & HighlightMark>` for an extra mark.
export { type RteBlock, type RteDocument, type RteText } from './documentFormat';

// The document as HTML, for the places a document goes that the editor does not
// — an email, a page rendered on a server. It draws with the plugins it is
// given, through the same serializer a mounted editor draws with.
export { serializeToHtml, type SerializeToHtmlOptions } from './serializeToHtml';

/**
 * The editor is generic over its block union with the *official* one as the
 * default, so `value`/`onChange` are typed documents out of the box. Re-typed
 * rather than re-implemented: the component itself stays engine- and
 * plugin-agnostic.
 */
export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = StructuralRichTextEditorProps<TBlock>;

export const RichTextEditor: <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>) => ReactNode =
    StructuralRichTextEditor;
