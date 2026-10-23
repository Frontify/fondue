/* (c) Copyright Frontify Ltd., all rights reserved. */

import aligned from '#/features/blocks-align/fixtures/aligned.json';
import paragraphs from '#/features/core/fixtures/paragraphs.json';
import bold from '#/features/marks-bold/fixtures/bold.json';
import { type RichTextDocument } from '#/model';

/** The stored documents each shipped feature brings, by feature ID and fixture name. */
export const featureFixtures = {
    core: { paragraphs },
    'marks.bold': { bold },
    'blocks.align': { aligned },
} as unknown as Readonly<Record<string, Readonly<Record<string, RichTextDocument>>>>;
