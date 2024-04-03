/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlatePlugin, createPlugins } from '@udecode/plate-core';
import { type CSSProperties, type ReactNode } from 'react';

import { Toolbar } from '../components/Toolbar';

import { type PluginComposer } from './PluginComposer';

type GeneratePluginsReturn = {
    plugins: PlatePlugin<Record<string, any>>[];
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
        plugins: createPlatePlugins(pluginComposer),
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
