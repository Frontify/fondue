/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@frontify/fondue-components';
import { forwardRef, type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { isCompositionKey } from '../../shared/helpers/keys';
import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { type LinkPolicy } from '../helpers/policy';
import { type DestinationSearch, useDestinationSearch } from '../hooks/useDestinationSearch';
import linkStyles from '../link.module.scss';

import styles from './linkForm.module.scss';

const SEARCHING_STATUS = 'Searching';
const FAILED_STATUS = 'Search failed';
const NO_RESULTS_STATUS = 'No results';
const ONE_RESULT_STATUS = '1 result';
const URL_PLACEHOLDER = 'example.com';
const RESULTS_LABEL = 'Pages';

const describeManyResults = (count: number): string => `${count} results`;

const describeStatus = (search: DestinationSearch): string => {
    switch (search.status) {
        case 'idle':
            return '';
        case 'searching':
            return SEARCHING_STATUS;
        case 'failed':
            return FAILED_STATUS;
        case 'done':
            if (search.results.length === 0) {
                return NO_RESULTS_STATUS;
            }
            if (search.results.length === 1) {
                return ONE_RESULT_STATUS;
            }
            return describeManyResults(search.results.length);
    }
};

type DestinationFieldProps = {
    id: string;
    value: string;
    status: 'neutral' | 'error';
    /**
     * The id of the message shown under the field while `status` is an error.
     */
    errorId: string;
    /**
     * Without it the field is a plain address input.
     */
    search?: LinkSearch;
    policy: LinkPolicy;
    onChange: (value: string) => void;
    onPick: (destination: LinkDestination) => void;
    /**
     * Enter with no option active: the form's own Enter.
     */
    onEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * The "Link to" input as a combobox over the destinations an app can search.
 * What is typed still works as an address; the list only offers shortcuts. No
 * option is active until an arrow key makes one, so Enter on a typed address
 * still saves it rather than picking the first result.
 */
export const DestinationField = forwardRef<HTMLInputElement, DestinationFieldProps>(function DestinationField(
    { id, value, status, errorId, search, policy, onChange, onPick, onEnter },
    inputRef,
): ReactNode {
    const listId = useId();
    // An unedited stored value is not searched until the author types or presses an arrow key.
    const [dormant, setDormant] = useState(true);
    let searched = value;
    if (dormant) {
        searched = '';
    }
    const destinationSearch = useDestinationSearch(search, searched, policy);
    let results: readonly LinkDestination[] = [];
    if (destinationSearch.status === 'done') {
        results = destinationSearch.results;
    }
    // The value the list was closed for: typing again opens it, so no extra "open" state exists.
    const [closedFor, setClosedFor] = useState<string | null>(value);
    // Tagged with its value so typing drops the highlight without an effect.
    const [highlighted, setHighlighted] = useState({ value, index: -1 });
    let activeIndex = -1;
    if (highlighted.value === value) {
        activeIndex = Math.min(highlighted.index, results.length - 1);
    }
    const active = results[activeIndex];
    const shown = closedFor !== value;
    const listOpen = shown && results.length > 0;
    const optionId = (index: number): string => `${listId}-option-${index}`;
    const highlight = (index: number): void => setHighlighted({ value, index });
    const listRef = useRef<HTMLUListElement>(null);
    // Set by the arrow keys only: a row the pointer highlights is in sight already.
    const revealHighlightRef = useRef(false);

    // The list scrolls, so the arrows could move the highlight onto a row out of sight.
    useEffect(() => {
        // Cleared on every change, so arrows that left the highlight where it was cannot make a later hover scroll.
        const reveal = revealHighlightRef.current;
        revealHighlightRef.current = false;
        if (!reveal || activeIndex < 0) {
            return;
        }
        listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    const pick = (destination: LinkDestination): void => {
        // The picked address is not a query: it is searched only once the author types or presses an arrow key again.
        setDormant(true);
        setClosedFor(destination.href);
        onPick(destination);
    };

    // Escape closes the list and nothing else. The flyout listens on the document in the capture phase, so only an earlier listener can stop it.
    useEffect(() => {
        if (!listOpen) {
            return;
        }
        const closeList = (event: globalThis.KeyboardEvent): void => {
            if (event.key !== 'Escape' || event.isComposing) {
                return;
            }
            event.stopPropagation();
            setClosedFor(value);
        };
        window.addEventListener('keydown', closeList, true);
        return () => window.removeEventListener('keydown', closeList, true);
    }, [listOpen, value]);

    const moveHighlight = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (results.length === 0 && !dormant) {
            return;
        }
        event.preventDefault();
        setDormant(false);
        setClosedFor(null);
        if (results.length === 0) {
            return;
        }
        revealHighlightRef.current = true;
        if (event.key === 'ArrowDown') {
            highlight((activeIndex + 1) % results.length);
            return;
        }
        if (activeIndex <= 0) {
            highlight(results.length - 1);
            return;
        }
        highlight(activeIndex - 1);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (isCompositionKey(event)) {
            return;
        }
        if (search !== undefined && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            moveHighlight(event);
            return;
        }
        if (event.key !== 'Enter') {
            return;
        }
        if (listOpen && active !== undefined) {
            event.preventDefault();
            pick(active);
            return;
        }
        onEnter(event);
    };

    // A spread: the field's props do not list the combobox attributes, but pass them on to the input.
    let comboboxProps = {};
    if (search !== undefined) {
        let controls: string | undefined;
        let activeDescendant: string | undefined;
        if (listOpen) {
            controls = listId;
            if (active !== undefined) {
                activeDescendant = optionId(activeIndex);
            }
        }
        comboboxProps = {
            role: 'combobox',
            'aria-expanded': listOpen,
            'aria-controls': controls,
            'aria-autocomplete': 'list',
            'aria-activedescendant': activeDescendant,
        };
    }

    return (
        <>
            <TextInput
                {...comboboxProps}
                id={id}
                ref={inputRef}
                type="url"
                placeholder={URL_PLACEHOLDER}
                value={value}
                status={status}
                aria-describedby={status === 'error' ? errorId : undefined}
                aria-errormessage={errorId}
                onChange={(event) => {
                    setDormant(false);
                    onChange(event.target.value);
                }}
                onKeyDown={onKeyDown}
                onBlur={() => setClosedFor(value)}
            />
            {listOpen ? (
                <ul ref={listRef} id={listId} role="listbox" aria-label={RESULTS_LABEL} className={styles.results}>
                    {results.map((destination, index) => (
                        // The keyboard drives the list from the input; the mouse picks here.
                        <li
                            key={destination.id}
                            id={optionId(index)}
                            role="option"
                            aria-selected={index === activeIndex}
                            // Picked on press, with focus kept in the input: a blur would close the list before a click landed.
                            onMouseDown={(event) => {
                                event.preventDefault();
                                pick(destination);
                            }}
                            // The pointer moves the same highlight the arrow keys do, as Fondue's Select.
                            onMouseMove={() => highlight(index)}
                            data-highlighted={index === activeIndex}
                            className={styles.option}
                        >
                            <span>{destination.label}</span>
                            <span className={styles.optionHref}>{destination.href}</span>
                        </li>
                    ))}
                </ul>
            ) : null}
            {search === undefined ? null : (
                <output className={linkStyles.visuallyHidden}>{shown ? describeStatus(destinationSearch) : ''}</output>
            )}
        </>
    );
});
