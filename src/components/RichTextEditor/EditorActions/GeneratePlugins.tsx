/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
import { GeneratePluginsReturn } from './types';
import { PluginComposer } from './Plugins/PluginComposer';
import { Toolbar } from './Toolbar';
import { ButtonGroupWrapper } from './Plugins/helper';

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
        toolbar: () => (
            <Toolbar>
                {pluginComposer.buttons.map((group, index) => {
                    return (
                        <ButtonGroupWrapper index={index} key={index}>
                            {group.map((ToolbarButton, idx) => (
                                <ToolbarButton.button editor={editor} id={ToolbarButton.id} key={idx.toString()} />
                            ))}
                        </ButtonGroupWrapper>
                    );
                })}
            </Toolbar>
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
