/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { AnyObject, PlatePlugin, createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
import { Toolbar } from '../Toolbar';
import type { PluginComposer } from './PluginComposer';

type GeneratePluginsReturn = {
    Create: () => PlatePlugin<AnyObject>[];
    Toolbar: () => ReactNode;
    Inline: () => ReactNode;
};

export const createPlatePlugins = (pluginComposer: PluginComposer) =>
    createPlugins(pluginComposer.plugins, {
        components: createPlateUI(pluginComposer.elements),
    });

export const GeneratePlugins = (editorId: string, pluginComposer?: PluginComposer): GeneratePluginsReturn | null => {
    if (!pluginComposer) {
        return null;
    }

    return {
        Create: () => createPlatePlugins(pluginComposer),
        Toolbar: () => {
            const editor = usePlateEditorRef(editorId)!;

            if (editor && pluginComposer.hasToolbar) {
                return <Toolbar buttons={pluginComposer.buttons} editor={editor} editorId={editorId} />;
            }

            return <></>;
        },
        Inline: () => (
            <>
                {pluginComposer.inline.map((Inline, index) => (
                    <Inline key={index} />
                ))}
            </>
        ),
    };
};
