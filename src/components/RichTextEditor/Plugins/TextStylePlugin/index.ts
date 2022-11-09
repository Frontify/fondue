/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TEXT_STYLE_PLUGIN } from './id';
import { TextStyleButton } from './TextStyleDropdown/TextStyleButton';
import { Plugin } from '../Plugin';
import {
    OptionalTextStyles,
    TextStyles,
    createCustom1Plugin,
    createCustom2Plugin,
    createCustom3Plugin,
    createHeading1Plugin,
    createHeading2Plugin,
    createHeading3Plugin,
    createHeading4Plugin,
    createQuotePlugin,
} from './TextStyles';
import { TextStylePluginProps } from './TextStyles/types';
import { withSelectableStyles } from './TextStyleDropdown/withSelectableStyles';

const TextStylePluginsRecord = {
    [TextStyles.ELEMENT_HEADING1]: { plugin: createHeading1Plugin },
    [TextStyles.ELEMENT_HEADING2]: { plugin: createHeading2Plugin },
    [TextStyles.ELEMENT_HEADING3]: { plugin: createHeading3Plugin },
    [TextStyles.ELEMENT_HEADING4]: { plugin: createHeading4Plugin },
    [TextStyles.ELEMENT_CUSTOM1]: { plugin: createCustom1Plugin },
    [TextStyles.ELEMENT_CUSTOM2]: { plugin: createCustom2Plugin },
    [TextStyles.ELEMENT_CUSTOM3]: { plugin: createCustom3Plugin },
    [TextStyles.ELEMENT_QUOTE]: { plugin: createQuotePlugin },
};

export class TextStylePlugin extends Plugin<TextStylePluginProps> {
    constructor(props?: TextStylePluginProps) {
        super(TEXT_STYLE_PLUGIN, {
            button: withSelectableStyles(TextStyleButton, props?.selectableStyles),
            ...props,
        });
    }

    plugins() {
        return Object.entries(TextStylePluginsRecord)
            .filter(
                ([key]) =>
                    !this.props?.selectableStyles || this.props?.selectableStyles?.includes(key as OptionalTextStyles),
            )
            .map((entry) => entry[1].plugin());
    }
}
