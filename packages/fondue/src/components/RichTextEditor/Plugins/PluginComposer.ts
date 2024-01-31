/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePluginComponent } from '@udecode/plate';
import { ToolbarPositionWithButtons } from '../Toolbar/ToolbarPositionWithButtons';
import { MarkupElement } from './MarkupElement';
import { InlineData, ObjectType, PlatePluginList, Plugin, PluginComposerProps, Plugins, ToolbarButtons } from './types';
import { CSSProperties } from 'react';
import { PluginProps } from './Plugin';

export class PluginComposer {
    private platePlugins: PlatePluginList = new Map();
    private markupElements: ObjectType<PlatePluginComponent> = {};
    private inlineElements: InlineData[] = [];
    private toolbarButtons: ToolbarButtons = new ToolbarPositionWithButtons();
    private styles: Record<string, CSSProperties> = {};

    constructor(protected props?: PluginComposerProps) {}

    public setPlugin(...plugins: Plugins): this {
        for (const group of plugins) {
            const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

            for (const plugin of groupOfPlugins) {
                this.addElement(plugin.markupElement);
                this.addElement(plugin.markupInputElement);
                this.addLeafElements(plugin.leafMarkupElements);
                this.addPlugin(plugin);
                this.addInline(plugin.inline());

                if (plugin.styles) {
                    this.addStyles(plugin.styles, plugin.id);
                }

                if (plugin.textStyles) {
                    this.addTextStylesOfSubPlugins(plugin.textStyles);
                }
            }

            if (this.hasToolbar) {
                this.toolbarButtons.createGroupOfButtons(groupOfPlugins);
            }
        }

        return this;
    }

    private addTextStylesOfSubPlugins(textStyles: Plugin<PluginProps>[]) {
        for (const textStylePlugins of textStyles) {
            if (textStylePlugins.styles) {
                this.addStyles(textStylePlugins.styles, textStylePlugins.id);
            }
        }
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

        const id = markupElement.getId();
        const node = markupElement.getNode();

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

    private addStyles(styles: CSSProperties, id: string) {
        this.styles[id] = styles;
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

    get buttons(): ToolbarButtons {
        return this.toolbarButtons;
    }

    get inline(): InlineData[] {
        return this.inlineElements;
    }

    get hasToolbar(): boolean {
        return !this.props?.noToolbar;
    }

    get getStyles(): Record<string, CSSProperties> {
        return this.styles;
    }
}
