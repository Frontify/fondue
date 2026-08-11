/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconTextFormatStrikethrough } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

/** The flag this plugin sets on text nodes. */
export type StrikethroughMark = {
    strikethrough?: boolean;
};

export const strikethroughPlugin = (): RtePlugin => ({
    id: 'strikethrough',
    schema: {
        marks: [
            {
                key: 'strikethrough',
                render: ({ children }) => <s>{children}</s>,
                parseRules: [{ tag: 'del' }, { tag: 'strike' }],
            },
        ],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Strikethrough"
            active={'strikethrough' in api.selection.get().marks}
            onClick={() => api.marks.toggle('strikethrough')}
        >
            <IconTextFormatStrikethrough size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-Shift-x': (api) => api.marks.toggle('strikethrough') },
    inputRules: [{ kind: 'mark', key: 'strikethrough', delimiter: '~~' }],
});
