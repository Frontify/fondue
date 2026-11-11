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

/** In the editor a click places the caret; the link is followed only when reading. */
const placeCaretInEditor = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (event.currentTarget.closest('[contenteditable="true"]') !== null) {
        event.preventDefault();
    }
};

type MentionLinkProps = {
    value: MentionValue;
    display: MentionDisplay;
    /**
     * Reading view: a mention with no link takes focus so its tooltip opens from the keyboard.
     * @default false
     */
    focusableWhenUnlinked?: boolean;
};

/**
 * A finished mention: the shown username linking to the person, with the name
 * on hover. Carries the same attributes as `toHtml`, so copied text pastes back
 * as a mention. A group is marked with its icon, as the old editor did; with
 * nowhere to link to (`@all`, or an unavailable person), the mention is text.
 */
export const MentionLink = ({ value, display, focusableWhenUnlinked = false }: MentionLinkProps): ReactNode => {
    const attributes = {
        title: display.title,
        ...mentionAttributes(value),
        className: styles.mention,
    };
    const content = (
        <>
            {value.kind === 'group' ? <IconPeople size={12} aria-hidden className={styles.kindIcon} /> : null}
            <BidiIsolate>{display.label}</BidiIsolate>
        </>
    );
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                {display.href === undefined ? (
                    // Focus is the only way a keyboard user reaches the tooltip.
                    // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    <span {...attributes} tabIndex={focusableWhenUnlinked ? 0 : undefined}>
                        {content}
                    </span>
                ) : (
                    <a href={display.href} {...attributes} onClick={placeCaretInEditor}>
                        {content}
                    </a>
                )}
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact">{display.title}</Tooltip.Content>
        </Tooltip.Root>
    );
};
