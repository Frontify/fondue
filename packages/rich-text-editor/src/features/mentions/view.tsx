/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext, useEffect } from 'react';

import { type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';
import { SessionContext } from '#/bridge/hooks';
import { mentionLabel } from '#/model/references';
import { type EditorRuntime } from '#/runtime/runtime';

import styles from './styles/mention.module.scss';

// The mentions of each session already reported unavailable, so an undo or a rerender reports none again.
const reported = new WeakMap<EditorRuntime, Set<string>>();

/** Reports a mention whose resource is unavailable once per node and session, with its reason and no label. */
const reportOnce = (runtime: EditorRuntime | undefined, nodeId: string | null, code: 'deleted' | 'forbidden') => {
    if (runtime === undefined || nodeId === null) {
        return;
    }
    let seen = reported.get(runtime);
    if (seen === undefined) {
        seen = new Set();
        reported.set(runtime, seen);
    }
    if (seen.has(nodeId)) {
        return;
    }
    seen.add(nodeId);
    runtime.report({
        code: 'reference.unavailable',
        severity: 'warning',
        messageKey: 'reference.unavailable',
        featureId: 'mentions',
        details: { code },
    });
};

/**
 * The mention as the author sees it: `@` and the current label, else its snapshot, isolated for bidirectional text,
 * and a note when the resource is unavailable. The stored `labelSnapshot` never changes here.
 */
const MentionChip = () => {
    const { attrs, nodeId, context } = useRichTextNodeView();
    const runtime = useContext(SessionContext);
    const shown = mentionLabel(attrs, context);
    const { unavailable } = shown;
    useEffect(() => {
        if (unavailable !== null) {
            reportOnce(runtime, nodeId, unavailable);
        }
    }, [runtime, nodeId, unavailable]);
    return (
        <span className={styles.mention} data-unavailable={unavailable === null ? undefined : ''}>
            @<bdi>{shown.label}</bdi>
            {unavailable !== null && (
                <span className={styles.note}> ({context.t('RichTextEditor_mentionUnavailable')})</span>
            )}
        </span>
    );
};

/** The chrome of `mention`, which `defineEditor` attaches through the shipped views. */
export const mentionView: NodeViewDeclaration = { node: 'mention', component: MentionChip };
