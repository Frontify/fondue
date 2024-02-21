/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createSubscriptPlugin } from '@udecode/plate-basic-marks';
import { PlatePlugin } from '@udecode/plate-core';

import { Plugin, PluginProps } from '../../Plugin';
import { SubscriptButton } from '@components/RichTextEditor/Plugins/MarkPlugin/SubscriptPlugin/SubscriptButton';
import { SubscriptMarkupElement } from '@components/RichTextEditor/Plugins/MarkPlugin/SubscriptPlugin/SubscriptMarkupElement';
import { SUBSCRIPT_PLUGIN } from '@components/RichTextEditor/Plugins/MarkPlugin/SubscriptPlugin/id';

export class SubscriptPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(SUBSCRIPT_PLUGIN, {
            button: SubscriptButton,
            markupElement: new SubscriptMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createSubscriptPlugin({
                options: {
                    hotkey: ['mod+.', 'ctrl+.'],
                },
            }),
        ];
    }
}

export * from './SubscriptMarkupElement';
