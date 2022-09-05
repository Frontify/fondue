/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent, createPlateUI, createPlugins } from '@udecode/plate';
import { AllPlugins } from './Plugins';
import { ObjectType, Plugins, UnknownObject } from './types';

export const loadPlugins = (plugins: Plugins[]): PlatePlugin<UnknownObject, UnknownObject>[] => {
    const allComponents: ObjectType<PlatePluginComponent<any>> = {};
    const arrayOfPlugins: PlatePlugin<UnknownObject, UnknownObject>[] = [];

    for (const plugin of plugins) {
        const p = AllPlugins[plugin];
        allComponents[p.id] = p.element;
        arrayOfPlugins.push(...p.plugins());
    }

    return createPlugins(arrayOfPlugins, { components: createPlateUI(allComponents) });
};
