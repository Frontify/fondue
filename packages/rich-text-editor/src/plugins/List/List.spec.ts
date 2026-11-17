/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { bulletListPlugin, numberedListPlugin } from './List';

describe('list looks', () => {
    it('sets no custom property without levels', () => {
        expect(bulletListPlugin().content?.contentProperties).toEqual({});
        expect(numberedListPlugin().content?.contentProperties).toEqual({});
    });

    it('names each field of a bullet level after the list and the level, skipping a level left out', () => {
        const plugin = bulletListPlugin({
            levels: [{ marker: "'–'", color: 'red', size: '1.2em', indent: '1em' }, undefined, { marker: 'square' }],
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-bullet-list1-marker': "'–'",
            '--rte-bullet-list1-color': 'red',
            '--rte-bullet-list1-size': '1.2em',
            '--rte-bullet-list1-indent': '1em',
            '--rte-bullet-list3-marker': 'square',
        });
    });

    it('names each field of a numbered level after the list and the level', () => {
        const plugin = numberedListPlugin({
            levels: [{}, { marker: 'upper-roman', color: 'blue', indent: '3em' }],
        });

        expect(plugin.content?.contentProperties).toEqual({
            '--rte-numbered-list2-marker': 'upper-roman',
            '--rte-numbered-list2-color': 'blue',
            '--rte-numbered-list2-indent': '3em',
        });
    });

    for (const value of ['red; display: none', '}', '']) {
        it(`throws, naming the level and the field, for ${JSON.stringify(value)}`, () => {
            expect(() => bulletListPlugin({ levels: [undefined, { color: value }] })).toThrow(/"color".*"bulletList2"/);
        });
    }
});
