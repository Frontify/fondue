/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { PlatePlugin, PlatePluginComponent, createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
import { Plugins } from './plugins/types';
import { LoadPluginsReturn, ObjectType, UnknownObject } from './types';
import { ButtonGroupWrapper } from './Plugins/helper';

export const LoadPlugins = (editorId: string, plugins: Plugins): LoadPluginsReturn => {
    const editor = usePlateEditorRef(editorId);
    console.log(editor);
    const allComponents: ObjectType<PlatePluginComponent<any>> = {};
    const arrayOfPlugins: PlatePlugin<UnknownObject, UnknownObject>[] = [];

    for (const groupPlugin of plugins) {
        if (Array.isArray(groupPlugin)) {
            for (const plugin of groupPlugin) {
                allComponents[plugin.id] = plugin.element;
                arrayOfPlugins.push(...plugin.plugins());
            }
        } else {
            allComponents[groupPlugin.id] = groupPlugin.element;
            arrayOfPlugins.push(...groupPlugin.plugins());
        }
    }

    return {
        create: () =>
            createPlugins(arrayOfPlugins, {
                components: createPlateUI(allComponents),
            }),
        toolbar: () => (
            <>
                {plugins.map((group, index) => {
                    if (Array.isArray(group)) {
                        return <ButtonGroupWrapper index={index}>I am button</ButtonGroupWrapper>;
                    }

                    return 'Only button';
                })}
            </>
        ),
    };
};
