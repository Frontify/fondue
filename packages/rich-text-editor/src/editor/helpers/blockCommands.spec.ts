/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { PARAGRAPH, type RteBlockCommand, type RteSelectionSnapshot } from '#/core';

import { currentCommand, matchCommands, TEXT_COMMAND } from './blockCommands';

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

describe('the current command', () => {
    const activeFor = (id: string, active: RteBlockCommand['active']): RteBlockCommand => ({
        ...command(id),
        active,
    });
    const outer = activeFor('outer', { type: 'holder' });
    const styled = activeFor('styled', { type: 'styled', attributes: { variant: 'one' } });
    const all = [TEXT_COMMAND, outer, styled];
    const selectionIn = (...types: string[]): RteSelectionSnapshot => {
        const blocks = types.map((type) => ({ type }));
        return { block: blocks[0] ?? null, blocks } as RteSelectionSnapshot;
    };

    it('is the built-in Text for a paragraph at the top level', () => {
        expect(currentCommand(all, selectionIn(PARAGRAPH))).toBe(TEXT_COMMAND);
    });

    it('is the plugin command, not Text, for a paragraph inside a block that has one', () => {
        expect(currentCommand(all, selectionIn(PARAGRAPH, 'slot', 'holder'))).toBe(outer);
    });

    it('is the plugin command that matches the block, not Text, when the block has its attributes', () => {
        const selection = { block: { type: 'styled', variant: 'one' }, blocks: [{ type: 'styled', variant: 'one' }] };

        expect(currentCommand(all, selection as unknown as RteSelectionSnapshot)).toBe(styled);
    });

    it('is nothing when the selection is in no block a command names', () => {
        expect(currentCommand(all, selectionIn('image'))).toBeUndefined();
    });
});
