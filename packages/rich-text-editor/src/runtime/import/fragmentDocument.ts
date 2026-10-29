/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Fragment, type Schema } from 'prosemirror-model';

import { type ContentModel, type DecodeResult, decodeDocument, type ResourceLimits } from '#/model';
import { encodeTree, diagnostic } from '#/model/internal';
import { nodeJson } from '#/runtime/definition/engineJson';
import { withNodeIds } from '#/runtime/definition/schema';

const blockedStructure = (html: string): DecodeResult => {
    const unreadable = diagnostic('format.invalid-structure', '', undefined, 'error');

    return { status: 'blocked', reason: 'invalid', original: html, diagnostics: [unreadable] };
};

/** The document `content` fills, or a blocked result when `NodeType.createAndFill` returns `null`. */
export const documentFromFragment = (
    html: string,
    model: ContentModel,
    schema: Schema,
    content: Fragment,
    limits: ResourceLimits,
    generateId: () => string,
): DecodeResult => {
    const doc = schema.topNodeType.createAndFill(null, withNodeIds(content, generateId));
    if (doc === null) {
        return blockedStructure(html);
    }

    const { document } = encodeTree(nodeJson(doc), model);

    return decodeDocument(document, model, { limits, generateId });
};
