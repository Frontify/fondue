/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue-components';
import { IconPeople } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import { type MentionDisplay, mentionAttributes } from '../helpers/display';
import styles from '../mention.module.scss';
import { type MentionValue } from '../types';

/** The tag that isolates the shown name, so a right-to-left name cannot reorder the text around it. */
export const BIDI_ISOLATE_TAG = 'bdi';

// JSX needs a capitalised name to use the shared tag as an element.
const BidiIsolate = BIDI_ISOLATE_TAG;

type MentionLinkProps = {
    value: MentionValue;
    display: MentionDisplay;
    /** A click places the caret rather than following the link: true while the editor takes edits. */
    placesCaret: boolean;
};

/**
 * A finished mention: the shown username linking to the person, with the name
 * on hover. Carries the same attributes as `toHtml`, so copied text pastes back
 * as a mention. A group is marked with its icon, as the old editor did; with
 * nowhere to link to (`@all`), the mention is text, and an unavailable person
 * is text with a note after the name.
 */
export const MentionLink = ({ value, display, placesCaret }: MentionLinkProps): ReactNode => {
    const attributes = {
        title: display.title,
        ...mentionAttributes(value),
        className: styles.mention,
    };
    // In the editor a click places the caret; the link is followed only when reading.
    const placeCaret = (event: MouseEvent<HTMLAnchorElement>): void => {
        if (placesCaret) {
            event.preventDefault();
        }
    };
    const name = (
        <>
            {value.kind === 'group' ? <IconPeople size={12} aria-hidden className={styles.kindIcon} /> : null}
            <BidiIsolate>{display.label}</BidiIsolate>
        </>
    );
    let element: ReactNode;
    switch (display.status) {
        case 'linked':
            element = (
                <a href={display.href} {...attributes} onClick={placeCaret}>
                    {name}
                </a>
            );
            break;
        case 'text':
            element = <span {...attributes}>{name}</span>;
            break;
        case 'unavailable':
            element = (
                <span {...attributes}>
                    {name} {display.note}
                </span>
            );
            break;
        default:
            // Adding a display status fails to compile here until it is handled.
            throw new Error(`Unhandled mention display: ${JSON.stringify(display satisfies never)}`);
    }
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{element}</Tooltip.Trigger>
            <Tooltip.Content padding="compact">{display.title}</Tooltip.Content>
        </Tooltip.Root>
    );
};
