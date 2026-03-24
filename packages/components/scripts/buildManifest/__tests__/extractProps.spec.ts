// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

const mockParse = vi.hoisted(() => vi.fn().mockReturnValue([]));

vi.mock('glob');
vi.mock('react-docgen-typescript', () => ({
    withCompilerOptions: vi.fn().mockReturnValue({ parse: mockParse }),
}));
vi.mock('../utils', () => ({
    resolveFromRoot: (...segments: string[]) => ['<root>', ...segments].filter(Boolean).join('/'),
}));
vi.mock('typescript', async () => {
    const actual = await vi.importActual('typescript');
    return {
        ...actual,
        default: {
            ...actual,
            sys: actual.sys,
            getParsedCommandLineOfConfigFile: vi.fn().mockReturnValue({ options: {} }),
            flattenDiagnosticMessageText: actual.flattenDiagnosticMessageText,
        },
    };
});
vi.mock('../utils/astDisplayNames', () => ({
    scanDisplayNames: vi.fn().mockReturnValue({ displayNameMap: new Map(), sourceFile: {} }),
    getForwardRefInnerName: vi.fn().mockReturnValue(null),
}));
vi.mock('../utils/collectTypeDefinitions', () => ({
    collectTypeDefinitions: vi.fn().mockReturnValue({}),
}));

import { globSync } from 'glob';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { extractProps } from '../extractProps';
import { collectTypeDefinitions } from '../utils/collectTypeDefinitions';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type MockDoc = {
    displayName: string;
    props: Record<
        string,
        {
            name: string;
            type: { name: string; value?: Array<{ value: string }> };
            required: boolean;
            defaultValue: { value: string } | null;
            description: string;
            tags?: Record<string, string>;
            declarations?: Array<{ fileName: string }>;
        }
    >;
};

