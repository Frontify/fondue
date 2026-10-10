/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type Node } from 'prosemirror-model';
import { type Transaction } from 'prosemirror-state';

import { carriesNodeId } from '#/definition';
import { type CommandDefinition, type ContentModel, DefinitionError } from '#/model';
import { compiledModel } from '#/model/compile';
import { findUnsafeJson, isRecord, OBJECT_REPLACEMENT } from '#/model/values';

import { type AuthoringPolicy, type FeaturePolicy, type HeadingLevel } from './types';

const EVERYTHING: FeaturePolicy = { create: true, edit: true, remove: true, paste: true };
const HEADING_LEVELS: readonly HeadingLevel[] = [1, 2, 3, 4, 5, 6];
const HEADING = 'heading';

/** Whether a command sets the level of a `heading`, such as `heading.set`. */
export const setsHeading = ({ capability, args }: CommandDefinition<unknown>): boolean =>
    capability === 'setBlock' && args.node === HEADING;

/** Whether the policy refuses the heading level that a payload or a heading's attributes name (SPEC-rich-text-editing/AC-013). */
export const refusesLevel = (policy: AuthoringPolicy, values: unknown): boolean =>
    isRecord(values) && !policy.creatableHeadingLevels.includes(values.level as HeadingLevel);

/**
 * Every installed feature fully allowed, with the policy's own values over it. Remote values are checked like a
 * manifest's, and a policy for an uninstalled feature throws (SPEC-rich-text/AC-025, AC-030).
 */
export const authoringOf = (model: ContentModel, policy: Partial<AuthoringPolicy> = {}): AuthoringPolicy => {
    const unsafe = findUnsafeJson(policy, '/policy');
    if (unsafe !== undefined) {
        throw new DefinitionError('definition.invalid-manifest', { path: unsafe });
    }
    const features: Record<string, FeaturePolicy> = {};
    for (const { id } of model.capabilities) {
        features[id] = EVERYTHING;
    }
    for (const [id, feature] of Object.entries(policy.features ?? {})) {
        if (!Object.hasOwn(features, id)) {
            throw new DefinitionError('definition.unknown-policy-feature', { feature: id });
        }
        features[id] = feature;
    }
    return {
        features,
        creatableHeadingLevels: policy.creatableHeadingLevels ?? HEADING_LEVELS,
        enterBehavior: policy.enterBehavior ?? 'paragraph',
    };
};

/** One inline child of a run: a text node or an atom. */
interface Piece {
    readonly from: number;
    readonly to: number;
}
interface Run {
    readonly mark: Mark;
    readonly pieces: Piece[];
    text: string;
}
/** How a batch maps positions of the document before it to the one after it. */
type BatchMapping = Transaction['mapping'];
/** A feature's occurrences in part of a document: its nodes, and its marks as runs. */
interface Occurrences {
    readonly nodes: Map<string, Node[]>;
    readonly runs: Map<string, Run[]>;
}
interface Change {
    readonly create: boolean;
    readonly edit: boolean;
    readonly remove: boolean;
}

/** Each maximal stretch of a textblock's inline content that carries one mark, with its pieces and text. */
const markRuns = (block: Node, start: number): Run[] => {
    const runs: Run[] = [];
    let open: Run[] = [];
    let position = start;
    for (const child of block.children) {
        let text = OBJECT_REPLACEMENT;
        if (child.isText) {
            text = child.textContent;
        }
        const piece = { from: position, to: position + child.nodeSize };
        open = child.marks.map((mark) => {
            let run = open.find((candidate) => candidate.mark.eq(mark));
            if (run === undefined) {
                run = { mark, pieces: [], text: '' };
                runs.push(run);
            }
            run.pieces.push(piece);
            run.text += text;
            return run;
        });
        position = piece.to;
    }
    return runs;
};

const add = <T>(map: Map<string, T[]>, featureId: string | undefined, item: T) => {
    if (featureId === undefined) {
        return;
    }
    const list = map.get(featureId);
    if (list === undefined) {
        map.set(featureId, [item]);
        return;
    }
    list.push(item);
};

const listOf = <T>(map: ReadonlyMap<string, T[]>, featureId: string): T[] => map.get(featureId) ?? [];

/** Removes and returns the first item that `match` accepts. */
const take = <T>(items: T[], match: (item: T) => boolean): T | undefined => {
    const index = items.findIndex(match);
    if (index < 0) {
        return undefined;
    }
    return items.splice(index, 1)[0];
};

