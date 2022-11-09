/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin } from '../Plugin';
import { TextStylePluginProps } from './TextStyles/types';
import { withSelectableStyles } from './TextStyleDropdown/withSelectableStyles';
import { defaultSelectableStyles } from './defaultSelectableStyles';
import { textStylePluginsRecord } from './TextStyleDropdown/textStylePluginsRecord';

export class TextStylePlugin extends Plugin<TextStylePluginProps> {
    constructor({ selectableStyles = defaultSelectableStyles, ...pluginProps }: Partial<TextStylePluginProps> = {}) {
        super(TEXT_STYLE_PLUGIN, {
            button: withSelectableStyles(TextStyleButton, selectableStyles),
            selectableStyles,
            ...pluginProps,
        });
    }

    plugins() {
        return this.props?.selectableStyles.map((style) => textStylePluginsRecord[style].plugin()) ?? [];
    }
}
