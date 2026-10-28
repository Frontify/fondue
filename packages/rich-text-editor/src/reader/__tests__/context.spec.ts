/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';

import { readerContext } from '../helpers/context';

describe('translator', () => {
    const { translate } = readerContext(
        { translationStrings: { RichTextEditor_readerIslandFeature: 'Feature ${feature}' } },
        {},
    );

    it('fills each ${var} from the values and leaves one with no value as it is', () => {
        expect(translate('RichTextEditor_readerIslandFeature', { feature: 'callout' })).toBe('Feature callout');
        expect(translate('RichTextEditor_readerIslandFeature', { other: 1 })).toBe('Feature ${feature}');
        expect(translate('RichTextEditor_readerIslandFeature')).toBe('Feature ${feature}');
    });

    it('falls back to enUS for a key the locale lacks, then to the key', () => {
        expect(translate('RichTextEditor_readerIslandGeneric')).toBe(
            enUS.translationStrings.RichTextEditor_readerIslandGeneric,
        );
        expect(translate('RichTextEditor_unwritten')).toBe('RichTextEditor_unwritten');
    });
});

describe('readerContext', () => {
    it('offers resolveAssetUrl only when the host gave one, and checks hrefs', () => {
        const without = readerContext(enUS, {});
        const withAssets = readerContext(enUS, { resolveAssetUrl: (id) => `https://assets.test/${id}` });

        expect(without.resolveAssetUrl).toBeUndefined();
        expect(withAssets.resolveAssetUrl?.('a-1', { width: 10 })).toBe('https://assets.test/a-1');
        expect(without.checkHref('javascript:alert(1)')).toEqual({ ok: false, code: 'unsafe-scheme' });
        expect(without.checkHref('https://frontify.com')).toEqual({ ok: true, href: 'https://frontify.com' });
        expect(without.translate('RichTextEditor_readerBlockedInvalid')).toBe('This content cannot be shown');
    });
});
