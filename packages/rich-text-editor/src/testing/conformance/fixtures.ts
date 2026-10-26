/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextDocument } from '#/model';
import aligned from '#/plugins/Align/fixtures/aligned.json';
import bold from '#/plugins/Bold/fixtures/bold.json';
import styles from '#/plugins/BrandStyles/fixtures/styles.json';
import bullets from '#/plugins/BulletList/fixtures/bullets.json';
import tasks from '#/plugins/CheckList/fixtures/tasks.json';
import inlineCode from '#/plugins/Code/fixtures/code.json';
import code from '#/plugins/CodeBlock/fixtures/code.json';
import columns from '#/plugins/Columns/fixtures/columns.json';
import checks from '#/plugins/ContentChecks/fixtures/checks.json';
import paragraphs from '#/plugins/Core/fixtures/paragraphs.json';
import emoji from '#/plugins/Emoji/fixtures/emoji.json';
import colors from '#/plugins/FontColor/fixtures/colors.json';
import headings from '#/plugins/Heading/fixtures/headings.json';
import images from '#/plugins/Image/fixtures/images.json';
import typography from '#/plugins/InputRules/fixtures/typography.json';
import italic from '#/plugins/Italic/fixtures/italic.json';
import language from '#/plugins/Language/fixtures/language.json';
import links from '#/plugins/Link/fixtures/links.json';
import items from '#/plugins/ListItem/fixtures/items.json';
import mentions from '#/plugins/Mention/fixtures/mentions.json';
import ordered from '#/plugins/OrderedList/fixtures/ordered.json';
import outlineDocument from '#/plugins/Outline/fixtures/outline.json';
import quote from '#/plugins/Quote/fixtures/quote.json';
import clear from '#/plugins/ResetFormatting/fixtures/clear.json';
import rules from '#/plugins/Rule/fixtures/rules.json';
import strike from '#/plugins/Strikethrough/fixtures/strike.json';
import subscript from '#/plugins/Subscript/fixtures/subscript.json';
import superscript from '#/plugins/Superscript/fixtures/superscript.json';
import underline from '#/plugins/Underline/fixtures/underline.json';
import uploaded from '#/plugins/Upload/fixtures/uploaded.json';

/** The stored documents each shipped feature brings, by feature ID and fixture name. */
// Per-feature fixture groups are written loosely and read back as documents at this one boundary.
export const featureFixtures = {
    core: { paragraphs },
    emoji: { emoji },
    'marks.bold': { bold },
    'marks.italic': { italic },
    'marks.language': { language },
    'marks.underline': { underline },
    'marks.strike': { strike },
    'marks.code': { code: inlineCode },
    'blocks.code': { code },
    'blocks.align': { aligned },
    'format.clear': { clear },
    'marks.subscript': { subscript },
    'marks.superscript': { superscript },
    'marks.font-color': { colors },
    links: { links },
    'blocks.heading': { headings },
    'blocks.quote': { quote },
    'blocks.rule': { rules },
    'layout.columns': { columns },
    'lists.item': { items },
    'lists.bullet': { bullets },
    'lists.ordered': { ordered },
    'lists.task': { tasks },
    'styles.brand': { styles },
    'input-rules': { typography },
    mentions: { mentions },
    'nav.outline': { outline: outlineDocument },
    'a11y.content-checks': { checks },
    'media.image': { images },
    'media.upload': { uploaded },
} as unknown as Readonly<Record<string, Readonly<Record<string, RichTextDocument>>>>;
