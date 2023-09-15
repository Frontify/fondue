/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { Plugin, PluginProps } from '../Plugin';
import { AUTOFORMAT_PLUGIN } from './id';
import {
    ELEMENT_OL,
    ELEMENT_UL,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
    toggleList,
    unwrapList,
} from '@udecode/plate';
import { TextStyles } from '../TextStylePlugin';

export class AutoformatPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(AUTOFORMAT_PLUGIN, {
            ...props,
        });
    }

    plugins() {
        return [
            createAutoformatPlugin({
                options: {
                    rules: [
                        {
                            mode: 'mark',
                            type: [MARK_UNDERLINE],
                            match: ['_', '_'],
                            ignoreTrim: true,
                        },
                        {
                            mode: 'mark',
                            type: [MARK_BOLD],
                            match: ['**', '**'],
                            ignoreTrim: true,
                        },
                        {
                            mode: 'mark',
                            type: [MARK_ITALIC],
                            match: ['*', '*'],
                            ignoreTrim: true,
                        },
                        {
                            mode: 'mark',
                            type: [MARK_STRIKETHROUGH],
                            match: ['~~', '~~'],
                            ignoreTrim: true,
                        },
                        {
                            mode: 'mark',
                            type: [MARK_CODE],
                            match: ['`', '`'],
                            ignoreTrim: true,
                        },
                        {
                            mode: 'block',
                            match: ['# '],
                            type: TextStyles.heading1,
                        },
                        {
                            mode: 'block',
                            match: ['## '],
                            type: TextStyles.heading2,
                        },
                        {
                            mode: 'block',
                            match: ['### '],
                            type: TextStyles.heading3,
                        },
                        {
                            mode: 'block',
                            match: ['#### '],
                            type: TextStyles.heading4,
                        },
                        {
                            mode: 'block',
                            type: ELEMENT_UL,
                            match: ['- '],
                            preFormat: unwrapList,
                            format: (editor) => toggleList(editor, { type: ELEMENT_UL, pluginKey: 'list-plugin' }),
                        },
                        {
                            mode: 'block',
                            type: ELEMENT_OL,
                            match: ['1. '],
                            preFormat: unwrapList,
                            format: (editor) => toggleList(editor, { type: ELEMENT_OL, pluginKey: 'list-plugin' }),
                        },
                    ],
                },
            }),
        ];
    }
}
