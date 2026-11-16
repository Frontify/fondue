/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInput } from '@frontify/fondue-components';
import { type KeyboardEvent, type ReactNode, type RefObject, useRef, useState } from 'react';

import { isCompositionKey } from '../../shared/helpers/keys';
import { type LinkDestination, type LinkSearch } from '../helpers/destination';
import { type LinkLabels } from '../helpers/labels';
import { type LinkPolicy } from '../helpers/policy';
import { type DestinationSearch, useDestinationSearch } from '../hooks/useDestinationSearch';
import linkStyles from '../link.module.scss';

import styles from './linkForm.module.scss';

const URL_PLACEHOLDER = 'example.com';

const describeStatus = (search: DestinationSearch, labels: LinkLabels): string => {
    switch (search.status) {
        case 'idle':
            return '';
        case 'searching':
            return labels.searching;
        case 'failed':
            return labels.searchFailed;
        case 'done':
            if (search.results.length === 0) {
                return labels.noResults;
            }
            return labels.resultCount(search.results.length);
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

type DestinationFieldProps = {
    id: string;
    inputRef: RefObject<HTMLInputElement>;
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
    labels: LinkLabels;
    onChange: (value: string) => void;
    onPick: (destination: LinkDestination) => void;
    onEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * The "Link to" field. What is typed is the address; with `search`, the pages found are offered as buttons under
 * it, and one pressed fills the field in. ArrowDown moves from the field into the list.
 */
export const DestinationField = ({
    id,
    inputRef,
    value,
    status,
    errorId,
    search,
    policy,
    labels,
    onChange,
    onPick,
    onEnter,
}: DestinationFieldProps): ReactNode => {
    // Only what the author types is searched: a stored or picked address is not a query.
    const [query, setQuery] = useState('');
    const destinationSearch = useDestinationSearch(search, query, policy);
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
                <ul ref={listRef} aria-label={labels.results} className={styles.results} onKeyDown={onListKeyDown}>
                    {found.map((destination) => (
                        <li key={destination.id}>
                            <button type="button" className={styles.option} onClick={() => pick(destination)}>
                                <span>{destination.label}</span>
                                <span className={styles.optionHref}>{destination.href}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {search === undefined ? null : (
                <output className={linkStyles.visuallyHidden}>{describeStatus(destinationSearch, labels)}</output>
            )}
        </>
    );
};
