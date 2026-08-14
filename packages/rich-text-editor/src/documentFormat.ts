/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ParagraphBlock, type RteBlockNode, type RteDocumentOf, type RteInlineNode } from './domain';
import { type AlignAttribute } from './plugins/Align';
import { type BoldMark } from './plugins/Bold';
import { type CheckItemBlock, type CheckListBlock } from './plugins/CheckList';
import { type CodeMark } from './plugins/Code';
import { type ColumnBreakBlock } from './plugins/ColumnBreak';
import { type FontColorMark } from './plugins/FontColor';
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

/**
 * The official RTE document format: the wire format of a document written by
 * *these* plugins, assembled from the fragment each one declares.
 *
 * It sits beside `index.ts` rather than under any layer because assembling it is
 * the composition root's job and nothing else's — it is the one place that knows
 * the shipped plugin list, which is why it may import from `plugins/` at all.
 * The editor below it never sees this file: `ui/` and the adapters work in the
 * open `RteDocumentOf`/`RteBlockNode` skeleton from `domain/`, and closing that
 * skeleton over what ships is purely a type-level act, with no runtime part.
 *
 * Three of the types here are exported from the package; the rest are the
 * machinery that builds them and stay private. What that machinery is *for*: the
 * plugin-facing types are open (a text node takes any mark key, a block takes
 * any children) because the editor must host documents from plugins it has never
 * heard of. An app authoring a document wants the opposite — `bod: true` should
 * not compile. So every plugin-declared fragment is closed over here, three
 * levels deep into nested lists, and the result is what `RichTextEditor` reads
 * and emits. `type-derivation.spec.ts` is where that is asserted.
 */

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
 * children (the column break) pass through — their children are already
 * concrete. `Omit &` preserves the `type` literal, so `switch` still narrows.
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
