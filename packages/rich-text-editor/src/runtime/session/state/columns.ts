/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ColumnState, sameColumns } from '../../statePlugins/columns';

export type Columns = {
    current(): ColumnState;
    set(next: ColumnState): void;
};

export const createColumns = (a: { initial: ColumnState; onChange: () => void }): Columns => {
    let columns = a.initial;

    return {
        current: () => columns,
        set: (next) => {
            if (sameColumns(columns, next)) {
                return;
            }

            columns = next;
            a.onChange();
        },
    };
};
