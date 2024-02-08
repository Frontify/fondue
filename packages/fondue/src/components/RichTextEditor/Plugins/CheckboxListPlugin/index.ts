/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, createPluginFactory } from '@udecode/plate-core';
import { createIndentPlugin } from '@udecode/plate-indent';
import { CHECKBOX_LIST_PLUGIN, ELEMENT_CHECK_ITEM } from './id';
import { CheckboxListElement } from './CheckboxListElement';
import { CheckboxListButton } from './CheckboxListButton';
import { Plugin, PluginProps } from '../Plugin';

export const createCheckboxListPlugin: ReturnType<typeof createPluginFactory<NonNullable<unknown>>> =
    createPluginFactory({
        key: ELEMENT_CHECK_ITEM,
        isElement: true,
    });

export class CheckboxListPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(CHECKBOX_LIST_PLUGIN, {
            button: CheckboxListButton,
            markupElement: new CheckboxListElement(),
            ...props,
        });
    }

    plugins(): PlatePlugin[] {
        return [
            createCheckboxListPlugin(),
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

export * from './id';
export * from './CheckboxListElement';
