/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createUnderlinePlugin } from '@udecode/plate-basic-marks';
import { type PlatePlugin } from '@udecode/plate-core';

import { Plugin, type PluginProps } from '../../Plugin';

import { UnderlineButton } from './UnderlineButton';
import { UNDERLINE_CLASSES, UnderlineMarkupElement } from './UnderlineMarkupElement';
import { UNDERLINE_PLUGIN } from './id';

const PLATE_UNDERLINE_RULES = [
    {
        validNodeName: ['U'],
    },
    {
        validStyle: {
            textDecoration: ['underline'],
        },
    },
];

export class UnderlinePlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(UNDERLINE_PLUGIN, {
            button: UnderlineButton,
            markupElement: new UnderlineMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createUnderlinePlugin({
                deserializeHtml: {
                    rules: [...PLATE_UNDERLINE_RULES, { validNodeName: ['SPAN'], validClassName: UNDERLINE_CLASSES }],
                },
                options: {
                    hotkey: ['mod+u', 'ctrl+u'],
                },
            }),
        ];
    }
}

export * from './UnderlineMarkupElement';
