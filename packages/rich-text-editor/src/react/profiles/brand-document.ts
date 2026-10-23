/* (c) Copyright Frontify Ltd., all rights reserved. */

import { columnsEditor } from '#/features/layout-columns/editor';
import { brandDocumentModel } from '#/features/profiles/brand-document';
import { brandEditor } from '#/features/styles-brand/editor';

import { compileEditor } from '../compile-editor';
import { defineReactPresentation } from '../presentation';

import { documentParts, documentReaders, documentToolbar } from './document';
import { NOT_CREATABLE, partsOf, type ShippedProfile } from './parts';

const ALIGNMENTS = ['left', 'center', 'right', 'justify'] as const;

// The column break joins the toolbar only with a presentation of more than one column, which this one is not.
const PRESENTATION = defineReactPresentation({
    toolbar: documentToolbar([ALIGNMENTS.map((align) => ({ command: 'block.align.set', payload: { align } }))]),
});

/** The profile's definition and default presentation, compiled once by the loader. */
export const shipped = (): ShippedProfile => ({
    definition: compileEditor(
        {
            id: 'frontify.brand-document',
            model: brandDocumentModel,
            policy: { features: { 'input-rules': NOT_CREATABLE }, enterBehavior: 'paragraph' },
        },
        partsOf([...documentParts, brandEditor, columnsEditor]),
        documentReaders,
        'brand-document',
    ),
    presentation: PRESENTATION,
});
