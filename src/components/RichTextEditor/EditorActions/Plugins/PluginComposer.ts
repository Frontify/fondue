/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AnyObject,
    PlatePlugin,
    PlatePluginComponent,
    createIndentPlugin,
    createParagraphPlugin,
    createSoftBreakPlugin,
} from '@udecode/plate';
import { MarkupElement } from './MarkupElement';
import { ObjectType } from '../types';
import { Button, Buttons, InlineData, Plugins } from './types';
import { ELEMENT_CHECK_ITEM } from './CheckboxListPlugin/id';
import type { Plugin } from './Plugin';

export class PluginComposer {
    private platePlugins: Map<string, PlatePlugin<AnyObject>[]> = new Map();
    private markupElements: ObjectType<PlatePluginComponent<any>> = {};
    private toolbarButtons: Buttons = [];
    private inlineElements: InlineData[] = [];

    constructor() {
        this.platePlugins.set('default', [
            createParagraphPlugin(),
            createSoftBreakPlugin(),
            createIndentPlugin({
                inject: {
                    props: {
                        validTypes: [ELEMENT_CHECK_ITEM],
                    },
                },
            }),
        ]);
    }

    public setPlugin(...plugins: Plugins): this {
        for (const group of plugins) {
            const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

            for (const plugin of groupOfPlugins) {
                this.addElement(plugin.markupElement);
                this.addLeafElements(plugin.leafMarkupElements);
                this.addPlugin(plugin);
                this.addInline(plugin.inline());
            }

            this.generateGroupOfButtons(groupOfPlugins);
        }

        return this;
    }

    private addLeafElements(leafMarkupElement: MarkupElement | MarkupElement[] | undefined) {
        if (leafMarkupElement === undefined) {
            return;
        }

        const leafMarkupElements = Array.isArray(leafMarkupElement) ? leafMarkupElement : [leafMarkupElement];
        for (const leafMarkupElement of leafMarkupElements) {
            this.addElement(leafMarkupElement);
        }
    }

    private addElement(markupElement: MarkupElement | undefined) {
        if (markupElement === undefined) {
            return;
        }

        const { id, node } = markupElement;
        if (node && !this.markupElements[id]) {
            this.markupElements[id] = node;
        }
    }

    private addPlugin(plugin: Plugin) {
        if (plugin.id && !this.platePlugins.has(plugin.id)) {
            this.platePlugins.set(plugin.id, plugin.plugins());
        }
    }

    private addInline(inl: InlineData | undefined) {
        if (inl) {
            this.inlineElements.push(inl);
        }
    }

    private generateGroupOfButtons(groupOfPlugins: Plugin[]) {
        const groupOfButtons: Button[] = [];

        for (const { markupElement, button, id } of groupOfPlugins) {
            if (!button) {
                continue;
            }

            groupOfButtons.push({
                id: markupElement?.id || id,
                button,
            });
        }

        if (groupOfButtons.length > 0) {
            this.toolbarButtons.push(groupOfButtons);
        }
    }

    get elements() {
        return this.markupElements;
    }

    get plugins() {
        const platePlugins = [];
        for (const value of this.platePlugins.values()) {
            platePlugins.push(...value);
        }

        return platePlugins;
    }

    get buttons(): Buttons {
        return this.toolbarButtons;
    }

    get inline(): InlineData[] {
        return this.inlineElements;
    }
}
