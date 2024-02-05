/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createItalicPlugin } from '@udecode/plate';
import { ITALIC_PLUGIN } from './id';
import { ITALIC_CLASSES, ItalicMarkupElement } from './ItalicMarkupElement';
import { Plugin, PluginProps } from '../../Plugin';
import { ItalicButton } from './ItalicButton';

const PLATE_ITALIC_RULES = [
    { validNodeName: ['EM', 'I'] },
    {
        validStyle: {
            fontStyle: 'italic',
        },
    },
];

export class ItalicPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(ITALIC_PLUGIN, {
            button: ItalicButton,
            markupElement: new ItalicMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [
            createItalicPlugin({
                deserializeHtml: {
                    rules: [...PLATE_ITALIC_RULES, { validNodeName: ['SPAN'], validClassName: ITALIC_CLASSES }],
                },
                options: {
                    hotkey: ['mod+i', 'ctrl+i'],
                },
            }),
        ];
    }
}

export * from './ItalicMarkupElement';
