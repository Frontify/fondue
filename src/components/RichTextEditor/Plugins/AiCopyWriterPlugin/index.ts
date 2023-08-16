/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AI_COPYWRITER, AI_COPYWRITER_PLUGIN } from './id';
import { AiCopywriterButton } from './AiCopywriterButton';
import { Plugin, PluginProps } from '../Plugin';
import { createPluginFactory } from '@udecode/plate';
import { withAiCopywriterFunctions } from './AiCopywriterDropdown/withAiCopywriterFunctions';
import { AiCopywriter } from '../types';

export const createAiCopyWriterPlugin = createPluginFactory({
    key: AI_COPYWRITER,
    isElement: false,
    isVoid: true,
});

export class AiCopywriterPlugin extends Plugin {
    public aiCopywriters: AiCopywriter[];
    public isLoading: boolean;
    constructor({ ...pluginProps }) {
        super(AI_COPYWRITER_PLUGIN, {
            button: withAiCopywriterFunctions(AiCopywriterButton, pluginProps.aiCopywriters, pluginProps.isLoading),
            ...pluginProps,
        });
        this.aiCopywriters = pluginProps.aiCopywriters;
        this.isLoading = pluginProps.isLoading;
    }

    plugins() {
        return [createAiCopyWriterPlugin()];
    }
}
