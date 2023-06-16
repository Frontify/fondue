/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, ReactNode } from 'react';
import { AnyObject, PlatePlugin, createPlateUI, createPlugins } from '@udecode/plate';
import { Toolbar } from '../Toolbar';
import type { PluginComposer } from './PluginComposer';

type GeneratePluginsReturn = {
    create: () => PlatePlugin<AnyObject>[];
    toolbar: (readOnly: boolean, toolbarWidth: number | undefined) => ReactNode;
    inline: () => ReactNode;
    styles: () => Record<string, CSSProperties>;
};

export const createPlatePlugins = (pluginComposer: PluginComposer) =>
    createPlugins(pluginComposer.plugins, {
        components: createPlateUI(pluginComposer.elements),
    });

export const GeneratePlugins = (editorId: string, pluginComposer: PluginComposer): GeneratePluginsReturn => {
    return {
        create: () => createPlatePlugins(pluginComposer),
        toolbar: (readOnly, toolbarWidth) =>
            !readOnly && pluginComposer.hasToolbar ? (
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
