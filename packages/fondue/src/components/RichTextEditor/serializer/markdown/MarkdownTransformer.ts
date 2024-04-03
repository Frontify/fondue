/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor } from '@udecode/plate-core';

import { InitPlateEditor } from '@components/RichTextEditor/utils';

import { type Transformer } from '../types';

export abstract class MarkdownTransformer<T, R> implements Transformer<T, R> {
    protected editor: PlateEditor;

    constructor() {
        this.editor = InitPlateEditor.init().getInstance();
    }

    abstract process(value: T): R;
}
