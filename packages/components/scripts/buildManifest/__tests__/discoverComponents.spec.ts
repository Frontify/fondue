/* (c) Copyright Frontify Ltd., all rights reserved. */

vi.mock('node:fs');
vi.mock('glob');

vi.mock('../utils', () => ({
    resolveFromRoot: (...segments: string[]) => ['<root>', ...segments].filter(Boolean).join('/'),
}));

import { readFileSync } from 'node:fs';

import { globSync } from 'glob';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { discoverComponents } from '../discoverComponents';

describe('discoverComponents', () => {
    beforeEach(() => {
        vi.mocked(readFileSync).mockReset();
        vi.mocked(globSync).mockReset();
    });

    it('returns an empty array when no metadata files are found', () => {
        vi.mocked(globSync).mockReturnValue([]);
        expect(discoverComponents()).toEqual([]);
    });

    it('throws when name is missing from metadata', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ storyFilePaths: [] }));

        expect(() => discoverComponents()).toThrow('Component name is required');
    });

    it('throws when storyFilePaths is missing from metadata', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ name: 'Button' }));

        expect(() => discoverComponents()).toThrow('Component storyFilePaths is required');
    });

    it('parses a valid metadata file into a DiscoveredComponent', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(
            JSON.stringify({
                name: 'Button',
                storyFilePaths: ['src/components/Button/Button.stories.tsx'],
            }),
        );

        const components = discoverComponents();
        expect(components).toHaveLength(1);
        expect(components[0].name).toBe('Button');
        expect(components[0].dirPath).toBe('<root>/src/components/Button');
        expect(components[0].storyFilePaths).toHaveLength(1);
    });

    it('resolves storyFilePaths relative to package root', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Button/Button.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(
            JSON.stringify({
                name: 'Button',
                storyFilePaths: ['src/components/Button/Button.stories.tsx'],
            }),
        );

        const components = discoverComponents();
        expect(components[0].storyFilePaths[0]).toContain('src/components/Button/Button.stories.tsx');
    });

    it('returns components sorted alphabetically by name', () => {
        vi.mocked(globSync).mockReturnValue([
            '<root>/src/components/Tooltip/Tooltip.metadata.json',
            '<root>/src/components/Accordion/Accordion.metadata.json',
            '<root>/src/components/Badge/Badge.metadata.json',
        ]);
        vi.mocked(readFileSync)
            .mockReturnValueOnce(
                JSON.stringify({ name: 'Tooltip', storyFilePaths: ['src/components/Tooltip/Tooltip.stories.tsx'] }),
            )
            .mockReturnValueOnce(
                JSON.stringify({
                    name: 'Accordion',
                    storyFilePaths: ['src/components/Accordion/Accordion.stories.tsx'],
                }),
            )
            .mockReturnValueOnce(
                JSON.stringify({ name: 'Badge', storyFilePaths: ['src/components/Badge/Badge.stories.tsx'] }),
            );

        const names = discoverComponents().map((c) => c.name);
        expect(names).toEqual(['Accordion', 'Badge', 'Tooltip']);
    });

    it('skips and warns on malformed JSON', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Bad/Bad.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue('NOT VALID JSON');

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const components = discoverComponents();
        expect(components).toEqual([]);
        expect(warnSpy).toHaveBeenCalledOnce();
        warnSpy.mockRestore();
    });

    it('derives dirPath from the metadata file directory', () => {
        vi.mocked(globSync).mockReturnValue(['<root>/src/components/Select/Select.metadata.json']);
        vi.mocked(readFileSync).mockReturnValue(
            JSON.stringify({ name: 'Select', storyFilePaths: ['src/components/Select/Select.stories.tsx'] }),
        );

        const components = discoverComponents();
        expect(components[0].dirPath).toBe('<root>/src/components/Select');
    });
});
