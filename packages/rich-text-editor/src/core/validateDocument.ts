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
     * the document `version` is not the one this package reads,
     * or a node contains itself, which only an in-memory value can do.
     */
    reason: 'not-an-object' | 'unsupported-version' | 'not-an-array' | 'missing-type' | 'malformed-text' | 'cycle';
    /** The offending value as an RFC 6901 JSON Pointer: `''` for the root, `/blocks/0/children/2` deeper. */
    path: string;
};

/** The outcome of `validateDocument`: the document, typed, or every issue found. */
export type RteDocumentValidation =
    | { valid: true; document: RteDocumentOf }
    | { valid: false; issues: RteDocumentIssue[] };

/** The most issues `validateDocument` reports; it stops walking once it has this many, so a hostile value costs bounded output. */
export const MAX_ISSUES = 100;

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const pointer = (parent: string, segment: string | number): string => `${parent}/${segment}`;

/** A root `blocks` member must be a block; any other node may be a text node instead. */
type NodeKind = 'block' | 'child';

type PendingNode =
    | { kind: NodeKind; node: unknown; path: string }
    // Popped once every descendant of `node` is done, which takes it off the ancestor path.
    | { kind: 'leave'; node: object };

/** What is wrong with a node holding `text`: a text node must have string `text` and no `type`, and cannot be a root block. */
const textNodeIssue = (node: Record<string, unknown>, kind: NodeKind): RteDocumentIssue['reason'] | null => {
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
    kind: NodeKind;
};

type NodeChildren = {
    childrenPath: string;
    children: unknown[];
};

/** Checks one node, pushes its issues, and returns the children to walk next, or null when it has none or failed. */
const checkNode = ({ node, path, kind }: CheckNodeParams, issues: RteDocumentIssue[]): NodeChildren | null => {
    if (Object.prototype.hasOwnProperty.call(node, 'text')) {
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

    // Repeated nodes are legal and checked at every path; only a node inside itself would never end the walk.
    const onPath = new Set<object>();

    for (let next = pending.pop(); next !== undefined && issues.length < MAX_ISSUES; next = pending.pop()) {
        switch (next.kind) {
            case 'leave': {
                onPath.delete(next.node);
                continue;
            }
            case 'block':
            case 'child': {
                break;
            }
        }

        const { node, path, kind } = next;

        if (!isRecord(node)) {
            issues.push({ reason: 'not-an-object', path });
            continue;
        }

        if (onPath.has(node)) {
            issues.push({ reason: 'cycle', path });
            continue;
        }

        const checked = checkNode({ node, path, kind }, issues);
        if (checked === null) {
            continue;
        }

        onPath.add(node);
        pending.push({ kind: 'leave', node });

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
 * Reports at most `MAX_ISSUES` issues, the first ones in document order.
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
