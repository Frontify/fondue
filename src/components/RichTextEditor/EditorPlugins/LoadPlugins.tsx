/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import {
    PlatePlugin,
    PlatePluginComponent,
    createParagraphPlugin,
    createPlateUI,
    createPlugins,
    usePlateEditorRef,
} from '@udecode/plate';
import { Plugin, Plugins } from './plugins/types';
import { LoadPluginsReturn, ObjectType, UnknownObject } from './types';
import { ButtonGroupWrapper } from './Plugins/helper';
import { Toolbar } from './Toolbar';

export const LoadPlugins = (editorId: string, plugins: Plugins): LoadPluginsReturn => {
    const editor = usePlateEditorRef(editorId);

    const plateComponents: ObjectType<PlatePluginComponent<any>> = {};
    const platePlugins: PlatePlugin<UnknownObject, UnknownObject>[] = [createParagraphPlugin()];

    for (const group of plugins) {
        const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

        for (const plugin of groupOfPlugins) {
            if (plugin.element) {
                plateComponents[plugin.id] = plugin.element;
            }

            platePlugins.push(...plugin.plugins());
        }
    }

    return {
        create: () =>
            createPlugins(platePlugins, {
                components: createPlateUI(plateComponents),
            }),
        toolbar: () => (
            <Toolbar>
                {plugins.map((group, index) => {
                    const groupOfPlugins: Plugin[] = Array.isArray(group) ? group : [group];

                    return (
                        <ButtonGroupWrapper index={index} key={index}>
                            {groupOfPlugins.map((plugin, idx) => (
                                <plugin.button editor={editor} id={plugin.id} key={idx.toString()} />
                            ))}
                        </ButtonGroupWrapper>
                    );
                })}
            </Toolbar>
        ),
    };
};
