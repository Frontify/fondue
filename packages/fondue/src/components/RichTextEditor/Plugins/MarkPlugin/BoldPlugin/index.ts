/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin } from '@udecode/plate-core';
import { createBoldPlugin } from '@udecode/plate-basic-marks';
import { BOLD_PLUGIN } from './id';
import { BOLD_CLASSES, BoldMarkupElement } from './BoldMarkupElement';
import { BoldButton } from './BoldButton';
import { Plugin, PluginProps } from '../../Plugin';

const PLATE_BOLD_RULES = [
    { validNodeName: ['STRONG', 'B'] },
    {
        validStyle: {
            fontWeight: ['600', '700', 'bold'],
        },
    },
];

export class BoldPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(BOLD_PLUGIN, {
            button: BoldButton,
            markupElement: new BoldMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createBoldPlugin({
                deserializeHtml: {
                    rules: [...PLATE_BOLD_RULES, { validNodeName: ['SPAN'], validClassName: BOLD_CLASSES }],
                },
                options: {
                    hotkey: ['mod+b', 'ctrl+b'],
                },
            }),
        ];
    }
}

export * from './BoldMarkupElement';
