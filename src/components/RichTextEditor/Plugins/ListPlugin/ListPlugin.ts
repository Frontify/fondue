/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToggleMarkPlugin, createListPlugin, createPluginFactory, someHtmlElement } from '@udecode/plate';
import { Plugin, PluginProps } from '../Plugin';
import { TextStyles } from '../TextStylePlugin/TextStyles';
import { LIST_PLUGIN } from './id';
import { ListItemContentMarkupElement } from './ListItemContentMarkupElement';
import { ListItemMarkupElement } from './ListItemMarkupElement';

export const getListItemStylePluginKey = (style: TextStyles) => `list-item-${style}`;

export const MARK_TEXT_STYLE = 'textStyle';

export const createLicStylePlugin = (style: TextStyles, htmlClass: string) =>
    createPluginFactory<ToggleMarkPlugin>({
        key: MARK_TEXT_STYLE,
        isLeaf: true,
        deserializeHtml: {
            rules: [{ validNodeName: ['LIC'] }],
            query: (el) => someHtmlElement(el, (node) => node.className.includes(htmlClass)),
        },
    });

const createListItemStylePlugins = () =>
    [
        createLicStylePlugin(TextStyles.ELEMENT_HEADING1, 'h1'),
        createLicStylePlugin(TextStyles.ELEMENT_HEADING2, 'h2'),
        createLicStylePlugin(TextStyles.ELEMENT_HEADING3, 'h3'),
        createLicStylePlugin(TextStyles.ELEMENT_HEADING4, 'h4'),
        createLicStylePlugin(TextStyles.ELEMENT_CUSTOM1, 'custom1'),
        createLicStylePlugin(TextStyles.ELEMENT_CUSTOM2, 'custom2'),
        createLicStylePlugin(TextStyles.ELEMENT_CUSTOM3, 'custom3'),
        createLicStylePlugin(TextStyles.ELEMENT_QUOTE, 'quote'),
        createLicStylePlugin(TextStyles.ELEMENT_PARAGRAPH, 'paragraph'),
    ].map((create) => create());

export class ListPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(LIST_PLUGIN, {
            leafMarkupElements: [new ListItemContentMarkupElement(), new ListItemMarkupElement()],
            ...props,
        });
    }

    plugins() {
        return [createListPlugin(), ...createListItemStylePlugins()];
    }
}
