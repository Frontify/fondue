/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor, createPlateEditor } from '@udecode/plate-core';

import { generateRandomId } from '@utilities/generateRandomId';

import { generatePlugins } from '../Plugins/GeneratePlugins';
import { type PluginComposer } from '../Plugins/PluginComposer';
import { defaultPlugins } from '../Plugins/defaultPlugins';

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
        const config = generatePlugins(editorId, plugins);
        this.editor = createPlateEditor({ id: editorId, plugins: config.plugins });
        return this;
    }
}
