/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type Node } from 'prosemirror-model';

import { type ContentModel, DefinitionError } from '#/model';
import { compiledModel } from '#/model/compile';
import { findUnsafeJson } from '#/model/values';

import { type AuthoringPolicy, type FeaturePolicy, type HeadingLevel } from './types';

const EVERYTHING: FeaturePolicy = { create: true, edit: true, remove: true, paste: true };
const HEADING_LEVELS: readonly HeadingLevel[] = [1, 2, 3, 4, 5, 6];
// An inline node other than text, in the text of a mark run.
const OBJECT_REPLACEMENT = '￼';

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

interface Run {
    readonly mark: Mark;
    text: string;
}
/** A feature's occurrences in part of a document: its nodes, and its marks as runs. */
interface Occurrences {
    readonly nodes: Map<string, Node[]>;
    readonly runs: Map<string, Run[]>;
}

/** Each maximal stretch of a textblock's inline content that carries one mark, with the stretch's text. */
const markRuns = (block: Node): Run[] => {
    const runs: Run[] = [];
    let open: Run[] = [];
    for (const child of block.children) {
        let text = OBJECT_REPLACEMENT;
        if (child.isText) {
            text = child.textContent;
        }
        open = child.marks.map((mark) => {
            let run = open.find((candidate) => candidate.mark.eq(mark));
            if (run === undefined) {
                run = { mark, text: '' };
                runs.push(run);
            }
            run.text += text;
            return run;
        });
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

/** Matched occurrences cancel out; more after is a create, fewer is a remove, and an unmatched pair is an edit. */
const changeOf = <T>(before: readonly T[], after: readonly T[], same: (a: T, b: T) => boolean) => {
    const left = [...after];
    let unmatched = 0;
    for (const item of before) {
        const index = left.findIndex((other) => same(item, other));
        if (index < 0) {
            unmatched += 1;
        } else {
            left.splice(index, 1);
        }
    }
    return {
        create: after.length > before.length,
        remove: before.length > after.length,
        edit: unmatched > 0 && left.length > 0,
    };
};

const listOf = <T>(map: ReadonlyMap<string, T[]>, featureId: string): T[] => map.get(featureId) ?? [];
const sameNode = (a: Node, b: Node) => a === b || a.eq(b);
const sameRun = (a: Run, b: Run) => a.text === b.text && a.mark.eq(b.mark);

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
        doc.nodesBetween(from, to, (node) => {
            visit(node);
            if (!node.isTextblock) {
                return true;
            }
            for (const child of node.children) {
                visit(child);
            }
            for (const run of markRuns(node)) {
                add(found.runs, markOwners.get(run.mark.type.name), run);
            }
            return false;
        });
        return found;
    };

    /** Whether the change from `before` to `after` creates, edits or removes an occurrence the policy forbids. */
    return (policy: AuthoringPolicy, before: Node, after: Node): boolean => {
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
            const nodes = changeOf(listOf(previous.nodes, featureId), listOf(next.nodes, featureId), sameNode);
            const runs = changeOf(listOf(previous.runs, featureId), listOf(next.runs, featureId), sameRun);
            for (const action of ['create', 'edit', 'remove'] as const) {
                if (!rules[action] && (nodes[action] || runs[action])) {
                    return true;
                }
            }
        }
        return false;
    };
};
