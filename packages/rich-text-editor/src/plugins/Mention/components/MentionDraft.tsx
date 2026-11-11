/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPeople, IconPerson, IconTarget } from '@frontify/fondue-icons';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { readableShortcut } from '#/ui/ToolbarButton/ToolbarButton';

import { isSafeImageSrc } from '../../shared/helpers/href';
import { isCompositionKey } from '../../shared/helpers/keys';
import styles from '../mention.module.scss';
import { type MentionItem, type MentionItems } from '../types';

/** How many people the picker offers at once. */
const SUGGESTION_LIMIT = 8;

/**
 * What a failed lookup says, to a screen reader and in the list: the message, then how to retry from the keyboard.
 */
const FAILED_MESSAGE = 'Could not load people.';
const FAILED_HINT = 'Press Enter to retry';

/** The key drawn beside Retry. */
const RETRY_KEY = 'Enter';

/** What the list says, in the list and to a screen reader, while there is nobody to show yet or nobody matches. */
const SEARCHING_MESSAGE = 'Searching';
const NO_MATCHES_MESSAGE = 'No matches';

/** The label of the button that asks the lookup again. */
const RETRY_LABEL = 'Retry';

/** The gap between the query and the list under it. */
const LIST_OFFSET = 4;

const avatarPicture = (person: MentionItem): ReactNode => {
    if (isSafeImageSrc(person.image)) {
        return <img src={person.image} alt="" />;
    }
    if (person.kind === 'group') {
        return <IconPeople size={12} />;
    }
    if (person.kind === 'all') {
        return <IconTarget size={12} />;
    }
    return <IconPerson size={12} />;
};

type AvatarProps = { person: MentionItem };

/**
 * The round picture beside a name: the avatar when there is one, otherwise the
 * kind's icon — a person, a group, everyone. Decorative: the name is beside it.
 */
const Avatar = ({ person }: AvatarProps): ReactNode => (
    <span className={styles.avatar} aria-hidden>
        {avatarPicture(person)}
    </span>
);

/**
 * The people for a query. Answers are tagged with their query so a slow one
 * never overwrites a newer one; the last answer stays up while `pending`, so a
 * server-backed list does not flicker on every key. A failed lookup offers
 * nobody rather than leaving the last list up, and `retry` asks again.
 */
const usePeople = (
    items: MentionItems,
    query: string,
): { people: readonly MentionItem[]; pending: boolean; failed: boolean; retry: () => void } => {
    const [answer, setAnswer] = useState<{
        query: string;
        people: readonly MentionItem[];
        failed: boolean;
    } | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let current = true;
        const settle = (people: readonly MentionItem[], failed: boolean): void => {
            if (current) {
                setAnswer({ query, people: people.slice(0, SUGGESTION_LIMIT), failed });
            }
        };
        Promise.resolve(items(query))
            .then((people) => settle(people, false))
            .catch(() => settle([], true));
        return () => {
            current = false;
        };
    }, [items, query, attempt]);

    const retry = (): void => {
        setAnswer(null);
        setAttempt((previous) => previous + 1);
    };

    return {
        people: answer?.people ?? [],
        pending: answer?.query !== query,
        failed: answer?.query === query && answer.failed,
        retry,
    };
};

type PeoplePhase = 'searching' | 'failed' | 'empty' | 'list';

type PhaseOfParams = { people: readonly MentionItem[]; pending: boolean; failed: boolean };

/**
 * Where a lookup stands: people to show, else still searching, else failed, else nobody matches.
 */
const phaseOf = ({ people, pending, failed }: PhaseOfParams): PeoplePhase => {
    if (people.length > 0) {
        return 'list';
    }
    if (pending) {
        return 'searching';
    }
    if (failed) {
        return 'failed';
    }
    return 'empty';
};

/**
 * What a screen reader hears for a phase. Searching is announced only with no earlier list to count, so the count is not interrupted on every key.
 */
const statusOf = (phase: PeoplePhase, people: readonly MentionItem[]): string => {
    switch (phase) {
        case 'searching':
            return SEARCHING_MESSAGE;
        case 'failed':
            return `${FAILED_MESSAGE} ${FAILED_HINT}.`;
        case 'empty':
            return NO_MATCHES_MESSAGE;
        case 'list':
            if (people.length === 1) {
                return '1 person';
            }
            return `${people.length} people`;
        default:
            // Adding a phase fails to compile here until it is handled.
            throw new Error(`Unhandled people phase: ${JSON.stringify(phase satisfies never)}`);
    }
};

/** Viewport position under the query, kept in step with scrolling and resizing. */
const useListPosition = (
    anchorRef: { current: HTMLElement | null },
    open: boolean,
): { left: number; top: number } | null => {
    const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

    useEffect(() => {
        if (!open) {
            return;
        }
        const place = (): void => {
            const box = anchorRef.current?.getBoundingClientRect();
            if (box) {
                setPosition((previous) =>
                    previous?.left === box.left && previous.top === box.bottom + LIST_OFFSET
                        ? previous
                        : { left: box.left, top: box.bottom + LIST_OFFSET },
                );
            }
        };
        // Next frame: the one the list first appears in.
        const frame = requestAnimationFrame(place);
        window.addEventListener('scroll', place, { capture: true, passive: true });
        window.addEventListener('resize', place, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('resize', place);
        };
    }, [anchorRef, open]);

    return open ? position : null;
};

/**
 * A mention being made, from the typed trigger until a person is chosen.
 *
 * The query goes into a real input (a combobox over a listbox of people), so
 * the caret and keys belong to this component: arrows move, Enter or Tab
 * chooses, Backspace on an empty query removes the mention, and Escape, blur or
 * a space with no match turns the text back into plain text. The popup is
 * portaled to the page end and focus never leaves the input.
 */
