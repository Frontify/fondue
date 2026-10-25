/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isRecord } from '#/model';
import { type EditorPort, nodeKindOf } from '#/runtime/port';

import { type RichTextFormField } from './formField';

const VALID = { valid: true } as const;
const EMPTY = { valid: false, reason: 'empty' } as const;
const HARD_BREAK = 'hard_break';

/**
 * Whether stored content holds no non-whitespace text and no leaf or atom node but `hard_break`; a node the schema
 * does not know is an island, which counts as content.
 */
const isBlank = (content: unknown, port: EditorPort): boolean => {
    if (!isRecord(content)) {
        return true;
    }
    const { type } = content;
    if (type === 'text') {
        return typeof content.text !== 'string' || content.text.trim() === '';
    }
    if (type === HARD_BREAK) {
        return true;
    }
    const kind = nodeKindOf(port, String(type));
    if (kind !== 'branch') {
        return false;
    }
    if (!Array.isArray(content.content)) {
        return true;
    }
    return content.content.every((child) => isBlank(child, port));
};

/** The validity of a session's committed document: `empty` when the field is `required` and holds no content. */
export const validityOf = (
    runtime: EditorPort,
    required: boolean | undefined,
): ReturnType<RichTextFormField['validate']> => {
    if (required === true && isBlank(runtime.handle.getSnapshot().document.content, runtime)) {
        return EMPTY;
    }
    return VALID;
};
