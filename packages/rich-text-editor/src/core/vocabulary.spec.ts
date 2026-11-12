/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { OFFICE_LIST_ATTRIBUTES, removeOfficeListData } from './vocabulary';

describe('removeOfficeListData', () => {
    it('removes every Office list attribute from every element that carries one, and nothing else', () => {
        const root = document.createElement('div');
        root.innerHTML =
            `<p ${OFFICE_LIST_ATTRIBUTES.list}="l0 lfo1" ${OFFICE_LIST_ATTRIBUTES.level}="1" class="a">A</p>` +
            `<div><p ${OFFICE_LIST_ATTRIBUTES.marker}="1." ${OFFICE_LIST_ATTRIBUTES.level}="2">B</p></div>` +
            '<p class="c">C</p>';

        removeOfficeListData(root);

        expect(root.innerHTML).toBe('<p class="a">A</p><div><p>B</p></div><p class="c">C</p>');
    });
});
