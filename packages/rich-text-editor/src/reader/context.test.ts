/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';

import { readerContext } from './context';

describe('translator', () => {
    const { t } = readerContext(
        { translationStrings: { RichTextEditor_readerIslandFeature: 'Feature ${feature}' } },
        {},
    );

    it('SPEC-rich-text-output/AC-002 fills each ${var} from the values and leaves one with no value as it is', () => {
        expect(t('RichTextEditor_readerIslandFeature', { feature: 'callout' })).toBe('Feature callout');
        expect(t('RichTextEditor_readerIslandFeature', { other: 1 })).toBe('Feature ${feature}');
        expect(t('RichTextEditor_readerIslandFeature')).toBe('Feature ${feature}');
    });

    it('SPEC-rich-text-output/AC-002 falls back to enUS for a key the locale lacks, then to the key', () => {
        expect(t('RichTextEditor_readerIslandGeneric')).toBe(
            enUS.translationStrings.RichTextEditor_readerIslandGeneric,
        );
        expect(t('RichTextEditor_unwritten')).toBe('RichTextEditor_unwritten');
    });
});

describe('readerContext', () => {
    it('SPEC-rich-text-output/AC-007 offers resolveAssetUrl only when the host gave one, and checks hrefs', () => {
        const without = readerContext(enUS, {});
        const withAssets = readerContext(enUS, { resolveAssetUrl: (id) => `https://assets.test/${id}` });

        expect(without.resolveAssetUrl).toBeUndefined();
        expect(withAssets.resolveAssetUrl?.('a-1', { width: 10 })).toBe('https://assets.test/a-1');
        expect(without.checkHref('javascript:alert(1)')).toEqual({ ok: false, code: 'unsafe-scheme' });
        expect(without.checkHref('https://frontify.com')).toEqual({ ok: true, href: 'https://frontify.com' });
        expect(without.t('RichTextEditor_readerBlockedInvalid')).toBe('This content cannot be shown');
    });
});
