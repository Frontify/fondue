/* (c) Copyright Frontify Ltd., all rights reserved. */

import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import { unified } from 'unified';

import { type TreeOfNodes } from '@components/RichTextEditor/types';

import { MarkdownTransformer } from './MarkdownTransformer';
import deserializer from './deserializer';
import { plateEditorOptions } from './options';
import { remarkFondue } from './remarkFondue';
import { escapeHtmlPreserveEntities } from './utils';

export class MarkdownToSlate extends MarkdownTransformer<string, TreeOfNodes> {
    process(value: string, options?: { escapeValue?: boolean }) {
        const parsedValue = options?.escapeValue ? escapeHtmlPreserveEntities(value) : value;

        return unified()
            .use(parse)
            .use(remarkGfm)
            .use(remarkFondue)
            .use(deserializer, plateEditorOptions(this.editor))
            .processSync(parsedValue).result as TreeOfNodes;
    }
}
