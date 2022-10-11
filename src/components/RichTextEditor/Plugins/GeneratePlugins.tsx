/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { AnyObject, PlatePlugin, createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
import { Toolbar } from '../Toolbar';
import type { PluginComposer } from './PluginComposer';

type GeneratePluginsReturn = {
    create: () => PlatePlugin<AnyObject>[];
    toolbar: (editorWidth: number | undefined) => ReactNode;
    inline: () => ReactNode;
};

export const createPlatePlugins = (pluginComposer: PluginComposer) =>
    createPlugins(pluginComposer.plugins, {
        components: createPlateUI(pluginComposer.elements),
    });

export const GeneratePlugins = (editorId: string, pluginComposer: PluginComposer): GeneratePluginsReturn => {
    const editor = usePlateEditorRef(editorId)!;

    return {
        create: () => createPlatePlugins(pluginComposer),
        toolbar: (editorWidth: number | undefined) =>
            pluginComposer.hasToolbar ? (
                <Toolbar
                    editorWidth={editorWidth}
                    buttons={pluginComposer.buttons}
                    editor={editor}
                    editorId={editorId}
                />
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
