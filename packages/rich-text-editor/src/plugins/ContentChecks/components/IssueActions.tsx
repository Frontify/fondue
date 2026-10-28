/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { type ContentIssue } from '#/model';

import styles from '../styles/checks.module.scss';

export type IssueActionsProps = {
    issue: ContentIssue;
    dismissed: boolean;
    repairable: boolean;
    described: string;
    translate: PanelComponentProps['translate'];
    onGoTo: () => void;
    onRepair: (button: HTMLButtonElement | undefined) => void;
    onDismiss: () => void;
};

/** Go to, Repair and, for a warning or review, Dismiss. */
export const IssueActions = ({
    issue,
    dismissed,
    repairable,
    described,
    translate,
    onGoTo,
    onRepair,
    onDismiss,
}: IssueActionsProps) => (
    <div className={styles.actions}>
        {issue.path !== null && (
            <Button size="small" emphasis="default" aria-describedby={described} onPress={onGoTo}>
                {translate('RichTextEditor_checksGoTo')}
            </Button>
        )}
        {repairable && (
            <Button
                size="small"
                emphasis="default"
                aria-describedby={described}
                onPress={(event) => onRepair(event?.currentTarget)}
            >
                {translate('RichTextEditor_checksRepair')}
            </Button>
        )}
        {issue.severity !== 'error' && !dismissed && (
            <Button size="small" emphasis="weak" aria-describedby={described} onPress={onDismiss}>
                {translate('RichTextEditor_checksDismiss')}
            </Button>
        )}
    </div>
);

IssueActions.displayName = 'IssueActions';
