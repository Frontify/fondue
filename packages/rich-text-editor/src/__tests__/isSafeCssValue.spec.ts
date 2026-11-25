/* (c) Copyright Frontify Ltd., all rights reserved. */

// A host filters values on a server before building a look, so this runs without a browser.
// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { isSafeCssValue } from '../index';

const ACCEPTED_VALUES = [
    '16px',
    '#1a1a1a',
    'var(--f-theme-settings-heading1-font-size)',
    '"Helvetica Neue", sans-serif',
    'rgb(0 0 0 / 50%)',
    'calc(1em + 2px)',
];

const REJECTED_VALUES = [
    'red; background: blue',
    'red}',
    '{',
    '\\65 xpression',
    '</style>',
    'url(https://example.com/a.png)',
    'URL(x)',
    'expression(alert(1))',
    'Expression(x)',
];

describe('isSafeCssValue', () => {
    it.each(ACCEPTED_VALUES)('returns true for %s', (value) => {
        expect(isSafeCssValue(value)).toBe(true);
    });

    it.each(REJECTED_VALUES)('returns false for %s', (value) => {
        expect(isSafeCssValue(value)).toBe(false);
    });
});
