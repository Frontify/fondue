/* (c) Copyright Frontify Ltd., all rights reserved. */

import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import deserializer from './deserializer';
import { options } from './options';
import { MarkdownTransformer } from './MarkdownTransformer';
import { NodeType } from './types';
import { remarkFondue } from './remarkFondue';

export class MarkdownToSlate extends MarkdownTransformer<string, NodeType[]> {
    process(value: string): NodeType[] {
        return unified()
            .use(parse)
            .use(remarkGfm)
            .use(remarkFondue)
            .use(deserializer, options(this.editor))
            .processSync(value).result as NodeType[];
    }
}
