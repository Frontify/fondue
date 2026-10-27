/* (c) Copyright Frontify Ltd., all rights reserved. */

// The official document format: the type of a document written by the shipped
// plugins, assembled from the fragment each declares. Type-level only.
//
// Core types are open (any mark key, any children) so the editor can host
// plugins it has never heard of; an app authoring a document wants `bod: true`
// to fail. Everything is closed here, three levels deep into nested lists.
// Exported from the root: `RteBlock`, `RteDocument`, `RteDocumentWith`; the rest is
// private machinery. This file may import `plugins/` (as `index.ts` does);
// `editor/` and the renderer never see it. `__tests__/typeDerivation.spec.ts` asserts it.

import { type ParagraphBlock, type RteBlockNode, type RteDocumentOf, type RteInlineNode } from './core';
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
 * A text run as the shipped plugins write it: the marks that exist and nothing
 * else. Closed on purpose, so `{ text: 'x', bod: true }` is a compile error.
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

/** What may sit in a text block: a text run or a shipped void inline. Closed types, so mark typos still fail the excess-property check. */
type OfficialInline<TExtraInline extends RteInlineNode> = RteText | BreakInline | MentionInline | TExtraInline;

/**
 * Closes a text block's `children` over the official inlines and adds the
 * alignment every text block carries. Containers (lists) and childless blocks
 * pass through. `Omit &` keeps the `type` literal, so `switch` still narrows.
 */
type WithOfficialChildren<TBlock, TExtraInline extends RteInlineNode> = TBlock extends { children: RteBlockNode[] }
    ? TBlock
    : TBlock extends { children: RteInlineNode[] }
      ? Omit<TBlock, 'children'> & AlignAttribute & { children: OfficialInline<TExtraInline>[] }
      : TBlock;

/**
 * Lists are where the document nests, so they are assembled by hand: a list
 * holds items, an item a paragraph or a nested list, so a typo three levels
 * deep is still caught. Each level is an interface extending the plugin's type
 * because recursive *aliases* are circular while interface members resolve lazily.
 */
/* eslint-disable typescript/no-empty-object-type -- the empty body IS the mechanism: an interface extending the plugin's type is how the recursion stays legal. */
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
 * Every block type the built-in plugins produce, with strictly typed children —
 * what apps and backends should consume.
 *
 * `TExtraInline` adds a consumer plugin's mark or inline: `RteText & HighlightMark`
 * or `EmbedInline`.
 */
export type RteBlock<TExtraInline extends RteInlineNode = never> =
    | WithOfficialChildren<ParagraphBlock | QuoteBlock | TextStyleBlock, TExtraInline>
    | ColumnBreakBlock
    | OfficialList<TExtraInline>;

/**
 * A document of official blocks — what `RichTextEditor` reads and emits, and
 * the annotation for authoring one by hand:
 *
 * ```ts
 * const doc: RteDocument = {
 *     version: 1,
 *     blocks: [{ type: 'textStyle', style: 'heading2', children: [{ text: 'Title' }] }],
 * };
 * ```
 *
 * Consumer plugins widen the union once, here:
 * `RteDocument<RteBlock | CalloutBlock>`. Prefer `RteDocumentWith` for marks,
 * blocks and inlines named as such.
 */
export type RteDocument<TBlock extends RteBlockNode = RteBlock> = RteDocumentOf<TBlock>;

type ExtraMarks<TExtra> = [Extract<TExtra, { mark: unknown }>] extends [never]
    ? unknown
    : Extract<TExtra, { mark: unknown }>['mark'];

type ExtraBlocks<TExtra> = [Extract<TExtra, { block: unknown }>] extends [never]
    ? never
    : Extract<TExtra, { block: unknown }>['block'];

type ExtraInlines<TExtra> = [Extract<TExtra, { inline: unknown }>] extends [never]
    ? never
    : Extract<TExtra, { inline: unknown }>['inline'];

/** Widen the official document by what consumer plugins add, instead of nesting `RteDocument<RteBlock<…>>`:
 *
 * ```ts
 * type Doc = RteDocumentWith<{ mark: HighlightMark }>;
 * type Doc = RteDocumentWith<{ block: CalloutBlock }>;
 * type Doc = RteDocumentWith<{ inline: EmbedInline }>;
 * type Doc = RteDocumentWith<{ mark: HighlightMark } | { block: CalloutBlock }>;
 * ```
 */
export type RteDocumentWith<TExtra extends { mark: object } | { block: RteBlockNode } | { inline: RteInlineNode }> =
    RteDocument<ExtraBlocks<TExtra> | RteBlock<(RteText & ExtraMarks<TExtra>) | ExtraInlines<TExtra>>>;
