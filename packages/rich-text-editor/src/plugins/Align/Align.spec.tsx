/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { type EditorControlApi, type RteSelectionSnapshot, type ToolbarItemProps } from '#/core';
import { ENGLISH, enUS } from '#/locales/en-US';
import { labelContextOf, resolveLabel, translatorFor } from '#/ui/translation';

import { alignPlugin } from './Align';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const align = alignPlugin().content?.blockAttributes?.align;

const elementAligned = (textAlign: string): HTMLElement => {
    const element = document.createElement('p');
    element.style.textAlign = textAlign;
    return element;
};

describe('the align attribute', () => {
    it('styles the block with one of the four alignments', () => {
        expect(align?.style('center')).toEqual({ 'text-align': 'center' });
    });

    it('styles the block with the logical start and end', () => {
        expect(align?.style('start')).toEqual({ 'text-align': 'start' });
        expect(align?.style('end')).toEqual({ 'text-align': 'end' });
    });

    it('writes no style for any other value', () => {
        for (const value of ['center; background: url(x)', 'left', 'right', 'inherit', '', 1]) {
            expect(align?.style(value as string)).toEqual({});
        }
    });
});

describe('reading the align attribute from a pasted element', () => {
    it.each([
        ['left', 'start'],
        ['right', 'end'],
        ['start', 'start'],
        ['end', 'end'],
        ['center', 'center'],
        ['justify', 'justify'],
    ])('reads text-align %s as %s', (textAlign, expected) => {
        expect(align?.parse?.(elementAligned(textAlign))).toBe(expected);
    });

    it('reads no alignment from a value it does not offer', () => {
        expect(align?.parse?.(elementAligned('-webkit-center'))).toBeNull();
    });

    it('reads no alignment from an element that sets none', () => {
        expect(align?.parse?.(document.createElement('p'))).toBeNull();
    });
});

type MountedToolbarOptions = { direction: ToolbarItemProps['direction']; align?: string };

const mountToolbar = ({ direction, align: blockAlign }: MountedToolbarOptions) => {
    const entry = alignPlugin().toolbar?.[0];
    if (entry?.render === undefined) {
        throw new Error('the align plugin has no custom toolbar entry');
    }
    const updateAttributes = vi.fn<EditorControlApi['blocks']['updateAttributes']>();
    const api = { blocks: { updateAttributes } } as unknown as EditorControlApi;
    const block = { type: 'paragraph', align: blockAlign };
    const container = document.body.appendChild(document.createElement('div'));
    const root = createRoot(container);
    const Entry = entry.render;
    const props: ToolbarItemProps = {
        api,
        label: resolveLabel(entry.label, labelContextOf(ENGLISH, translatorFor(enUS))),
        selection: { block, blocks: [block] } as unknown as RteSelectionSnapshot,
        selectedNode: null,
        isActive: false,
        toggle: () => {},
        openEditor: () => {},
        direction,
    };
    act(() => root.render(<Entry {...props} />));

    const radios = [...container.querySelectorAll<HTMLElement>('[role="radiogroup"] [role="radio"]')];

    return {
        radios,
        updateAttributes,
        unmount: () => {
            act(() => root.unmount());
            container.remove();
        },
    };
};

const namesOf = (radios: HTMLElement[]): (string | null)[] => radios.map((radio) => radio.getAttribute('aria-label'));

describe('the alignment toolbar entry', () => {
    it('lists left, centre, right and justify in a left to right editor, with the first checked when the block has none', () => {
        const { radios, unmount } = mountToolbar({ direction: 'ltr' });

        expect(namesOf(radios)).toEqual(['Align left', 'Align center', 'Align right', 'Justify']);
        expect(radios[0]?.getAttribute('aria-checked')).toBe('true');

        unmount();
    });

    it('lists the start first, labelled right, in a right to left editor, with it checked when the block has none', () => {
        const { radios, unmount } = mountToolbar({ direction: 'rtl' });

        expect(namesOf(radios)).toEqual(['Align right', 'Align center', 'Align left', 'Justify']);
        expect(radios[0]?.getAttribute('aria-checked')).toBe('true');

        unmount();
    });

    it('stores start when the first radio is chosen', () => {
        const { radios, updateAttributes, unmount } = mountToolbar({ direction: 'ltr', align: 'center' });

        act(() => radios[0]?.click());

        expect(updateAttributes).toHaveBeenCalledWith({ align: 'start' });

        unmount();
    });
});
