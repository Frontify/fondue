/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCode } from '@frontify/fondue-icons';

import { defineMark, type RtePlugin } from '#/core';

import { ToolbarButton } from '../shared/ToolbarButton/ToolbarButton';

import styles from './code.module.scss';

/** The flag this plugin sets on text nodes: present means on, and `true` is the only value it takes. */
export type CodeMark = {
    code?: true;
};

export const codePlugin = (): RtePlugin => ({
    id: 'code',
    marks: {
        code: defineMark({
            toHtml: () => ({ tag: 'code', attrs: { class: styles.code ?? '' }, children: true }),
            parse: [{ tag: 'code' }],
        }),
    },
    toolbarItem: ({ isActive, toggle }) => (
        <ToolbarButton title="Code" active={isActive} onClick={() => toggle()}>
            <IconCode size={16} />
        </ToolbarButton>
    ),
    hotkeys: { 'Mod-e': (api) => api.marks.toggle('code') },
    inputRules: [{ kind: 'mark', key: 'code', delimiter: '`' }],
});
