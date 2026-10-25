/* (c) Copyright Frontify Ltd., all rights reserved. */

import { contentChecks } from '#/features/a11yContentChecks/feature';
import { heading } from '#/features/blocksHeading/feature';
import { rule } from '#/features/blocksRule/feature';
import { formatClear } from '#/features/formatClear/feature';
import { subscript } from '#/features/marksSubscript/feature';
import { superscript } from '#/features/marksSuperscript/feature';
import { mediaImage } from '#/features/mediaImage/feature';
import { mediaUpload } from '#/features/mediaUpload/feature';
import { outline } from '#/features/navOutline/feature';
import { compileContentModel } from '#/model';

import { commentFeatures } from './comment';

/** The Document profile's features: Comment's, with headings, rules, images, the outline and the content checks. */
export const documentFeatures = [
    ...commentFeatures,
    subscript(),
    superscript(),
    heading(),
    rule(),
    mediaImage(),
    mediaUpload(),
    outline(),
    formatClear(),
    contentChecks(),
] as const;

/** The compiled content model of the Document profile. */
export const documentModel = compileContentModel(documentFeatures, { id: 'frontify.document', version: 1 });
