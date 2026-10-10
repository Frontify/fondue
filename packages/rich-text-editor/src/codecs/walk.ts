/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type Diagnostic } from '#/model';
import { type TreeMark, type TreeNode } from '#/model/content';

import { type CodecPlan, type Format, type Losses, setShared } from './plan';

/** What one walk shares: the plan, the losses and diagnostics so far, and the heading IDs a link may target. */
export interface WalkState {
    readonly plan: CodecPlan;
    readonly context: CodecContext;
    readonly losses: Losses;
    readonly diagnostics: Diagnostic[];
    readonly headings: ReadonlySet<string>;
}

/** The `nodeId` of every heading, so a link to `#` plus one of them is known as a link inside the document. */
export const headingIds = (root: TreeNode): ReadonlySet<string> => {
    const ids = new Set<string>();
    const pending = [root];
    let node = pending.pop();
    while (node !== undefined) {
        const nodeId = node.attrs?.nodeId;
        if (node.type === 'heading' && typeof nodeId === 'string') {
            ids.add(nodeId);
        }
        pending.push(...(node.content ?? []));
        node = pending.pop();
    }
    return ids;
};

/** One `codecs.override-failed` error naming the feature and the path. */
export const reportFailure = (
    state: { readonly diagnostics: Diagnostic[] },
    featureId: string,
    path: string,
    name: string,
    format: Format,
) => {
    state.diagnostics.push({
        code: 'codecs.override-failed',
        severity: 'error',
        messageKey: 'codecs.override-failed',
        path,
        featureId,
        details: { name, format },
    });
};

/** Counts a use of a node, with its shared attributes, when its feature declares `format` other than `lossless`. */
export const noteNode = (
    state: { readonly plan: CodecPlan; readonly losses: Losses },
    node: TreeNode,
    format: Format,
): void => {
    const plan = state.plan.nodes.get(node.type);
    if (plan === undefined) {
        return;
    }
    if (plan.formats[format] !== 'lossless') {
        state.losses.add(plan.featureId);
    }
    for (const shared of setShared(plan, node)) {
        if (state.plan.formats.get(shared.featureId)?.[format] !== 'lossless') {
            state.losses.add(shared.featureId);
        }
    }
};

/** Keeps the marks the model knows, counting each use whose feature declares `format` other than `lossless`. */
export const keepMark =
    (state: { readonly plan: CodecPlan; readonly losses: Losses }, format: Format) =>
    (mark: TreeMark): boolean => {
        const plan = state.plan.marks.get(mark.type);
        if (plan === undefined) {
            return false;
        }
        if (plan.formats[format] !== 'lossless') {
            state.losses.add(plan.featureId);
        }
        return true;
    };

/** A list item's marker: its number from the list's `start`, else `bullet`, with a box when `task` holds. */
export const itemMarker = (
    list: TreeNode,
    item: TreeNode,
    index: number,
    task: boolean,
    bullet = '-',
    delimiter = '.',
): string => {
    if (list.type === 'ordered_list') {
        let start = 1;
        if (typeof list.attrs?.start === 'number') {
            start = list.attrs.start;
        }
        return `${start + index}${delimiter} `;
    }
    if (task && item.attrs?.checked === true) {
        return `${bullet} [x] `;
    }
    if (task) {
        return `${bullet} [ ] `;
    }
    return `${bullet} `;
};

/**
 * `text` with `first` before its first line and `rest` before each later one. `trim` drops the end spaces of the
 * first line; a blank first line keeps its prefix without end spaces, and a blank later line becomes `blank`.
 */
export const prefixLines = (text: string, first: string, rest: string, trim = false, blank = rest.trimEnd()) =>
    text
        .split('\n')
        .map((line, index) => {
            if (index === 0 && (trim || line === '')) {
                return `${first}${line}`.trimEnd();
            }
            if (index === 0) {
                return `${first}${line}`;
            }
            if (line === '') {
                return blank;
            }
            return `${rest}${line}`;
        })
        .join('\n');
