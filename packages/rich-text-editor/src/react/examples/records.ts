/* (c) Copyright Frontify Ltd., all rights reserved. */

import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/features';
import { type ContentModel } from '#/model';
import { type RichTextProfile } from '#/react/types';
import { type LoadedDocument } from '#/runtime/port';

/** The content model of each shipped profile. */
export const PROFILE_MODELS: Readonly<Record<RichTextProfile, ContentModel>> = {
    inline: inlineModel,
    comment: commentModel,
    document: documentModel,
    'brand-document': brandDocumentModel,
};

export type Inline = {
    type: 'text';
    text: string;
    marks?: readonly { type: string }[];
};

export const text = (value: string): Inline => ({ type: 'text', text: value });

/** A stored record of one paragraph that holds `content`, in `model`. */
export const recordOf = (model: ContentModel, documentId: string, ...content: readonly Inline[]): LoadedDocument => ({
    documentId,
    revision: null,
    document: {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [{ type: 'paragraph', attrs: { lang: null }, content }],
        },
    },
});

/** A stored block, as the document's `content` holds it. */
export type Block = Record<string, unknown>;

export const mark = (value: string, type: string, attrs?: Record<string, unknown>): Inline => ({
    type: 'text',
    text: value,
    marks: [{ type, ...(attrs === undefined ? {} : { attrs }) }],
});
export const paragraph = (...content: readonly Inline[]): Block => ({
    type: 'paragraph',
    attrs: { lang: null },
    content,
});
export const heading = (nodeId: string, level: number, value: string): Block => ({
    type: 'heading',
    attrs: { nodeId, level, lang: null },
    content: [text(value)],
});
export const quote = (...content: readonly Inline[]): Block => ({
    type: 'blockquote',
    content: [paragraph(...content)],
});
export const codeBlock = (value: string, languageId: string | null = null): Block => ({
    type: 'code_block',
    attrs: { languageId },
    content: [text(value)],
});
// The mention node carries no text field, which the Inline type demands, so the builder mints it past the type.
export const mention = (nodeId: string, resourceId: string, labelSnapshot: string): Inline =>
    ({
        type: 'mention',
        attrs: { nodeId, resourceType: 'user', resourceId, labelSnapshot },
    }) as unknown as Inline;
const item = (...content: readonly Inline[]): Block => ({
    type: 'list_item',
    content: [paragraph(...content)],
});
export const bulletList = (...items: readonly (readonly Inline[])[]): Block => ({
    type: 'bullet_list',
    attrs: { marker: null },
    content: items.map((content) => item(...content)),
});
export const orderedList = (...items: readonly (readonly Inline[])[]): Block => ({
    type: 'ordered_list',
    attrs: { start: 1, marker: null },
    content: items.map((content) => item(...content)),
});
export const rule: Block = { type: 'horizontal_rule' };

/** A stored record of `blocks` in `model`, which requires every capability the model has. */
export const blocksRecord = (model: ContentModel, documentId: string, ...blocks: readonly Block[]): LoadedDocument => ({
    documentId,
    revision: null,
    document: {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: [...model.capabilities],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks as never },
    },
});

/** The text of stored content, one line per block. */
export const textOf = (value: unknown): string => {
    if (typeof value !== 'object' || value === null) {
        return '';
    }

    const node = value as { text?: unknown; content?: unknown };
    if (typeof node.text === 'string') {
        return node.text;
    }

    if (!Array.isArray(node.content)) {
        return '';
    }

    const children: unknown[] = node.content;
    let separator = '';
    if (children.some((child) => Array.isArray((child as { content?: unknown }).content))) {
        separator = '\n';
    }

    return children.map(textOf).join(separator);
};
