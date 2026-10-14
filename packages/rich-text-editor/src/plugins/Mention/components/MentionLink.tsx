/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import styles from '../mention.module.scss';
import { type MentionItem } from '../types';

/**
 * A finished mention: the username linking to the person, full name on hover.
 * Carries the same attributes as `toHtml`, so copied text pastes back as a mention.
 */
export const MentionLink = ({
    value,
    href,
    trigger,
}: {
    value: MentionItem;
    href: string;
    trigger: string;
}): ReactNode => (
    <Tooltip.Root>
        <Tooltip.Trigger asChild>
            <a
                href={href}
                title={value.name}
                data-mention-id={value.id}
                data-mention-username={value.username}
                className={styles.mention}
                onClick={(event) => {
                    // In the editor a click places the caret; the link is followed only when reading.
                    if (event.currentTarget.closest('[contenteditable="true"]') !== null) {
                        event.preventDefault();
                    }
                }}
            >
                {trigger}
                {value.username}
            </a>
        </Tooltip.Trigger>
        <Tooltip.Content padding="compact">{value.name}</Tooltip.Content>
    </Tooltip.Root>
);
