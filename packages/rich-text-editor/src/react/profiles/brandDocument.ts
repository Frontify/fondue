/* (c) Copyright Frontify Ltd., all rights reserved. */

import { columnsPlugin } from '#/features/layoutColumns';
import { brandDocumentModel } from '#/features/profiles/brandDocument';
import { brandStylesPlugin } from '#/features/stylesBrand';

import { compileEditor } from '../compileEditor';
import { defineReactPresentation } from '../presentation';

import { documentPlugins, documentToolbar, withSlashMenu } from './document';
import { NOT_CREATABLE, type ShippedProfile } from './parts';

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
            plugins: withSlashMenu([...documentPlugins, brandStylesPlugin(), columnsPlugin()]),
        },
        'brand-document',
    ),
    presentation: PRESENTATION,
});
