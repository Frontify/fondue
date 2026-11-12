/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { PASTED_LIST_ITEM_ATTRIBUTES, removePastedListContract } from './vocabulary';

describe('removePastedListContract', () => {
    it('removes every contract attribute from every element that carries one, and nothing else', () => {
        const root = document.createElement('div');
        root.innerHTML =
            `<p ${PASTED_LIST_ITEM_ATTRIBUTES.list}="l0 lfo1" ${PASTED_LIST_ITEM_ATTRIBUTES.level}="1" class="a">A</p>` +
            `<div><p ${PASTED_LIST_ITEM_ATTRIBUTES.marker}="numbered" ${PASTED_LIST_ITEM_ATTRIBUTES.number}="2">B</p></div>` +
            '<p class="c">C</p>';

        removePastedListContract(root);

        expect(root.innerHTML).toBe('<p class="a">A</p><div><p>B</p></div><p class="c">C</p>');
    });
});
