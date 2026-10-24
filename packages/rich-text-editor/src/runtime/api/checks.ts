/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type ContentChecksApi, type ContentChecksResult } from '../capabilities/checks/api';
import {
    contentChecksOf,
    type ContentChecksState,
    type HeldIssue,
    isDismissed,
    sameIssueIn,
    setIssueIcons,
    withDismissed,
    withIssuesOpen,
} from '../capabilities/checks/content-issues';
import { type EditorRuntime } from '../runtime';

// A composition that outlasts this wait leaves the action undone.
const COMPOSITION_WAIT_MS = 1000;

/** The text of what `held` names in the current document: its text, else an image's alternative text or label. */
const issueText = (doc: Node, held: HeldIssue): string => {
    if (held.gone || held.from < 0 || held.to > doc.content.size) {
        return '';
    }
    const text = doc.textBetween(held.from, held.to, ' ', ' ');
    if (text.trim() !== '') {
        return text;
    }
    const atHeld = doc.nodeAt(held.from);
    let attrs: Readonly<Record<string, unknown>> = {};
    if (atHeld !== null) {
        attrs = atHeld.attrs;
    }
    const named = [attrs.altText, attrs.title, attrs.labelSnapshot].find(
        (value) => typeof value === 'string' && value.trim() !== '',
    );
    if (typeof named === 'string') {
        return named;
    }
    return '';
};

const NO_RESULTS: ContentChecksResult = { issues: [], runs: 0 };

const checkedResults = new WeakMap<ContentChecksState, ContentChecksResult>();

const checkedOf = (state: EditorState, checks: ContentChecksState): ContentChecksResult => {
    let result = checkedResults.get(checks);
    if (result === undefined) {
        result = {
            issues: checks.issues.map((held) => ({
                issue: held.issue,
                key: held.key,
                text: issueText(state.doc, held),
                dismissed: isDismissed(checks, held),
            })),
            runs: checks.runs,
        };
        checkedResults.set(checks, result);
    }
    return result;
};

/**
 * Selects what `held` names and scrolls it into view: a run of text, a textblock's text, a caret in the first text of
 * a node that holds blocks, such as a table's first cell, or a leaf node itself.
 */
const selectIssue = (runtime: EditorRuntime, held: HeldIssue) => {
    const { from, to } = held;
    if (held.inline) {
        runtime.select({ anchor: from, head: to, scroll: true });
        return;
    }
    const { doc } = runtime.state;
    const node = doc.nodeAt(from);
    if (node?.isTextblock === true) {
        runtime.select({ anchor: from + 1, head: to - 1, scroll: true });
        return;
    }
    let text: number | undefined;
    doc.nodesBetween(from, to, (child, pos) => {
        if (text === undefined && child.inlineContent) {
            text = pos + 1;
        }
        return text === undefined;
    });
    if (text !== undefined) {
        runtime.select({ anchor: text, head: text, scroll: true });
        return;
    }
    runtime.select({ node: from, scroll: true });
};

/** The issue `key` names in the current document, checked again first with `recheck` or for an older `sequence`. */
const currentIssue = (runtime: EditorRuntime, key: string, recheck: boolean): HeldIssue | undefined => {
    const mapped = contentChecksOf(runtime.state)?.issues.find((held) => held.key === key);
    // An issue the last run no longer reported names nothing now.
    if (mapped === undefined) {
        return undefined;
    }
    if (!recheck && mapped.issue.sequence === runtime.handle.getSummary().sequence) {
        if (mapped.gone || mapped.from < 0) {
            return undefined;
        }
        return mapped;
    }
    if (!runtime.runChecks()) {
        return undefined;
    }
    const checks = contentChecksOf(runtime.state);
    if (checks === undefined) {
        return undefined;
    }
    return sameIssueIn(checks, mapped);
};

/** The content checks of `runtime`, or `undefined` when its editor does not install them. */
export const contentChecksApi = (runtime: EditorRuntime): ContentChecksApi | undefined => {
    if (contentChecksOf(runtime.state) === undefined) {
        return undefined;
    }
    return {
        current: () => {
            const { state } = runtime;
            const checks = contentChecksOf(state);
            if (checks === undefined) {
                return NO_RESULTS;
            }
            return checkedOf(state, checks);
        },
        run: () => runtime.runChecks(),
        select: (key, recheck) => {
            const current = currentIssue(runtime, key, recheck);
            if (current === undefined) {
                return undefined;
            }
            if (current.issue.path !== null) {
                selectIssue(runtime, current);
            }
            return current.issue;
        },
        dismiss: (id) => {
            runtime.view?.dispatch(withDismissed(runtime.state.tr, id));
        },
        open: (icons, opened) => {
            const { view } = runtime;
            if (view === undefined) {
                return () => undefined;
            }
            setIssueIcons(view.dom.ownerDocument, icons);
            const show = () => {
                runtime.runChecks();
                const runs = contentChecksOf(runtime.state)?.runs;
                opened(runs ?? 0);
                runtime.view?.dispatch(withIssuesOpen(runtime.state.tr, true));
            };
            show();
            // A replaced document starts with fresh check state, which the open checks fill again.
            const unsubscribe = runtime.handle.subscribe('replaced', show);
            return () => {
                unsubscribe();
                runtime.view?.dispatch(withIssuesOpen(runtime.state.tr, false));
            };
        },
        afterInput: (action) => {
            if (!runtime.handle.getSnapshot().compositionActive) {
                action();
                return;
            }
            const { view } = runtime;
            // The browser commits composed text when the surface blurs, and focus stays in the surface.
            if (view?.hasFocus() === true) {
                view.dom.blur();
                view.focus();
            }
            runtime.afterInput((outcome) => {
                if (outcome === 'settled') {
                    action();
                }
            }, COMPOSITION_WAIT_MS);
        },
    };
};
