/* eslint-disable @typescript-eslint/no-explicit-any */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createPluginFactory } from '@udecode/plate';
import { ELEMENT_BREAK_AFTER } from './id';
import { BreakAfterButton } from './BreakAfterButton';
import { Plugin, PluginProps } from '../Plugin';
import {
    KeyboardHandlerReturnType,
    getBlockAbove,
    getPreventDefaultHandler,
    queryNode,
    someNode,
} from '@udecode/plate-core';
import isHotkey from 'is-hotkey';
import { setBreakAfter } from './utils/setBreakAfter';

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

const onKeyDownBreakAfter =
    (editor: any, { options: { rules = [] } }): KeyboardHandlerReturnType =>
    (event) => {
        const isActive = someNode(editor, { match: { breakAfterColumn: true } });
        const entry = getBlockAbove(editor);

        if (!entry) {
            return;
        }

        for (const { hotkey, query } of rules) {
            if (isHotkey(hotkey, event as any) && queryNode(entry, query)) {
                getPreventDefaultHandler(setBreakAfter, editor, {
                    value: !isActive,
                    key: ELEMENT_BREAK_AFTER,
                })(event);
            }
        }
    };
export const createBreakAfterPlugin = createPluginFactory({
    key: ELEMENT_BREAK_AFTER,
    isElement: true,
    options: {
        rules: [{ hotkey: 'command+shift+enter' }, { hotkey: 'crtl+shift+enter' }],
    },
    handlers: {
        onKeyDown: onKeyDownBreakAfter,
    },

    then: () => ({
        inject: {
            props: {
                defaultNodeValue: false,
                validNodeValues: [true, false],
            },
        },
    }),
});
