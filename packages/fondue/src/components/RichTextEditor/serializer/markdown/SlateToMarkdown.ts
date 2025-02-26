/* (c) Copyright Frontify Ltd., all rights reserved. */

import { serialize } from './serializer';
// eslint-disable-next-line import/order
import { options } from './options';
// eslint-disable-next-line import/order
import { MarkdownTransformer } from './MarkdownTransformer';
import { type NodeType } from './types';

export class SlateToMarkdown extends MarkdownTransformer<NodeType[], string> {
    process(value: NodeType[], _?: { escapeValue?: boolean }) {
        return serialize(options(this.editor))(value);
    }
}
