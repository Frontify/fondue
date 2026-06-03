/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeOfNodes } from '@components/RichTextEditor/types';

import { MarkdownTransformer } from './MarkdownTransformer';
import { plateEditorOptions } from './options';
import { serialize } from './serializer';

export class SlateToMarkdown extends MarkdownTransformer<TreeOfNodes, string> {
    process(value: TreeOfNodes) {
        return serialize(plateEditorOptions(this.editor))(value);
    }
}
