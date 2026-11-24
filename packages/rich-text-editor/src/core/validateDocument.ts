/* (c) Copyright Frontify Ltd., all rights reserved. */

// Whether a stored value has the shape of a document, read off its JSON alone.
// No DOM, no engine, so it runs on a server beside the stored value.
// Each node is classified by its own shape, never by its siblings, and walked with a stack so depth cannot overflow.

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

type PendingNode = {
    node: unknown;
    path: string;
    /** A root `blocks` member must be a block; any other node may be a text node instead. */
    kind: 'block' | 'child';
};

/** What is wrong with a node holding `text`: a text node must have string `text` and no `type`, and cannot be a root block. */
const textNodeIssue = (node: Record<string, unknown>, kind: PendingNode['kind']): RteDocumentIssue['reason'] | null => {
    if (typeof node.text !== 'string' || node.type !== undefined) {
        return 'malformed-text';
    }

    switch (kind) {
        case 'block': {
            return 'missing-type';
        }
        case 'child': {
            return null;
        }
    }
};

type CheckNodeParams = {
    node: Record<string, unknown>;
    path: string;
    kind: PendingNode['kind'];
};

type NodeChildren = {
    childrenPath: string;
    children: unknown[];
};

/** Checks one node, pushes its issues, and returns the children to walk next, or null when it has none or failed. */
const checkNode = ({ node, path, kind }: CheckNodeParams, issues: RteDocumentIssue[]): NodeChildren | null => {
    if ('text' in node) {
        const reason = textNodeIssue(node, kind);
        if (reason !== null) {
            issues.push({ reason, path });
        }
        return null;
    }

    if (typeof node.type !== 'string') {
        issues.push({ reason: 'missing-type', path });
        return null;
    }

    if (node.children === undefined) {
        return null;
    }

    const childrenPath = pointer(path, 'children');
    if (!Array.isArray(node.children)) {
        issues.push({ reason: 'not-an-array', path: childrenPath });
        return null;
    }

    return { childrenPath, children: node.children };
};

const validateBlocks = (blocks: unknown[], blocksPath: string, issues: RteDocumentIssue[]): void => {
    const pending: PendingNode[] = [];
    for (let index = blocks.length - 1; index >= 0; index--) {
        pending.push({ node: blocks[index], path: pointer(blocksPath, index), kind: 'block' });
    }

    // Repeated blocks are legal and checked once; it also ends a walk over an in-memory cycle.
    const seen = new WeakSet<object>();

    for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
        const { node, path, kind } = next;

        if (!isRecord(node)) {
            issues.push({ reason: 'not-an-object', path });
            continue;
        }

        if (seen.has(node)) {
            continue;
        }
        seen.add(node);

        const checked = checkNode({ node, path, kind }, issues);
        if (checked === null) {
            continue;
        }

        // Pushed in reverse so the first child is popped first and issues stay in document order.
        for (let index = checked.children.length - 1; index >= 0; index--) {
            pending.push({
                node: checked.children[index],
                path: pointer(checked.childrenPath, index),
                kind: 'child',
            });
        }
    }
};

/**
 * Checks a stored value's structure, without the editor, the DOM or ProseMirror, so it runs in Node.
 * Unknown block, inline and mark types and extra keys pass, because the editor keeps them.
 * Every node with a `type` reserves `children` for an array and never carries `text`, as the format's text nodes never carry `type`.
 * Never throws on parsed JSON, however deeply nested.
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
        validateBlocks(value.blocks, blocksPath, issues);
    } else {
        issues.push({ reason: 'not-an-array', path: blocksPath });
    }

    if (issues.length > 0) {
        return { valid: false, issues };
    }

    // The walk above proved the shape; unknown types and keys are open by design.
    return { valid: true, document: value as RteDocumentOf };
};
