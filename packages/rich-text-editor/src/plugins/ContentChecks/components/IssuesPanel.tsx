/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { useId, useRef, useState } from 'react';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { useEditorApi, useEditorValue } from '#/bridge/pluginApi/plugin';

import { checksSummary, visibleIssues } from '../helpers/issueDisplay';
import { useChecksSession } from '../hooks/useChecksSession';
import { useDepartedIssueFocus } from '../hooks/useDepartedIssueFocus';
import { useRequestedIssueFocus } from '../hooks/useRequestedIssueFocus';
import { useSummaryAnnouncement } from '../hooks/useSummaryAnnouncement';
import styles from '../styles/checks.module.scss';

import { DismissedToggle } from './DismissedToggle';
import { Issue } from './Issue';
import { SeverityMarks } from './SeverityMarks';

/**
 * The issues the content checks found, in document order: a summary heading, which takes focus on open, a Close
 * button, then each issue with Go to, its repair, help on how to decide and, for a warning or review, Dismiss. The
 * checks run when it opens, and the surface marks each automatic issue while it is open. Its command, run again while
 * it is open, moves focus to the issue last acted on.
 */
export const IssuesPanel = ({ translate, requested, close }: PanelComponentProps) => {
    const api = useEditorApi();
    const checks = useEditorValue((read) => read?.services.checks()?.current(), Object.is);
    const [showDismissed, setShowDismissed] = useState(false);
    const [lastActive, setLastActive] = useState<string>();

    const headingRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLOListElement>(null);
    const iconsRef = useRef<HTMLSpanElement>(null);
    // The row that holds focus, whose leaving the list moves focus to the summary heading.
    const focusedRef = useRef<string | undefined>(undefined);
    const requestedRef = useRef(requested);

    // The run the panel opened on, whose counts focus reads from the heading, and the summary last shown after a run.
    const openedRunRef = useRef(0);
    const shownRef = useRef<{ runs: number; summary: string } | undefined>(undefined);
    // Focus moved to the summary heading in this commit, which reads the counts already.
    const headingSpokeRef = useRef(false);

    const headingId = useId();
    const dismissedId = useId();

    useChecksSession(api, iconsRef, headingRef, openedRunRef);
    useRequestedIssueFocus(requestedRef, requested, lastActive, listRef, headingRef);

    const reported = checks?.issues;
    const issues = reported ?? [];
    const { counted, listed, dismissedCount } = visibleIssues(issues, showDismissed);

    useDepartedIssueFocus(listed, focusedRef, headingRef, headingSpokeRef);

    const summary = checksSummary(translate, counted);
    const reportedRuns = checks?.runs;
    const runs = reportedRuns ?? 0;
    useSummaryAnnouncement({ api, runs, summary, shownRef, openedRunRef, headingSpokeRef });

    return (
        <div role="region" aria-label={translate('RichTextEditor_checks')} className={styles.panel}>
            <h2 ref={headingRef} id={headingId} tabIndex={-1} className={styles.summary}>
                {summary}
            </h2>
            <div className={styles.actions}>
                <Button size="small" emphasis="default" onPress={close}>
                    {translate('RichTextEditor_close')}
                </Button>
            </div>
            {dismissedCount > 0 && (
                <DismissedToggle
                    id={dismissedId}
                    value={showDismissed}
                    label={translate('RichTextEditor_checksShowDismissed')}
                    onToggle={() => setShowDismissed((previous) => !previous)}
                />
            )}
            <ol ref={listRef} className={styles.list} aria-labelledby={headingId}>
                {listed.map((held) => (
                    <Issue
                        key={held.key}
                        rowKey={held.key}
                        held={held}
                        translate={translate}
                        onFocusIssue={(rowKey) => {
                            focusedRef.current = rowKey;
                        }}
                        onActive={setLastActive}
                    />
                ))}
            </ol>
            <SeverityMarks iconsRef={iconsRef} />
        </div>
    );
};

IssuesPanel.displayName = 'IssuesPanel';
