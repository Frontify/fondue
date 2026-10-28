/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconExclamationMarkCircle, IconExclamationMarkTriangle, IconQuestionMarkCircle } from '@frontify/fondue-icons';

import { type CheckedIssue } from '#/bridge/pluginApi/plugin';
import { type CodecContext, type ContentIssue } from '#/model';

type Severity = ContentIssue['severity'];

const EXCERPT_LENGTH = 60;

export const SEVERITY_KEYS = {
    error: 'RichTextEditor_checksSeverityError',
    warning: 'RichTextEditor_checksSeverityWarning',
    review: 'RichTextEditor_checksSeverityReview',
} as const;

export const SEVERITY_ICONS = {
    error: IconExclamationMarkTriangle,
    warning: IconExclamationMarkCircle,
    review: IconQuestionMarkCircle,
} as const;

export const SEVERITY_BADGES = {
    error: { variant: 'negative', emphasis: 'strong' },
    warning: { variant: 'warning', emphasis: 'strong' },
    review: { variant: 'default', emphasis: 'weak' },
} as const;

export const SEVERITIES = ['error', 'warning', 'review'] as const;

/** Up to 60 characters of `text`, on one line. */
export const shortened = (text: string) => {
    const line = text.replaceAll(/\s+/g, ' ').trim();
    if ([...line].length <= EXCERPT_LENGTH) {
        return line;
    }

    return `${[...line].slice(0, EXCERPT_LENGTH - 1).join('')}…`;
};

/** The issues the panel lists, and how many of them are dismissed. */
export const visibleIssues = (issues: readonly CheckedIssue[], showDismissed: boolean) => {
    const counted = issues.filter(({ dismissed }) => !dismissed);
    let listed: readonly CheckedIssue[] = counted;
    if (showDismissed) {
        listed = issues;
    }

    return { counted, listed, dismissedCount: issues.length - counted.length };
};

/** How many of `counted` have `severity`. */
export const severityCount = (counted: readonly CheckedIssue[], severity: Severity) =>
    counted.filter(({ issue }) => issue.severity === severity).length;

/** The summary heading: errors, warnings and reviews still showing. */
export const checksSummary = (translate: CodecContext['translate'], counted: readonly CheckedIssue[]) =>
    [
        translate('RichTextEditor_checksErrors', { errors: severityCount(counted, 'error') }),
        translate('RichTextEditor_checksWarnings', { warnings: severityCount(counted, 'warning') }),
        translate('RichTextEditor_checksReview', { review: severityCount(counted, 'review') }),
    ].join(' ');

/** The text an issue row shows, and the ids that describe its actions. */
export const issueExcerpt = (
    issue: ContentIssue,
    text: string,
    translate: CodecContext['translate'],
    titleId: string,
    excerptId: string,
) => {
    let excerpt = translate('RichTextEditor_checksDocument');
    if (issue.path !== null) {
        excerpt = shortened(text);
    }

    let described = `${titleId} ${excerptId}`;
    if (excerpt === '') {
        described = titleId;
    }

    return { excerpt, described };
};
