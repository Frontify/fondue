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

export const createPlatePlugins = (pluginComposer: PluginComposer) =>
    createPlugins(pluginComposer.plugins, {
        components: createPlateUI(pluginComposer.elements),
    });

export const GeneratePlugins = (editorId: string, pluginComposer: PluginComposer): GeneratePluginsReturn => {
    return {
        create: () => createPlatePlugins(pluginComposer),
        toolbar: () =>
            pluginComposer.hasToolbar ? <Toolbar toolbarButtons={pluginComposer.buttons} editorId={editorId} /> : null,
        inline: () => (
            <>
                {pluginComposer.inline.map((Inline, index) => (
                    <Inline key={index} />
                ))}
            </>
        ),
    };
};
