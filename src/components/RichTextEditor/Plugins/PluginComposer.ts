/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AnyObject, PlatePlugin, PlatePluginComponent } from '@udecode/plate';
import { MarkupElement } from './MarkupElement';
import { Button, Buttons, InlineData, ObjectType, Plugin, PluginComposerProps, Plugins } from './types';

export class PluginComposer {
    private platePlugins: Map<string, PlatePlugin<AnyObject>[]> = new Map();
    private markupElements: ObjectType<PlatePluginComponent> = {};
    private toolbarButtons: Buttons = [];
    private inlineElements: InlineData[] = [];

    constructor(protected props?: PluginComposerProps) {}

    public setPlugin(...plugins: Plugins): this {
        for (const group of plugins) {
            const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

            for (const plugin of groupOfPlugins) {
                this.addElement(plugin.markupElement);
                this.addLeafElements(plugin.leafMarkupElements);
                this.addPlugin(plugin);
                this.addInline(plugin.inline());
            }

            if (this.hasToolbar) {
                this.addButtons(groupOfPlugins);
            }
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

    private addButtons(plugins: Plugin[]) {
        const groupOfButtons = this.createGroupOfButtons(plugins);

        if (groupOfButtons.length > 0) {
            this.toolbarButtons.push(groupOfButtons);
        }
    }

    private createGroupOfButtons(plugins: Plugin[]): Button[] {
        const groupOfButtons: Button[] = [];

        for (const { markupElement, button, id, props } of plugins) {
            if (!button || props?.noButton) {
                continue;
            }

            groupOfButtons.push({
                id: markupElement?.id || id,
                button,
            });
        }

        return groupOfButtons;
    }

    get elements() {
        return { ...this.defaultElementsFromPlugins, ...this.markupElements };
    }

    private get defaultElementsFromPlugins() {
        const defaultElements: ObjectType<PlatePluginComponent> = {};
        for (const pluginArray of this.platePlugins.values()) {
            for (const plugin of pluginArray) {
                const { key, component } = plugin;
                if (component) {
                    defaultElements[key] = component;
                }
            }
        }
        return defaultElements;
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

    get hasToolbar(): boolean {
        return !this.props?.noToolbar;
    }
}