export const MentionDraft = ({
    trigger,
    items,
    focused,
    onChoose,
    onCancel,
    onRemove,
}: {
    trigger: string;
    items: MentionItems;
    /** The editor's selection is on this mention — the input takes the caret. */
    focused: boolean;
    onChoose: (person: MentionItem) => void;
    /** Give up, keeping what was typed as ordinary text. */
    onCancel: (text: string) => void;
    /** Give up and leave nothing behind, not even the trigger. */
    onRemove: () => void;
}): ReactNode => {
    const listId = useId();
    const draftRef = useRef<HTMLSpanElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Each way out runs once: handing focus back to the editor blurs the input, and blur is itself a way out.
    const finishedRef = useRef(false);
    const finish = (leave: () => void): void => {
        if (finishedRef.current) {
            return;
        }
        finishedRef.current = true;
        leave();
    };
    const [query, setQuery] = useState('');
    const { people, pending, failed, retry } = usePeople(items, query);
    const phase = phaseOf({ people, pending, failed });
    const open = phase !== 'empty' || query !== '';
    const position = useListPosition(draftRef, open);
    const listShown = open && position !== null && phase === 'list';

    // Tagged with its query so a new query resets the highlight to the top without an effect.
    const [highlighted, setHighlighted] = useState({ query, index: 0 });
    const activeIndex = highlighted.query === query ? Math.min(highlighted.index, people.length - 1) : 0;
    const highlight = (index: number): void => setHighlighted({ query, index });
    const active = people[activeIndex];
    const optionId = (index: number): string => `${listId}-option-${index}`;

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        // While an input method composes, no key is a command, not even Space or Escape.
        if (isCompositionKey(event)) {
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                if (people.length === 0) {
                    break;
                }
                highlight(
                    event.key === 'ArrowDown'
                        ? (activeIndex + 1) % people.length
                        : (activeIndex - 1 + people.length) % people.length,
                );
                break;
            case 'Enter':
            case 'Tab':
                // Tab retries too: leaving the query would cancel the mention.
                if (phase === 'failed') {
                    retry();
                    break;
                }
                if (!active) {
                    return;
                }
                finish(() => onChoose(active));
                break;
            case ' ':
                // Nobody by that name: the text was just text after all.
                if (phase !== 'empty') {
                    return;
                }
                finish(() => onCancel(`${trigger}${query} `));
                break;
            case 'Escape':
                // Taken here: the editor must not also read it as leaving the text.
                event.stopPropagation();
                finish(() => onCancel(`${trigger}${query}`));
                break;
            case 'Backspace':
                if (query !== '') {
                    return;
                }
                finish(onRemove);
                break;
            default:
                return;
        }
        event.preventDefault();
    };

    const popupBody = (): ReactNode => {
        switch (phase) {
            case 'searching':
                return <div className={styles.empty}>{SEARCHING_MESSAGE}</div>;
            case 'failed':
                return (
                    <div className={styles.empty}>
                        {FAILED_MESSAGE}{' '}
                        <button
                            type="button"
                            // Out of the Tab order and off the mouse's focus: the query keeps the caret.
                            tabIndex={-1}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={retry}
                            className={styles.retry}
                        >
                            {RETRY_LABEL}
                        </button>
                        <kbd aria-hidden="true" className={styles.shortcut}>
                            {readableShortcut(RETRY_KEY)}
                        </kbd>
                    </div>
                );
            case 'empty':
                return <div className={styles.empty}>{NO_MATCHES_MESSAGE}</div>;
            case 'list':
                return (
                    <ul id={listId} role="listbox" aria-label="People" className={styles.list}>
                        {people.map((person, index) => (
                            // The keyboard drives the list from the input; the mouse picks here.
                            // oxlint-disable-next-line jsx-a11y/click-events-have-key-events
                            <li
                                key={optionId(index)}
                                id={optionId(index)}
                                role="option"
                                aria-selected={index === activeIndex}
                                // Keep focus in the input: blurring would cancel before the click lands.
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => finish(() => onChoose(person))}
                                onMouseEnter={() => highlight(index)}
                                className={
                                    index === activeIndex ? `${styles.option} ${styles.optionActive}` : styles.option
                                }
                            >
                                <Avatar person={person} />
                                <span>{person.name}</span>
                                <span className={styles.hint}>
                                    {trigger}
                                    {person.username}
                                </span>
                            </li>
                        ))}
                    </ul>
                );
            default:
                // Adding a phase fails to compile here until it is handled.
                throw new Error(`Unhandled people phase: ${JSON.stringify(phase satisfies never)}`);
        }
    };

    return (
        <span ref={draftRef} className={styles.draft}>
            {trigger}
            <input
                ref={inputRef}
                role="combobox"
                aria-expanded={listShown}
                // Only while the listbox is in the page: an id pointing at nothing is an error.
                aria-controls={listShown ? listId : undefined}
                aria-autocomplete="list"
                aria-activedescendant={open && active ? optionId(activeIndex) : undefined}
                aria-label="Mention someone"
                value={query}
                size={Math.max(query.length, 1)}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                onBlur={() => finish(() => onCancel(`${trigger}${query}`))}
                className={styles.input}
            />
            <span role="status" className={styles.visuallyHidden}>
                {statusOf(phase, people)}
            </span>
            {open && position !== null
                ? createPortal(
                      <div className={styles.popup} style={{ left: position.left, top: position.top }}>
                          {popupBody()}
                      </div>,
                      draftRef.current?.ownerDocument.body ?? document.body,
                  )
                : null}
        </span>
    );
};
