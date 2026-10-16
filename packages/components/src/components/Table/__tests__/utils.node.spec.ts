/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { shouldIgnoreRowClick } from '../utils';

describe('Table utils without a DOM', () => {
    it('loads in Node and ignores no row click without an event', () => {
        expect(shouldIgnoreRowClick()).toBe(false);
    });
});
