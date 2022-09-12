/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlatePlugin, PlatePluginComponent, createParagraphPlugin } from '@udecode/plate';
import { MarkupElement } from './MarkupElement';
import { ObjectType, UnknownObject } from '../types';
import { Button, Buttons, Plugins } from './types';
import type { Plugin } from './Plugin';

export class PluginComposer {
    private platePlugins: Map<string, PlatePlugin<UnknownObject, UnknownObject>[]> = new Map();
    private markupElements: ObjectType<PlatePluginComponent<any>> = {};
    private toolbarButtons: Buttons = [];
    private inlineElements: (() => ReactNode)[] = [];

    constructor() {
        this.platePlugins.set('default', [createParagraphPlugin()]);
    }

    public setPlugin(plugins: Plugins): this {
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

        const { id, tag } = markupElement;
        if (tag && !this.markupElements[id]) {
            this.markupElements[id] = tag;
        }
    }

    private addPlugin(plugin: Plugin) {
        if (plugin.id && !this.platePlugins.has(plugin.id)) {
            this.platePlugins.set(plugin.id, plugin.plugins());
        }
    }

    private addInline(inl: (() => ReactNode) | undefined) {
        console.log('inline', inl);

        if (inl) {
            this.inlineElements.push(inl);
        }
    }

    private generateGroupOfButtons(groupOfPlugins: Plugin[]) {
        const groupOfButtons: Button[] = [];

        for (const { markupElement, button } of groupOfPlugins) {
            if (!button || !markupElement) {
                continue;
            }

            groupOfButtons.push({
                id: markupElement.id,
                button,
            });
        }

        this.toolbarButtons.push(groupOfButtons);
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

    get inline(): (() => ReactNode)[] {
        return this.inlineElements;
    }
}
