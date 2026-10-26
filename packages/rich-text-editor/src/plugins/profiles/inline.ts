/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileContentModel } from '#/model';
import { align } from '#/plugins/Align/feature';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { fontColor } from '#/plugins/FontColor/feature';
import { inputRules } from '#/plugins/InputRules/feature';
import { italic } from '#/plugins/Italic/feature';
import { language } from '#/plugins/Language/feature';
import { links } from '#/plugins/Link/feature';
import { underline } from '#/plugins/Underline/feature';

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
