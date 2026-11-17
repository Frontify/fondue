/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPeople, IconPerson, IconTarget } from '@frontify/fondue-icons';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { isCompositionKey } from '../../shared/helpers/keys';
import { storedKind } from '../helpers/display';
import { isSafeImageSrc } from '../helpers/image';
import { MENTION_STRINGS } from '../helpers/strings';
import { withoutControlCharacters } from '../helpers/text';
import { type PeopleLookup, type PeopleOutcome, usePeople } from '../hooks/usePeople';
import styles from '../mention.module.scss';
import { type MentionItem, type MentionItems } from '../types';

/** Keeps a quick answer from flashing the Searching row. */
const SEARCHING_DELAY_MS = 300;

const AVATAR_ICON_SIZE = 12;

/** The gap between the query and the list under it. */
const LIST_OFFSET = 4;

const avatarPicture = (person: MentionItem): ReactNode => {
    if (isSafeImageSrc(person.image)) {
        return <img src={person.image} alt="" />;
    }
    // The app's list is read at runtime, so a kind this version does not know shows as a person.
    const kind = storedKind(person.kind);
    switch (kind) {
        case undefined:
        case 'user':
            return <IconPerson size={AVATAR_ICON_SIZE} />;
        case 'group':
            return <IconPeople size={AVATAR_ICON_SIZE} />;
        case 'all':
            return <IconTarget size={AVATAR_ICON_SIZE} />;
        default:
            // Adding a kind fails to compile here until it is handled.
            throw new Error(`Unhandled mention kind: ${JSON.stringify(kind satisfies never)}`);
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

/** `waiting` is a lookup inside the searching delay, or a newer one after an empty or failed answer: nothing is shown or announced yet. */
type PeoplePhase = 'waiting' | 'searching' | 'failed' | 'empty' | 'list';

type PhaseOfParams = { outcome: PeopleOutcome | null; lookup: PeopleLookup; slow: boolean };

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

const phaseOf = ({ outcome, lookup, slow }: PhaseOfParams): PeoplePhase => {
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
            if (lookup !== 'settled') {
                return 'waiting';
            }
            return 'empty';
        case 'failed':
            switch (lookup) {
                case 'settled':
                    return 'failed';
                case 'asking':
                    return 'waiting';
                // Asked for, so it shows at once; cleared, so a second failure is announced again.
                case 'retrying':
                    return 'searching';
                default:
                    // Adding a lookup state fails to compile here until it is handled.
                    throw new Error(`Unhandled people lookup: ${JSON.stringify(lookup satisfies never)}`);
            }
        default:
            // Adding an outcome fails to compile here until it is handled.
            throw new Error(`Unhandled people outcome: ${JSON.stringify(outcome satisfies never)}`);
    }
};

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

/** Silent while waiting or searching, so a count or a failure is not interrupted on every key. */
const statusOf = (phase: PeoplePhase, people: readonly MentionItem[]): string => {
    switch (phase) {
        case 'waiting':
        case 'searching':
            return '';
        case 'failed':
            return MENTION_STRINGS.failed;
        case 'empty':
            return MENTION_STRINGS.noMatches;
        case 'list':
            return MENTION_STRINGS.peopleCount(people.length);
        default:
            // Adding a phase fails to compile here until it is handled.
            throw new Error(`Unhandled people phase: ${JSON.stringify(phase satisfies never)}`);
    }
};

/** Whether the pending lookup has run past the searching delay; each new query or retry restarts it. */
const useSlowLookup = (pending: boolean, query: string): boolean => {
    const [slowQuery, setSlowQuery] = useState<string | null>(null);
    useEffect(() => {
        if (!pending) {
            return undefined;
        }
        const timer = setTimeout(() => setSlowQuery(query), SEARCHING_DELAY_MS);
        return () => {
            clearTimeout(timer);
            setSlowQuery(null);
        };
    }, [pending, query]);
    return pending && slowQuery === query;
};

type ActiveOptionIdParams = {
    listboxShown: boolean;
    phase: PeoplePhase;
    active: MentionItem | undefined;
    activeIndex: number;
    retryId: string;
    optionId: (index: number) => string;
};

const activeOptionId = ({
    listboxShown,
    phase,
    active,
    activeIndex,
    retryId,
    optionId,
}: ActiveOptionIdParams): string | undefined => {
    if (!listboxShown) {
        return undefined;
    }
    if (phase === 'failed') {
        return retryId;
    }
    if (active === undefined) {
        return undefined;
    }
    return optionId(activeIndex);
};

type MentionPopupBodyProps = {
    phase: PeoplePhase;
    people: readonly MentionItem[];
    trigger: string;
    listId: string;
    retryId: string;
    activeIndex: number;
    optionId: (index: number) => string;
    onRetry: () => void;
    onPick: (person: MentionItem) => void;
    onHighlight: (index: number) => void;
};

const MentionPopupBody = ({
    phase,
    people,
    trigger,
    listId,
    retryId,
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
            return <div className={styles.empty}>{MENTION_STRINGS.searching}</div>;
        case 'failed':
            return (
                <>
                    <div className={styles.empty}>{MENTION_STRINGS.failed}</div>
                    <ul id={listId} role="listbox" aria-label={MENTION_STRINGS.list} className={styles.list}>
                        {/* The keyboard runs it from the input as the active option; the mouse runs it here. */}
                        {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events */}
                        <li
                            id={retryId}
                            role="option"
                            aria-selected
                            // Keep focus in the input: blurring would cancel before the click lands.
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={onRetry}
                            className={`${styles.option} ${styles.optionActive}`}
                        >
                            {MENTION_STRINGS.retry}
                        </li>
                    </ul>
                </>
            );
        case 'empty':
            return <div className={styles.empty}>{MENTION_STRINGS.noMatches}</div>;
        case 'list':
            return (
                <ul id={listId} role="listbox" aria-label={MENTION_STRINGS.list} className={styles.list}>
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
                            <bdi>{withoutControlCharacters(person.name)}</bdi>
                            <span className={styles.hint}>
                                <bdi>
                                    {trigger}
                                    {withoutControlCharacters(person.username)}
                                </bdi>
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

type MentionDraftProps = {
    trigger: string;
    items: MentionItems;
    /** The editor's selection is on this mention — the input takes the caret. */
    focused: boolean;
    onChoose: (person: MentionItem) => void;
    /** Give up, keeping what was typed as ordinary text. */
    onCancel: (text: string) => void;
    /** Give up and leave nothing behind, not even the trigger. */
    onRemove: () => void;
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
}: MentionDraftProps): ReactNode => {
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
    const { outcome, lookup, retry } = usePeople(items, query);
    const slow = useSlowLookup(lookup !== 'settled', query);
    const people = peopleOf(outcome);
    const phase = phaseOf({ outcome, lookup, slow });
    const open = isOpen(phase, query);
    const position = useListPosition(draftRef, open);
    const listboxShown = open && position !== null && (phase === 'list' || phase === 'failed');

    // Tagged with its query so a new query resets the highlight to the top without an effect.
    const [highlighted, setHighlighted] = useState({ query, index: 0 });
    const activeIndex = highlighted.query === query ? Math.min(highlighted.index, people.length - 1) : 0;
    const highlight = (index: number): void => setHighlighted({ query, index });
    const active = people[activeIndex];
    const optionId = (index: number): string => `${listId}-option-${index}`;
    const retryId = `${listId}-retry`;

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
                // Retry is the active option; Tab stays free so focus is never trapped.
                if (phase === 'failed') {
                    if (event.key !== 'Enter') {
                        return;
                    }
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
                aria-expanded={listboxShown}
                // Only while the listbox is in the page: an id pointing at nothing is an error.
                aria-controls={listboxShown ? listId : undefined}
                aria-autocomplete="list"
                aria-activedescendant={activeOptionId({ listboxShown, phase, active, activeIndex, retryId, optionId })}
                aria-label={MENTION_STRINGS.input}
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
                              retryId={retryId}
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
