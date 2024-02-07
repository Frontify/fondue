/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin } from '../Plugin';
import { withTextStyles } from './TextStyleDropdown/withTextStyles';
import { PlatePlugin } from '@udecode/plate';

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