// A node's own marks belong to the mark's feature, so its markup here is its type and attributes.
const sameNode = (a: Node, b: Node) => a === b || (a.hasMarkup(b.type, b.attrs, a.marks) && a.content.eq(b.content));

/**
 * Pairs a feature's nodes before and after a batch. A node whose type carries a `nodeId` pairs with an identical
 * node, then by `nodeId`, as Tiptap's UniqueID keys a node by its ID attribute and the repair leaves the ID on the
 * node that existed (DR-071); any other node pairs by type, attributes and content, so a moved node keeps its pair.
 * A changed node with no ID pairs with a leftover node of its type as an edit; an unpaired node is a create or a remove.
 */
const nodeChangeOf = (before: readonly Node[], after: readonly Node[]): Change => {
    const left = [...after];
    const changed: Node[] = [];
    let edit = false;
    let remove = false;
    for (const node of before) {
        let other: Node | undefined;
        if (carriesNodeId(node)) {
            const sameId = (candidate: Node) =>
                candidate.type === node.type && candidate.attrs.nodeId === node.attrs.nodeId;
            // A stored document may repeat an ID, which the repair leaves alone, so an unchanged node with that ID pairs first.
            other = take(left, (candidate) => sameId(candidate) && sameNode(node, candidate));
            if (other === undefined) {
                other = take(left, sameId);
            }
            remove ||= other === undefined;
        } else {
            other = take(left, (candidate) => sameNode(node, candidate));
            if (other === undefined) {
                changed.push(node);
            }
        }
        edit ||= other !== undefined && !sameNode(node, other);
    }
    for (const node of changed) {
        const other = take(left, (candidate) => candidate.type === node.type && !carriesNodeId(candidate));
        remove ||= other === undefined;
        edit ||= other !== undefined;
    }
    return { create: left.length > 0, edit, remove };
};

/**
 * The runs of the same mark type in `others` that a run's pieces map into. A piece the mapping collapses is new or
 * deleted text: inserted text counts where it lands, inside or at the edge of a run, and deleted text nowhere.
 */
const counterparts = (run: Run, mapping: BatchMapping, others: readonly Run[], inserted: boolean): Run[] =>
    others.filter((other) => {
        const first = other.pieces[0] as Piece;
        const last = other.pieces[other.pieces.length - 1] as Piece;
        if (other.mark.type !== run.mark.type) {
            return false;
        }
        return run.pieces.some((piece) => {
            const from = mapping.map(piece.from, 1);
            const to = mapping.map(piece.to, -1);
            // Inserted text joins a run only with an equal mark; text that was there may change the mark's attributes.
            if (to <= from) {
                return inserted && other.mark.eq(run.mark) && first.from <= from && from <= last.to;
            }
            return first.from < to && from < last.to;
        });
    });

const sameRun = (a: Run, b: Run) => a.text === b.text && a.mark.eq(b.mark);

const headingsOf = ({ nodes }: Occurrences): Node[] =>
    [...nodes.values()].flat().filter((node) => node.type.name === HEADING);
const textblocksIn = ({ nodes }: Occurrences): number =>
    [...nodes.values()].flat().filter((node) => node.isTextblock).length;

/**
 * Whether a batch makes a heading of a level the policy does not offer. A stored heading keeps its level, and Enter may
 * split it: a heading with a new `nodeId` passes only as one of the blocks the batch added, next to a heading of its
 * level, so turning other blocks into that level never does (SPEC-rich-text-editing/AC-013, AC-014).
 */
const makesRefusedHeading = (policy: AuthoringPolicy, previous: Occurrences, next: Occurrences): boolean => {
    const before = headingsOf(previous);
    let splits = Math.max(0, textblocksIn(next) - textblocksIn(previous));
    for (const heading of headingsOf(next)) {
        const { level, nodeId } = heading.attrs;
        if (
            !refusesLevel(policy, heading.attrs) ||
            before.some((old) => old.attrs.nodeId === nodeId && old.attrs.level === level)
        ) {
            continue;
        }
        const fresh = !before.some((old) => old.attrs.nodeId === nodeId);
        if (!fresh || splits === 0 || !before.some((old) => old.attrs.level === level)) {
            return true;
        }
        splits -= 1;
    }
    return false;
};

