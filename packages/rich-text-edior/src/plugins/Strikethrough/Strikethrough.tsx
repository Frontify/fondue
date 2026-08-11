/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './strikethrough.module.scss';

/** The flag this plugin sets on text nodes. */
export type StrikethroughMark = {
    strikethrough?: boolean;
};

export const StrikethroughPlugin: RtePlugin = {
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
            active={api.isMarkActive('strikethrough')}
            onClick={() => api.toggleMark('strikethrough')}
            className={styles.label}
        >
            S
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-Shift-x': (api) => api.toggleMark('strikethrough') },
};
