/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, type ToggleMarkPlugin, createPluginFactory } from '@udecode/plate-core';
import { createListPlugin } from '@udecode/plate-list';

import { Plugin } from '../Plugin';

import { ListItemContentMarkupElement } from './ListItemContentMarkupElement';
import { ListItemMarkupElement } from './ListItemMarkupElement';
import { LIST_PLUGIN } from './id';
import { type ListPluginProps } from './types';
import { withList } from './withList';

export const MARK_TEXT_STYLE = 'textStyle';

export const createLicStylePlugin: ReturnType<typeof createPluginFactory<ToggleMarkPlugin>> =
    createPluginFactory<ToggleMarkPlugin>({
        key: MARK_TEXT_STYLE,
        isLeaf: true,
    });

export class ListPlugin extends Plugin {
    protected isSoftBreak;

    constructor(props?: ListPluginProps) {
        super(LIST_PLUGIN, {
            leafMarkupElements: [new ListItemContentMarkupElement(), new ListItemMarkupElement()],
            ...props,
        });

        this.isSoftBreak = props?.isSoftBreak ?? false;
    }

    plugins(): PlatePlugin[] {
        return [
            createListPlugin({
                withOverrides: withList,
                options: {
                    isSoftBreak: this.isSoftBreak,
                },
            }),
            createLicStylePlugin(),
        ];
    }
}
