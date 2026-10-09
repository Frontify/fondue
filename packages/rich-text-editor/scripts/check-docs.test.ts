/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { toggleMark } from '../src/model/capabilities.ts';
import { type FeatureDeclaration } from '../src/model/declarations.ts';

import { checkFeatureDocs } from './check-docs';

const strike: FeatureDeclaration = {
    id: 'marks.strike',
    version: 1,
    commands: { 'mark.strike.toggle': toggleMark('strike') },
    keys: { 'Mod-Shift-x': 'mark.strike.toggle' },
    inputRules: [{ id: 'strike.tildes', kind: 'mark-delimiter', open: '~~', close: '~~', mark: 'strike' }],
};

const page = (row: string) =>
    [
        '# `marks.strike`',
        '',
        '| Feature | Commands and payloads | Keys | Controls | Input rules | Document change |',
        '|---|---|---|---|---|---|',
        row,
    ].join('\n');

describe('checkFeatureDocs', () => {
    it('SPEC-rich-text/AC-068 accepts a page whose row names each command, key and input rule', () => {
        const row =
            '| `marks.strike` | `mark.strike.toggle` | `Mod-Shift-x` | Strikethrough toggle | `strike.tildes` | Adds or removes `strike` |';

        expect(checkFeatureDocs([strike], { 'marks.strike': page(row) })).toEqual([]);
    });

    it('SPEC-rich-text/AC-068 fails a registered command, key or rule that the row does not name in its column', () => {
        const row = '| `marks.strike` | none | `mark.strike.toggle` | none | none | Adds or removes `strike` |';

        expect(checkFeatureDocs([strike], { 'marks.strike': page(row) })).toEqual([
            'docs/features/marks.strike.md does not name mark.strike.toggle under Commands and payloads',
            'docs/features/marks.strike.md does not name Mod-Shift-x under Keys',
            'docs/features/marks.strike.md does not name strike.tildes under Input rules',
        ]);
    });

    it('SPEC-rich-text/AC-068 fails a feature with no page, or a page with no row for it', () => {
        const other = '| `marks.code` | `mark.code.toggle` | `Mod-e` | Code toggle | none | Adds or removes `code` |';

        expect(checkFeatureDocs([strike], {})).toEqual(['marks.strike has no docs/features/marks.strike.md']);
        expect(checkFeatureDocs([strike], { 'marks.strike': page(other) })).toEqual([
            'docs/features/marks.strike.md has no Feature behavior row for marks.strike',
        ]);
    });
});
