/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';

import { type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/pluginApi/define';
import { type EditorApi, useEditorApi } from '#/bridge/pluginApi/plugin';
import { mentionLabel } from '#/model';

import styles from '../styles/mention.module.scss';

// Reported mentions by session, keyed by its one `nodeState` object, so an undo or a rerender reports none again.
const reported = new WeakMap<EditorApi['nodeState'], Set<string>>();

/** Reports a mention whose resource is unavailable once per node and session, with its reason and no label. */
const reportOnce = (api: EditorApi | undefined, nodeId: string | null, code: 'deleted' | 'forbidden') => {
    if (api === undefined || nodeId === null) {
        return;
    }

    let seen = reported.get(api.nodeState);
    if (seen === undefined) {
        seen = new Set();
        reported.set(api.nodeState, seen);
    }

    if (seen.has(nodeId)) {
        return;
    }

    seen.add(nodeId);
    api.report({
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
    const api = useEditorApi();
    const shown = mentionLabel(attrs, context);
    const { unavailable } = shown;
    useEffect(() => {
        if (unavailable !== null) {
            reportOnce(api, nodeId, unavailable);
        }
    }, [api, nodeId, unavailable]);
    let unavailableMarker: string | undefined;
    if (unavailable !== null) {
        unavailableMarker = '';
    }

    return (
        <span className={styles.mention} data-unavailable={unavailableMarker}>
            @<bdi>{shown.label}</bdi>
            {unavailable !== null && (
                <span className={styles.note}> ({context.t('RichTextEditor_mentionUnavailable')})</span>
            )}
        </span>
    );
};

/** The chrome of `mention`, which `defineEditor` attaches through the shipped views. */
export const mentionView: NodeViewDeclaration = { node: 'mention', component: MentionChip };
