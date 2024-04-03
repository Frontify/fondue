/* (c) Copyright Frontify Ltd., all rights reserved. */

import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import { unified } from 'unified';

import deserializer from './deserializer';
import { options } from './options';
// eslint-disable-next-line import/order
import { MarkdownTransformer } from './MarkdownTransformer';
import { type NodeType } from './types';
// eslint-disable-next-line import/order
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
