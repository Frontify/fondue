/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactNode } from 'react';
import { PlatePlugin, createPlugins } from '@udecode/plate-core';
import { Toolbar } from '../components/Toolbar';
import type { PluginComposer } from './PluginComposer';

type GeneratePluginsReturn = {
    create: () => PlatePlugin<Record<string, any>>[];
    toolbar: (toolbarWidth: number | undefined) => ReactNode;
    inline: () => ReactNode;
    styles: () => Record<string, CSSProperties>;
};

export const createPlatePlugins = (pluginComposer: PluginComposer): PlatePlugin[] =>
    createPlugins(pluginComposer.plugins, {
        components: pluginComposer.elements,
    });

export const GeneratePlugins = (editorId: string, pluginComposer: PluginComposer): GeneratePluginsReturn => {
    return {
        create: () => createPlatePlugins(pluginComposer),
        toolbar: (toolbarWidth) =>
            pluginComposer.hasToolbar ? (
                <Toolbar toolbarButtons={pluginComposer.buttons} editorId={editorId} toolbarWidth={toolbarWidth} />
            ) : null,
        inline: () => (
            <>
                {pluginComposer.inline.map((Inline, index) => (
                    <Inline key={index} />
                ))}
            </>
        ),
        styles: () => pluginComposer.getStyles,
    };
};
