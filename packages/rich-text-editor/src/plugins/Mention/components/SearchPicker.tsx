/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingCircle, TextInput } from '@frontify/fondue-components';

import { Listbox } from '#/bridge/define';

import { resultsOf } from '../helpers/results';
import { type useSearchDialogState } from '../hooks/useSearchDialogState';
import styles from '../styles/mention.module.scss';

type SearchDialogState = ReturnType<typeof useSearchDialogState>;

const SearchField = ({ state }: { state: SearchDialogState }) => (
    <TextInput
        {...state.combobox}
        type="text"
        value={state.query}
        placeholder={state.strings.search}
        aria-label={state.strings.search}
        aria-autocomplete="list"
        aria-expanded={state.options.length > 0}
        aria-controls={state.controls}
        aria-activedescendant={state.activeId}
        autoComplete="off"
        spellCheck={false}
        onChange={(event) => state.onQueryChange(event.target.value)}
        onKeyDown={state.onKeyDown}
    />
);

const LoadingRow = ({ state }: { state: SearchDialogState }) => {
    if (state.found.status !== 'loading' || !state.slow) {
        return null;
    }

    return (
        <div className={styles.row}>
            <LoadingCircle size="xx-small" />
            {state.strings.loading}
        </div>
    );
};

const OutcomeRow = ({ state }: { state: SearchDialogState }) => {
    const { found, strings } = state;
    if (found.status === 'ready' && resultsOf(found.items).length === 0) {
        return <div className={styles.row}>{strings.noResults}</div>;
    }

    if (found.status === 'failed') {
        return <div className={styles.row}>{strings.failed}</div>;
    }

    return null;
};

/** The search field over the loading row, the options and the outcome row. */
export const SearchPicker = ({ state }: { state: SearchDialogState }) => (
    <div className={styles.picker}>
        <SearchField state={state} />
        <LoadingRow state={state} />
        {state.options.length > 0 && (
            <Listbox
                id={state.listId}
                label={state.strings.label}
                options={state.options}
                index={state.shownIndex}
                onPick={state.choose}
                onActivate={state.setIndex}
                testId={`${state.testId}-mention-options`}
            />
        )}
        <OutcomeRow state={state} />
    </div>
);
