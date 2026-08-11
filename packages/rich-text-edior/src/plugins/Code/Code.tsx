/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { definePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes. */
export type CodeMark = {
    code?: boolean;
};

export const CodePlugin = definePlugin(() => ({
    id: 'code',
    schema: {
        marks: [{ key: 'code', render: ({ children }) => <code className={styles.code}>{children}</code> }],
    },
    toolbar: (api) => (
        <ToolbarButton title="Code" active={api.isMarkActive('code')} onClick={() => api.toggleMark('code')}>
            <IconCode size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-e': (api) => api.toggleMark('code') },
}));
