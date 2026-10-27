/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type HtmlSpec } from '#/core';

import { checkListPlugin } from './CheckList';

const checkItem = checkListPlugin().blocks?.checkItem;

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
});
