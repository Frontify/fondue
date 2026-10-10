/* (c) Copyright Frontify Ltd., all rights reserved. */

import headings from '#/features/blocks-heading/fixtures/headings.json';
import quote from '#/features/blocks-quote/fixtures/quote.json';
import paragraphs from '#/features/core/fixtures/paragraphs.json';
import typography from '#/features/input-rules/fixtures/typography.json';
import bold from '#/features/marks-bold/fixtures/bold.json';
import code from '#/features/marks-code/fixtures/code.json';
import italic from '#/features/marks-italic/fixtures/italic.json';
import strike from '#/features/marks-strike/fixtures/strike.json';
import subscript from '#/features/marks-subscript/fixtures/subscript.json';
import superscript from '#/features/marks-superscript/fixtures/superscript.json';
import underline from '#/features/marks-underline/fixtures/underline.json';
import { type RichTextDocument } from '#/model';

/** The stored documents each shipped feature brings, by feature ID and fixture name (SPEC-rich-text/AC-016). */
export const featureFixtures = {
    core: { paragraphs },
    'marks.bold': { bold },
    'marks.italic': { italic },
    'marks.underline': { underline },
    'marks.strike': { strike },
    'marks.code': { code },
    'marks.subscript': { subscript },
    'marks.superscript': { superscript },
    'blocks.heading': { headings },
    'blocks.quote': { quote },
    'input-rules': { typography },
} as unknown as Readonly<Record<string, Readonly<Record<string, RichTextDocument>>>>;
