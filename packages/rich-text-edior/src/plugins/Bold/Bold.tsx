/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './bold.module.scss';

/** The flag this plugin sets on text nodes. */
export type BoldMark = {
    bold?: boolean;
};

export const BoldPlugin: RtePlugin = {
    id: 'bold',
    schema: {
        marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong>, parseRules: [{ tag: 'b' }] }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('bold')}
            onClick={() => api.toggleMark('bold')}
            className={styles.label}
        >
            B
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-b': (api) => api.toggleMark('bold') },
};
