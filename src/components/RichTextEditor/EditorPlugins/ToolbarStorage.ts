/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent, createParagraphPlugin } from '@udecode/plate';
import { ObjectType, UnknownObject } from './types';
import { ButtonProps } from './Plugins/types';

type Button = ({ editor, id }: ButtonProps) => JSX.Element;

export class ToolbarStorage {
    private static instance: ToolbarStorage | null = null;
    private platePlugins: PlatePlugin<UnknownObject, UnknownObject>[] = [createParagraphPlugin()];
    private plateComponents: ObjectType<PlatePluginComponent<any>> = {};
    private buttons: Button[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): ToolbarStorage {
        if (!ToolbarStorage.instance) {
            ToolbarStorage.instance = new ToolbarStorage();
        }
        return ToolbarStorage.instance;
    }

    public setPlugins(plugins: PlatePlugin<UnknownObject, any>[]): this {
        this.platePlugins.push(...plugins);
        return this;
    }

    public setComponent(id: string, element: PlatePluginComponent<any>): this {
        this.plateComponents[id] = element;
        return this;
    }

    public setButton(button: Button): this {
        this.buttons.push(button);
        return this;
    }

    public get plugins() {
        return this.platePlugins;
    }

    public get components() {
        return this.plateComponents;
    }
}
