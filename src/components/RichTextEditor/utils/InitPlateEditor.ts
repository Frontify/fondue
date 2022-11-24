/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, createPlateEditor } from '@udecode/plate';
import { generateRandomId } from '@utilities/generateRandomId';
import { GeneratePlugins, defaultPlugins } from '../Plugins';

export class InitPlateEditor {
    static editor: PlateEditor;
    static editorId: string = generateRandomId();

    static getInstance(): PlateEditor {
        if (this.editor === undefined) {
            this.init();
        }

        return this.editor;
    }

    static init(editorId: string = generateRandomId()) {
        const config = GeneratePlugins(editorId, defaultPlugins);
        this.editor = createPlateEditor({ id: editorId, plugins: config.create() });
        return this;
    }
}
