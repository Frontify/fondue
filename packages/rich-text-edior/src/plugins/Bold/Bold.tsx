/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatBold } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type BoldMark = {
    bold?: boolean;
};

export const boldPlugin = (): RtePlugin => ({
    id: 'bold',
    schema: {
        marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong>, parseRules: [{ tag: 'b' }] }],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Bold"
            active={'bold' in api.selection.get().marks}
            onClick={() => api.marks.toggle('bold')}
        >
            <IconTextFormatBold size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-b': (api) => api.marks.toggle('bold') },
    inputRules: [{ kind: 'mark', key: 'bold', delimiter: '**' }],
});
