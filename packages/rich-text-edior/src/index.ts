/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type AlignAttribute } from './plugins/Align';
import { type BoldMark } from './plugins/Bold';
import { type CheckItemBlock, type CheckListBlock } from './plugins/CheckList';
import { type CodeMark } from './plugins/Code';
import { type ColumnBreakBlock } from './plugins/ColumnBreak';
import { type FontColorMark } from './plugins/FontColor';
import { type ImageBlock } from './plugins/Image';
import { type ItalicMark } from './plugins/Italic';
import { type LinkMark } from './plugins/Link';
import { type BulletListBlock, type ListItemBlock, type NumberedListBlock } from './plugins/List';
import { type MentionInline } from './plugins/Mention';
import { type QuoteBlock } from './plugins/Quote';
import { type BreakInline } from './plugins/SoftBreak';
import { type StrikethroughMark } from './plugins/Strikethrough';
import { type SubscriptMark } from './plugins/Subscript';
import { type SuperscriptMark } from './plugins/Superscript';
import { type TextStyleBlock } from './plugins/TextStyle';
import { type UnderlineMark } from './plugins/Underline';
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

// The plugin contract — everything needed to write a plugin. A plugin is a
// function returning an `RtePlugin`, which is also how every built-in below is
// written: `boldPlugin()`, `mentionPlugin({ items })`.
export {
    type EditorControlApi,
    type FloatingContext,
    type FloatingSpec,
    type RteBlockNode,
    type RteInlineNode,
    type RtePlugin,
} from './RichTextEditor';

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
export { columnBreakPlugin, type ColumnBreakPluginOptions } from './plugins/ColumnBreak';
export { fontColorPlugin } from './plugins/FontColor';
export { imagePlugin } from './plugins/Image';
export { italicPlugin } from './plugins/Italic';
export { linkPlugin } from './plugins/Link';
export { bulletListPlugin, numberedListPlugin } from './plugins/List';
export { mentionPlugin, type MentionItem, type MentionPluginOptions } from './plugins/Mention';
export { quotePlugin } from './plugins/Quote';
export { resetFormattingPlugin } from './plugins/ResetFormatting';
export { softBreakPlugin } from './plugins/SoftBreak';
export { strikethroughPlugin } from './plugins/Strikethrough';
export { subscriptPlugin } from './plugins/Subscript';
export { superscriptPlugin } from './plugins/Superscript';
export { textStylePlugin, type TextStyleOption, type TextStylePluginOptions } from './plugins/TextStyle';
export { underlinePlugin } from './plugins/Underline';

// ---------------------------------------------------------------------------
// The official RTE document format
// ---------------------------------------------------------------------------

/**
 * A text run as the shipped plugins write it: the marks that exist, and nothing
 * else. Closed on purpose — `{ text: 'x', bod: true }` is a compile error,
 * which the open text node behind the plugin contract cannot catch.
 */
export type RteText = { text: string } & BoldMark &
    ItalicMark &
    UnderlineMark &
    StrikethroughMark &
    CodeMark &
    SubscriptMark &
    SuperscriptMark &
    FontColorMark &
    LinkMark;

/**
 * What may sit inside a text block: a text run, or one of the void inline
 * elements the shipped plugins contribute. Both of those are closed types, so
 * they do not weaken the excess-property check that catches mark typos — the
 * open `RteInlineElementNode` behind the plugin contract would.
 */
type OfficialInline<TExtraInline extends RteInlineNode> = RteText | BreakInline | MentionInline | TExtraInline;

/**
 * Rewrites an official block's `children` from the open skeleton to the
 * official inline union, and adds the alignment every text block carries.
 * Distributes over the union; container blocks (lists) and blocks without
 * children (images) pass through — their children are already concrete.
 * `Omit &` preserves the `type` literal, so `switch` still narrows.
 */
type WithOfficialChildren<TBlock, TExtraInline extends RteInlineNode> = TBlock extends { children: RteBlockNode[] }
    ? TBlock
    : TBlock extends { children: RteInlineNode[] }
      ? Omit<TBlock, 'children'> & AlignAttribute & { children: OfficialInline<TExtraInline>[] }
      : TBlock;

/**
 * Lists are where the document nests, so their types are assembled rather than
 * mapped: a list holds items, an item holds a paragraph and any list nested
 * under it. Written out this way, a mark typo three levels deep is still caught.
 *
 * Each level is an interface extending the plugin's own type. That is what makes
 * the recursion legal — a chain of *aliases* referring back to itself is
 * circular, while an interface's members resolve lazily.
 */
/* eslint-disable typescript/no-empty-object-type -- the empty body IS the mechanism: an interface extending the plugin's type is how the recursion below stays legal. */
interface OfficialListItem<TExtraInline extends RteInlineNode> extends ListItemBlock<
    OfficialItemContent<TExtraInline>
> {}
interface OfficialCheckItem<TExtraInline extends RteInlineNode> extends CheckItemBlock<
    OfficialItemContent<TExtraInline>
> {}
interface OfficialBulletList<TExtraInline extends RteInlineNode> extends BulletListBlock<
    OfficialListItem<TExtraInline>
> {}
interface OfficialNumberedList<TExtraInline extends RteInlineNode> extends NumberedListBlock<
    OfficialListItem<TExtraInline>
> {}
interface OfficialCheckList<TExtraInline extends RteInlineNode> extends CheckListBlock<
    OfficialCheckItem<TExtraInline>
> {}
/* eslint-enable typescript/no-empty-object-type */

type OfficialItemContent<TExtraInline extends RteInlineNode> =
    | WithOfficialChildren<ParagraphBlock, TExtraInline>
    | OfficialList<TExtraInline>;

type OfficialList<TExtraInline extends RteInlineNode> =
    | OfficialBulletList<TExtraInline>
    | OfficialNumberedList<TExtraInline>
    | OfficialCheckList<TExtraInline>;

/**
 * The official RTE block union: every block type the built-in plugins produce,
 * with strictly typed children. Apps, serializers, and backend code should
 * consume THIS, not the structural `RteBlockNode`. Extending it is a
 * wire-format change and should be a deliberate act, made in the same PR that
 * ships the plugin implementing the new type.
 *
 * `TExtraInline` is the escape hatch for consumer plugins that contribute a
 * mark or an inline element: pass `RteText & HighlightMark` for an extra mark,
 * or `EmbedInline` for an extra inline element.
 */
export type RteBlock<TExtraInline extends RteInlineNode = never> =
    | WithOfficialChildren<ParagraphBlock | QuoteBlock | TextStyleBlock, TExtraInline>
    | ImageBlock
    | ColumnBreakBlock
    | OfficialList<TExtraInline>;

/**
 * A document of official blocks — what `RichTextEditor` reads and emits, and
 * the annotation to use when authoring one by hand:
 *
 * ```ts
 * const doc: RteDocument = {
 *     version: 1,
 *     blocks: [{ type: 'textStyle', style: 'heading2', children: [{ text: 'Title' }] }],
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
