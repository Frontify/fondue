/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Accordion, Badge, Button, Checkbox, Label } from '@frontify/fondue-components';
import { IconExclamationMarkCircle, IconExclamationMarkTriangle, IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { type FocusEvent, useId, useRef, useState } from 'react';

import { type PanelComponentProps } from '#/bridge/define';
import { type CheckedIssue, useClientLayoutEffect, useEditorApi, useEditorValue } from '#/bridge/plugin';
import { type ContentIssue, ruleHelpKey, ruleNameKey } from '#/model';

import styles from './styles/checks.module.scss';

type Severity = ContentIssue['severity'];

const EXCERPT_LENGTH = 60;
const SUMMARY_KEY = 'content-checks-summary';

const SEVERITY_KEYS = {
    error: 'RichTextEditor_checksSeverityError',
    warning: 'RichTextEditor_checksSeverityWarning',
    review: 'RichTextEditor_checksSeverityReview',
} as const;

const SEVERITY_ICONS = {
    error: IconExclamationMarkTriangle,
    warning: IconExclamationMarkCircle,
    review: IconQuestionMarkCircle,
} as const;

const SEVERITY_BADGES = {
    error: { variant: 'negative', emphasis: 'strong' },
    warning: { variant: 'warning', emphasis: 'strong' },
    review: { variant: 'default', emphasis: 'weak' },
} as const;

const SEVERITIES = ['error', 'warning', 'review'] as const;

/** Up to 60 characters of `text`, on one line. */
const shortened = (text: string) => {
    const line = text.replaceAll(/\s+/g, ' ').trim();
    if ([...line].length <= EXCERPT_LENGTH) {
        return line;
    }
    return `${[...line].slice(0, EXCERPT_LENGTH - 1).join('')}…`;
};

const Issue = ({
    held,
    rowKey,
    t,
    onFocusIssue,
    onActive,
}: {
    readonly held: CheckedIssue;
    readonly rowKey: string;
    readonly t: PanelComponentProps['t'];
    readonly onFocusIssue: (rowKey: string | undefined) => void;
    readonly onActive: (rowKey: string) => void;
}) => {
    const api = useEditorApi();
    const checks = api?.services.checks();
    const titleId = useId();
    const excerptId = useId();
    const helpRef = useRef<HTMLHeadingElement>(null);
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
    const Icon = SEVERITY_ICONS[issue.severity];
    let excerpt = t('RichTextEditor_checksDocument');
    if (issue.path !== null) {
        excerpt = shortened(held.text);
    }
    const goTo = () => {
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
    const repair = (button: HTMLButtonElement | undefined) => {
        if (api === undefined || checks === undefined || issue.repairCommand === null) {
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
    const described = excerpt === '' ? titleId : `${titleId} ${excerptId}`;
    useClientLayoutEffect(() => {
        // Accordion.Header passes no props to its trigger button.
        helpRef.current?.querySelector('button')?.setAttribute('aria-describedby', described);
    }, [described]);
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
            <div id={titleId} className={styles.title}>
                <Badge size="small" {...SEVERITY_BADGES[issue.severity]}>
                    <Icon size={16} aria-hidden="true" />
                    {t(SEVERITY_KEYS[issue.severity])}
                </Badge>{' '}
                <span>{t(ruleNameKey(issue.ruleId))}</span> <span className={styles.rule}>({issue.ruleId})</span>
                {dismissed && <span className={styles.dismissed}> {t('RichTextEditor_checksDismissed')}</span>}
            </div>
            {excerpt !== '' && (
                <p id={excerptId} className={styles.excerpt}>
                    <bdi>{excerpt}</bdi>
                </p>
            )}
            <div className={styles.actions}>
                {issue.path !== null && (
                    <Button size="small" emphasis="default" aria-describedby={described} onPress={goTo}>
                        {t('RichTextEditor_checksGoTo')}
                    </Button>
                )}
                {repairable && (
                    <Button
                        size="small"
                        emphasis="default"
                        aria-describedby={described}
                        onPress={(event) => repair(event?.currentTarget)}
                    >
                        {t('RichTextEditor_checksRepair')}
                    </Button>
                )}
                {issue.severity !== 'error' && !dismissed && (
                    <Button
                        size="small"
                        emphasis="weak"
                        aria-describedby={described}
                        onPress={() => checks?.dismiss(issue.id)}
                    >
                        {t('RichTextEditor_checksDismiss')}
                    </Button>
                )}
            </div>
            <div className={styles.help}>
                <Accordion.Root border={false} padding="none">
                    <Accordion.Item value="help">
                        <Accordion.Header ref={helpRef}>{t('RichTextEditor_checksHelp')}</Accordion.Header>
                        <Accordion.Content>
                            <p>{t(ruleHelpKey(issue.ruleId))}</p>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
        </li>
    );
};

/**
 * The issues the content checks found, in document order: a summary heading, which takes focus on open, a Close
 * button, then each issue with Go to, its repair, help on how to decide and, for a warning or review, Dismiss. The
 * checks run when it opens, and the surface marks each automatic issue while it is open. Its command, run again while
 * it is open, moves focus to the issue last acted on.
 */
export const IssuesPanel = ({ t, requested, close }: PanelComponentProps) => {
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
    const shownRef = useRef<{ readonly runs: number; readonly summary: string } | undefined>(undefined);
    // Focus moved to the summary heading in this commit, which reads the counts already.
    const headingSpokeRef = useRef(false);
    const headingId = useId();
    const dismissedId = useId();

    useClientLayoutEffect(() => {
        const service = api?.services.checks();
        if (service === undefined) {
            return undefined;
        }
        const shown: Partial<Record<Severity, Element>> = {};
        for (const severity of SEVERITIES) {
            const icon = iconsRef.current?.querySelector(`[data-severity="${severity}"] svg`);
            if (icon !== null && icon !== undefined) {
                shown[severity] = icon;
            }
        }
        const close = service.open(shown, (runs) => {
            openedRunRef.current = runs;
        });
        headingRef.current?.focus();
        return close;
    }, [api]);

    useClientLayoutEffect(() => {
        if (requestedRef.current === requested) {
            return;
        }
        requestedRef.current = requested;
        const list = listRef.current;
        let items: Element[] = [];
        if (list !== null) {
            items = [...list.querySelectorAll('[data-rte-row]')];
        }
        const item = items.find((element) => element.getAttribute('data-rte-row') === lastActive);
        const button = item?.querySelector('button');
        const target = button ?? headingRef.current;
        target?.focus();
    }, [requested, lastActive]);

    const reported = checks?.issues;
    const issues = reported ?? [];
    const counted = issues.filter(({ dismissed }) => !dismissed);
    const listed = showDismissed ? issues : counted;
    const dismissedCount = issues.length - counted.length;
    const count = (severity: Severity) => counted.filter(({ issue }) => issue.severity === severity).length;

    useClientLayoutEffect(() => {
        const focused = focusedRef.current;
        if (focused === undefined || listed.some(({ key }) => key === focused)) {
            return;
        }
        focusedRef.current = undefined;
        const heading = headingRef.current;
        const active = heading?.ownerDocument.activeElement;
        if (
            heading !== null &&
            (active === null || active === undefined || active === heading.ownerDocument.body || !active.isConnected)
        ) {
            heading.focus();
            headingSpokeRef.current = true;
        }
    });

    const summary = [
        t('RichTextEditor_checksErrors', { errors: count('error') }),
        t('RichTextEditor_checksWarnings', { warnings: count('warning') }),
        t('RichTextEditor_checksReview', { review: count('review') }),
    ].join(' ');
    const reportedRuns = checks?.runs;
    const runs = reportedRuns ?? 0;
    useClientLayoutEffect(() => {
        const shown = shownRef.current;
        shownRef.current = { runs, summary };
        const spoken = headingSpokeRef.current;
        headingSpokeRef.current = false;
        // The counts of the run the panel opened on, or that focus moved to, are read with the focused heading.
        if (shown === undefined || spoken || runs <= openedRunRef.current || runs === shown.runs) {
            return;
        }
        // A key holds the summary back until runs pause, so it never lands in the frame of a message the change set off.
        if (summary !== shown.summary) {
            api?.announce(summary, SUMMARY_KEY);
        }
    }, [runs, summary, api]);
    return (
        <div role="region" aria-label={t('RichTextEditor_checks')} className={styles.panel}>
            <h2 ref={headingRef} id={headingId} tabIndex={-1} className={styles.summary}>
                {summary}
            </h2>
            <div className={styles.actions}>
                <Button size="small" emphasis="default" onPress={close}>
                    {t('RichTextEditor_close')}
                </Button>
            </div>
            {dismissedCount > 0 && (
                <div className={styles.option}>
                    <Checkbox
                        id={dismissedId}
                        value={showDismissed}
                        onChange={() => setShowDismissed((previous) => !previous)}
                    />
                    <Label htmlFor={dismissedId}>{t('RichTextEditor_checksShowDismissed')}</Label>
                </div>
            )}
            <ol ref={listRef} className={styles.list} aria-labelledby={headingId}>
                {listed.map((held) => (
                    <Issue
                        key={held.key}
                        rowKey={held.key}
                        held={held}
                        t={t}
                        onFocusIssue={(rowKey) => {
                            focusedRef.current = rowKey;
                        }}
                        onActive={setLastActive}
                    />
                ))}
            </ol>
            {/* The icons the surface decorations copy. */}
            <span ref={iconsRef} hidden>
                {SEVERITIES.map((severity) => {
                    const Icon = SEVERITY_ICONS[severity];
                    return (
                        <span key={severity} data-severity={severity}>
                            <Icon size={16} />
                        </span>
                    );
                })}
            </span>
        </div>
    );
};
