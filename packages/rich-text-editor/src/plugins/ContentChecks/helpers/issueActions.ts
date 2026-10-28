/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CheckedIssue, type ContentChecksApi, type EditorApi } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

/** Selects what the issue names and moves focus into the editor. */
export const goToIssue = (
    api: EditorApi | undefined,
    checks: ContentChecksApi | undefined,
    held: CheckedIssue,
    rowKey: string,
    onActive: (rowKey: string) => void,
) => {
    if (api === undefined || checks === undefined) {
        return;
    }

    onActive(rowKey);
    checks.afterInput(() => {
        if (checks.select(held.key, false) !== undefined) {
            api.focus();
        }
    });
};

/** Runs the issue's repair on the live document, and says so when the policy refuses it. */
export const repairIssue = (
    api: EditorApi | undefined,
    checks: ContentChecksApi | undefined,
    held: CheckedIssue,
    rowKey: string,
    t: CodecContext['translate'],
    onActive: (rowKey: string) => void,
    button: HTMLButtonElement | undefined,
) => {
    if (api === undefined || checks === undefined || held.issue.repairCommand === null) {
        return;
    }

    onActive(rowKey);
    // A dialog, popover or menu the repair opens returns focus to the button that had it.
    button?.focus();
    // The repair runs on the live document, checked again first, and not at all when that rule no longer applies.
    checks.afterInput(() => {
        const current = checks.select(held.key, true);
        if (current === undefined || current.repairCommand === null) {
            return;
        }

        const outcome = api.commands.execute(current.repairCommand, current.repairPayload ?? undefined);
        // The policy judges a repair's change only once it has run, so its refusal is said rather than dropped.
        if (outcome.status === 'rejected' && outcome.code === 'not-allowed') {
            api.announce(t('RichTextEditor_unavailableNotAllowed'));
        }
    });
};
