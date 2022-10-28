/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate';
import { Transformer } from '../types';
import { InitPlateEditor } from '@components/RichTextEditor/utils';

export abstract class MdTransformer implements Transformer {
    protected editor: PlateEditor;

    constructor() {
        this.editor = InitPlateEditor.init().getInstance();
    }

    abstract process(data: string): unknown;
}
