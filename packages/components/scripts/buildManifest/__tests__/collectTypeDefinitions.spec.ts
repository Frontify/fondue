// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

vi.mock('../utils', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const os = require('node:os') as typeof import('node:os');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('node:path') as typeof import('node:path');
    const root = path.join(os.tmpdir(), 'manifest-test-collectTypes');
    return {
        resolveFromRoot: (...segments: string[]) => path.join(root, ...segments),
    };
});

import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { type PropInfo } from '../types';
import { collectTypeDefinitions } from '../utils/collectTypeDefinitions';

const TMP_ROOT = join(tmpdir(), 'manifest-test-collectTypes');
const SRC_DIR = join(TMP_ROOT, 'src');

function makeProp(type: string): PropInfo {
    return {
        name: 'test',
        type,
        required: false,
        defaultValue: null,
        description: '',
        deprecated: false,
        deprecationMessage: '',
    };
}

beforeAll(() => {
    mkdirSync(SRC_DIR, { recursive: true });
    writeFileSync(
        join(SRC_DIR, 'types.ts'),
        `
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonStyle {
    color: string;
    fontSize: number;
}

export type NestedType = {
    variant: ButtonVariant;
};
`,
        'utf-8',
    );
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('collectTypeDefinitions', () => {
    it('returns empty object when no PascalCase types in props', () => {
        const result = collectTypeDefinitions([makeProp('string'), makeProp('boolean'), makeProp('number')]);
        expect(result).toEqual({});
    });

    it('resolves type aliases', () => {
        const result = collectTypeDefinitions([makeProp('ButtonVariant')]);
        expect(result).toHaveProperty('ButtonVariant');
        expect(result['ButtonVariant']).toContain('primary');
        expect(result['ButtonVariant']).toContain('secondary');
    });

    it('resolves interface declarations', () => {
        const result = collectTypeDefinitions([makeProp('ButtonStyle')]);
        expect(result).toHaveProperty('ButtonStyle');
        expect(result['ButtonStyle']).toContain('color');
        expect(result['ButtonStyle']).toContain('fontSize');
    });

    it('resolves multiple types in one call', () => {
        const result = collectTypeDefinitions([makeProp('ButtonVariant'), makeProp('ButtonSize')]);
        expect(result).toHaveProperty('ButtonVariant');
        expect(result).toHaveProperty('ButtonSize');
    });

    it('recursively resolves referenced types', () => {
        const result = collectTypeDefinitions([makeProp('NestedType')]);
        expect(result).toHaveProperty('NestedType');
        // NestedType references ButtonVariant, which should be resolved transitively
        expect(result).toHaveProperty('ButtonVariant');
    });

    it('does not include types that are not found in source', () => {
        const result = collectTypeDefinitions([makeProp('NonExistentType')]);
        expect(result).not.toHaveProperty('NonExistentType');
    });

    it('deduplicates type names from props', () => {
        const result = collectTypeDefinitions([makeProp('ButtonVariant'), makeProp('ButtonVariant')]);
        expect(result).toHaveProperty('ButtonVariant');
    });
});
