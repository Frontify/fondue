/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, type Ref, useEffect, useId, useState } from 'react';

import { isCompositionKey } from '../../shared/helpers/keys';
import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { type LinkPolicy } from '../helpers/policy';
import { type DestinationSearch, useDestinationSearch } from '../hooks/useDestinationSearch';
import linkStyles from '../link.module.scss';

import styles from './linkForm.module.scss';

const describeStatus = (status: DestinationSearch['status'], count: number): string => {
    if (status === 'searching') {
        return 'Searching';
    }
    if (status === 'failed') {
        return 'Search failed';
    }
    if (status === 'done') {
        if (count === 0) {
            return 'No results';
        }
        return `${count} ${count === 1 ? 'result' : 'results'}`;
    }
    return '';
};

/**
 * The "Link to" input as a combobox over the destinations an app can search.
 * What is typed still works as an address; the list only offers shortcuts. No
 * option is active until an arrow key makes one, so Enter on a typed address
 * still saves it rather than picking the first result.
 */
export const DestinationField = ({
    id,
    inputRef,
    value,
    status,
    errorId,
    search,
    policy,
    onChange,
    onPick,
    onEnter,
}: {
    id: string;
    inputRef: Ref<HTMLInputElement>;
    value: string;
    status: 'neutral' | 'error';
    /**
     * The message shown under the field while `status` is an error.
     */
    errorId: string | undefined;
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
}): ReactNode => {
    const listId = useId();
    // An unedited stored value is not searched until the author types or presses an arrow key.
    const [dormant, setDormant] = useState(true);
    const { results, status: searchStatus } = useDestinationSearch(search, dormant ? '' : value, policy);
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

    const pick = (destination: LinkDestination): void => {
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
        if (event.key === 'ArrowDown') {
            highlight((activeIndex + 1) % results.length);
            return;
        }
        highlight(activeIndex <= 0 ? results.length - 1 : activeIndex - 1);
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
        comboboxProps = {
            role: 'combobox',
            'aria-expanded': listOpen,
            'aria-controls': listOpen ? listId : undefined,
            'aria-autocomplete': 'list',
            'aria-activedescendant': listOpen && active !== undefined ? optionId(activeIndex) : undefined,
        };
    }

    return (
        <>
            <TextInput
                {...comboboxProps}
                id={id}
                ref={inputRef}
                type="url"
                placeholder="example.com"
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
                <ul id={listId} role="listbox" aria-label="Pages" className={styles.results}>
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
                <output className={linkStyles.visuallyHidden}>
                    {shown ? describeStatus(searchStatus, results.length) : ''}
                </output>
            )}
        </>
    );
};
