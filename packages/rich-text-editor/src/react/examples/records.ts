/* (c) Copyright Frontify Ltd., all rights reserved. */

import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/features';
import { type LoadedDocument, type RichTextProfile } from '#/index';
import { type ContentModel } from '#/model';

/** The content model of each shipped profile. */
export const PROFILE_MODELS: Readonly<Record<RichTextProfile, ContentModel>> = {
    inline: inlineModel,
    comment: commentModel,
    document: documentModel,
    'brand-document': brandDocumentModel,
};

export type Inline = {
    readonly type: 'text';
    readonly text: string;
    readonly marks?: readonly { readonly type: string }[];
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

/** The text of stored content, one line per block. */
export const textOf = (value: unknown): string => {
    if (typeof value !== 'object' || value === null) {
        return '';
    }
    const node = value as { readonly text?: unknown; readonly content?: unknown };
    if (typeof node.text === 'string') {
        return node.text;
    }
    if (!Array.isArray(node.content)) {
        return '';
    }
    const children: unknown[] = node.content;
    let separator = '';
    if (children.some((child) => Array.isArray((child as { readonly content?: unknown }).content))) {
        separator = '\n';
    }
    return children.map(textOf).join(separator);
};
