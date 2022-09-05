/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent, createPlateUI, createPlugins } from '@udecode/plate';
import { ObjectType, Plugins, UnknownObject } from './types';

type loadPluginsReturn = {
    create: () => PlatePlugin<UnknownObject, UnknownObject>[];
};

export const loadPlugins = (plugins: Plugins): loadPluginsReturn => {
    const allComponents: ObjectType<PlatePluginComponent<any>> = {};
    const arrayOfPlugins: PlatePlugin<UnknownObject, UnknownObject>[] = [];

    for (const pluginGroup of plugins) {
        if (Array.isArray(pluginGroup)) {
            for (const plugin of pluginGroup) {
                allComponents[plugin.id] = plugin.element;
                arrayOfPlugins.push(...plugin.plugins());
            }
        } else {
            allComponents[pluginGroup.id] = pluginGroup.element;
            arrayOfPlugins.push(...pluginGroup.plugins());
        }
    }

    return {
        create: () =>
            createPlugins(arrayOfPlugins, {
                components: createPlateUI(allComponents),
            }),
    };
};
