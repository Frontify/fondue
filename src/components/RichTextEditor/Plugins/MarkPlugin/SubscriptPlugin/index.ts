/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createSubscriptPlugin } from '@udecode/plate';
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

    plugins() {
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
