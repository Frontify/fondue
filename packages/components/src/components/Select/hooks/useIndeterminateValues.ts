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
 * The copy is re-seeded when `indeterminateValues` changes by content rather than by identity, so
 * an inline array does not reset it on every render, while a different set — a different group of
 * records being edited — does.
 */
export const useIndeterminateValues = (
    indeterminateValues: string[] = [],
    selectedItemValues: string[],
    onItemSelect: (value?: string) => void,
): IndeterminateValues => {
    const key = JSON.stringify([...indeterminateValues].sort());
    const [state, setState] = useState({ key, values: indeterminateValues });

    // Re-seeding during render derives state from the changed prop without an effect: React discards
    // this render and immediately re-runs the component with the new state.
    if (state.key !== key) {
        setState({ key, values: indeterminateValues });
    }

    // A value that applies to every record cannot also be partially applied
    const indeterminateItemValues = state.values.filter((value) => !selectedItemValues.includes(value));

    return {
        indeterminateItemValues,
        hasIndeterminateValues: indeterminateItemValues.length > 0,
        handleItemSelect: (value) => {
            if (value !== undefined && state.values.includes(value)) {
                setState({ key, values: state.values.filter((current) => current !== value) });
            }
            onItemSelect(value);
        },
        clearIndeterminate: () => {
            if (state.values.length > 0) {
                setState({ key, values: [] });
            }
        },
    };
};
