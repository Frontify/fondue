/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildPluginRegistry, definePlugin, type RtePlugin, type RteToolbarGroup } from '#/core';

import { toolbarGroupsOf } from './toolbarGroups';

const button = () => null;

const grouped = (id: string, group?: RteToolbarGroup) =>
    definePlugin({ id, toolbarGroup: group, toolbar: [{ label: id, render: button }] });

/** The drawing order as `group: plugin ids`, with `-` for the plugins that have no group. */
const drawn = (plugins: RtePlugin[]): string[] =>
    toolbarGroupsOf(buildPluginRegistry(plugins).toolbarItems).map(
        ({ id, entries }) => `${id ?? '-'}: ${entries.map((entry) => entry.id).join(',')}`,
    );

describe('toolbar groups', () => {
    it('are drawn by order, lowest first, whatever order the plugins mount in', () => {
        expect(
            drawn([
                grouped('late', { id: 'second', order: 20 }),
                grouped('early', { id: 'first', order: 10 }),
                grouped('also-late', { id: 'second', order: 20 }),
            ]),
        ).toEqual(['first: early', 'second: late,also-late']);
    });

    it('keep the order their ids first appear in when their orders are equal', () => {
        expect(
            drawn([
                grouped('b', { id: 'bravo', order: 10 }),
                grouped('a', { id: 'alpha', order: 10 }),
                grouped('c', { id: 'bravo', order: 10 }),
            ]),
        ).toEqual(['bravo: b,c', 'alpha: a']);
    });

    it('put the controls of plugins with no group last, together, in mount order', () => {
        expect(drawn([grouped('loose-1'), grouped('only', { id: 'only', order: 500 }), grouped('loose-2')])).toEqual([
            'only: only',
            '-: loose-1,loose-2',
        ]);
    });
});
