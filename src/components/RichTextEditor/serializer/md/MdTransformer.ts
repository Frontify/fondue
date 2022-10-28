/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate';
import { Transformer, Unknown } from '../types';
import { InitPlateEditor } from '@components/RichTextEditor/utils';

export abstract class MdTransformer<T extends Unknown> implements Transformer<T> {
    protected editor: PlateEditor;

    constructor() {
        this.editor = InitPlateEditor.init().getInstance();
    }

    abstract process(value: T): unknown;
}
