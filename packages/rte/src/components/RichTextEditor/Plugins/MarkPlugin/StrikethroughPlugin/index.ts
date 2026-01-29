/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createStrikethroughPlugin } from '@udecode/plate-basic-marks';
import { type PlatePlugin } from '@udecode/plate-core';

import { Plugin, type PluginProps } from '../../Plugin';

import { StrikethroughButton } from './StrikethroughButton';
import { STRIKETHROUGH_CLASSES, StrikethroughMarkupElement } from './StrikethroughMarkupElement';
import { STRIKETHROUGH_PLUGIN } from './id';

export class StrikethroughPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(STRIKETHROUGH_PLUGIN, {
            button: StrikethroughButton,
            markupElement: new StrikethroughMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createStrikethroughPlugin({
                deserializeHtml: {
                    rules: [
                        {
                            validNodeName: ['S', 'DEL', 'STRIKE'],
                        },
                        {
                            validStyle: {
                                textDecoration: ['line-through'],
                            },
                        },
                        {
                            validNodeName: ['SPAN'],
                            validClassName: STRIKETHROUGH_CLASSES,
                        },
                    ],
                },
            }),
        ];
    }
}

export * from './StrikethroughMarkupElement';
