/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createFontColorPlugin } from '@udecode/plate-font';

import { Position } from '@components/RichTextEditor/components/EditorPositioningWrapper';

import { Plugin, type PluginProps } from '../Plugin';

import { FontColorButton } from './FontColorButton';

export class FontColorPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super('font-color-plugin', { button: FontColorButton, ...props });
    }

    showIn = [Position.BOTTOM, Position.TOP];

    plugins = () => [createFontColorPlugin()];
}
