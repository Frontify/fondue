// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('node:fs');
vi.mock('glob');
vi.mock('../utils', () => ({
    resolveFromRoot: (...segments: string[]) => ['<root>', ...segments].filter(Boolean).join('/'),
}));

import { readFileSync } from 'node:fs';

import { globSync } from 'glob';

import { discoverComponents } from '../discoverComponents';

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('discoverComponents', () => {
    beforeEach(() => {
        vi.mocked(readFileSync).mockReset();
        vi.mocked(globSync).mockReset();
    });

    it('returns an empty array when no metadata files are found', () => {
        vi.mocked(globSync).mockReturnValue([]);
        expect(discoverComponents()).toEqual([]);
    });

    it('skips metadata files that have no filePath', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ name: 'Button' }));

        expect(discoverComponents()).toEqual([]);
    });

    it('parses a valid metadata file into a DiscoveredComponent', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(
            JSON.stringify({
                name: 'Button',
                filePath: 'src/components/Button/Button.tsx',
                storyFilePaths: ['src/components/Button/Button.stories.tsx'],
            }),
        );

        const components = discoverComponents();
        expect(components).toHaveLength(1);
        expect(components[0].name).toBe('Button');
        expect(components[0].filePath).toBe('src/components/Button/Button.tsx');
        expect(components[0].dirPath).toBe('src/components/Button');
        expect(components[0].storyFilePaths).toHaveLength(1);
    });

    it('derives name from the filename when name is absent in JSON', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Badge/Badge.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ filePath: 'src/components/Badge/Badge.tsx' }));

        const components = discoverComponents();
        expect(components[0].name).toBe('Badge');
    });

    it('resolves storyFilePaths relative to package root', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(
            JSON.stringify({
                filePath: 'src/components/Button/Button.tsx',
                storyFilePaths: ['src/components/Button/Button.stories.tsx'],
            }),
        );

        const components = discoverComponents();
        expect(components[0].storyFilePaths[0]).toContain('src/components/Button/Button.stories.tsx');
    });

    it('uses empty storyFilePaths when the field is absent', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ filePath: 'src/components/Button/Button.tsx' }));

        const components = discoverComponents();
        expect(components[0].storyFilePaths).toEqual([]);
    });

    it('returns components sorted alphabetically by name', () => {
        vi.mocked(globSync).mockReturnValue([
            '<root>/src/components/Tooltip/Tooltip.metadata.json',
            '<root>/src/components/Accordion/Accordion.metadata.json',
            '<root>/src/components/Badge/Badge.metadata.json',
        ]);
        vi.mocked(readFileSync)
            .mockReturnValueOnce(JSON.stringify({ name: 'Tooltip', filePath: 'src/components/Tooltip/Tooltip.tsx' }))
            .mockReturnValueOnce(
                JSON.stringify({ name: 'Accordion', filePath: 'src/components/Accordion/Accordion.tsx' }),
            )
            .mockReturnValueOnce(JSON.stringify({ name: 'Badge', filePath: 'src/components/Badge/Badge.tsx' }));

        const names = discoverComponents().map((c) => c.name);
        expect(names).toEqual(['Accordion', 'Badge', 'Tooltip']);
    });

    it('derives dirPath as the directory portion of filePath', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Select/Select.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ filePath: 'src/components/Select/SelectSingle.tsx' }));

        const components = discoverComponents();
        expect(components[0].dirPath).toBe('src/components/Select');
    });
});
