/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, it } from 'vitest';

import * as toolbarGroups from './toolbarGroups';

const GROUP_KEYS = ['id', 'order'];
const NOT_A_GROUP_REASON =
    'Every export of toolbarGroups.ts must be one `{ id, order }` group. A plugin reads its group as `TOOLBAR_GROUPS.marks` from a namespace import, ' +
    'and that stays removable by tree shaking only while each group is its own export. A property read on an exported object (a `TOOLBAR_GROUPS` record) keeps every plugin in the renderer bundle, which rendererBundle.spec.ts rejects.';

it('exports only single { id, order } groups, never a record of groups', () => {
    const exports = Object.entries(toolbarGroups);

    expect(exports.length).toBeGreaterThan(0);
    for (const [name, group] of exports) {
        expect(Object.keys(group).sort(), `${name}: ${NOT_A_GROUP_REASON}`).toEqual(GROUP_KEYS);
        expect(typeof group.id, `${name}: ${NOT_A_GROUP_REASON}`).toBe('string');
        expect(typeof group.order, `${name}: ${NOT_A_GROUP_REASON}`).toBe('number');
    }
});
