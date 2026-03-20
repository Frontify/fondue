// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { resolveFromRoot, PACKAGE_ROOT } from '../utils';

describe('resolveFromRoot', () => {
    it('returns PACKAGE_ROOT when called with no arguments', () => {
        expect(resolveFromRoot()).toBe(PACKAGE_ROOT);
    });

    it('joins a single segment with PACKAGE_ROOT', () => {
        expect(resolveFromRoot('src')).toBe(join(PACKAGE_ROOT, 'src'));
    });

    it('joins multiple segments with PACKAGE_ROOT', () => {
        expect(resolveFromRoot('src', 'components', 'Button')).toBe(join(PACKAGE_ROOT, 'src', 'components', 'Button'));
    });

    it('resolves to an absolute path', () => {
        expect(resolveFromRoot('src')).toMatch(/^\//);
    });

    it('PACKAGE_ROOT points to the package directory (contains package.json)', async () => {
        const { existsSync } = await import('node:fs');
        expect(existsSync(join(PACKAGE_ROOT, 'package.json'))).toBe(true);
    });
});
