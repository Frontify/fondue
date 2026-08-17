/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type UnderlineMark = {
    underline?: true;
};

export const underlinePlugin = (): RtePlugin => ({
    id: 'underline',
    schema: [
        {
            kind: 'mark',
            type: 'underline',
            toDom: () => ({ tag: 'u', children: true }),
            renderComponent: ({ children }) => <u>{children}</u>,
        },
    ],
    toolbar: (api) => (
        <ToolbarButton
            title="Underline"
            active={'underline' in api.selection.get().marks}
            onClick={() => api.marks.toggle('underline')}
        >
            <IconTextFormatUnderline size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-u': (api) => api.marks.toggle('underline') },
    inputRules: [{ kind: 'mark', key: 'underline', delimiter: '_' }],
});
