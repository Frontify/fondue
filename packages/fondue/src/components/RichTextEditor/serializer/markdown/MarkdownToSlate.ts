/* (c) Copyright Frontify Ltd., all rights reserved. */

import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import { unified } from 'unified';

import { MarkdownTransformer } from './MarkdownTransformer';
import deserializer from './deserializer';
import { options } from './options';
import { remarkFondue } from './remarkFondue';
import { type NodeType } from './types';

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
