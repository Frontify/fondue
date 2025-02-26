/* (c) Copyright Frontify Ltd., all rights reserved. */

import { escape } from 'lodash-es';
import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import { unified } from 'unified';

import { type TreeOfNodes } from '@components/RichTextEditor/types';

import { MarkdownTransformer } from './MarkdownTransformer';
import deserializer from './deserializer';
import { options as plateEditorOptions } from './options';
import { remarkFondue } from './remarkFondue';

export class MarkdownToSlate extends MarkdownTransformer<string, TreeOfNodes> {
    process(value: string, options?: { escapeValue?: boolean }) {
        const parsedValue = options?.escapeValue ? escape(value) : value;
        return unified()
            .use(parse)
            .use(remarkGfm)
            .use(remarkFondue)
            .use(deserializer, plateEditorOptions(this.editor))
            .processSync(parsedValue).result as TreeOfNodes;
    }
}