function makeDoc(displayName: string, props: Record<string, Partial<MockDoc['props'][string]>> = {}): MockDoc {
    const fullProps: MockDoc['props'] = {};
    for (const [key, partial] of Object.entries(props)) {
        fullProps[key] = {
            name: key,
            type: partial.type ?? { name: 'string' },
            required: partial.required ?? false,
            defaultValue: partial.defaultValue ?? null,
            description: partial.description ?? '',
            tags: partial.tags,
            declarations: partial.declarations ?? [{ fileName: 'test.tsx' }],
        };
    }
    return { displayName, props: fullProps };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('extractProps', () => {
    beforeEach(() => {
        mockParse.mockClear().mockReturnValue([]);
        vi.mocked(globSync).mockReset().mockReturnValue([]);
        vi.mocked(collectTypeDefinitions).mockReset().mockReturnValue({});
    });

    it('returns empty when no source files found', () => {
        vi.mocked(globSync).mockReturnValue([]);
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const result = extractProps('Button', 'src/components/Button');

        expect(result).toEqual({ mainProps: [], subComponents: [], typeDefinitions: {} });
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('No .tsx files'));
        warnSpy.mockRestore();
    });

    it('filters out stories, specs, and test files', () => {
        vi.mocked(globSync).mockReturnValue([
            '<root>/src/components/Button/Button.tsx',
            '<root>/src/components/Button/Button.stories.tsx',
            '<root>/src/components/Button/Button.spec.tsx',
            '<root>/src/components/Button/Button.ct.tsx',
            '<root>/src/components/Button/__tests__/Button.test.tsx',
        ]);
        mockParse.mockReturnValue([]);

        extractProps('Button', 'src/components/Button');

        // parse is called once per non-excluded file
        expect(mockParse).toHaveBeenCalledTimes(1);
        expect(mockParse).toHaveBeenCalledWith('<root>/src/components/Button/Button.tsx');
    });

    it('extracts main component props when displayName matches', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Button', {
                onClick: { type: { name: '() => void' } },
                label: { type: { name: 'string' }, required: true },
            }),
        ]);

        const result = extractProps('Button', 'src/components/Button');

        expect(result.mainProps).toHaveLength(2);
        expect(result.mainProps.find((p) => p.name === 'onClick')).toBeDefined();
        expect(result.mainProps.find((p) => p.name === 'label')?.required).toBe(true);
    });

    it('categorizes dotted displayNames as sub-components', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Dialog/Dialog.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Dialog', { open: { type: { name: 'boolean' } } }),
            makeDoc('Dialog.Trigger', { asChild: { type: { name: 'boolean' } } }),
            makeDoc('Dialog.Content', { className: { type: { name: 'string' } } }),
        ]);

        const result = extractProps('Dialog', 'src/components/Dialog');

        expect(result.mainProps).toHaveLength(1);
        expect(result.subComponents).toHaveLength(2);
        expect(result.subComponents.map((sc) => sc.name)).toEqual(['Dialog.Trigger', 'Dialog.Content']);
    });

    it('resolves enum types into union strings', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Button', {
                variant: {
                    type: {
                        name: 'enum',
                        value: [{ value: '"primary"' }, { value: '"secondary"' }],
                    },
                },
            }),
        ]);

        const result = extractProps('Button', 'src/components/Button');
        expect(result.mainProps[0].type).toBe('"primary" | "secondary"');
    });

    it('extracts deprecated tag info', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Button', {
                oldProp: {
                    type: { name: 'string' },
                    tags: { deprecated: 'Use newProp instead' },
                },
            }),
        ]);

        const result = extractProps('Button', 'src/components/Button');
        expect(result.mainProps[0].deprecated).toBe(true);
        expect(result.mainProps[0].deprecationMessage).toBe('Use newProp instead');
    });

    it('extracts default values', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Button', {
                size: { type: { name: 'string' }, defaultValue: { value: 'medium' } },
            }),
        ]);

        const result = extractProps('Button', 'src/components/Button');
        expect(result.mainProps[0].defaultValue).toBe('medium');
    });

    it('passes all props to collectTypeDefinitions', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Dialog/Dialog.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Dialog', { open: { type: { name: 'boolean' } } }),
            makeDoc('Dialog.Content', { size: { type: { name: 'DialogSize' } } }),
        ]);

        extractProps('Dialog', 'src/components/Dialog');

        expect(collectTypeDefinitions).toHaveBeenCalledOnce();
        const passedProps = vi.mocked(collectTypeDefinitions).mock.calls[0][0];
        expect(passedProps).toHaveLength(2);
    });

    it('handles parse errors gracefully', () => {
        vi.mocked(globSync).mockReturnValue([
            '<root>/src/components/Button/Button.tsx',
            '<root>/src/components/Button/Helper.tsx',
        ]);
        mockParse.mockImplementationOnce(() => {
            throw new Error('Parse failed');
        });
        mockParse.mockReturnValueOnce([makeDoc('Button', { size: { type: { name: 'string' } } })]);

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const result = extractProps('Button', 'src/components/Button');

        expect(result.mainProps).toHaveLength(1);
        expect(warnSpy).toHaveBeenCalled();
        warnSpy.mockRestore();
    });

    it('does not use fallback when main component matches', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.tsx']);
        mockParse.mockReturnValue([
            makeDoc('Helper', { a: { type: { name: 'string' } } }),
            makeDoc('Button', { b: { type: { name: 'string' } } }),
        ]);

        const result = extractProps('Button', 'src/components/Button');
        expect(result.mainProps).toHaveLength(1);
        expect(result.mainProps[0].name).toBe('b');
    });

    it('returns typeDefinitions from collectTypeDefinitions', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.tsx']);
        mockParse.mockReturnValue([makeDoc('Button', { variant: { type: { name: 'ButtonVariant' } } })]);
        vi.mocked(collectTypeDefinitions).mockReturnValue({ ButtonVariant: '"primary" | "secondary"' });

        const result = extractProps('Button', 'src/components/Button');
        expect(result.typeDefinitions).toEqual({ ButtonVariant: '"primary" | "secondary"' });
    });
});
