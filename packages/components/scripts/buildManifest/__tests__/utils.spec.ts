// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'node:path';

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { resolveFromRoot, PACKAGE_ROOT, log, logWarn, logError, logSuccess } from '../utils';

// ---------------------------------------------------------------------------
// resolveFromRoot
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// log helpers
// ---------------------------------------------------------------------------

describe('log helpers', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('log calls console.log', () => {
        log('hello');
        expect(console.log).toHaveBeenCalledOnce();
    });

    it('logWarn calls console.warn', () => {
        logWarn('watch out');
        expect(console.warn).toHaveBeenCalledOnce();
    });

    it('logError calls console.error', () => {
        logError('oh no');
        expect(console.error).toHaveBeenCalledOnce();
    });

    it('logSuccess calls console.log', () => {
        logSuccess('great');
        expect(console.log).toHaveBeenCalledOnce();
    });

    it('log output includes the message', () => {
        log('test message');
        const output = vi.mocked(console.log).mock.calls[0].join(' ');
        expect(output).toContain('test message');
    });

    it('logWarn output includes the message', () => {
        logWarn('watch out');
        const output = vi.mocked(console.warn).mock.calls[0].join(' ');
        expect(output).toContain('watch out');
    });
});
