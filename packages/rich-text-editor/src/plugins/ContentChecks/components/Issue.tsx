/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent } from 'react';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { type CheckedIssue } from '#/bridge/pluginApi/plugin';

import { useIssueRow } from '../hooks/useIssueRow';
import styles from '../styles/checks.module.scss';

import { IssueActions } from './IssueActions';
import { IssueHelp } from './IssueHelp';
import { IssueTitle } from './IssueTitle';

export type IssueProps = {
    held: CheckedIssue;
    rowKey: string;
    translate: PanelComponentProps['translate'];
    onFocusIssue: (rowKey: string | undefined) => void;
    onActive: (rowKey: string) => void;
};

/** One issue: its name, the text it names, Go to, its repair, help, and Dismiss for a warning or review. */
export const Issue = ({ held, rowKey, translate, onFocusIssue, onActive }: IssueProps) => {
    const row = useIssueRow(held, rowKey, translate, onActive);
    const { issue, dismissed, excerpt, excerptId, titleId, described, helpRef } = row;

    return (
        <li
            className={styles.issue}
            data-rte-issue-id={issue.id}
            data-rte-row={rowKey}
            data-severity={issue.severity}
            onFocus={() => onFocusIssue(rowKey)}
            onBlur={(event: FocusEvent<HTMLLIElement>) => {
                // A button removed with its row blurs with no next element, and the row's leaving then moves focus.
                if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
                    onFocusIssue(undefined);
                }
            }}
        >
            <IssueTitle issue={issue} dismissed={dismissed} titleId={titleId} translate={translate} />
            {excerpt !== '' && (
                <p id={excerptId} className={styles.excerpt}>
                    <bdi>{excerpt}</bdi>
                </p>
            )}
            <IssueActions
                issue={issue}
                dismissed={dismissed}
                repairable={row.repairable}
                described={described}
                translate={translate}
                onGoTo={row.goTo}
                onRepair={row.repair}
                onDismiss={row.dismiss}
            />
            <IssueHelp helpRef={helpRef} ruleId={issue.ruleId} translate={translate} />
        </li>
    );
};

Issue.displayName = 'Issue';
