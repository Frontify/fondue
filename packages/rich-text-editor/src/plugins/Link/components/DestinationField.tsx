/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, type RefObject, useId, useRef, useState } from 'react';

import { isCompositionKey } from '../../shared/helpers/keys';
import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { NO_RESULTS, RESULTS_LABEL, resultCount, SEARCH_FAILED, SEARCHING } from '../helpers/strings';
import { type DestinationSearch, useDestinationSearch } from '../hooks/useDestinationSearch';
import linkStyles from '../link.module.scss';

import styles from './linkForm.module.scss';

const URL_PLACEHOLDER = 'example.com';

const describeStatus = (search: DestinationSearch): string => {
    switch (search.status) {
        case 'idle':
            return '';
        case 'searching':
            return SEARCHING;
        case 'failed':
            return SEARCH_FAILED;
        case 'done':
            if (search.results.length === 0) {
                return NO_RESULTS;
            }
            return resultCount(search.results.length);
    }
};

const foundDestinations = (search: DestinationSearch): readonly LinkDestination[] => {
    switch (search.status) {
        case 'idle':
        case 'searching':
        case 'failed':
            return [];
        case 'done':
            return search.results;
    }
};

type ArrowKey = 'ArrowDown' | 'ArrowUp';

const isArrowKey = (key: string): key is ArrowKey => key === 'ArrowDown' || key === 'ArrowUp';

/**
 * The button the arrow moves focus to. Null when ArrowUp leaves the first one, back to the field.
 */
const buttonAfterArrow = (
    buttons: readonly HTMLButtonElement[],
    from: EventTarget,
    key: ArrowKey,
): HTMLButtonElement | null => {
    const index = buttons.findIndex((button) => button === from);
    switch (key) {
        case 'ArrowDown':
            return buttons[Math.min(index + 1, buttons.length - 1)] ?? null;
        case 'ArrowUp':
            return buttons[index - 1] ?? null;
    }
};

type PageButtonProps = {
    destination: LinkDestination;
    onPick: (destination: LinkDestination) => void;
};

/**
 * Named by the page, with its address as the description, so a screen reader does not run the two together.
 */
const PageButton = ({ destination, onPick }: PageButtonProps): ReactNode => {
    const labelId = useId();
    const hrefId = useId();
    return (
        <button
            type="button"
            className={styles.option}
            aria-labelledby={labelId}
            aria-describedby={hrefId}
            onClick={() => onPick(destination)}
        >
            <span id={labelId}>{destination.label}</span>
            <span id={hrefId} className={styles.optionHref}>
                {destination.href}
            </span>
        </button>
    );
};

type DestinationFieldProps = {
    id: string;
    inputRef: RefObject<HTMLInputElement>;
    value: string;
    status: 'neutral' | 'error';
    errorId: string;
    /**
     * Without it the field is a plain address input.
     */
    search?: LinkSearch;
    onChange: (value: string) => void;
    onPick: (destination: LinkDestination) => void;
    onEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * The "Link to" field. With `search`, the pages found are offered as buttons under it.
 */
export const DestinationField = ({
    id,
    inputRef,
    value,
    status,
    errorId,
    search,
    onChange,
    onPick,
    onEnter,
}: DestinationFieldProps): ReactNode => {
    // Only what the author types is searched: a stored or picked address is not a query.
    const [query, setQuery] = useState('');
    const destinationSearch = useDestinationSearch(search, query);
    const found = foundDestinations(destinationSearch);
    const listRef = useRef<HTMLUListElement>(null);

    const buttons = (): HTMLButtonElement[] => [...(listRef.current?.querySelectorAll('button') ?? [])];

    const pick = (destination: LinkDestination): void => {
        setQuery('');
        onPick(destination);
        inputRef.current?.focus();
    };

    const onFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (isCompositionKey(event)) {
            return;
        }
        if (event.key === 'ArrowDown' && found.length > 0) {
            event.preventDefault();
            buttons()[0]?.focus();
            return;
        }
        if (event.key === 'Enter') {
            onEnter(event);
        }
    };

    const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>): void => {
        if (!isArrowKey(event.key)) {
            return;
        }
        event.preventDefault();
        const next = buttonAfterArrow(buttons(), event.target, event.key);
        if (next === null) {
            inputRef.current?.focus();
            return;
        }
        next.focus();
    };

    return (
        <>
            <TextInput
                id={id}
                ref={inputRef}
                type="url"
                placeholder={URL_PLACEHOLDER}
                value={value}
                status={status}
                aria-describedby={status === 'error' ? errorId : undefined}
                aria-errormessage={errorId}
                onChange={(event) => {
                    setQuery(event.target.value);
                    onChange(event.target.value);
                }}
                onKeyDown={onFieldKeyDown}
            />
            {found.length === 0 ? null : (
                // The arrow keys move focus between the buttons; each button is the control.
                // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <ul ref={listRef} aria-label={RESULTS_LABEL} className={styles.results} onKeyDown={onListKeyDown}>
                    {found.map((destination) => (
                        <li key={destination.id}>
                            <PageButton destination={destination} onPick={pick} />
                        </li>
                    ))}
                </ul>
            )}
            {search === undefined ? null : (
                <output className={linkStyles.visuallyHidden}>{describeStatus(destinationSearch)}</output>
            )}
        </>
    );
};
