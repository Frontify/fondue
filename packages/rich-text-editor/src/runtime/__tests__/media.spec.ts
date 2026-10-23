/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { pickedAsset } from '../media';

const answer = (fields: Record<string, unknown>) => ({
    assetId: 'asset-1',
    mediaType: 'image/png',
    labelSnapshot: 'logo.png',
    ...fields,
});

describe('a host answer as an asset', () => {
    it.each([
        ['a URL after a space', ' https://key:secret@s3.amazonaws.com/bucket/key'],
        ['a URL after a control', '\u0001https://s3.amazonaws.com/bucket/key'],
        ['a scheme broken by a tab', 'ht\ttps://s3.amazonaws.com/b/o'],
        ['an authority written with backslashes', '\\\\s3.amazonaws.com\\bucket\\key'],
        ['a security token query key', 'b/o?X-Amz-Security-Token=IQoJSecret'],
        ['a credential query key', 'b/o?X-Amz-Credential=AKIAIOSFODNN7EXAMPLE'],
        ['an API key query key', 'b/o?api_key=secret'],
        ['a hyphenated API key query key', 'b/o?x-api-key=secret'],
        ['a percent-encoded token query key', 'library/1?to%6Ben=secret'],
        ['a percent-encoded signature query key', 'library/1?X-Amz-Sig%6Eature=deadbeef'],
    ])('refuses %s as an asset ID', (_name, assetId) => {
        expect(pickedAsset(answer({ assetId }), { maxLength: 4096 })).toBeUndefined();
    });

    it('refuses an asset ID or a media type longer than the attribute limit', () => {
        expect(pickedAsset(answer({ assetId: 'a'.repeat(4097) }), { maxLength: 4096 })).toBeUndefined();
        expect(pickedAsset(answer({ mediaType: `image/${'a'.repeat(4096)}` }), { maxLength: 4096 })).toBeUndefined();
    });

    it('cuts a label of millions of characters to the attribute limit, keeping whole characters', () => {
        expect(pickedAsset(answer({ labelSnapshot: 'A'.repeat(50_000_000) }), { maxLength: 4096 })?.labelSnapshot).toBe(
            'A'.repeat(4096),
        );
        expect(
            pickedAsset(answer({ labelSnapshot: '😀'.repeat(10), mediaType: 'a/b', assetId: 'a' }), { maxLength: 3 })
                ?.labelSnapshot,
        ).toBe('😀😀😀');
        expect(
            pickedAsset(answer({ labelSnapshot: 'a😀b', mediaType: 'a/b', assetId: 'a' }), { maxLength: 3 })
                ?.labelSnapshot,
        ).toBe('a😀b');
    });

    it('keeps an asset ID that names no location', () => {
        expect(pickedAsset(answer({ assetId: 'library/42/asset 7' }), { maxLength: 4096 })).toEqual(
            answer({ assetId: 'library/42/asset 7' }),
        );
    });
});
