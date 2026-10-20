/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue-components';
import { IconPeople } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import styles from '../mention.module.scss';
import { type MentionValue } from '../types';

/** In the editor a click places the caret; the link is followed only when reading. */
const placeCaretInEditor = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (event.currentTarget.closest('[contenteditable="true"]') !== null) {
        event.preventDefault();
    }
};

/**
 * A finished mention: the username linking to the person, full name on hover.
 * Carries the same attributes as `toHtml`, so copied text pastes back as a
 * mention. A group is marked with its icon, as the old editor did; with nowhere
 * to link to (`@all`), the mention is text.
 */
export const MentionLink = ({
    value,
    href,
    trigger,
}: {
    value: MentionValue;
    /** Absent when the app gives no target, or one that is not a safe link. */
    href: string | undefined;
    trigger: string;
}): ReactNode => {
    const attributes = {
        title: value.name,
        'data-mention-id': value.id,
        'data-mention-username': value.username,
        'data-mention-kind': value.kind,
        className: styles.mention,
    };
    const content = (
        <>
            {value.kind === 'group' ? <IconPeople size={12} aria-hidden className={styles.kindIcon} /> : null}
            {trigger}
            {value.username}
        </>
    );
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                {href === undefined ? (
                    <span {...attributes}>{content}</span>
                ) : (
                    <a href={href} {...attributes} onClick={placeCaretInEditor}>
                        {content}
                    </a>
                )}
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact">{value.name}</Tooltip.Content>
        </Tooltip.Root>
    );
};
