/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue-components';
import { IconPeople } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import { type MentionDisplay, mentionAttributes } from '../helpers/display';
import styles from '../mention.module.scss';
import { type MentionValue } from '../types';

type MentionLinkProps = {
    value: MentionValue;
    display: MentionDisplay;
    placesCaret: boolean;
};

/**
 * A finished mention: the shown username linking to the person, name on hover. Carries the same attributes as
 * `toHtml`.
 */
export const MentionLink = ({ value, display, placesCaret }: MentionLinkProps): ReactNode => {
    const followLinkOnlyWhenReading = (event: MouseEvent<HTMLAnchorElement>): void => {
        if (placesCaret) {
            event.preventDefault();
        }
    };

    const attributes = {
        title: display.title,
        ...mentionAttributes(value),
        className: styles.mention,
    };
    const name = (
        <>
            {value.kind === 'group' ? <IconPeople size={12} aria-hidden className={styles.kindIcon} /> : null}
            {/* Isolated so a right-to-left name cannot reorder the text around it. */}
            <bdi>{display.label}</bdi>
        </>
    );
    let element = <span {...attributes}>{name}</span>;
    if (display.href !== undefined) {
        element = (
            <a href={display.href} {...attributes} onClick={followLinkOnlyWhenReading}>
                {name}
            </a>
        );
    }
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{element}</Tooltip.Trigger>
            <Tooltip.Content padding="compact">{display.title}</Tooltip.Content>
        </Tooltip.Root>
    );
};
