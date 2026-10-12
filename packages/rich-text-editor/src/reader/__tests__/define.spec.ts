/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { fixtureLink } from '#/features/__tests__/fixtures/features';
import { core } from '#/features/core/feature';
import { DefinitionError } from '#/model';

import { defineReaderFeature, readerOverrides } from '../define';

const renderer = () => null;

describe('defineReaderFeature', () => {
    it('runs in the node environment', () => {
        expect(typeof window).toBe('undefined');
        expect(typeof document).toBe('undefined');
    });

    it('rejects an override for a node or mark the feature does not declare', () => {
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

    it('attaches overrides for declared nodes and marks and keeps the feature', () => {
        const link = defineReaderFeature(fixtureLink(), { link: renderer });
        const doc = defineReaderFeature(core(), { paragraph: renderer });

        expect(link.id).toBe('fixture.link');
        expect(readerOverrides(link)).toEqual({ link: renderer });
        expect(readerOverrides(doc)).toEqual({ paragraph: renderer });
        expect(readerOverrides(fixtureLink())).toBeUndefined();
    });
});
