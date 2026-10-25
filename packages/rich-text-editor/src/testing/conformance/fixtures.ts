/* (c) Copyright Frontify Ltd., all rights reserved. */

import checks from '#/features/a11yContentChecks/fixtures/checks.json';
import aligned from '#/features/blocksAlign/fixtures/aligned.json';
import code from '#/features/blocksCode/fixtures/code.json';
import headings from '#/features/blocksHeading/fixtures/headings.json';
import quote from '#/features/blocksQuote/fixtures/quote.json';
import rules from '#/features/blocksRule/fixtures/rules.json';
import paragraphs from '#/features/core/fixtures/paragraphs.json';
import emoji from '#/features/emoji/fixtures/emoji.json';
import clear from '#/features/formatClear/fixtures/clear.json';
import typography from '#/features/inputRules/fixtures/typography.json';
import columns from '#/features/layoutColumns/fixtures/columns.json';
import links from '#/features/links/fixtures/links.json';
import bullets from '#/features/listsBullet/fixtures/bullets.json';
import items from '#/features/listsItem/fixtures/items.json';
import ordered from '#/features/listsOrdered/fixtures/ordered.json';
import tasks from '#/features/listsTask/fixtures/tasks.json';
import bold from '#/features/marksBold/fixtures/bold.json';
import inlineCode from '#/features/marksCode/fixtures/code.json';
import colors from '#/features/marksFontColor/fixtures/colors.json';
import italic from '#/features/marksItalic/fixtures/italic.json';
import language from '#/features/marksLanguage/fixtures/language.json';
import strike from '#/features/marksStrike/fixtures/strike.json';
import subscript from '#/features/marksSubscript/fixtures/subscript.json';
import superscript from '#/features/marksSuperscript/fixtures/superscript.json';
import underline from '#/features/marksUnderline/fixtures/underline.json';
import images from '#/features/mediaImage/fixtures/images.json';
import uploaded from '#/features/mediaUpload/fixtures/uploaded.json';
import mentions from '#/features/mentions/fixtures/mentions.json';
import outlineDocument from '#/features/navOutline/fixtures/outline.json';
import styles from '#/features/stylesBrand/fixtures/styles.json';
import { type RichTextDocument } from '#/model';

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
