/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    autoformatArrow,
    autoformatFraction,
    autoformatLegal,
    autoformatPunctuation,
    autoformatSubscriptNumbers,
    autoformatSubscriptSymbols,
    autoformatSuperscriptNumbers,
    autoformatSuperscriptSymbols,
    createAutoformatPlugin,
} from '@udecode/plate-autoformat';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { type PlatePlugin } from '@udecode/plate-core';
import { ELEMENT_OL, ELEMENT_UL, toggleList, unwrapList } from '@udecode/plate-list';

import { ELEMENT_CHECK_ITEM } from '../CheckboxListPlugin';
import { Plugin, type PluginProps } from '../Plugin';
import { TextStyles } from '../TextStylePlugin';

import { AUTOFORMAT_PLUGIN } from './id';

export class AutoformatPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(AUTOFORMAT_PLUGIN, {
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createAutoformatPlugin({
                options: {
                    rules: [
                        ...autoformatPunctuation,
                        ...autoformatArrow,
                        ...autoformatLegal,
                        ...autoformatSubscriptNumbers,
                        ...autoformatSubscriptSymbols,
                        ...autoformatSuperscriptNumbers,
                        ...autoformatSuperscriptSymbols,
                        ...autoformatFraction,
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
                            format: (editor) => toggleList(editor, { type: ELEMENT_UL }),
                        },
                        {
                            mode: 'block',
                            type: ELEMENT_OL,
                            match: ['1. ', '1) '],
                            preFormat: unwrapList,
                            format: (editor) => toggleList(editor, { type: ELEMENT_OL }),
                        },
                        {
                            mode: 'block',
                            type: ELEMENT_CHECK_ITEM,
                            match: ['[] '],
                        },
                    ],
                },
            }),
        ];
    }
}
