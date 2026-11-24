/* (c) Copyright Frontify Ltd., all rights reserved. */

// Whether a stored value has the shape of a document, read off its JSON alone.
// No DOM, no engine, so it runs on a server beside the stored value.

import { type RteDocumentOf } from './document';
import { DOCUMENT_VERSION } from './vocabulary';

/** One structural problem in a stored value. */
export type RteDocumentIssue = {
    /**
     * What is wrong with the value at `path`: it is not an object, a block or inline lacks a string `type`,
     * a list is not an array, a text node's `text` is not a string (or it also has a `type`),
     * or the document `version` is not the one this package reads.
     */
    reason: 'not-an-object' | 'unsupported-version' | 'not-an-array' | 'missing-type' | 'malformed-text';
    /** The offending value as an RFC 6901 JSON Pointer: `''` for the root, `/blocks/0/children/2` deeper. */
    path: string;
};

/** The outcome of `validateDocument`: the document, typed, or every issue found. */
export type RteDocumentValidation =
    | { valid: true; document: RteDocumentOf }
    | { valid: false; issues: RteDocumentIssue[] };

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const pointer = (parent: string, segment: string | number): string => `${parent}/${segment}`;

const hasText = (member: unknown): boolean => isRecord(member) && 'text' in member;

const validateInlines = (inlines: unknown[], path: string, issues: RteDocumentIssue[]): void => {
    for (const [index, inline] of inlines.entries()) {
        const inlinePath = pointer(path, index);

        if (!isRecord(inline)) {
            issues.push({ reason: 'not-an-object', path: inlinePath });
            continue;
        }

        if ('text' in inline) {
            if (typeof inline.text !== 'string' || inline.type !== undefined) {
                issues.push({ reason: 'malformed-text', path: inlinePath });
            }
            continue;
        }

        if (typeof inline.type !== 'string') {
            issues.push({ reason: 'missing-type', path: inlinePath });
        }
    }
};

const validateBlock = (block: unknown, path: string, issues: RteDocumentIssue[]): void => {
    if (!isRecord(block)) {
        issues.push({ reason: 'not-an-object', path });
        return;
    }

    if (typeof block.type !== 'string') {
        issues.push({ reason: 'missing-type', path });
        return;
    }

    if (block.children === undefined) {
        return;
    }

    const childrenPath = pointer(path, 'children');
    if (!Array.isArray(block.children)) {
        issues.push({ reason: 'not-an-array', path: childrenPath });
        return;
    }

    if (block.children.some(hasText)) {
        validateInlines(block.children, childrenPath, issues);
        return;
    }

    for (const [index, child] of block.children.entries()) {
        validateBlock(child, pointer(childrenPath, index), issues);
    }
};

/**
 * Checks a stored value's structure, without the editor, the DOM or ProseMirror, so it runs in Node.
 * Unknown block, inline and mark types and extra keys pass, because the editor keeps them.
 * Never throws, whatever the value.
 *
 * @example
 * const result = validateDocument(JSON.parse(row.body));
 * if (result.valid) {
 *     return result.document;
 * }
 * log(result.issues); // [{ reason: 'unsupported-version', path: '/version' }]
 */
export const validateDocument = (value: unknown): RteDocumentValidation => {
    if (!isRecord(value)) {
        return { valid: false, issues: [{ reason: 'not-an-object', path: '' }] };
    }

    const issues: RteDocumentIssue[] = [];

    if (value.version !== DOCUMENT_VERSION) {
        issues.push({ reason: 'unsupported-version', path: pointer('', 'version') });
    }

    const blocksPath = pointer('', 'blocks');
    if (Array.isArray(value.blocks)) {
        for (const [index, block] of value.blocks.entries()) {
            validateBlock(block, pointer(blocksPath, index), issues);
        }
    } else {
        issues.push({ reason: 'not-an-array', path: blocksPath });
    }

    if (issues.length > 0) {
        return { valid: false, issues };
    }

    // The walk above proved the shape; unknown types and keys are open by design.
    return { valid: true, document: value as RteDocumentOf };
};
