/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin } from '../Plugin';
import { TextStylePluginProps } from './types';
import { withTextStyles } from './TextStyleDropdown/withTextStyles';

export class TextStylePlugin extends Plugin<TextStylePluginProps> {
    protected textStyles: Plugin[];
    constructor({ textStyles = [], ...pluginProps }: Partial<TextStylePluginProps> = {}) {
        super(TEXT_STYLE_PLUGIN, {
            button: withTextStyles(TextStyleButton, textStyles),
            textStyles,
            ...pluginProps,
        });
        this.textStyles = textStyles;
    }

    plugins() {
        return this.textStyles.map((textStyle) => textStyle.plugins()).flat();
    }
}
