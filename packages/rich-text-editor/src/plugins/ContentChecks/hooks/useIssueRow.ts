/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useId, useRef } from 'react';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { type CheckedIssue, useClientLayoutEffect, useEditorApi, useEditorValue } from '#/bridge/pluginApi/plugin';

import { goToIssue, repairIssue } from '../helpers/issueActions';
import { issueExcerpt } from '../helpers/issueDisplay';

/** One issue row: whether its repair can run, the text it shows, and Go to, Repair and Dismiss. */
export const useIssueRow = (
    held: CheckedIssue,
    rowKey: string,
    t: PanelComponentProps['t'],
    onActive: (rowKey: string) => void,
) => {
    const api = useEditorApi();
    const checks = api?.services.checks();
    const { issue, dismissed } = held;
    const repairable = useEditorValue((read) => {
        if (read === undefined || issue.repairCommand === null) {
            return false;
        }

        // A node's repair runs with that node selected, so the selection now decides only a document-level repair.
        if (issue.path !== null) {
            return read.editable();
        }

        return read.commands.query(issue.repairCommand, issue.repairPayload ?? undefined).enabled;
    });
    const titleId = useId();
    const excerptId = useId();
    const helpRef = useRef<HTMLHeadingElement>(null);
    const { excerpt, described } = issueExcerpt(issue, held.text, t, titleId, excerptId);
    const goTo = () => {
        goToIssue(api, checks, held, rowKey, onActive);
    };

    const repair = (button: HTMLButtonElement | undefined) => {
        repairIssue(api, checks, held, rowKey, t, onActive, button);
    };

    const dismiss = () => {
        checks?.dismiss(issue.id);
    };

    useClientLayoutEffect(() => {
        // Accordion.Header passes no props to its trigger button.
        helpRef.current?.querySelector('button')?.setAttribute('aria-describedby', described);
    }, [described]);

    return { issue, dismissed, repairable, excerpt, described, titleId, excerptId, helpRef, goTo, repair, dismiss };
};
