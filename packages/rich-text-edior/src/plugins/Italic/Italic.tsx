/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './italic.module.scss';

/** The flag this plugin sets on text nodes. */
export type ItalicMark = {
    italic?: boolean;
};

export const ItalicPlugin: RtePlugin = {
    id: 'italic',
    schema: {
        marks: [{ key: 'italic', render: ({ children }) => <em>{children}</em>, parseRules: [{ tag: 'i' }] }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('italic')}
            onClick={() => api.toggleMark('italic')}
            className={styles.label}
        >
            I
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-i': (api) => api.toggleMark('italic') },
};
