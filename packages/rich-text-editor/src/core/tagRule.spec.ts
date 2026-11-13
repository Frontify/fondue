/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { readTagRule } from './tagRule';

describe('readTagRule', () => {
    const span = (): HTMLElement => document.createElement('span');

    it('reads no value off a rule without one', () => {
        expect(readTagRule({ tag: 'span' }, span())).toEqual({ kind: 'read', value: {} });
    });

    it('reads the value the rule returns', () => {
        expect(readTagRule({ tag: 'span', value: () => ({ size: 2 }) }, span())).toEqual({
            kind: 'read',
            value: { size: 2 },
        });
    });

    it('reads nothing when the value is null', () => {
        expect(readTagRule({ tag: 'span', value: () => null }, span())).toEqual({ kind: 'unread' });
    });

    it('hands the rule the element', () => {
        const element = span();
        element.setAttribute('data-size', '3');

        expect(readTagRule({ tag: 'span', value: (read) => Number(read.dataset.size) }, element)).toEqual({
            kind: 'read',
            value: 3,
        });
    });

    it('reads an ignore rule as ignored, with no value', () => {
        expect(readTagRule({ tag: 'span', ignore: true }, span())).toEqual({ kind: 'ignored' });
    });
});
