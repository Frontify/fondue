/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LIC, ELEMENT_PARAGRAPH, createAlignPlugin } from '@udecode/plate';
import { ELEMENT_CHECK_ITEM } from '../CheckboxListPlugin';
import { Plugin } from '../Plugin';
import { AlignPluginProps } from './types';
import { ALIGN_PLUGIN } from './id';

export class AlignPlugin extends Plugin<AlignPluginProps> {
    protected validTypes: string[] = [];

    constructor({ validTypes = [], ...pluginProps }: Partial<AlignPluginProps> = {}) {
        super(ALIGN_PLUGIN, {
            ...pluginProps,
        });
        this.validTypes = validTypes;
    }
    plugins() {
        return [
            createAlignPlugin({
                inject: {
                    props: {
                        validTypes: [...this.validTypes, ELEMENT_PARAGRAPH, ELEMENT_LIC, ELEMENT_CHECK_ITEM],
                    },
                },
            }),
        ];
    }
}
