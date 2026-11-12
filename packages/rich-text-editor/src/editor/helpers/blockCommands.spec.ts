/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { PARAGRAPH, type RteBlockCommand } from '#/core';

import { matchCommands, TEXT_COMMAND } from './blockCommands';

const command = (label: string, keywords: string[] = [], group: RteBlockCommand['group'] = 'turnInto') => ({
    id: label,
    label,
    keywords,
    group,
    run: () => {},
});

const commands = [
    TEXT_COMMAND,
    command('Heading 1', ['h1', 'title']),
    command('Heading 2', ['h2']),
    command('Bulleted list', ['ul']),
    command('Column break', [], 'insert'),
];

const labels = (query: string): string[] => matchCommands(commands, query).map(({ label }) => label);

describe('matching commands to what follows the slash', () => {
    it('offers everything for no query', () => {
        expect(labels('')).toHaveLength(commands.length);
    });

    it('matches the start of a word in the label, whatever the case', () => {
        expect(labels('hea')).toEqual(['Heading 1', 'Heading 2']);
        expect(labels('LIST')).toEqual(['Bulleted list']);
        expect(labels('eading')).toEqual([]);
    });

    it('matches the keywords too', () => {
        expect(labels('h2')).toEqual(['Heading 2']);
        expect(labels('tit')).toEqual(['Heading 1']);
    });

    it('needs every word typed to match', () => {
        expect(labels('head 2')).toEqual(['Heading 2']);
        expect(labels('head x')).toEqual([]);
    });
});

describe('the built-in Text command', () => {
    it('is the current command for a paragraph', () => {
        expect(TEXT_COMMAND.active).toEqual({ type: PARAGRAPH });
    });
});
