/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatUnderline } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type UnderlineMark = {
    underline?: boolean;
};

export const underlinePlugin = (): RtePlugin => ({
    id: 'underline',
    schema: {
        marks: [{ key: 'underline', render: ({ children }) => <u>{children}</u> }],
    },
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
