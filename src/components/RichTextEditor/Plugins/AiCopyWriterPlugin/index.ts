/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AI_COPYWRITER, AI_COPYWRITER_PLUGIN } from './id';
import { AiCopywriterButton } from './AiCopywriterButton';
import { Plugin } from '../Plugin';
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
    constructor({ ...pluginProps }) {
        super(AI_COPYWRITER_PLUGIN, {
            button: withAiCopywriterFunctions(AiCopywriterButton, pluginProps.aiCopywriters),
            ...pluginProps,
        });
        this.aiCopywriters = pluginProps.aiCopywriters;
    }

    plugins() {
        return [createAiCopyWriterPlugin()];
    }
}
