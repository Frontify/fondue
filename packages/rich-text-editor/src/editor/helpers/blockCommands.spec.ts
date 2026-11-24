/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type RteBlockCommand, type RteSelectionSnapshot } from '#/core';

import { activeCommand, availableCommands, matchCommands, TEXT_COMMAND } from './blockCommands';

const command = (label: string, keywords: string[] = [], group: RteBlockCommand['group'] = 'turnInto') => ({
    id: label,
    label,
    keywords,
    group,
    run: () => {},
});

const commands = [
    { ...TEXT_COMMAND, label: 'Text' },
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

describe('the active command', () => {
    it('is the first that says the selection is it', () => {
        const heading = { ...command('Heading 1'), isActive: () => true };

        expect(
            activeCommand([TEXT_COMMAND, heading], {
                kind: 'text' as const,
                grid: null,
                isCollapsed: true,
                text: '',
                block: { type: 'x' },
                blocks: [{ type: 'x' }],
                marks: {},
                history: { canUndo: false, canRedo: false },
            }),
        ).toBe(heading);
    });

    it('is the innermost list when lists nest', () => {
        const listCommand = (type: string) => ({
            ...command(type),
            isActive: (selection: RteSelectionSnapshot) => selection.blocks.some((block) => block.type === type),
        });
        const bullet = listCommand('bulletList');
        const numbered = listCommand('numberedList');
        const blocks = ['paragraph', 'listItem', 'numberedList', 'listItem', 'bulletList'].map((type) => ({ type }));

        const selection = {
            kind: 'text' as const,
            grid: null,
            isCollapsed: true,
            text: '',
            block: blocks[0] ?? null,
            blocks,
            marks: {},
            history: { canUndo: false, canRedo: false },
        };

        expect(activeCommand([TEXT_COMMAND, bullet, numbered], selection)).toBe(numbered);
    });

    it('is the built-in Text only on a paragraph that is not in a list', () => {
        const selection = (types: string[]) => ({
            kind: 'text' as const,
            grid: null,
            isCollapsed: true,
            text: '',
            block: { type: types[0] ?? '' },
            blocks: types.map((type) => ({ type })),
            marks: {},
            history: { canUndo: false, canRedo: false },
        });

        expect(TEXT_COMMAND.isActive?.(selection(['paragraph']))).toBe(true);
        expect(TEXT_COMMAND.isActive?.(selection(['paragraph', 'listItem', 'bulletList']))).toBe(false);
        expect(TEXT_COMMAND.isActive?.(selection(['textStyle']))).toBe(false);
    });
});

describe('whether a command can run', () => {
    const selection: RteSelectionSnapshot = {
        kind: 'text',
        grid: null,
        isCollapsed: true,
        text: '',
        block: { type: 'paragraph' },
        blocks: [{ type: 'paragraph' }],
        marks: {},
        history: { canUndo: false, canRedo: false },
    };

    it('keeps a command that says nothing', () => {
        const always = command('Heading 1');

        expect(availableCommands([always], selection)).toEqual([always]);
    });

    it('drops a command that says it cannot run on the selection', () => {
        const limited: RteBlockCommand = {
            ...command('Add section'),
            isAvailable: (current) => current.block?.type !== 'paragraph',
        };

        expect(availableCommands([limited], selection)).toEqual([]);
        expect(availableCommands([limited], { ...selection, block: { type: 'heading' } })).toEqual([limited]);
    });
});
