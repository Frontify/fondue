/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent, createParagraphPlugin } from '@udecode/plate';
import { ObjectType, UnknownObject } from '../types';
import { Button, Buttons, MarkupElement, Plugin, Plugins } from './types';

export class PluginComposer {
    private platePlugins: Map<string, PlatePlugin<UnknownObject, UnknownObject>[]> = new Map();
    private markupElements: ObjectType<PlatePluginComponent<any>> = {};
    private toolbarButtons: Buttons = [];

    constructor() {
        this.platePlugins.set('default', [createParagraphPlugin()]);
    }

    public setElement(markupElement: MarkupElement | MarkupElement[]): this {
        const markupElements = Array.isArray(markupElement) ? markupElement : [markupElement];

        for (const markupElement of markupElements) {
            this.markupElements[markupElement.id] = markupElement.elementTag;
        }

        return this;
    }

    public setPlugin(plugins: Plugins): this {
        for (const group of plugins) {
            const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

            const groupOfButtons = [];
            for (const plugin of groupOfPlugins) {
                this.setElement(plugin.markupElement);
                this.platePlugins.set(plugin.type, plugin.plugins());

                groupOfButtons.push({
                    id: plugin.markupElement.id,
                    button: plugin.button,
                });
            }

            this.setButtons(groupOfButtons);
        }

        return this;
    }

    private setButtons(groupOfButton: Button[]): this {
        this.toolbarButtons.push(groupOfButton);
        return this;
    }

    public get elements() {
        return this.markupElements;
    }

    public get plugins() {
        const platePlugins = [];
        for (const value of this.platePlugins.values()) {
            platePlugins.push(...value);
        }

        return platePlugins;
    }

    public get buttons(): Buttons {
        return this.toolbarButtons;
    }
}
