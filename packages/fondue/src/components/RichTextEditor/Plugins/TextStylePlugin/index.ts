/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin } from '@udecode/plate-core';

import { Plugin } from '../Plugin';

import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { withTextStyles } from './TextStyleDropdown/withTextStyles';
import { TEXT_STYLE_PLUGIN } from './id';

export class TextStylePlugin extends Plugin {
    public textStyles: Plugin[];
    constructor({ ...pluginProps }) {
        super(TEXT_STYLE_PLUGIN, {
            button: withTextStyles(TextStyleButton, pluginProps.textStyles),
            ...pluginProps,
        });
        this.textStyles = pluginProps.textStyles;
    }

    plugins(): PlatePlugin[] {
        return this.textStyles.map((textStyle) => textStyle.plugins()).flat();
    }
}

export * from './types';
export * from './TextStyles';
