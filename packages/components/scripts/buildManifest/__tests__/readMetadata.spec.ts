/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

vi.mock('node:fs');
import { existsSync, readFileSync } from 'node:fs';

import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('../utils', () => ({
    resolveFromRoot: (...segments: string[]) => ['<root>', ...segments].join('/'),
}));

import { readMetadata } from '../readMetadata';

describe('readMetadata', () => {
    beforeEach(() => {
        vi.mocked(existsSync).mockReset();
        vi.mocked(readFileSync).mockReset();
    });

    it('returns null when the metadata file does not exist', () => {
        vi.mocked(existsSync).mockReturnValue(false);

        const result = readMetadata('src/components/Button', 'Button');
        expect(result).toBeNull();
    });

    it('returns all fields from the metadata JSON', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue(
            JSON.stringify({
                description: 'A button',
                category: 'Components',
                tags: ['interactive', 'form'],
                relatedComponents: ['Link'],
                instructions: 'Use onPress, not onClick.',
            }),
        );

        const result = readMetadata('src/components/Button', 'Button');
        expect(result).toEqual({
            description: 'A button',
            category: 'Components',
            tags: ['interactive', 'form'],
            relatedComponents: ['Link'],
            instructions: 'Use onPress, not onClick.',
        });
    });

    it('falls back to empty defaults when all fields are missing', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({}));

        const result = readMetadata('src/components/Button', 'Button');
        expect(result).toEqual({
            description: '',
            category: '',
            tags: [],
            relatedComponents: [],
            instructions: '',
        });
    });

    it('falls back to empty string when description is missing', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ category: 'Components' }));

        const result = readMetadata('src/components/Button', 'Button');
        expect(result?.description).toBe('');
    });

    it('falls back to empty array when tags is not an array', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ tags: 'interactive' }));

        const result = readMetadata('src/components/Button', 'Button');
        expect(result?.tags).toEqual([]);
    });

    it('falls back to empty array when relatedComponents is not an array', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ relatedComponents: 'Link' }));

        const result = readMetadata('src/components/Button', 'Button');
        expect(result?.relatedComponents).toEqual([]);
    });

    it('returns null and warns on malformed JSON', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue('NOT VALID JSON');

        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const result = readMetadata('src/components/Button', 'Button');
        expect(result).toBeNull();
        expect(warnSpy).toHaveBeenCalledOnce();
        warnSpy.mockRestore();
    });

    it('reads the file from the resolved path using componentName', () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(readFileSync).mockReturnValue(JSON.stringify({}));

        readMetadata('src/components/Button', 'Button');

        const [path] = vi.mocked(existsSync).mock.calls[0];
        expect(String(path)).toContain('Button.metadata.json');
    });
});
