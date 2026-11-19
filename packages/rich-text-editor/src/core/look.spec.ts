/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { LOOK_PROPERTIES, lookProperties } from './look';

describe('lookProperties', () => {
    it('names one custom property per field the host set', () => {
        expect(
            lookProperties('sampleStyle', { fontSize: 'var(--f-size)', textDecoration: 'underline' }, LOOK_PROPERTIES),
        ).toEqual({
            '--rte-sample-style-font-size': 'var(--f-size)',
            '--rte-sample-style-text-decoration': 'underline',
        });
    });

    it('leaves a name without capitals as it is', () => {
        expect(lookProperties('plain', { marginBottom: '8px' }, LOOK_PROPERTIES)).toEqual({
            '--rte-plain-margin-bottom': '8px',
        });
    });

    it('writes nothing for a field that is not set', () => {
        expect(lookProperties('plain', {}, LOOK_PROPERTIES)).toEqual({});
        expect(lookProperties('plain', { color: undefined }, LOOK_PROPERTIES)).toEqual({});
    });

    it('names the properties of the fields it is given', () => {
        expect(lookProperties('box', { borderWidth: '1px' }, { borderWidth: 'border-width' })).toEqual({
            '--rte-box-border-width': '1px',
        });
    });

    for (const value of ['red; display: none', 'url(https://example.com/a.png)', '}', '', '   ']) {
        it(`throws, naming the style and the field, for ${JSON.stringify(value)}`, () => {
            expect(() => lookProperties('plain', { letterSpacing: value }, LOOK_PROPERTIES)).toThrow(
                /"letterSpacing".*"plain"/,
            );
        });
    }
});
