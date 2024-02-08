/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createAlignPlugin } from '@udecode/plate-alignment';
import { PlatePlugin } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_LIC } from '@udecode/plate-list';
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
    plugins(): PlatePlugin[] {
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
