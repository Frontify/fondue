/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocks-align/feature';
import { core } from '#/features/core/feature';
import { inputRules } from '#/features/input-rules/feature';
import { links } from '#/features/links/feature';
import { bold } from '#/features/marks-bold/feature';
import { fontColor } from '#/features/marks-font-color/feature';
import { italic } from '#/features/marks-italic/feature';
import { language } from '#/features/marks-language/feature';
import { underline } from '#/features/marks-underline/feature';
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
