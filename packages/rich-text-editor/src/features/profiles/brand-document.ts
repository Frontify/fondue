/* (c) Copyright Frontify Ltd., all rights reserved. */

import { columns } from '#/features/layout-columns/feature';
import { brandStyles } from '#/features/styles-brand/feature';
import { compileContentModel } from '#/model';

import { documentFeatures } from './document';

/** The Brand document profile's features: Document's, with brand styles and columns. */
export const brandDocumentFeatures = [...documentFeatures, brandStyles(), columns()] as const;

/** The compiled content model of the Brand document profile. */
export const brandDocumentModel = compileContentModel(brandDocumentFeatures, {
    id: 'frontify.brand-document',
    version: 1,
});
