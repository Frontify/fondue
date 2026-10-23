/* (c) Copyright Frontify Ltd., all rights reserved. */

import aligned from '#/features/blocks-align/fixtures/aligned.json';
import code from '#/features/blocks-code/fixtures/code.json';
import headings from '#/features/blocks-heading/fixtures/headings.json';
import quote from '#/features/blocks-quote/fixtures/quote.json';
import paragraphs from '#/features/core/fixtures/paragraphs.json';
import emoji from '#/features/emoji/fixtures/emoji.json';
import typography from '#/features/input-rules/fixtures/typography.json';
import bullets from '#/features/lists-bullet/fixtures/bullets.json';
import items from '#/features/lists-item/fixtures/items.json';
import ordered from '#/features/lists-ordered/fixtures/ordered.json';
import tasks from '#/features/lists-task/fixtures/tasks.json';
import bold from '#/features/marks-bold/fixtures/bold.json';
import inlineCode from '#/features/marks-code/fixtures/code.json';
import italic from '#/features/marks-italic/fixtures/italic.json';
import strike from '#/features/marks-strike/fixtures/strike.json';
import subscript from '#/features/marks-subscript/fixtures/subscript.json';
import superscript from '#/features/marks-superscript/fixtures/superscript.json';
import underline from '#/features/marks-underline/fixtures/underline.json';
import { type RichTextDocument } from '#/model';

/** The stored documents each shipped feature brings, by feature ID and fixture name. */
export const featureFixtures = {
    core: { paragraphs },
    emoji: { emoji },
    'marks.bold': { bold },
    'marks.italic': { italic },
    'marks.underline': { underline },
    'marks.strike': { strike },
    'marks.code': { code: inlineCode },
    'blocks.code': { code },
    'blocks.align': { aligned },
    'marks.subscript': { subscript },
    'marks.superscript': { superscript },
    'blocks.heading': { headings },
    'blocks.quote': { quote },
    'lists.item': { items },
    'lists.bullet': { bullets },
    'lists.ordered': { ordered },
    'lists.task': { tasks },
    'input-rules': { typography },
} as unknown as Readonly<Record<string, Readonly<Record<string, RichTextDocument>>>>;
