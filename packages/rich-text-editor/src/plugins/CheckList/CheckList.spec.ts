/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type HtmlSpec } from '#/core';

import { checkListContent } from './CheckList';

const checkItem = checkListContent.blocks?.checkItem;

const checkbox = (value: unknown): HtmlSpec | undefined => {
    const children = checkItem?.toHtml(value as never).children;
    return Array.isArray(children) ? (children[0] as HtmlSpec) : undefined;
};

describe('the check item', () => {
    it('draws a checked box only for `checked: true`', () => {
        expect(checkbox({ checked: true })?.attrs?.checked).toBe(true);
        for (const value of [{ checked: false }, { checked: 'false' }, { checked: 1 }, {}]) {
            expect(checkbox(value)?.attrs?.checked).toBe(false);
        }
    });

    it('exports an item in progress as an unchecked box named by its state', () => {
        const item = checkItem?.toHtml({ checked: 'inProgress' });

        expect(item?.attrs?.['data-checked']).toBe('inProgress');
        expect(checkbox({ checked: 'inProgress' })?.attrs).toMatchObject({
            checked: false,
            'aria-label': 'In progress',
        });
    });
});
