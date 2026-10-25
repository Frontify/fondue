/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocksAlign/feature';
import { core } from '#/features/core/feature';
import { inputRules } from '#/features/inputRules/feature';
import { links } from '#/features/links/feature';
import { bold } from '#/features/marksBold/feature';
import { fontColor } from '#/features/marksFontColor/feature';
import { italic } from '#/features/marksItalic/feature';
import { language } from '#/features/marksLanguage/feature';
import { underline } from '#/features/marksUnderline/feature';
import { compileContentModel } from '#/model';

/** The Inline profile's features: one paragraph of marks and links, and the marks and alignment a richer surface may hold. */
export const inlineFeatures = [
    core(),
    bold(),
    italic(),
    underline(),
    links(),
    fontColor(),
    language(),
    align(),
    inputRules(),
] as const;

/** The compiled content model of the Inline profile. */
export const inlineModel = compileContentModel(inlineFeatures, { id: 'frontify.inline', version: 1 });
