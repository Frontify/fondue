/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MarkdownTransformer } from './MarkdownTransformer';
import { options } from './options';
import { serialize } from './serializer';
import { type NodeType } from './types';

export class SlateToMarkdown extends MarkdownTransformer<NodeType[], string> {
    process(value: NodeType[]) {
        return serialize(options(this.editor))(value);
    }
}
