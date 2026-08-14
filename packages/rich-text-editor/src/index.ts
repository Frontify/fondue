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
 * `documentFormat.ts` sits beside this file rather than in a layer: closing the
 * open document skeleton over the blocks and marks that actually ship is the
 * composition root's job, and it is the only other file allowed to know the
 * shipped plugin list. The types it produces are tuned for the common case — an
 * app using those plugins — so `RteDocument` means "a document made of the
 * blocks and marks that ship with this editor" and needs no type arguments.
 * Consumer plugins widen the parameters (see `RteBlock`); that is the only
 * place type arguments appear.
 *
 * Nothing else is exported. A type earns its place here only if not having it
 * would *block* an author, not merely inconvenience them, which leaves nine:
 * the four a plugin is written against, `MentionItem` for the one plugin whose
 * data an app supplies, the three document types, and the editor's props.
 *
 * What that rules out, and why none of it blocks anyone: an options type per
 * configurable plugin, because the object literal at the call site is
 * contextually typed; `FloatingSpec` and `RteSelectionSnapshot`, reachable
 * through `RtePlugin` and the control API and never annotated on their own;
 * `RteBlockNode`, which appears only as the constraint on the type parameters
 * below, and which nobody writing an argument for them has to name; and the
 * built-in blocks and marks, reachable through `RteBlock` (a discriminated
 * union `switch (block.type)` narrows) and `RteText`, while a plugin's render
 * function reads its own node type with a cast, the way the shipped plugins do.
 */

// The plugin contract — everything needed to write a plugin. A plugin is a
// function returning an `RtePlugin`, which is also how every built-in below is
// written: `boldPlugin()`, `mentionPlugin({ items })`.
//
// Four types, because that is what a plugin cannot be written without: the
// declaration itself, the two things its extracted components take as props
// (the API a toolbar drives the editor through, the context floating content is
// handed), and the `children` type of a block it contributes. The rest of the
// contract — the floating spec, the input rules, the schema specs — is
// contextually typed inside the `RtePlugin` literal and needs no name here.
export { type EditorControlApi, type FloatingContext, type RteInlineNode, type RtePlugin } from './domain';

// The built-in plugins. Every one is a function, whether or not it takes options;
// compose your own list, or start from `defaultPlugins`, which bundles the
// zero-configuration ones in toolbar order. Nothing is mounted automatically —
// the `plugins` prop is the complete, explicit list.
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
// `MentionItem` is the one plugin option that is data rather than configuration:
// who can be mentioned is the app's, so it builds the array and needs the type.
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
// plugins, assembled in `documentFormat.ts` from the fragment each one declares.
// Three types, one per level an app annotates at — a document, a block in one,
// a text run in one — and each is also the escape hatch a consumer plugin
// widens: `RteDocument<RteBlock | CalloutBlock>` for a block it contributes,
// `RteBlock<RteText & HighlightMark>` for a mark.
export { type RteBlock, type RteDocument, type RteText } from './documentFormat';

/**
 * The editor is generic over its block union with the *official* one as the
 * default, so `value`/`onChange` are typed documents out of the box. Re-typed
 * rather than re-implemented: the component itself stays engine- and
 * plugin-agnostic.
 */
export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = StructuralRichTextEditorProps<TBlock>;

export const RichTextEditor: <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>) => ReactNode =
    StructuralRichTextEditor;
