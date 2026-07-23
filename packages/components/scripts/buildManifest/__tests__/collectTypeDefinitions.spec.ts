/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

vi.mock('../utils', () => {
    // oxlint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-imports
    const os = require('node:os') as typeof import('node:os');
    // oxlint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-imports
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

export const breakpoints = {
    sm: '600px',
    md: '768px',
    lg: '1024px',
};

export type Breakpoint = keyof typeof breakpoints;

export type Responsive<TValue> = { [key in Breakpoint]?: TValue } | TValue;
`,
        'utf-8',
    );
});

describe('collectTypeDefinitions', () => {
    it('returns empty object when no PascalCase types in props', () => {
        const result = collectTypeDefinitions([makeProp('string'), makeProp('boolean'), makeProp('number')]);
        expect(result).toEqual({});
    });

    it('resolves type aliases', () => {
        const result = collectTypeDefinitions([makeProp('ButtonVariant')]);
        expect(result).toHaveProperty('ButtonVariant');
        expect(result.ButtonVariant).toContain('primary');
        expect(result.ButtonVariant).toContain('secondary');
    });

    it('resolves interface declarations', () => {
        const result = collectTypeDefinitions([makeProp('ButtonStyle')]);
        expect(result).toHaveProperty('ButtonStyle');
        expect(result.ButtonStyle).toContain('color');
        expect(result.ButtonStyle).toContain('fontSize');
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

    it('resolves `keyof typeof` value queries to their literal keys', () => {
        const result = collectTypeDefinitions([makeProp('Breakpoint')]);
        expect(result).toHaveProperty('Breakpoint');
        // The printer would emit `keyof typeof breakpoints` verbatim; the checker resolves the literals.
        expect(result.Breakpoint).not.toContain('typeof');
        expect(result.Breakpoint).toBe('"sm" | "md" | "lg"');
    });

    it('expands mapped types and declares generic type parameters in the key', () => {
        const result = collectTypeDefinitions([makeProp('Responsive<string>')]);
        // Generic parameters are surfaced in the key so `TValue` is not a dangling reference.
        expect(result).toHaveProperty('Responsive<TValue>');
        const definition = result['Responsive<TValue>'];
        // The printer would emit `[key in Breakpoint]?: TValue` verbatim; the checker expands it.
        expect(definition).not.toContain('key in');
        expect(definition).toContain('sm?');
        expect(definition).toContain('md?');
        expect(definition).toContain('lg?');
        // The type parameter is not itself chased as a resolvable type.
        expect(result).not.toHaveProperty('TValue');
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
