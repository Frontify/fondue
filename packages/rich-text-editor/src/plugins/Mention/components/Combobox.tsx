/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useEffect, useState } from 'react';

import { type AutocompleteContext, type EditorControlApi } from '#/core';

import styles from './combobox.module.scss';

/** One choice in the picker. `hint` is the secondary text — a user's email, a group's kind. */
export type ComboboxItem = {
    id: string;
    label: string;
    hint?: string;
};

/**
 * The list of choices for what has been typed after the trigger, driven from
 * the keyboard while the caret stays in the editor.
 *
 * Plugin-side on purpose: the editor knows only that some content hangs at an
 * anchor and wants the arrow keys. What a choice looks like, and what picking
 * one does, belongs to whoever declared the anchor.
 */
export const Combobox = ({
    context,
    items,
    label,
    onSelect,
}: {
    context: AutocompleteContext;
    /** Already filtered for the query, already capped. */
    items: readonly ComboboxItem[];
    /** What the list is called, for screen readers. */
    label: string;
    /** Insert the choice. The trigger and its query are gone from the document by then. */
    onSelect: (item: ComboboxItem, api: EditorControlApi) => void;
}): ReactNode => {
    const { api, query, clearQuery, close, onKeys } = context;

    // Tagged with the query it belongs to: a new query means a new list, so the
    // highlight falls back to the top without an effect having to reset it.
    const [highlighted, setHighlighted] = useState({ query, index: 0 });
    const activeIndex =
        highlighted.query === query
            ? // The list shrinks as the query grows, so the index is clamped
              // rather than trusted.
              Math.min(highlighted.index, items.length - 1)
            : 0;
    const highlight = (index: number): void => setHighlighted({ query, index });

    const choose = (item: ComboboxItem): void => {
        // The trigger and what was typed after it make way for the choice.
        clearQuery();
        onSelect(item, api);
    };

    // Re-registered on every render: the handler closes over the current list
    // and highlight, and registering replaces the previous one.
    useEffect(() =>
        onKeys((event) => {
            switch (event.key) {
                case 'ArrowDown':
                    highlight((activeIndex + 1) % items.length);
                    return true;
                case 'ArrowUp':
                    highlight((activeIndex - 1 + items.length) % items.length);
                    return true;
                case 'Enter':
                case 'Tab': {
                    const item = items[activeIndex];
                    if (item) {
                        choose(item);
                    }
                    return true;
                }
                case 'Escape':
                    close();
                    return true;
                default:
                    return false;
            }
        }),
    );

    return (
        <ul role="listbox" aria-label={label} className={styles.list}>
            {items.map((item, index) => (
                <li key={item.id} role="option" aria-selected={index === activeIndex}>
                    <button
                        type="button"
                        // Never take the selection away from the editor.
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(item)}
                        onMouseEnter={() => highlight(index)}
                        className={index === activeIndex ? `${styles.option} ${styles.optionActive}` : styles.option}
                    >
                        {item.hint ? <span aria-hidden>{item.hint}</span> : null}
                        <span>{item.label}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
};
