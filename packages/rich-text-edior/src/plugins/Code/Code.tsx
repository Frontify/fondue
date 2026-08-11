/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes. */
export type CodeMark = {
    code?: boolean;
};

export const CodePlugin: RtePlugin = {
    id: 'code',
    schema: {
        marks: [{ key: 'code', render: ({ children }) => <code className={styles.code}>{children}</code> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('code')}
            onClick={() => api.toggleMark('code')}
            className={styles.label}
        >
            {'</>'}
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-e': (api) => api.toggleMark('code') },
};
