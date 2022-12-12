/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, createPluginFactory } from '@udecode/plate';
import { ELEMENT_BREAK_AFTER } from './id';
import { BreakAfterButton } from './BreakAfterButton';
import { Plugin, PluginProps } from '../Plugin';
import { TextStyles } from '../TextStylePlugin';

export class BreakAfterPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super('break-after', {
            button: BreakAfterButton,
            ...props,
        });
    }

    plugins() {
        return [createBreakAfterPlugin()];
    }
}

const createBreakAfterPlugin = createPluginFactory({
    key: ELEMENT_BREAK_AFTER,
    then: () => ({
        inject: {
            props: {
                validTypes: [
                    ELEMENT_PARAGRAPH,
                    TextStyles.ELEMENT_HEADING1,
                    TextStyles.ELEMENT_HEADING2,
                    TextStyles.ELEMENT_HEADING3,
                    TextStyles.ELEMENT_HEADING4,
                    TextStyles.ELEMENT_CUSTOM1,
                    TextStyles.ELEMENT_CUSTOM2,
                    TextStyles.ELEMENT_CUSTOM3,
                    TextStyles.ELEMENT_QUOTE,
                ],
                defaultNodeValue: false,
                validNodeValues: [true, false],
            },
        },
    }),
});

export * from './id';
