/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { brandStyles } from './feature';

/** Sets the brand style of the selected paragraphs and headings, or resets it with `null`, from the text style picker. */
export const brandEditor = defineEditorPart(brandStyles, {
    commands: {
        'block.style.set': {
            payload: { fields: { styleId: { type: 'id', nullable: true } } },
            run: (api, { styleId }: { readonly styleId: string | null }) =>
                api.attributes.set(['paragraph', 'heading'], { styleId }),
            active: (api, { styleId }) => api.attributes.active(['paragraph', 'heading'], { styleId }),
        },
    },
    toolbar: [
        {
            id: 'default-style',
            kind: 'toggle',
            command: 'block.style.set',
            payload: { styleId: null },
            labelKey: 'RichTextEditor_defaultStyle',
            icon: 'IconEraser',
        },
    ],
});