/**
 * A mark's runs compared piece by piece through the batch's mapping, as `prosemirror-changeset` maps spans through
 * step maps: a run after the batch that maps back into no run of its mark type is new, and one before that maps
 * into none after is gone, so a merge and a split each find their counterpart. A new and a gone run with the same
 * mark and text are a move. A run whose counterparts differ in text or attributes is an edit, as CKEditor 5's
 * differ reports a changed attribute on a range as an attribute change, not an insertion and a removal.
 */
const runChangeOf = (before: readonly Run[], after: readonly Run[], mapping: BatchMapping): Change => {
    const back = mapping.invert();
    const fresh = after.filter((run) => counterparts(run, back, before, true).length === 0);
    const gone = before.filter((run) => counterparts(run, mapping, after, false).length === 0);
    const created = fresh.filter((run) => take(gone, (other) => sameRun(run, other)) === undefined);
    const changed = (runs: readonly Run[], map: BatchMapping, others: readonly Run[], inserted: boolean) =>
        runs.some((run) => {
            const found = counterparts(run, map, others, inserted);
            return found.length > 0 && !found.some((other) => sameRun(run, other));
        });
    const edit = changed(after, back, before, true) || changed(before, mapping, after, false);
    return { create: created.length > 0, edit, remove: gone.length > 0 };
};

/**
 * The final policy check of a batch (SPEC-rich-text-runtime/AC-006 to AC-009). It compares the span the two
 * documents differ in, which `findDiffStart` and `findDiffEnd` find by node identity and markup, so a step with an
 * empty step map and a step class of any kind are read alike, and only the changed path is walked.
 */
export const createPolicyCheck = (model: ContentModel) => {
    const compiled = compiledModel(model);
    const nodeOwners = new Map(compiled.nodes.map(({ name, featureId }) => [name, featureId]));
    const markOwners = new Map(compiled.marks.map(({ name, featureId }) => [name, featureId]));

    const collect = (doc: Node, from: number, to: number): Occurrences => {
        const found: Occurrences = { nodes: new Map(), runs: new Map() };
        // Text is its textblock's content, never an occurrence of its own.
        const visit = (node: Node) => {
            if (!node.isText) {
                add(found.nodes, nodeOwners.get(node.type.name), node);
            }
        };
        doc.nodesBetween(from, to, (node, position) => {
            visit(node);
            if (!node.isTextblock) {
                return true;
            }
            for (const child of node.children) {
                visit(child);
            }
            for (const run of markRuns(node, position + 1)) {
                add(found.runs, markOwners.get(run.mark.type.name), run);
            }
            return false;
        });
        return found;
    };

    /**
     * Whether the change from `before` to `after` creates, edits or removes an occurrence the policy forbids.
     * @param history An undo or redo, which may bring back a heading of any level that a document held.
     */
    return (policy: AuthoringPolicy, before: Node, after: Node, mapping: BatchMapping, history = false): boolean => {
        let previous: Occurrences = { nodes: new Map(), runs: new Map() };
        let next: Occurrences = { nodes: new Map(), runs: new Map() };
        const start = before.content.findDiffStart(after.content);
        if (start !== null) {
            // Two contents that differ from the start differ from the end too.
            const end = before.content.findDiffEnd(after.content) as { readonly a: number; readonly b: number };
            // An ambiguous diff, such as one more `a` in `aa`, can end before it starts.
            const overlap = Math.max(0, start - Math.min(end.a, end.b));
            previous = collect(before, start, end.a + overlap);
            next = collect(after, start, end.b + overlap);
        }
        // The document's content belongs to its children, so only its own attributes make it an occurrence.
        if (!before.hasMarkup(after.type, after.attrs, after.marks)) {
            add(previous.nodes, nodeOwners.get(before.type.name), before);
            add(next.nodes, nodeOwners.get(after.type.name), after);
        }
        if (!history && makesRefusedHeading(policy, previous, next)) {
            return true;
        }
        const features = new Set([
            ...previous.nodes.keys(),
            ...previous.runs.keys(),
            ...next.nodes.keys(),
            ...next.runs.keys(),
        ]);
        for (const featureId of features) {
            const rules = policy.features[featureId];
            if (rules === undefined) {
                continue;
            }
            const nodes = nodeChangeOf(listOf(previous.nodes, featureId), listOf(next.nodes, featureId));
            const runs = runChangeOf(listOf(previous.runs, featureId), listOf(next.runs, featureId), mapping);
            for (const action of ['create', 'edit', 'remove'] as const) {
                if (!rules[action] && (nodes[action] || runs[action])) {
                    return true;
                }
            }
        }
        return false;
    };
};
