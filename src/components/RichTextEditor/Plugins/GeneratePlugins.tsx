/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { AnyObject, PlatePlugin, createPlateUI, createPlugins } from '@udecode/plate';
import { Toolbar } from '../Toolbar';
import type { PluginComposer } from './PluginComposer';

type GeneratePluginsReturn = {
    create: () => PlatePlugin<AnyObject>[];
    toolbar: () => ReactNode;
    inline: () => ReactNode;
};

export const createPlatePlugins = (pluginComposer: PluginComposer) => {
    console.log(pluginComposer.elements);
    return createPlugins(pluginComposer.plugins, {
        components: createPlateUI(pluginComposer.elements),
    });
};

export const GeneratePlugins = (editorId: string, pluginComposer?: PluginComposer): GeneratePluginsReturn | null => {
    if (!pluginComposer) {
        return null;
    }

    return {
        create: () => createPlatePlugins(pluginComposer),
        toolbar: () => <Toolbar buttons={pluginComposer.buttons} editorId={editorId} />,
        inline: () => (
            <>
                {pluginComposer.inline.map((Inline, index) => (
                    <Inline key={index} />
                ))}
            </>
        ),
    };
};
