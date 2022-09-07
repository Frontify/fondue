/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent, createParagraphPlugin } from '@udecode/plate';
import { MarkupElement } from './MarkupElement';
import { ObjectType, UnknownObject } from '../types';
import { Button, Buttons, Plugins } from './types';
import type { Plugin } from './Plugin';

export class PluginComposer {
    private platePlugins: Map<string, PlatePlugin<UnknownObject, UnknownObject>[]> = new Map();
    private markupElements: ObjectType<PlatePluginComponent<any>> = {};
    private toolbarButtons: Buttons = [];

    constructor() {
        this.platePlugins.set('default', [createParagraphPlugin()]);
    }

    public setPlugin(plugins: Plugins): this {
        for (const group of plugins) {
            const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

            for (const plugin of groupOfPlugins) {
                this.addElements(plugin.markupElement);
                this.addPlugin(plugin);
            }

            this.generateGroupOfButtons(groupOfPlugins);
        }

        return this;
    }

    private addElements(markupElement: MarkupElement | MarkupElement[] | undefined) {
        if (markupElement === undefined) {
            return;
        }

        const markupElements = Array.isArray(markupElement) ? markupElement : [markupElement];
        for (const { id, tag } of markupElements) {
            if (tag && !this.markupElements[id]) {
                this.markupElements[id] = tag;
            }
        }
    }

    private addPlugin(plugin: Plugin) {
        if (plugin.id && !this.platePlugins.has(plugin.id)) {
            this.platePlugins.set(plugin.id, plugin.plugins());
        }
    }

    private generateGroupOfButtons(groupOfPlugins: Plugin[]) {
        const groupOfButtons: Button[] = [];

        for (const { markupElement, button, id } of groupOfPlugins) {
            if (!button || !markupElement) {
                continue;
            }

            groupOfButtons.push({
                id,
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
}
