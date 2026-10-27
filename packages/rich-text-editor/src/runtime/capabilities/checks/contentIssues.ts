/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';
import { type Mapping } from 'prosemirror-transform';
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view';

import { type RichTextDocument, type ContentCheckOptions, type ContentIssue } from '#/model';
import { type LocatedIssue, locateContentIssues } from '#/model/internal';
import { type PluginImplementation } from '#/runtime/definition';

/** How long after the last change the checks run. */
export const CHECK_DELAY_MS = 750;

/** An issue of the last run, at the place it names in the current document. */
export type HeldIssue = {
    issue: ContentIssue;
    /** Mapped through every change since the run; both -1 for a document-level rule. */
    from: number;
    to: number;
    /** The node or text the issue named was deleted or replaced since the run. */
    gone: boolean;
    /** It names a run of inline content, such as a link, rather than one node. */
    inline: boolean;
    /** The stored content it was found on, which a dismissal keeps until that content changes. */
    signature: string;
    /** Stays the same from run to run while the rule is reported at the same place, unlike a path-based ID. */
    key: string;
};

type Dismissal = {
    ruleId: ContentIssue['ruleId'];
    from: number;
    signature: string;
};

/** The content checks state: the issues of the last run at their current places, and what the author did with them. */
export type ContentChecksState = {
    issues: readonly HeldIssue[];
    /** How many times the checks ran in this session. */
    runs: number;
    /** The issues panel is open, which alone shows the surface decorations. */
    open: boolean;
    dismissed: readonly Dismissal[];
};

type Severity = ContentIssue['severity'];

type Meta = { results: readonly HeldIssue[] } | { open: boolean } | { dismiss: string };

const CONTENT_ISSUES = new PluginKey<ContentChecksState>('content-issues');

const EMPTY: ContentChecksState = { issues: [], runs: 0, open: false, dismissed: [] };

const STRENGTH: Readonly<Record<Severity, number>> = { error: 2, warning: 1, review: 0 };

const matches = (dismissal: Dismissal, held: HeldIssue) =>
    dismissal.ruleId === held.issue.ruleId && dismissal.from === held.from && dismissal.signature === held.signature;

/** The content checks state, or `undefined` when the editor does not install them. */
export const contentChecksOf = (state: EditorState): ContentChecksState | undefined => CONTENT_ISSUES.getState(state);

/** Whether the author dismissed `held` for this session, until what it names changes. */
export const isDismissed = (state: ContentChecksState, held: HeldIssue): boolean =>
    state.dismissed.some((dismissal) => matches(dismissal, held));

/** Shows or hides the surface decorations as the issues panel opens and closes. */
export const withIssuesOpen = (transaction: Transaction, open: boolean): Transaction =>
    transaction.setMeta(CONTENT_ISSUES, { open } satisfies Meta).setMeta('addToHistory', false);

/** Dismisses the issue `id` of the last run for the session, until what it names changes. */
export const withDismissed = (transaction: Transaction, id: string): Transaction =>
    transaction.setMeta(CONTENT_ISSUES, { dismiss: id } satisfies Meta).setMeta('addToHistory', false);

const mapHeld = (held: HeldIssue, mapping: Mapping): HeldIssue => {
    if (held.from < 0 || held.gone) {
        return held;
    }

    const from = mapping.mapResult(held.from, 1);
    const to = mapping.mapResult(held.to, -1);

    // A replaced edge, even by content of the same size, is another node or text.
    return { ...held, from: from.pos, to: to.pos, gone: from.deleted || to.deleted || to.pos <= from.pos };
};

/**
 * Whether `candidate`, of a later run, is the issue `held` named, mapped since its run: the same rule on the node with
 * its `nodeId` when that `nodeId` was unique, else on its mapped range, which text edited inside it keeps.
 */
const samePlace = (candidate: HeldIssue, held: HeldIssue) => {
    const { ruleId, nodeId, id, path } = held.issue;
    if (candidate.issue.ruleId !== ruleId || candidate.gone) {
        return false;
    }

    if (nodeId !== null && id === `${ruleId}:${nodeId}`) {
        return candidate.issue.id === id;
    }

    if (path === null) {
        return candidate.issue.path === null;
    }

    // A replaced node is another node; replaced text at a run's edge still leaves the run where it was.
    if (held.from < 0 || (held.gone && !held.inline)) {
        return false;
    }

    return candidate.inline === held.inline && candidate.from === held.from && candidate.to === held.to;
};

/** The issue of the latest run that `held`, from an earlier run and mapped since, named, if that rule is still reported there. */
export const sameIssueIn = (value: ContentChecksState, held: HeldIssue): HeldIssue | undefined =>
    value.issues.find((candidate) => samePlace(candidate, held));

