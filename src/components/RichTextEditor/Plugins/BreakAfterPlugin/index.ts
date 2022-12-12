/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_BREAK_AFTER } from './id';
import { BreakAfterButton } from './BreakAfterButton';
import { Plugin, PluginProps } from '../Plugin';

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
                defaultNodeValue: false,
                validNodeValues: [true, false],
            },
        },
    }),
});

export * from './id';
