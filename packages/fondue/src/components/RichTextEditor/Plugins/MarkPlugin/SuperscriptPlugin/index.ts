/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, createSuperscriptPlugin } from '@udecode/plate';
import { Plugin, PluginProps } from '../../Plugin';
import { SuperscriptButton } from '@components/RichTextEditor/Plugins/MarkPlugin/SuperscriptPlugin/SupercriptButton';
import { SUPERSCRIPT_PLUGIN } from '@components/RichTextEditor/Plugins/MarkPlugin/SuperscriptPlugin/id';
import { SuperscriptMarkupElement } from '@components/RichTextEditor/Plugins/MarkPlugin/SuperscriptPlugin/SuperscriptMarkupElement';

export class SuperscriptPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(SUPERSCRIPT_PLUGIN, {
            button: SuperscriptButton,
            markupElement: new SuperscriptMarkupElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createSuperscriptPlugin({
                options: {
                    hotkey: ['mod+,', 'ctrl+,'],
                },
            }),
        ];
    }
}

export * from './SuperscriptMarkupElement';
