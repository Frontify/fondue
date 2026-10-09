/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, memo } from 'react';
import { describe, expect, it } from 'vitest';

import { fixtureLink } from '#/features/__fixtures__/features';
import { core } from '#/features/core/feature';
import { DefinitionError, type Feature } from '#/model';
import { featureInternals } from '#/model/feature';

import { declaredOverrides, defineReaderFeature } from './define';

const renderer = () => null;
const readerOverrides = (feature: Feature) => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        return undefined;
    }
    return declaredOverrides(internals.declaration);
};

describe('defineReaderFeature', () => {
    it('SPEC-rich-text/AC-023 runs in the node environment', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
    });

    it('SPEC-rich-text/AC-023 rejects an override for a node or mark the feature does not declare', () => {
        let failure: unknown;
        try {
            defineReaderFeature(fixtureLink(), { link: renderer, mention: renderer });
        } catch (error) {
            failure = error;
        }
        expect(failure).toBeInstanceOf(DefinitionError);
        expect(failure).toMatchObject({
            code: 'definition.missing-reader',
            details: { feature: 'fixture.link', name: 'mention' },
        });
    });

    it.each([
        ['memo', memo(() => null)],
        ['forwardRef', forwardRef(() => null)],
        ['a string', 'div'],
    ])(
        'SPEC-rich-text-output/AC-047 rejects %s as an override, since the reader calls overrides as functions',
        (_, value) => {
            let failure: unknown;
            try {
                defineReaderFeature(fixtureLink(), { link: value as never });
            } catch (error) {
                failure = error;
            }
            expect(failure).toBeInstanceOf(DefinitionError);
            expect(failure).toMatchObject({
                code: 'definition.invalid-declaration',
                details: { feature: 'fixture.link', path: '/marks/link' },
            });
        },
    );

    it('SPEC-rich-text/AC-023 attaches overrides for declared nodes and marks and keeps the feature', () => {
        const link = defineReaderFeature(fixtureLink(), { link: renderer });
        const doc = defineReaderFeature(core(), { paragraph: renderer });

        expect(link.id).toBe('fixture.link');
        expect(readerOverrides(link)).toEqual({ link: renderer });
        expect(readerOverrides(doc)).toEqual({ paragraph: renderer });
        expect(readerOverrides(fixtureLink())).toBeUndefined();
    });
});
