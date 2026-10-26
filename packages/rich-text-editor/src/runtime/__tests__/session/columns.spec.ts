/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { createColumns } from '../../session/state/columns';
import { ONE_COLUMN } from '../../statePlugins/columns';

const TWO_COLUMNS = { ...ONE_COLUMN, count: 2 };

describe('createColumns', () => {
    it('starts at the initial columns without notifying', () => {
        const onChange = vi.fn();
        const columns = createColumns({ initial: ONE_COLUMN, onChange });
        expect(columns.current()).toBe(ONE_COLUMN);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('stores a changed value and notifies once, after the value is current', () => {
        let seen: unknown;
        const columns = createColumns({ initial: ONE_COLUMN, onChange: () => (seen = columns.current()) });
        columns.set(TWO_COLUMNS);
        expect(columns.current()).toBe(TWO_COLUMNS);
        expect(seen).toBe(TWO_COLUMNS);
    });

    it('ignores an equal value without storing or notifying', () => {
        const onChange = vi.fn();
        const columns = createColumns({ initial: ONE_COLUMN, onChange });
        columns.set({ ...ONE_COLUMN });
        expect(columns.current()).toBe(ONE_COLUMN);
        expect(onChange).not.toHaveBeenCalled();
    });
});