/** Where `held` is, as `samePlace` compares two issues, so a run looks the last run's issues up by it. */
const placeOf = (held: HeldIssue): string | undefined => {
    const { ruleId, nodeId, id, path } = held.issue;
    if (nodeId !== null && id === `${ruleId}:${nodeId}`) {
        return id;
    }

    if (path === null) {
        return ruleId;
    }

    if (held.from < 0 || (held.gone && !held.inline)) {
        return undefined;
    }

    return `${ruleId} ${held.inline ? 'inline' : 'node'} ${held.from} ${held.to}`;
};

/** The results of a run, each keeping the key of the last run's issue at the same place. */
const keyed = (value: ContentChecksState, results: readonly HeldIssue[]): readonly HeldIssue[] => {
    const previous = new Map<string, string>();
    for (const held of value.issues) {
        const place = placeOf(held);
        if (place !== undefined && !previous.has(place)) {
            previous.set(place, held.key);
        }
    }

    return results.map((result, index) => {
        const place = placeOf(result);
        if (place !== undefined) {
            const key = previous.get(place);
            if (key !== undefined) {
                previous.delete(place);

                return { ...result, key };
            }
        }

        return { ...result, key: `${value.runs + 1}:${index}` };
    });
};

const mapState = (value: ContentChecksState, mapping: Mapping): ContentChecksState => {
    if (value.issues.length === 0 && value.dismissed.length === 0) {
        return value;
    }

    const dismissed: Dismissal[] = [];
    for (const dismissal of value.dismissed) {
        if (dismissal.from < 0) {
            dismissed.push(dismissal);
            continue;
        }

        const mapped = mapping.mapResult(dismissal.from, 1);
        if (!mapped.deleted) {
            dismissed.push({ ...dismissal, from: mapped.pos });
        }
    }

    return { ...value, issues: value.issues.map((held) => mapHeld(held, mapping)), dismissed };
};

const applyMeta = (value: ContentChecksState, meta: Meta): ContentChecksState => {
    if ('results' in meta) {
        // A dismissal lasts while its issue is found again on unchanged content.
        const dismissed = value.dismissed.filter((dismissal) => meta.results.some((held) => matches(dismissal, held)));

        return { ...value, issues: keyed(value, meta.results), runs: value.runs + 1, dismissed };
    }

    if ('open' in meta) {
        return { ...value, open: meta.open };
    }

    const held = value.issues.find(({ issue }) => issue.id === meta.dismiss);
    if (held === undefined || held.issue.severity === 'error' || isDismissed(value, held)) {
        return value;
    }

    const dismissal = { ruleId: held.issue.ruleId, from: held.from, signature: held.signature };

    return { ...value, dismissed: [...value.dismissed, dismissal] };
};

/** The surface icons by severity, from the issues panel's own icons, for each document an editor shows in. */
const icons = new WeakMap<Document, Partial<Record<Severity, Element>>>();

/** Gives the surface decorations of `ownerDocument` the icons the issues panel renders. */
export const setIssueIcons = (ownerDocument: Document, shown: Partial<Record<Severity, Element>>): void => {
    icons.set(ownerDocument, shown);
};

const iconOf = (view: EditorView, severity: Severity) => {
    const element = view.dom.ownerDocument.createElement('span');
    element.setAttribute('data-rte-issue-icon', severity);
    element.setAttribute('aria-hidden', 'true');
    element.setAttribute('contenteditable', 'false');
    const icon = icons.get(view.dom.ownerDocument)?.[severity];
    if (icon !== undefined) {
        element.append(icon.cloneNode(true));
    }

    return element;
};

/** Where an issue's icon goes: the start of its first inline content, else before its node. */
const iconAt = (doc: Node, held: HeldIssue) => {
    if (held.inline) {
        return held.from;
    }

    let found: number | undefined;
    doc.nodesBetween(held.from, held.to, (node, pos) => {
        if (found === undefined && node.inlineContent) {
            found = pos + 1;
        }

        return found === undefined;
    });

    return found ?? held.from;
};

const drawn = new WeakMap<ContentChecksState, DecorationSet>();

