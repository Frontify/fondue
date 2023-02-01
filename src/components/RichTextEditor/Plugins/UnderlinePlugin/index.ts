/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createUnderlinePlugin } from '@udecode/plate';
import { UNDERLINE_PLUGIN } from './id';
import { UNDERLINE_CLASSES, UnderlineMarkupElement } from './UnderlineMarkupElement';
import { UnderlineButton } from './UnderlineButton';
import { Plugin, PluginProps } from '../Plugin';

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

    plugins() {
        return [
            createUnderlinePlugin({
                deserializeHtml: {
                    rules: [...PLATE_UNDERLINE_RULES, { validNodeName: ['SPAN'], validClassName: UNDERLINE_CLASSES }],
                },
            }),
        ];
    }
}

export * from './UnderlineMarkupElement';
export * from './UnderlineButton';
export * from './id';
