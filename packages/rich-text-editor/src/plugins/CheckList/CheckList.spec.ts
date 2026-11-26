/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { ANY_LIST, type HtmlSpec, PARAGRAPH } from '#/core';

import { checkListContent, checkListPlugin } from './CheckList';

const checkItem = checkListContent().blocks?.checkItem;

/** The `[~] ` rule of a plugin, which is the only one that starts an item in progress. */
const startsInProgress = (inputRules: ReturnType<typeof checkListPlugin>['inputRules']): boolean =>
    (inputRules ?? []).some((rule) => 'match' in rule && rule.match === '[~] ');

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

describe('the check item parsed from HTML', () => {
    const parsedChecked = (content: ReturnType<typeof checkListContent>, data: string): unknown => {
        const element = window.document.createElement('li');
        element.dataset.checked = data;
        return content.blocks?.checkItem?.parse[0]?.value?.(element);
    };

    it('reads data-checked="inProgress" as in progress by default', () => {
        expect(parsedChecked(checkListContent(), 'inProgress')).toEqual({ checked: 'inProgress' });
        expect(parsedChecked(checkListContent({ inProgress: true }), 'inProgress')).toEqual({
            checked: 'inProgress',
        });
    });

    it('reads data-checked="inProgress" as not done with `inProgress: false`', () => {
        expect(parsedChecked(checkListContent({ inProgress: false }), 'inProgress')).toEqual({ checked: false });
    });

    it('still reads the other two states with `inProgress: false`', () => {
        expect(parsedChecked(checkListContent({ inProgress: false }), 'true')).toEqual({ checked: true });
        expect(parsedChecked(checkListContent({ inProgress: false }), 'false')).toEqual({ checked: false });
    });

    it('still exports an item stored in progress as in progress with `inProgress: false`', () => {
        const item = checkListContent({ inProgress: false }).blocks?.checkItem?.toHtml({ checked: 'inProgress' });

        expect(item?.attrs?.['data-checked']).toBe('inProgress');
    });
});

describe('the `[~] ` input rule', () => {
    it('is there by default', () => {
        expect(startsInProgress(checkListPlugin().inputRules)).toBe(true);
        expect(startsInProgress(checkListPlugin({ inProgress: true }).inputRules)).toBe(true);
    });

    it('is left out with `inProgress: false`, and the other check list rules stay', () => {
        const { inputRules } = checkListPlugin({ inProgress: false });

        expect(startsInProgress(inputRules)).toBe(false);
        expect(inputRules).toHaveLength(4);
    });
});

describe('what a check item holds', () => {
    it('is paragraphs and lists by default', () => {
        expect(checkListContent().blocks?.checkItem?.content).toEqual({ blocks: [PARAGRAPH, ANY_LIST] });
        expect(checkListContent({ nested: true }).blocks?.checkItem?.content).toEqual({
            blocks: [PARAGRAPH, ANY_LIST],
        });
    });

    it('is paragraphs only with `nested: false`', () => {
        expect(checkListContent({ nested: false }).blocks?.checkItem?.content).toEqual({ blocks: [PARAGRAPH] });
    });

    it('is what the plugin mounts, so `checkListPlugin` passes its options on', () => {
        expect(checkListPlugin({ nested: false }).content?.blocks?.checkItem?.content).toEqual({
            blocks: [PARAGRAPH],
        });
    });
});
