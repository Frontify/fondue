/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-components/styles';
import '@frontify/fondue-tokens/styles';
import { type ReactNode } from 'react';

import { type BoldMark } from './plugins/bold';
import { type HeadingBlock } from './plugins/heading';
import { type ImageBlock } from './plugins/image';
import { type ItalicMark } from './plugins/italic';
import { type LinkMark } from './plugins/link';
import { type QuoteBlock } from './plugins/quote';
import {
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    RichTextEditor as StructuralRichTextEditor,
    type RichTextEditorProps as StructuralRichTextEditorProps,
} from './RichTextEditor';

/**
 * The package's public API: the editor surface (src/RichTextEditor) plus the
 * built-in plugins and the official document format assembled from them.
 *
 * The types are tuned for the common case — an app using the shipped plugins —
 * so `RteDocument` means "a document made of the blocks and marks that ship
 * with this editor" and needs no type arguments. Consumer plugins widen the
 * parameters (see `RteBlock`); that is the only place type arguments appear.
 *
 * Nothing else is exported. A type earns its place here only if not having it
 * would *block* an author, not merely inconvenience them: the built-in blocks
 * and marks are reachable through `RteBlock` (a discriminated union `switch
 * (block.type)` narrows) and `RteText`, and a plugin's render function reads
 * its own node type with a cast, the way the shipped plugins do.
 */

// The plugin contract — everything needed to write a plugin.
export { type EditorControlApi, type RteBlockNode, type RteInlineNode, type RtePlugin } from './RichTextEditor';

// The built-in plugins. Compose your own list; `defaultPlugins` bundles all of
// them in toolbar order. Nothing is mounted automatically — the `plugins` prop
// is the complete, explicit list.
export { defaultPlugins } from './plugins';
export { BoldPlugin } from './plugins/bold';
export { HeadingPlugin } from './plugins/heading';
export { ImagePlugin } from './plugins/image';
export { ItalicPlugin } from './plugins/italic';
export { LinkPlugin } from './plugins/link';
export { QuotePlugin } from './plugins/quote';

// ---------------------------------------------------------------------------
// The official RTE document format
// ---------------------------------------------------------------------------

/**
 * A text run as the shipped plugins write it: the marks that exist, and nothing
 * else. Closed on purpose — `{ text: 'x', bod: true }` is a compile error,
 * which the open text node behind the plugin contract cannot catch.
 *
 * Note that void inline elements (mentions) are deliberately NOT part of the
 * official inline union: their index signature would satisfy the union's
 * excess-property check and every mark typo would pass again. Consumer inline
 * elements come in through `RteBlock`'s parameter instead.
 */
export type RteText = { text: string } & BoldMark & ItalicMark & LinkMark;

/**
 * Rewrites an official block's `children` from the open skeleton to the
 * official inline union, so mark keys are checked inside block literals.
 * Distributes over the union; blocks without children (images) pass through.
 * `Omit &` preserves the `type` literal, so `switch` still narrows.
 */
type WithOfficialChildren<TBlock, TExtraInline> = TBlock extends { children: RteInlineNode[] }
    ? Omit<TBlock, 'children'> & { children: (RteText | TExtraInline)[] }
    : TBlock;

/**
 * The official RTE block union: every block type the built-in plugins produce,
 * with strictly typed children. Apps, serializers, and backend code should
 * consume THIS, not the structural `RteBlockNode`. Extending it is a
 * wire-format change and should be a deliberate act, made in the same PR that
 * ships the plugin implementing the new type.
 *
 * `TExtraInline` is the escape hatch for consumer plugins that contribute a
 * mark or an inline element: pass `RteText & HighlightMark` for an extra mark,
 * or `MentionInline` for an extra inline element.
 */
export type RteBlock<TExtraInline = never> = WithOfficialChildren<
    ParagraphBlock | HeadingBlock | QuoteBlock | ImageBlock,
    TExtraInline
>;

/**
 * A document of official blocks — what `RichTextEditor` reads and emits, and
 * the annotation to use when authoring one by hand:
 *
 * ```ts
 * const doc: RteDocument = {
 *     version: 1,
 *     blocks: [{ type: 'heading', level: 2, children: [{ text: 'Title' }] }],
 * };
 * ```
 *
 * Consumer plugins widen the union once, here:
 * `RteDocument<RteBlock | CalloutBlock>`.
 */
export type RteDocument<TBlock extends RteBlockNode = RteBlock> = RteDocumentOf<TBlock>;

/**
 * The editor is generic over its block union with the *official* one as the
 * default, so `value`/`onChange` are typed documents out of the box. Re-typed
 * rather than re-implemented: the component itself stays engine- and
 * plugin-agnostic.
 */
export type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = StructuralRichTextEditorProps<TBlock>;

export const RichTextEditor: <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>) => ReactNode =
    StructuralRichTextEditor;
