/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type Node as PmNode, type Schema } from 'prosemirror-model';

import {
    type FrontifyBlock,
    type FrontifyDocument,
    type FrontifyInline,
    type FrontifyText,
    type HeadingBlock,
    type LinkInline,
    type MentionInline,
    type ParagraphBlock,
} from '#/core/document';

const MARK_BOOLEAN_KEYS = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript'];

const inlinesToPm = (inlines: FrontifyInline[], schema: Schema): PmNode[] => {
    const out: PmNode[] = [];
    for (const inline of inlines) {
        if ('text' in inline) {
            if (inline.text === '') {
                continue;
            }
            const marks: Mark[] = [];
            for (const key of MARK_BOOLEAN_KEYS) {
                if (inline[key as keyof FrontifyText] === true && schema.marks[key]) {
                    marks.push(schema.marks[key].create());
                }
            }
            out.push(schema.text(inline.text, marks));
            continue;
        }
        const nodeType = schema.nodes[inline.type];
        if (!nodeType) {
            continue;
        }
        if (inline.type === 'link') {
            const link = inline;
            const children = inlinesToPm(link.children, schema);
            out.push(nodeType.create({ url: link.url, openInNewTab: link.openInNewTab ?? false }, children));
            continue;
        }
        if (inline.type === 'mention') {
            out.push(nodeType.create({ id: inline.id, category: inline.category }));
            continue;
        }
    }
    return out;
};

const blockToPm = (block: FrontifyBlock, schema: Schema): PmNode => {
    const nodeType = schema.nodes[block.type];
    if (!nodeType) {
        throw new Error(`Unknown block type "${block.type}". Did you forget to register a plugin?`);
    }
    if (block.type === 'columnBreak') {
        return nodeType.create();
    }
    if (block.type === 'unorderedList' || block.type === 'orderedList' || block.type === 'checkboxList') {
        return nodeType.create();
    }
    const attrs: Record<string, unknown> = {};
    if ('align' in block && block.align) {
        attrs.align = block.align;
    }
    if (block.type === 'heading') {
        attrs.level = block.level;
    }
    const children = 'children' in block ? inlinesToPm(block.children, schema) : [];
    return nodeType.create(attrs, children);
};

export const documentToPm = (doc: FrontifyDocument, schema: Schema): PmNode => {
    if (doc.version !== 1) {
        throw new Error(`Unsupported FrontifyDocument version: ${doc.version as number}`);
    }
    const docType = schema.nodes.doc;
    if (!docType) {
        throw new Error('Schema is missing the "doc" node type.');
    }
    return docType.create(
        null,
        doc.blocks.map((b) => blockToPm(b, schema)),
    );
};

const inlineFromPm = (node: PmNode): FrontifyInline | null => {
    if (node.isText) {
        const text: FrontifyText = { text: node.text ?? '' };
        for (const mark of node.marks) {
            if (MARK_BOOLEAN_KEYS.includes(mark.type.name)) {
                (text as Record<string, unknown>)[mark.type.name] = true;
            }
        }
        return text;
    }
    if (node.type.name === 'link') {
        const children: FrontifyText[] = [];
        for (let i = 0; i < node.childCount; i++) {
            const c = inlineFromPm(node.child(i));
            if (c && 'text' in c) {
                children.push(c);
            }
        }
        const link: LinkInline = {
            type: 'link',
            url: (node.attrs.url as string) ?? '',
            openInNewTab: Boolean(node.attrs.openInNewTab),
            children,
        };
        return link;
    }
    if (node.type.name === 'mention') {
        const mention: MentionInline = {
            type: 'mention',
            id: (node.attrs.id as string) ?? '',
            category: (node.attrs.category as MentionInline['category']) ?? 'user',
            children: [{ text: '' }],
        };
        return mention;
    }
    return null;
};

const blockFromPm = (node: PmNode): FrontifyBlock => {
    const align = (node.attrs.align as FrontifyBlock['align' & keyof FrontifyBlock]) ?? undefined;
    const children: FrontifyInline[] = [];
    for (let i = 0; i < node.childCount; i++) {
        const inline = inlineFromPm(node.child(i));
        if (inline) {
            children.push(inline);
        }
    }

    if (node.type.name === 'heading') {
        const block: HeadingBlock = {
            type: 'heading',
            level: (node.attrs.level as 1 | 2 | 3 | 4) ?? 1,
            children,
        };
        if (align) {
            block.align = align;
        }
        return block;
    }
    const block: ParagraphBlock = { type: 'paragraph', children };
    if (align) {
        block.align = align;
    }
    return block;
};

export const pmToDocument = (node: PmNode): FrontifyDocument => {
    const blocks: FrontifyBlock[] = [];
    for (let i = 0; i < node.childCount; i++) {
        blocks.push(blockFromPm(node.child(i)));
    }
    return { version: 1, blocks };
};
