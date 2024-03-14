/* (c) Copyright Frontify Ltd., all rights reserved. */

import { serialize } from './serializer';
import { options } from './options';
import { MarkdownTransformer } from './MarkdownTransformer';
import { NodeType } from './types';

export class SlateToMarkdown extends MarkdownTransformer<NodeType[], string> {
    process(value: NodeType[]) {
        return serialize(options(this.editor))(value);
    }
}
