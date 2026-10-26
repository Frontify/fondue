/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileContentModel } from '#/model';
import { contentChecks } from '#/plugins/ContentChecks/feature';
import { heading } from '#/plugins/Heading/feature';
import { image } from '#/plugins/Image/feature';
import { outline } from '#/plugins/Outline/feature';
import { resetFormatting } from '#/plugins/ResetFormatting/feature';
import { rule } from '#/plugins/Rule/feature';
import { subscript } from '#/plugins/Subscript/feature';
import { superscript } from '#/plugins/Superscript/feature';
import { upload } from '#/plugins/Upload/feature';

import { commentFeatures } from './comment';

/** The Document profile's features: Comment's, with headings, rules, images, the outline and the content checks. */
export const documentFeatures = [
    ...commentFeatures,
    subscript(),
    superscript(),
    heading(),
    rule(),
    image(),
    upload(),
    outline(),
    resetFormatting(),
    contentChecks(),
] as const;

/** The compiled content model of the Document profile. */
export const documentModel = compileContentModel(documentFeatures, { id: 'frontify.document', version: 1 });
