/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin } from '../Plugin';
import { TextStylePluginProps } from './TextStyles/types';
import { withTextStyles } from './TextStyleDropdown/withTextStyles';
import { defaultTextStyles } from './TextStyles/defaultTextStyles';
import { getTextStylePlugins } from './getTextStylePlugins';

export class TextStylePlugin extends Plugin<TextStylePluginProps> {
    constructor({ textStyles = defaultTextStyles, ...pluginProps }: Partial<TextStylePluginProps> = {}) {
        super(TEXT_STYLE_PLUGIN, {
            button: withTextStyles(TextStyleButton, textStyles),
            textStyles,
            ...pluginProps,
        });
    }

    plugins() {
        const plug = getTextStylePlugins(this.props?.textStyles ?? []);
        console.log(plug);
        return plug;
    }
}
