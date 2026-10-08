/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { checkStoryStatus } from './story-status';

const story = (id: string, tags?: readonly string[]) =>
    [id, tags === undefined ? { id, type: 'story' } : { id, type: 'story', tags }] as const;

describe('checkStoryStatus', () => {
    it('SPEC-rich-text/AC-094 accepts a package whose every story is in progress before 1.0', () => {
        const entries = Object.fromEntries([story('a--one', ['dev', 'inProgress']), story('a--two', ['inProgress'])]);

        expect(checkStoryStatus(entries, '0.0.0')).toEqual([]);
    });

    it('SPEC-rich-text/AC-094 fails a story with no status tag before 1.0', () => {
        const entries = Object.fromEntries([story('a--one', ['inProgress']), story('a--bare', ['dev', 'autodocs'])]);

        expect(checkStoryStatus(entries, '0.9.0')).toEqual([
            'a--bare is not tagged inProgress, which every story is until the 1.0 release',
        ]);
    });

    it('SPEC-rich-text/AC-094 fails a story with no tags at all, and a released story before 1.0', () => {
        const entries = Object.fromEntries([story('a--none'), story('a--released', ['released'])]);

        expect(checkStoryStatus(entries, '0.0.0')).toHaveLength(2);
    });

    it('SPEC-rich-text/AC-094 asks for some status tag from 1.0, not for inProgress', () => {
        const entries = Object.fromEntries([story('a--released', ['released']), story('a--bare', ['dev'])]);

        expect(checkStoryStatus(entries, '1.0.0')).toEqual(['a--bare has no status tag (inProgress, released)']);
    });

    it('SPEC-rich-text/AC-094 skips documentation entries and fails an index with no story', () => {
        const docs = { 'a--docs': { id: 'a--docs', type: 'docs', tags: ['dev'] } };

        expect(checkStoryStatus(docs, '0.0.0')).toEqual(['storybook-static/index.json lists no story']);
    });
});
