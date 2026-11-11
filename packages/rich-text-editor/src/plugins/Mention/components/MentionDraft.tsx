/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPeople, IconPerson, IconTarget } from '@frontify/fondue-icons';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { readableShortcut } from '#/ui/ToolbarButton/ToolbarButton';

import { isSafeImageSrc } from '../../shared/helpers/href';
import { isCompositionKey } from '../../shared/helpers/keys';
import { type PeopleOutcome, usePeople } from '../hooks/usePeople';
import styles from '../mention.module.scss';
import { type MentionItem, type MentionItems } from '../types';

/**
 * What a failed lookup says, to a screen reader and in the list: the message, then how to retry from the keyboard.
 */
const FAILED_MESSAGE = 'Could not load people.';
const FAILED_HINT = 'Press Enter to retry';

/** The key drawn beside Retry. */
const RETRY_KEY = 'Enter';

/** What the list shows, not announced, while a lookup runs past the searching delay. */
const SEARCHING_MESSAGE = 'Searching';

/** How long a lookup runs before the list says it is searching, so a quick answer never flashes the row. */
const SEARCHING_DELAY_MS = 300;

/** What the list says, in the list and to a screen reader, when nobody matches. */
const NO_MATCHES_MESSAGE = 'No matches';

/** The label of the button that asks the lookup again. */
const RETRY_LABEL = 'Retry';

/** The gap between the query and the list under it. */
const LIST_OFFSET = 4;

const avatarPicture = (person: MentionItem): ReactNode => {
    if (isSafeImageSrc(person.image)) {
        return <img src={person.image} alt="" />;
    }
    switch (person.kind) {
        case undefined:
        case 'user':
            return <IconPerson size={12} />;
        case 'group':
            return <IconPeople size={12} />;
        case 'all':
            return <IconTarget size={12} />;
        default:
            // Adding a kind fails to compile here until it is handled.
            throw new Error(`Unhandled mention kind: ${JSON.stringify(person.kind satisfies never)}`);
    }
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
 * Where a lookup stands. `waiting` is a first lookup still inside the searching delay: nothing is shown or announced yet.
 */
type PeoplePhase = 'waiting' | 'searching' | 'failed' | 'empty' | 'list';

type PhaseOfParams = { outcome: PeopleOutcome | null; pending: boolean; slow: boolean };

/**
 * The people an outcome offers: none before the first answer or after a failure.
 */
const peopleOf = (outcome: PeopleOutcome | null): readonly MentionItem[] => {
    if (outcome === null) {
        return [];
    }
    switch (outcome.status) {
        case 'found':
            return outcome.people;
        case 'failed':
            return [];
        default:
            // Adding an outcome fails to compile here until it is handled.
            throw new Error(`Unhandled people outcome: ${JSON.stringify(outcome satisfies never)}`);
    }
};

/**
 * Where a lookup stands: people to show, else searching past the delay, else the last failure, else nobody matches once this query is answered.
 */
const phaseOf = ({ outcome, pending, slow }: PhaseOfParams): PeoplePhase => {
    if (peopleOf(outcome).length > 0) {
        return 'list';
    }
    if (slow) {
        return 'searching';
    }
    if (outcome === null) {
        return 'waiting';
    }
    switch (outcome.status) {
        case 'found':
            // An earlier empty answer is not this query's: a space must not end the mention before it arrives.
            if (pending) {
                return 'waiting';
            }
            return 'empty';
        case 'failed':
            return 'failed';
        default:
            // Adding an outcome fails to compile here until it is handled.
            throw new Error(`Unhandled people outcome: ${JSON.stringify(outcome satisfies never)}`);
    }
};

/**
 * Whether the popup is up for a phase: not while waiting, and for nobody matching only once something is typed.
 */
const isOpen = (phase: PeoplePhase, query: string): boolean => {
    switch (phase) {
        case 'waiting':
            return false;
        case 'searching':
        case 'failed':
        case 'list':
            return true;
        case 'empty':
            return query !== '';
        default:
            // Adding a phase fails to compile here until it is handled.
            throw new Error(`Unhandled people phase: ${JSON.stringify(phase satisfies never)}`);
    }
};

/**
 * What a screen reader hears for a phase. Waiting and searching say nothing, so a count or a failure is not interrupted on every key.
 */
const statusOf = (phase: PeoplePhase, people: readonly MentionItem[]): string => {
    switch (phase) {
        case 'waiting':
        case 'searching':
            return '';
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

/**
 * Whether the pending lookup for a query has run past the searching delay. The
 * timer records the query it ran for, so a new query starts the delay again.
 */
const useSlowLookup = (pending: boolean, query: string): boolean => {
    const [slowQuery, setSlowQuery] = useState<string | null>(null);
    useEffect(() => {
        if (!pending) {
            return undefined;
        }
        const timer = setTimeout(() => setSlowQuery(query), SEARCHING_DELAY_MS);
        return () => clearTimeout(timer);
    }, [pending, query]);
    return pending && slowQuery === query;
};

type MentionPopupBodyProps = {
    phase: PeoplePhase;
    people: readonly MentionItem[];
    trigger: string;
    listId: string;
    activeIndex: number;
    optionId: (index: number) => string;
    onRetry: () => void;
    onPick: (person: MentionItem) => void;
    onHighlight: (index: number) => void;
};

/**
 * What the popup shows for a phase: a message, the retry button, or the list of people.
 */
const MentionPopupBody = ({
    phase,
    people,
    trigger,
    listId,
    activeIndex,
    optionId,
    onRetry,
    onPick,
    onHighlight,
}: MentionPopupBodyProps): ReactNode => {
    switch (phase) {
        case 'waiting':
            return null;
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
                        onClick={onRetry}
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
                            onClick={() => onPick(person)}
                            onMouseEnter={() => onHighlight(index)}
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
    const { outcome, pending, retry } = usePeople(items, query);
    const slow = useSlowLookup(pending, query);
    const people = peopleOf(outcome);
    const phase = phaseOf({ outcome, pending, slow });
    const open = isOpen(phase, query);
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
                          <MentionPopupBody
                              phase={phase}
                              people={people}
                              trigger={trigger}
                              listId={listId}
                              activeIndex={activeIndex}
                              optionId={optionId}
                              onRetry={retry}
                              onPick={(person) => finish(() => onChoose(person))}
                              onHighlight={highlight}
                          />
                      </div>,
                      draftRef.current?.ownerDocument.body ?? document.body,
                  )
                : null}
        </span>
    );
};
