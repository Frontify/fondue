/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from '../mention.module.scss';
import { type MentionItem, type MentionItems } from '../types';

/** How many people the picker offers at once. */
const SUGGESTION_LIMIT = 8;

/** The gap between the query and the list under it. */
const LIST_OFFSET = 4;

/**
 * The people for a query. Answers are tagged with their query so a slow one
 * never overwrites a newer one; the last answer stays up while `pending`, so a
 * server-backed list does not flicker on every key.
 */
const usePeople = (items: MentionItems, query: string): { people: readonly MentionItem[]; pending: boolean } => {
    const [answer, setAnswer] = useState<{ query: string; people: readonly MentionItem[] } | null>(null);

    useEffect(() => {
        let current = true;
        const settle = (people: readonly MentionItem[]): void => {
            if (current) {
                setAnswer({ query, people: people.slice(0, SUGGESTION_LIMIT) });
            }
        };
        // A failed lookup offers nobody rather than leaving the last list up.
        Promise.resolve(items(query))
            .then(settle)
            .catch(() => settle([]));
        return () => {
            current = false;
        };
    }, [items, query]);

    return { people: answer?.people ?? [], pending: answer?.query !== query };
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
    const { people, pending } = usePeople(items, query);
    const noMatches = people.length === 0 && !pending;
    const open = people.length > 0 || (noMatches && query !== '');
    const position = useListPosition(draftRef, open);

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
                if (!active) {
                    return;
                }
                finish(() => onChoose(active));
                break;
            case ' ':
                // Nobody by that name: the text was just text after all.
                if (!noMatches) {
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

    const status = pending
        ? ''
        : noMatches
          ? 'No matches'
          : `${people.length} ${people.length === 1 ? 'person' : 'people'}`;

    return (
        <span ref={draftRef} className={styles.draft}>
            {trigger}
            <input
                ref={inputRef}
                role="combobox"
                aria-expanded={open}
                // Only while the listbox is in the page: an id pointing at nothing is an error.
                aria-controls={open && position !== null && !noMatches ? listId : undefined}
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
                {status}
            </span>
            {open && position !== null
                ? createPortal(
                      <div className={styles.popup} style={{ left: position.left, top: position.top }}>
                          {noMatches ? (
                              <div className={styles.empty}>No matches</div>
                          ) : (
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
                                              index === activeIndex
                                                  ? `${styles.option} ${styles.optionActive}`
                                                  : styles.option
                                          }
                                      >
                                          <span>{person.name}</span>
                                          <span className={styles.hint}>
                                              {trigger}
                                              {person.username}
                                          </span>
                                      </li>
                                  ))}
                              </ul>
                          )}
                      </div>,
                      draftRef.current?.ownerDocument.body ?? document.body,
                  )
                : null}
        </span>
    );
};
