/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, createPlateEditor } from '@udecode/plate-core';
import { generateRandomId } from '@utilities/generateRandomId';
import { GeneratePlugins, PluginComposer, defaultPlugins } from '../Plugins';

export class InitPlateEditor {
    static editor: PlateEditor;
    static editorId: string = generateRandomId();

    static getInstance(): PlateEditor {
        if (this.editor === undefined) {
            this.init();
        }

        return this.editor;
    }

    static init(editorId: string = generateRandomId(), plugins: PluginComposer = defaultPlugins) {
        const config = GeneratePlugins(editorId, plugins);
        this.editor = createPlateEditor({ id: editorId, plugins: config.plugins });
        return this;
    }
}
