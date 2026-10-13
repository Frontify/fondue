/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import styles from '../mention.module.scss';
import { type MentionValue } from '../types';

/**
 * A finished mention: the username as a link to the person, with their full
 * name on hover. What readonly display shows, and what the editor shows once
 * a mention has been chosen.
 */
export const MentionLink = ({
    value,
    href,
    trigger,
}: {
    value: MentionValue;
    href: string;
    trigger: string;
}): ReactNode => (
    <Tooltip.Root>
        <Tooltip.Trigger asChild>
            <a href={href} className={styles.mention}>
                {trigger}
                {value.username}
            </a>
        </Tooltip.Trigger>
        <Tooltip.Content padding="compact">{value.name}</Tooltip.Content>
    </Tooltip.Root>
);
