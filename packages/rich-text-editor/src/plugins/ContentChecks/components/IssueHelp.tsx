/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Accordion } from '@frontify/fondue-components';
import { type RefObject } from 'react';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { type ContentIssue, ruleHelpKey } from '#/model';

import styles from '../styles/checks.module.scss';

export type IssueHelpProps = {
    helpRef: RefObject<HTMLHeadingElement>;
    ruleId: ContentIssue['ruleId'];
    t: PanelComponentProps['t'];
};

/** How to decide the issue, behind the help disclosure. */
export const IssueHelp = ({ helpRef, ruleId, t }: IssueHelpProps) => (
    <div className={styles.help}>
        <Accordion.Root border={false} padding="none">
            <Accordion.Item value="help">
                <Accordion.Header ref={helpRef}>{t('RichTextEditor_checksHelp')}</Accordion.Header>
                <Accordion.Content>
                    <p>{t(ruleHelpKey(ruleId))}</p>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    </div>
);

IssueHelp.displayName = 'IssueHelp';
