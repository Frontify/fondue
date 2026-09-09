/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

type IndeterminateValues = {
    /** The values still rendered with a dash. */
    indeterminateItemValues: string[];
    hasIndeterminateValues: boolean;
    /** Wraps `onItemSelect`, dropping the value from the partial set first. */
    handleItemSelect: (value?: string) => void;
    /** Drops the whole partial set, so clearing the field also clears the dashes. */
    clearIndeterminate: () => void;
};

/**
 * Indeterminate values are purely visual, so the component keeps its own copy of the set and drops
 * a value as soon as the user acts on it: a partially applied value becomes an ordinary two-state
 * option on its first click and must not fall back to a dash when it is switched off again.
 *
 * The set is re-seeded from `indeterminateValues` by content rather than by array identity, so an
 * inline array does not reset it on every render, while a different set — a different group of
 * records being edited — does.
 */
export const useIndeterminateValues = (
    indeterminateValues: string[] | undefined,
    selectedItemValues: string[],
    onItemSelect: (value?: string) => void,
): IndeterminateValues => {
    const seed = indeterminateValues ?? [];
    const key = JSON.stringify([...seed].sort());
    const [state, setState] = useState({ key, values: seed });

    // Re-seeding during render derives state from the changed prop without an effect: React discards
    // this render and immediately re-runs the component.
    if (state.key !== key) {
        setState({ key, values: seed });
    }
    const values = state.key === key ? state.values : seed;

    // A value that applies to every record cannot also be partially applied
    const indeterminateItemValues = values.filter((value) => !selectedItemValues.includes(value));

    return {
        indeterminateItemValues,
        hasIndeterminateValues: indeterminateItemValues.length > 0,
        handleItemSelect: (value) => {
            if (value !== undefined && values.includes(value)) {
                setState({ key, values: values.filter((current) => current !== value) });
            }
            onItemSelect(value);
        },
        clearIndeterminate: () => {
            if (values.length > 0) {
                setState({ key, values: [] });
            }
        },
    };
};
