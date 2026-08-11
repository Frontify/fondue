/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/domain';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes. */
export type CodeMark = {
    code?: boolean;
};

export const codePlugin = (): RtePlugin => ({
    id: 'code',
    schema: {
        marks: [{ key: 'code', render: ({ children }) => <code className={styles.code}>{children}</code> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            title="Code"
            active={'code' in api.selection.get().marks}
            onClick={() => api.marks.toggle('code')}
        >
            <IconCode size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-e': (api) => api.marks.toggle('code') },
});
