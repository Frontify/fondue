/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-095: no underscore export of `prosemirror-tables`, and no read of `view.input` or `view.domObserver`.
// expect-lint: eslint(no-restricted-imports)
import { __clipCells, tableEditing } from 'prosemirror-tables';
// expect-lint: eslint(no-restricted-imports)
import * as tables from 'prosemirror-tables';

declare const view: { readonly input: unknown; readonly domObserver: unknown; readonly composing: boolean };

export const internals = [
    __clipCells,
    tableEditing,
    tables,
    view.composing,
    // expect-lint: eslint(no-restricted-properties)
    view.input,
    // expect-lint: eslint(no-restricted-properties)
    view.domObserver,
];
