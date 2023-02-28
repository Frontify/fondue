/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToggleMarkPlugin, createListPlugin, createPluginFactory } from '@udecode/plate';
import { Plugin } from '../Plugin';
import { TextStyles } from '../TextStylePlugin/TextStyles';
import { LIST_PLUGIN } from './id';
import { ListItemContentMarkupElement } from './ListItemContentMarkupElement';
import { ListItemMarkupElement } from './ListItemMarkupElement';
import { ListPluginProps } from './types';
import { withList } from './withList';

export const getListItemStylePluginKey = (style: TextStyles) => `list-item-${style}`;

export const MARK_TEXT_STYLE = 'textStyle';

export const createLicStylePlugin = createPluginFactory<ToggleMarkPlugin>({
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

    plugins() {
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
