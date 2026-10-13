/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import styles from '../mention.module.scss';
import { type MentionItem, type MentionItems } from '../types';

/** How many people the picker offers at once. */
const SUGGESTION_LIMIT = 8;

/**
 * The people for a query. Tagged with the query they answer, so a slow answer
 * for an older query never overwrites the current one.
 */
const usePeople = (items: MentionItems, query: string): readonly MentionItem[] => {
    const [answer, setAnswer] = useState<{ query: string; people: readonly MentionItem[] }>({ query, people: [] });

    useEffect(() => {
        let current = true;
        const settle = (people: readonly MentionItem[]): void => {
            if (current) {
                setAnswer({ query, people: people.slice(0, SUGGESTION_LIMIT) });
            }
        };
        // A failed lookup offers nobody rather than leaving the last list up.
        Promise.resolve(items(query)).then(settle, () => settle([]));
        return () => {
            current = false;
        };
    }, [items, query]);

    return answer.query === query ? answer.people : [];
};

/**
 * A mention being made: what the editor shows from the moment the trigger is
 * typed until a person is chosen.
 *
 * The query is typed into a real input inside the mention, so there is a caret
 * the whole time and the keys belong to this component — the editor routes
 * nothing. Backspace on an empty query takes the mention away again; Escape, or
 * leaving it, turns what was typed back into plain text.
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
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Each way out runs once. Choosing or cancelling hands focus back to the
    // editor, which blurs the input — and blurring is itself a way out.
    const finished = useRef(false);
    const finish = (leave: () => void): void => {
        if (finished.current) {
            return;
        }
        finished.current = true;
        leave();
    };
    const [query, setQuery] = useState('');
    const people = usePeople(items, query);

    // Tagged with the query it belongs to: a new query means a new list, so the
    // highlight falls back to the top without an effect having to reset it.
    const [highlighted, setHighlighted] = useState({ query, index: 0 });
    const activeIndex = highlighted.query === query ? Math.min(highlighted.index, people.length - 1) : 0;
    const highlight = (index: number): void => setHighlighted({ query, index });
    const active = people[activeIndex];

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
            case 'ArrowDown':
                highlight((activeIndex + 1) % people.length);
                break;
            case 'ArrowUp':
                highlight((activeIndex - 1 + people.length) % people.length);
                break;
            case 'Enter':
            case 'Tab':
                if (!active) {
                    return;
                }
                finish(() => onChoose(active));
                break;
            case 'Escape':
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
        <Flyout.Root open={people.length > 0}>
            <Flyout.Trigger asChild>
                <span className={styles.draft}>
                    {trigger}
                    <input
                        ref={inputRef}
                        role="combobox"
                        aria-expanded={people.length > 0}
                        aria-controls={listId}
                        aria-activedescendant={active ? `${listId}-${active.id}` : undefined}
                        aria-label="Mention someone"
                        value={query}
                        size={Math.max(query.length, 1)}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={onKeyDown}
                        onBlur={() => finish(() => onCancel(`${trigger}${query}`))}
                        className={styles.input}
                    />
                </span>
            </Flyout.Trigger>
            <Flyout.Content
                padding="tight"
                side="bottom"
                align="start"
                // The caret stays in the input while the list is open.
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <ul id={listId} role="listbox" aria-label="People" className={styles.list}>
                    {people.map((person, index) => (
                        <li
                            key={person.id}
                            id={`${listId}-${person.id}`}
                            role="option"
                            aria-selected={index === activeIndex}
                        >
                            <button
                                type="button"
                                // The keyboard stays in the input, which drives
                                // the list.
                                tabIndex={-1}
                                // Never take focus from the input, or blurring
                                // it would cancel before the click lands.
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => finish(() => onChoose(person))}
                                onMouseEnter={() => highlight(index)}
                                className={
                                    index === activeIndex ? `${styles.option} ${styles.optionActive}` : styles.option
                                }
                            >
                                <span>{person.name}</span>
                                <span className={styles.hint}>
                                    {trigger}
                                    {person.username}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </Flyout.Content>
        </Flyout.Root>
    );
};