const decorationsOf = (state: EditorState): DecorationSet => {
    const value = CONTENT_ISSUES.getState(state);
    if (value === undefined || !value.open) {
        return DecorationSet.empty;
    }

    const cached = drawn.get(value);
    if (cached !== undefined) {
        return cached;
    }

    const { doc } = state;
    // One mark per range, in the strongest severity of the issues on it.
    const marked = new Map<string, HeldIssue>();
    for (const held of value.issues) {
        const { issue, from, to } = held;
        const unmarked = held.gone || from < 0 || to > doc.content.size || isDismissed(value, held);
        if (issue.kind !== 'automatic' || unmarked) {
            continue;
        }

        const range = `${held.inline ? 'inline' : 'node'} ${from} ${to}`;
        const strongest = marked.get(range);
        if (strongest === undefined || STRENGTH[issue.severity] > STRENGTH[strongest.issue.severity]) {
            marked.set(range, held);
        }
    }

    const found: Decoration[] = [];
    for (const [range, held] of marked) {
        const { issue, from, to } = held;
        const attrs = { 'data-rte-issue': issue.severity };
        if (held.inline) {
            found.push(Decoration.inline(from, to, attrs));
        } else {
            const node = doc.nodeAt(from);
            // A node split or joined since the run no longer spans the range a node decoration needs.
            if (node === null || from + node.nodeSize !== to) {
                continue;
            }

            found.push(Decoration.node(from, to, attrs));
        }

        found.push(
            Decoration.widget(iconAt(doc, held), (view) => iconOf(view, issue.severity), {
                key: `${range} ${issue.severity}`,
                side: -1,
                ignoreSelection: true,
                marks: [],
            }),
        );
    }

    const set = DecorationSet.create(doc, found);
    drawn.set(value, set);

    return set;
};

/** The results of the content checks, held only in this plugin's state, and their decorations while the panel is open. */
export const contentIssuesPlugin: PluginImplementation = () =>
    new Plugin<ContentChecksState>({
        key: CONTENT_ISSUES,
        state: {
            init: () => EMPTY,
            apply: (transaction, value) => {
                let next = value;
                if (transaction.docChanged) {
                    next = mapState(next, transaction.mapping);
                }

                const meta = transaction.getMeta(CONTENT_ISSUES) as Meta | undefined;
                if (meta !== undefined) {
                    next = applyMeta(next, meta);
                }

                return next;
            },
        },
        props: { decorations: decorationsOf },
    });

/** The range that `path` and `span` name in `doc`: the node at `path`, or `span` inline children from it. */
const locate = (doc: Node, path: readonly number[], span: number) => {
    let parent = doc;
    let start = 0;
    for (const [depth, index] of path.entries()) {
        const count = depth === path.length - 1 ? Math.max(span, 1) : 1;
        if (index + count > parent.childCount) {
            return undefined;
        }

        let pos = start;
        for (let child = 0; child < index; child += 1) {
            pos += parent.child(child).nodeSize;
        }

        const node = parent.child(index);
        if (depth === path.length - 1) {
            let end = pos;
            for (let child = index; child < index + count; child += 1) {
                end += parent.child(child).nodeSize;
            }

            return { from: pos, to: end, inline: node.isInline };
        }

        parent = node;
        start = pos + 1;
    }

    return undefined;
};

const holdIssue = (doc: Node, { issue, span, signature }: LocatedIssue): HeldIssue => {
    if (issue.path === null) {
        return { issue, from: -1, to: -1, gone: false, inline: false, signature, key: '' };
    }

    const range = locate(doc, issue.path, span);
    if (range === undefined) {
        return { issue, from: -1, to: -1, gone: true, inline: false, signature, key: '' };
    }

    return { issue, ...range, gone: false, signature, key: '' };
};

/** What the checks read from the session that runs them. */
export type ContentChecksHost = {
    state: () => EditorState;
    sequence: () => number;
    encode: () => RichTextDocument;
    /** Input is composing or has not settled yet. */
    composing: () => boolean;
    /** The session takes commits: neither faulted nor disposed. */
    ready: () => boolean;
    commit: (transaction: Transaction) => void;
    /** The locale, colour options, model, enclosing heading level and creatable heading levels, read when the checks run. */
    options: () => Omit<ContentCheckOptions, 'sequence'>;
};

/** The running content checks of a session. */
export type ContentChecks = {
    /** A change was published: the checks run once no change came for the delay. */
    changed(): void;
    /** Runs the checks now, unless input is composing; `true` when they ran. */
    run(): boolean;
    dispose(): void;
};

/** Runs the content checks outside the input path, on a timer or on request, and commits their results. */
export const createContentChecks = (host: ContentChecksHost): ContentChecks => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const installed = () => contentChecksOf(host.state()) !== undefined;
    const clear = () => {
        if (timer !== undefined) {
            clearTimeout(timer);
            timer = undefined;
        }
    };

    const run = () => {
        if (!installed() || !host.ready() || host.composing()) {
            return false;
        }

        const state = host.state();
        const located = locateContentIssues(host.encode(), { ...host.options(), sequence: host.sequence() });
        const results = located.map((issue) => holdIssue(state.doc, issue));
        host.commit(state.tr.setMeta(CONTENT_ISSUES, { results } satisfies Meta).setMeta('addToHistory', false));

        return true;
    };

    const schedule = () => {
        clear();
        timer = setTimeout(() => {
            timer = undefined;
            // A composition holds the run until input settles, whose change schedules it again.
            if (!run() && host.composing()) {
                schedule();
            }
        }, CHECK_DELAY_MS);
    };

    return {
        changed: () => {
            if (installed()) {
                schedule();
            }
        },
        run,
        dispose: clear,
    };
};
