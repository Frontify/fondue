/* (c) Copyright Frontify Ltd., all rights reserved. */

import { extendPlugin } from '#/entries/authoring';
import { boldPlugin } from '#/index';

/** A host plugin for `marks.bold`: its toolbar entry `bold` replaces the shipped one, so the button reads Strong. */
export const strongPlugin = extendPlugin(boldPlugin(), {
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
