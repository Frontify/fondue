/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { layoutModel } from '#/features/__tests__/fixtures/layout';
import { compiledModel } from '#/model/compile';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

describe('gap cursor', () => {
    it('installs the gap cursor of prosemirror-gapcursor in the structure phase, before the base keys', () => {
        const ids = compiledModel(layoutModel()).plugins.map(({ id }) => id);
        const gap = compiledModel(layoutModel()).plugins.find(({ id }) => id === 'gap-cursor');

        expect(gap?.phase).toBe('structure');
        expect(ids.indexOf('gap-cursor')).toBeLessThan(ids.indexOf('base-keys'));
    });
});
