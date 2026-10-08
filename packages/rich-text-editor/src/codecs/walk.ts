/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type Diagnostic } from '#/model';
import { isIsland, type TreeMark, type TreeNode } from '#/model/content';
import { pointer } from '#/model/errors';
import { canonicalJson } from '#/model/hash';
import { islandText } from '#/model/html-spec';

import { attrsOf, type CodecPlan, type Format, type Losses } from './plan';

/** What one walk shares: the plan, the losses and diagnostics so far, and the heading IDs a link may target. */
export interface WalkState {
    readonly plan: CodecPlan;
    readonly context: CodecContext;
    readonly losses: Losses;
    readonly diagnostics: Diagnostic[];
    readonly headings: ReadonlySet<string>;
}

export interface Item {
    readonly node: TreeNode;
    readonly path: string;
    /** The known marks in rank order, each with its index among the node's marks. */
    readonly marks: readonly { readonly mark: TreeMark; readonly index: number }[];
}

const sameMark = (a: TreeMark, b: TreeMark) =>
    a.type === b.type && canonicalJson(attrsOf(a.attrs)) === canonicalJson(attrsOf(b.attrs));

/** The text of a node and its descendants, an island's included, for a fallback. */
export const textOf = (node: TreeNode): string => {
    if (isIsland(node)) {
        return islandText(node.attrs?.original);
    }
    let text = node.text ?? '';
    for (const child of node.content ?? []) {
        text += textOf(child);
    }
    return text;
};

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

/** One `codecs.override-failed` error naming the feature and the path (SPEC-rich-text-output/AC-047). */
export const reportFailure = (state: WalkState, featureId: string, path: string, name: string, format: Format) => {
    state.diagnostics.push({
        code: 'codecs.override-failed',
        severity: 'error',
        messageKey: 'codecs.override-failed',
        path,
        featureId,
        details: { name, format },
    });
};

/** The path of the mark at `index` on the first node of a run. */
export const markPath = (items: readonly Item[], index: number): string => {
    const first = items[0];
    if (first === undefined) {
        return '';
    }
    return `${first.path}${pointer('marks', index)}`;
};

/** The children of `node` with their paths and the marks `keep` takes, in rank order. */
export const itemsOf = (node: TreeNode, path: string, keep: (mark: TreeMark) => boolean): Item[] =>
    (node.content ?? []).map((child, index): Item => {
        const marks = (child.marks ?? []).flatMap((mark, markIndex) => {
            if (!keep(mark)) {
                return [];
            }
            return [{ mark, index: markIndex }];
        });
        return { node: child, path: `${path}${pointer('content', index)}`, marks };
    });

/** Splits children into runs that share a mark at `depth`, so a partly bold link stays one link. */
export const groupRun = <T>(
    items: readonly Item[],
    depth: number,
    node: (item: Item) => T,
    mark: (items: readonly Item[], entry: Item['marks'][number]) => T,
): T[] => {
    const out: T[] = [];
    let index = 0;
    while (index < items.length) {
        const item = items[index];
        if (item === undefined) {
            break;
        }
        const entry = item.marks[depth];
        if (entry === undefined) {
            out.push(node(item));
            index += 1;
            continue;
        }
        let end = index + 1;
        while (end < items.length) {
            const next = items[end]?.marks[depth];
            if (next === undefined || !sameMark(next.mark, entry.mark)) {
                break;
            }
            end += 1;
        }
        out.push(mark(items.slice(index, end), entry));
        index = end;
    }
    return out;
};
