/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ChangeEvent,
    type KeyboardEvent,
    type ReactNode,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useAnchoredPosition } from '../../shared/hooks/useAnchoredPosition';
import styles from '../emoji.module.scss';
import { findByShortcode, searchEmojis, SHORTCODE_CHARACTERS } from '../helpers/search';
import { type EmojiItem } from '../types';

/** The colon that starts a shortcode, and ends one: `:smile:`. */
export const TRIGGER = ':';

/** How many emoji the list offers at once. */
const SUGGESTION_LIMIT = 8;

/** Typed characters before the list opens: `:o` is too little to go on, and too often just text. */
const MIN_QUERY = 2;

/** The gap between the query and the list under it. */
const LIST_OFFSET = 4;

/**
 * A shortcode being typed, from the `:` until an emoji is chosen.
 *
 * Like a mention being made, the query goes into a real input (a combobox over
 * a listbox of emoji): arrows move, Enter or Tab chooses, Backspace on an
 * empty query removes the `:`, and Escape or blur turns it back into text. It
 * gives up as soon as what is typed cannot be a shortcode — a space, `/` or
 * `)` — so a colon in prose costs nothing. A closing `:` after a whole
 * shortcode (`:smile:`) chooses that emoji. What is chosen goes in as plain
 * text, so the draft never reaches the document.
 */
export const EmojiDraft = ({
    emojis,
    focused,
    onChoose,
    onCancel,
    onRemove,
}: {
    emojis: readonly EmojiItem[];
    /** The editor's selection is on this draft — the input takes the caret. */
    focused: boolean;
    onChoose: (item: EmojiItem) => void;
    /** Give up, keeping what was typed as ordinary text. */
    onCancel: (text: string) => void;
    /** Give up and leave nothing behind, not even the `:`. */
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
    const open = [...query].length >= MIN_QUERY;
    const matches = useMemo(() => (open ? searchEmojis(emojis, query, SUGGESTION_LIMIT) : []), [emojis, open, query]);
    const noMatches = open && matches.length === 0;
    const position = useAnchoredPosition(draftRef, open, LIST_OFFSET);

    // Tagged with its query so a new query resets the highlight to the top without an effect.
    const [highlighted, setHighlighted] = useState({ query, index: 0 });
    const activeIndex = highlighted.query === query ? Math.min(highlighted.index, matches.length - 1) : 0;
    const highlight = (index: number): void => setHighlighted({ query, index });
    const active = matches[activeIndex];
    const optionId = (index: number): string => `${listId}-option-${index}`;

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const typed = event.target.value;
        if (SHORTCODE_CHARACTERS.test(typed)) {
            setQuery(typed);
            return;
        }
        // `:smile:` — the closing colon after a whole shortcode.
        const closed = typed.endsWith(TRIGGER) ? findByShortcode(emojis, typed.slice(0, -TRIGGER.length)) : undefined;
        finish(closed ? () => onChoose(closed) : () => onCancel(`${TRIGGER}${typed}`));
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                if (matches.length === 0) {
                    break;
                }
                highlight(
                    event.key === 'ArrowDown'
                        ? (activeIndex + 1) % matches.length
                        : (activeIndex - 1 + matches.length) % matches.length,
                );
                break;
            case 'Enter':
                // Nothing to choose: the text was just text.
                finish(active ? () => onChoose(active) : () => onCancel(`${TRIGGER}${query}`));
                break;
            case 'Tab':
                if (!active) {
                    return;
                }
                finish(() => onChoose(active));
                break;
            case 'Escape':
                // Taken here: the editor must not also read it as leaving the text.
                event.stopPropagation();
                finish(() => onCancel(`${TRIGGER}${query}`));
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

    const status = !open ? '' : noMatches ? 'No matches' : `${matches.length} emoji`;

    return (
        <span ref={draftRef} className={styles.draft}>
            {TRIGGER}
            <input
                ref={inputRef}
                role="combobox"
                aria-expanded={open}
                // Only while the listbox is in the page: an id pointing at nothing is an error.
                aria-controls={open && position !== null && !noMatches ? listId : undefined}
                aria-autocomplete="list"
                aria-activedescendant={open && active ? optionId(activeIndex) : undefined}
                aria-label="Emoji shortcode"
                value={query}
                size={Math.max(query.length, 1)}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={() => finish(() => onCancel(`${TRIGGER}${query}`))}
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
                              <ul id={listId} role="listbox" aria-label="Emoji" className={styles.list}>
                                  {matches.map((item, index) => (
                                      // The keyboard drives the list from the input; the mouse picks here.
                                      // oxlint-disable-next-line jsx-a11y/click-events-have-key-events
                                      <li
                                          key={optionId(index)}
                                          id={optionId(index)}
                                          role="option"
                                          aria-selected={index === activeIndex}
                                          aria-label={item.name}
                                          // Keep focus in the input: blurring would cancel before the click lands.
                                          onMouseDown={(event) => event.preventDefault()}
                                          onClick={() => finish(() => onChoose(item))}
                                          onMouseEnter={() => highlight(index)}
                                          className={
                                              index === activeIndex
                                                  ? `${styles.option} ${styles.optionActive}`
                                                  : styles.option
                                          }
                                      >
                                          <span aria-hidden className={styles.glyph}>
                                              {item.emoji}
                                          </span>
                                          <span aria-hidden className={styles.hint}>
                                              {TRIGGER}
                                              {item.shortcodes[0]}
                                              {TRIGGER}
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
