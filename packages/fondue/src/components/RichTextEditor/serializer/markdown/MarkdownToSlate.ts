/* (c) Copyright Frontify Ltd., all rights reserved. */

import { escape } from 'lodash-es';
import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import { unified } from 'unified';

import deserializer from './deserializer';
import { options as plateEditorOptions } from './options';
// eslint-disable-next-line import/order
import { MarkdownTransformer } from './MarkdownTransformer';
import { type NodeType } from './types';
// eslint-disable-next-line import/order
import { remarkFondue } from './remarkFondue';

export class MarkdownToSlate extends MarkdownTransformer<string, NodeType[]> {
    process(value: string, options?: { escapeValue?: boolean }): NodeType[] {
        const parsedValue = options?.escapeValue ? escape(value) : value;
        return unified()
            .use(parse)
            .use(remarkGfm)
            .use(remarkFondue)
            .use(deserializer, plateEditorOptions(this.editor))
            .processSync(parsedValue).result as NodeType[];
    }
}
