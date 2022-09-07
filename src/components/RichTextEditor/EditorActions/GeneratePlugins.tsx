/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createPlateUI, createPlugins, usePlateEditorRef } from '@udecode/plate';
import { GeneratePluginsReturn } from './types';
import { PluginComposer } from './Plugins/PluginComposer';
import { Toolbar } from './Toolbar';
import { ButtonGroupWrapper } from './Plugins/helper';

export const GeneratePlugins = (editorId: string, editorActions: PluginComposer): GeneratePluginsReturn => {
    const editor = usePlateEditorRef(editorId);

    return {
        create: () =>
            createPlugins(editorActions.plugins, {
                components: createPlateUI(editorActions.elements),
            }),
        toolbar: () => (
            <Toolbar>
                {editorActions.buttons.map((group, index) => {
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
    };
};
