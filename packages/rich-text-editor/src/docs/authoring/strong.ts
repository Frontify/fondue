/* (c) Copyright Frontify Ltd., all rights reserved. */

import { bold } from '#/features';
import { defineEditorPlugin } from '#/index';

/** A host part for `marks.bold`: its toolbar entry `bold` replaces the shipped one, so the button reads Strong. */
export const strongEditor = defineEditorPlugin(bold, {
    toolbar: [
        {
            id: 'bold',
            kind: 'toggle',
            command: 'mark.bold.toggle',
            label: { 'en-US': 'Strong' },
            icon: 'IconTextFormatBold',
            bubble: true,
        },
    ],
});
