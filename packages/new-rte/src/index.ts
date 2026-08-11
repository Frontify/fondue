/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-components/styles';
import '@frontify/fondue-tokens/styles';
import { type ReactNode } from 'react';

import { type AlignAttribute } from './plugins/align';
import { type BoldMark } from './plugins/bold';
import { type CheckItemBlock, type CheckListBlock } from './plugins/checkList';
import { type CodeMark } from './plugins/code';
import { type ColumnBreakBlock } from './plugins/columnBreak';
import { type FontColorMark } from './plugins/fontColor';
import { type HeadingBlock } from './plugins/heading';
import { type ImageBlock } from './plugins/image';
import { type ItalicMark } from './plugins/italic';
import { type LinkMark } from './plugins/link';
import { type BulletListBlock, type ListItemBlock, type NumberedListBlock } from './plugins/list';
import { type MentionInline } from './plugins/mention';
import { type QuoteBlock } from './plugins/quote';
import { type BreakInline } from './plugins/softBreak';
import { type StrikethroughMark } from './plugins/strikethrough';
import { type SubscriptMark } from './plugins/subscript';
import { type SuperscriptMark } from './plugins/superscript';
import { type TextStyleBlock } from './plugins/textStyle';
import { type UnderlineMark } from './plugins/underline';
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

// The built-in plugins. Compose your own list; `defaultPlugins` bundles the
// zero-configuration ones in toolbar order. Nothing is mounted automatically —
// the `plugins` prop is the complete, explicit list.
export { defaultPlugins } from './plugins';
export { AlignPlugin } from './plugins/align';
export { AutoformatPlugin } from './plugins/autoformat';
export { BlurOnBreakPlugin } from './plugins/blurOnBreak';
export { BoldPlugin } from './plugins/bold';
export { CheckListPlugin } from './plugins/checkList';
export { CodePlugin } from './plugins/code';
export { createColumnBreakPlugin } from './plugins/columnBreak';
export { EmojiPlugin } from './plugins/emoji';
export { FontColorPlugin } from './plugins/fontColor';
export { HeadingPlugin } from './plugins/heading';
export { ImagePlugin } from './plugins/image';
export { ItalicPlugin } from './plugins/italic';
export { LinkPlugin } from './plugins/link';
export { BulletListPlugin, NumberedListPlugin } from './plugins/list';
export { createMentionPlugin, type MentionItem } from './plugins/mention';
export { QuotePlugin } from './plugins/quote';
export { ResetFormattingPlugin } from './plugins/resetFormatting';
export { SoftBreakPlugin } from './plugins/softBreak';
export { StrikethroughPlugin } from './plugins/strikethrough';
export { SubscriptPlugin } from './plugins/subscript';
export { SuperscriptPlugin } from './plugins/superscript';
export { TextStylePlugin } from './plugins/textStyle';
export { UnderlinePlugin } from './plugins/underline';

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
    | WithOfficialChildren<ParagraphBlock | HeadingBlock | QuoteBlock | TextStyleBlock, TExtraInline>
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
