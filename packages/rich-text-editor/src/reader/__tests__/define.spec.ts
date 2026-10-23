/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { forwardRef, memo } from 'react';
import { describe, expect, it } from 'vitest';

import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { DefinitionError, type Feature } from '#/model';
import { featureInternals } from '#/model/feature';

import { declaredOverrides, defineReaderFeature } from '../define';

const renderer = () => null;
const readerOverrides = (feature: Feature) => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        return undefined;
    }
    return declaredOverrides(internals.declaration);
};

describe('defineReaderFeature', () => {
    it('runs in the node environment', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
    });

    it('rejects an override for a node or mark the feature does not declare', () => {
        let failure: unknown;
        try {
            defineReaderFeature(links(), { link: renderer, mention: renderer });
        } catch (error) {
            failure = error;
        }
        expect(failure).toBeInstanceOf(DefinitionError);
        expect(failure).toMatchObject({
            code: 'definition.missing-reader',
            details: { feature: 'links', name: 'mention' },
        });
    });

    it.each([
        ['memo', memo(() => null)],
        ['forwardRef', forwardRef(() => null)],
        ['a string', 'div'],
    ])('rejects %s as an override, since the reader calls overrides as functions', (_, value) => {
        let failure: unknown;
        try {
            defineReaderFeature(links(), { link: value as never });
        } catch (error) {
            failure = error;
        }
        expect(failure).toBeInstanceOf(DefinitionError);
        expect(failure).toMatchObject({
            code: 'definition.invalid-declaration',
            details: { feature: 'links', path: '/marks/link' },
        });
    });

    it('attaches overrides for declared nodes and marks and keeps the feature', () => {
        const link = defineReaderFeature(links(), { link: renderer });
        const doc = defineReaderFeature(core(), { paragraph: renderer });

        expect(link.id).toBe('links');
        expect(readerOverrides(link)).toEqual({ link: renderer });
        expect(readerOverrides(doc)).toEqual({ paragraph: renderer });
        expect(readerOverrides(links())).toBeUndefined();
    });
});
