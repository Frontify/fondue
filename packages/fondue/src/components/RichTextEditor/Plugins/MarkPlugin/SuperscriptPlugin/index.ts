/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createSuperscriptPlugin } from '@udecode/plate-basic-marks';
import { type PlatePlugin } from '@udecode/plate-core';

import { SuperscriptButton } from '@components/RichTextEditor/Plugins/MarkPlugin/SuperscriptPlugin/SupercriptButton';
import { SuperscriptMarkupElement } from '@components/RichTextEditor/Plugins/MarkPlugin/SuperscriptPlugin/SuperscriptMarkupElement';
import { SUPERSCRIPT_PLUGIN } from '@components/RichTextEditor/Plugins/MarkPlugin/SuperscriptPlugin/id';

import { Plugin, type PluginProps } from '../../Plugin';

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
