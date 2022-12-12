/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, createPluginFactory } from '@udecode/plate';
import { ELEMENT_COLUMN_BREAK } from './id';
import { ColumnBreakButton } from './ColumnBreakButton';
import { Plugin, PluginProps } from '../Plugin';
import { TextStyles } from '../TextStylePlugin';

export class ColumnBreakPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super('column-break', {
            button: ColumnBreakButton,
            ...props,
        });
    }

    plugins() {
        return [createColumnBreakPlugin()];
    }
}

const createColumnBreakPlugin = createPluginFactory({
    key: ELEMENT_COLUMN_BREAK,
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
