/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AI_COPYWRITER, AI_COPYWRITER_PLUGIN } from './id';
import { AiCopywriterButton } from './AiCopywriterButton';
import { Plugin } from '../Plugin';
import { createPluginFactory } from '@udecode/plate';

export const createAiCopyWriterPlugin = createPluginFactory({
    key: AI_COPYWRITER,
    isElement: false,
});

export class AiCopywriterPlugin extends Plugin {
    constructor() {
        super(AI_COPYWRITER_PLUGIN, {
            button: AiCopywriterButton,
        });
    }

    plugins() {
        return [createAiCopyWriterPlugin()];
    }
}
