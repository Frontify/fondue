/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type CodeMark = {
    code?: true;
};

export const codePlugin = (): RtePlugin => ({
    id: 'code',
    schema: [
        {
            kind: 'mark',
            type: 'code',
            toDom: () => ({ tag: 'code', attrs: { class: styles.code ?? '' }, children: true }),
            renderComponent: ({ children }) => <code className={styles.code}>{children}</code>,
        },
    ],
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
    inputRules: [{ kind: 'mark', key: 'code', delimiter: '`' }],
});
