/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { AnyObject, PlatePlugin, createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
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

export const GeneratePlugins = (editorId: string, pluginComposer?: PluginComposer): GeneratePluginsReturn | null => {
    const editor = usePlateEditorRef(editorId)!;

    if (!pluginComposer) {
        return null;
    }

    return {
        create: () => createPlatePlugins(pluginComposer),
        toolbar: () =>
            pluginComposer.hasToolbar ? (
                <Toolbar buttons={pluginComposer.buttons} editor={editor} editorId={editorId} />
            ) : (
                <></>
            ),
        inline: () => (
            <>
                {pluginComposer.inline.map((Inline, index) => (
                    <Inline key={index} />
                ))}
            </>
        ),
    };
};
