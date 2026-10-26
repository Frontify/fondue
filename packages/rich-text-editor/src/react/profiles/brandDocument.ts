/* (c) Copyright Frontify Ltd., all rights reserved. */

import { brandStylesPlugin } from '#/plugins/BrandStyles';
import { columnsPlugin } from '#/plugins/Columns';
import { brandDocumentModel } from '#/plugins/profiles/brandDocument';

import { compileEditor } from '../compile/compileEditor';
import { defineReactPresentation } from '../compile/presentation';

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
