/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, it } from 'vitest';

import * as toolbarGroups from './toolbarGroups';

const GROUP_KEYS = ['id', 'order'];
const NOT_A_GROUP_REASON =
    'Export one `{ id, order }` group per name: a property read on an exported record keeps every plugin in the renderer bundle.';

it('exports only single { id, order } groups, never a record of groups', () => {
    const exports = Object.entries(toolbarGroups);

    expect(exports.length).toBeGreaterThan(0);
    for (const [name, group] of exports) {
        expect(Object.keys(group).sort(), `${name}: ${NOT_A_GROUP_REASON}`).toEqual(GROUP_KEYS);
        expect(typeof group.id, `${name}: ${NOT_A_GROUP_REASON}`).toBe('string');
        expect(typeof group.order, `${name}: ${NOT_A_GROUP_REASON}`).toBe('number');
    }
});
