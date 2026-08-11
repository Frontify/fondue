/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import styles from './underline.module.scss';

/** The flag this plugin sets on text nodes. */
export type UnderlineMark = {
    underline?: boolean;
};

export const UnderlinePlugin: RtePlugin = {
    id: 'underline',
    schema: {
        marks: [{ key: 'underline', render: ({ children }) => <u>{children}</u> }],
    },
    toolbar: (api) => (
        <ToolbarButton
            active={api.isMarkActive('underline')}
            onClick={() => api.toggleMark('underline')}
            className={styles.label}
        >
            U
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-u': (api) => api.toggleMark('underline') },
};
