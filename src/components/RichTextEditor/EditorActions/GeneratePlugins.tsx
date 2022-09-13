/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
import { GeneratePluginsReturn } from './types';
import { PluginComposer } from './Plugins/PluginComposer';
import { Toolbar } from './Toolbar';

export const GeneratePlugins = (editorId: string, pluginComposer?: PluginComposer): GeneratePluginsReturn | null => {
    const editor = usePlateEditorRef(editorId);

    if (!pluginComposer) {
        return null;
    }

    return {
        create: () =>
            createPlugins(pluginComposer.plugins, {
                components: createPlateUI(pluginComposer.elements),
            }),
        toolbar: (editorWidth: number | undefined) => (
            <Toolbar editorWidth={editorWidth} buttons={pluginComposer.buttons} editor={editor} />
        ),
        mentions: () => (
            <>
                {pluginComposer.inline.map((Inline, index) => (
                    <Inline key={index} />
                ))}
            </>
        ),
    };
};
