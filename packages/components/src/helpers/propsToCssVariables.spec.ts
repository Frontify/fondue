/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { propsToCssVariables } from './propsToCssVariables';

describe('propsToCssVariables', () => {
    it('should convert basic props to CSS variables', () => {
        const props = { m: 10, p: 20 };
        const expected = {
            '--margin': 10,
            '--padding': 20,
        };
        expect(propsToCssVariables(props)).toStrictEqual(expected);
    });

    it('should handle custom abbreviations', () => {
        const props = { x: 5 };
        const extraAbbreviationToCssProperty = { x: 'custom-x' };
        const expected = {
            '--custom-x': 5,
        };
        expect(propsToCssVariables(props, extraAbbreviationToCssProperty)).toStrictEqual(expected);
    });

    it('should transform columns and rows values correctly', () => {
        const props = { columns: 3, rows: 'repeat(4, 1fr)' };
        const expected = {
            '--grid-template-columns': 'repeat(3, 1fr)',
            '--grid-template-rows': 'repeat(4, 1fr)',
        };
        expect(propsToCssVariables(props)).toStrictEqual(expected);
    });

    it('should handle breakpoint-specific values', () => {
        const props = {
            m: { sm: 10, md: 20, lg: 30 },
            p: { sm: 5, lg: 15 },
        };
        const expected = {
            '--sm-margin': 10,
            '--md-margin': 20,
            '--lg-margin': 30,
            '--sm-padding': 5,
            '--lg-padding': 15,
        };
        expect(propsToCssVariables(props)).toStrictEqual(expected);
    });

    it('should handle mixed types correctly', () => {
        const props = {
            m: 10,
            columns: { sm: 2, md: 'repeat(4, 1fr)' },
        };
        const expected = {
            '--margin': 10,
            '--sm-grid-template-columns': 'repeat(2, 1fr)',
            '--md-grid-template-columns': 'repeat(4, 1fr)',
        };
        expect(propsToCssVariables(props)).toStrictEqual(expected);
    });

    it('should prioritize extra abbreviations over default', () => {
        const props = { m: 10, x: 5 };
        const extraAbbreviationToCssProperty = { m: 'margin-custom', x: 'padding-custom' };
        const expected = {
            '--margin-custom': 10,
            '--padding-custom': 5,
        };
        expect(propsToCssVariables(props, extraAbbreviationToCssProperty)).toStrictEqual(expected);
    });

    it('should not rename keys that are not in the abbreviation map but still transform in kebab case', () => {
        const props = { fooBar: 'fooBar' };
        const expected = {
            '--foo-bar': 'fooBar',
        };
        expect(propsToCssVariables(props)).toStrictEqual(expected);
    });
});
