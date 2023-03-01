/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createIndentPlugin, createSoftBreakPlugin } from '@udecode/plate';
import { INIT_PLUGIN } from './id';
import { Plugin, PluginProps } from '../Plugin';
import { ELEMENT_CHECK_ITEM } from '../CheckboxListPlugin/id';

export class InitPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(INIT_PLUGIN, {
            ...props,
        });
    }

    plugins() {
        return [
            createSoftBreakPlugin(),
            createIndentPlugin({
                inject: {
                    props: {
                        validTypes: [ELEMENT_CHECK_ITEM],
                    },
                },
            }),
        ];
    }
}
