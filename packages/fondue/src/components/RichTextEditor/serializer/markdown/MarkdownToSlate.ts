/* (c) Copyright Frontify Ltd., all rights reserved. */

import { escape } from 'lodash-es';
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
    #escapeValue = false;

    escape(escapeValue = true) {
        this.#escapeValue = escapeValue;
        return this;
    }

    process(value: string): NodeType[] {
        const parsedValue = this.#escapeValue ? escape(value) : value;
        return unified()
            .use(parse)
            .use(remarkGfm)
            .use(remarkFondue)
            .use(deserializer, options(this.editor))
            .processSync(parsedValue).result as NodeType[];
    }
}
