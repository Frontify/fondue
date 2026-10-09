/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-095: no underscore export of `prosemirror-tables`, in a named or a namespace import.
// expect-lint: eslint(no-restricted-imports)
import { __clipCells } from 'prosemirror-tables';
// expect-lint: eslint(no-restricted-imports)
import * as tables from 'prosemirror-tables';

export const internals = [__clipCells, tables];
