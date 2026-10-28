/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge } from '@frontify/fondue-components';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { type ContentIssue, ruleNameKey } from '#/model';

import { SEVERITY_BADGES, SEVERITY_ICONS, SEVERITY_KEYS } from '../helpers/issueDisplay';
import styles from '../styles/checks.module.scss';

export type IssueTitleProps = {
    issue: ContentIssue;
    dismissed: boolean;
    titleId: string;
    t: PanelComponentProps['t'];
};

/** The issue's severity, rule name and whether the author dismissed it. */
export const IssueTitle = ({ issue, dismissed, titleId, t }: IssueTitleProps) => {
    const Icon = SEVERITY_ICONS[issue.severity];

    return (
        <div id={titleId} className={styles.title}>
            <Badge size="small" {...SEVERITY_BADGES[issue.severity]}>
                <Icon size={16} aria-hidden="true" />
                {t(SEVERITY_KEYS[issue.severity])}
            </Badge>{' '}
            <span>{t(ruleNameKey(issue.ruleId))}</span> <span className={styles.rule}>({issue.ruleId})</span>
            {dismissed && <span className={styles.dismissed}> {t('RichTextEditor_checksDismissed')}</span>}
        </div>
    );
};

IssueTitle.displayName = 'IssueTitle';
