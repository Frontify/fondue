/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mountStyled } from '#/features/__tests__/fixtures/style-editor';
import { marked, plain, styled, styleModel } from '#/features/__tests__/fixtures/styles';
import { core } from '#/features/core/feature';
import { compileContentModel } from '#/model';
import { setSelection } from '#/testing';

import { fontColor } from '../feature';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

type Mounted = ReturnType<typeof mountStyled>;

const marksOf = ({ handle }: Mounted) =>
    (handle.getSnapshot().document.content.content?.[0]?.content ?? []).map((node) => [node.text, node.marks ?? []]);
const openMenu = (mounted: Mounted, payload?: { readonly tokenIds: readonly string[] }) => {
    act(() => {
        mounted.handle.execute('mark.color.menu.open', payload);
    });
    return screen.getByRole('menu', { name: 'Color' });
};
const pick = (name: string) => {
    act(() => {
        fireEvent.click(screen.getByRole('menuitemradio', { name }));
    });
};
const press = ({ view }: Mounted, apple: boolean) => {
    const event = new KeyboardEvent('keydown', {
        key: 'h',
        metaKey: apple,
        ctrlKey: !apple,
        shiftKey: true,
        bubbles: true,
        cancelable: true,
    });
    view.dom.dispatchEvent(event);
};
const red = { type: 'font_color', attrs: { tokenId: 'brand.red', value: null } };
const namesOf = (items: readonly HTMLElement[]) =>
    items.map((item) => item.getAttribute('aria-label') ?? item.textContent);

describe('marks.font-color', () => {
    it('shows each token colour as a menuitemradio named by its label and described by its value, checking the active one', () => {
        const mounted = mountStyled({
            blocks: [styled(null, plain('A '), marked('word', 'font_color', red.attrs), plain(' here'))],
        });
        setSelection(mounted.handle, { text: 'word' });

        const menu = openMenu(mounted);
        const swatches = screen.getAllByRole('menuitemradio');

        expect(menu).toBeInTheDocument();
        expect(swatches.map((swatch) => swatch.getAttribute('aria-checked'))).toEqual(['true', 'false', 'false']);
        expect(screen.getByRole('menuitemradio', { name: 'Brand red' })).toHaveAccessibleDescription('#c0392b');
        expect(screen.getByRole('menuitemradio', { name: 'Brand blue' })).toHaveAccessibleDescription('#1d4ed8');
        expect(screen.getByRole('menuitemradio', { name: 'Sun' })).toHaveAccessibleDescription('#fde68a');
    });

    it('offers one menu of text colours, highlight colours and Clear, applies each, and reapplies the last colour with Mod+Shift+H', () => {
        const mounted = mountStyled({ blocks: [styled(null, plain('one two three'))] });
        setSelection(mounted.handle, { text: 'one' });
        openMenu(mounted);
        const names = namesOf(screen.getAllByRole('menuitemradio'));
        const clear = screen.queryByRole('menuitem', { name: 'Clear color' }) !== null;

        pick('Brand blue');
        setSelection(mounted.handle, { text: 'two' });
        openMenu(mounted);
        pick('Sun');
        setSelection(mounted.handle, { text: 'three' });
        press(mounted, navigator.platform.startsWith('Mac'));

        expect(names).toEqual(['Brand red', 'Brand blue', 'Sun']);
        expect(clear).toBe(true);
        const sun = { type: 'highlight', attrs: { tokenId: 'brand.sun', value: null } };
        expect(marksOf(mounted)).toEqual([
            ['one', [{ type: 'font_color', attrs: { tokenId: 'brand.blue', value: null } }]],
            [' ', []],
            ['two', [sun]],
            [' ', []],
            ['three', [sun]],
        ]);
    });

    it('removes text and highlight colours with Clear as one undo step', () => {
        const sun = { tokenId: 'brand.sun', value: null };
        const mounted = mountStyled({
            blocks: [styled(null, marked('red', 'font_color', red.attrs), marked('sun', 'highlight', sun))],
        });
        setSelection(mounted.handle, { text: 'redsun' });

        openMenu(mounted);
        act(() => {
            fireEvent.click(screen.getByRole('menuitem', { name: 'Clear color' }));
        });
        const cleared = marksOf(mounted);
        mounted.handle.execute('history.undo');

        expect(cleared).toEqual([['redsun', []]]);
        expect(mounted.changes.map(({ commandId }) => commandId)).toEqual(['mark.color.clear', null]);
        expect(marksOf(mounted)).toEqual([
            ['red', [red]],
            ['sun', [{ type: 'highlight', attrs: sun }]],
        ]);
    });

    it('keeps stored literal colours editable and removable while the menu offers only tokens without literalColors', () => {
        const model = compileContentModel([core(), fontColor()], { id: 'test.styles', version: 1 });
        const literal = { type: 'font_color', attrs: { tokenId: null, value: '#0f766e' } };
        const mounted = mountStyled({
            model,
            blocks: [
                styled(
                    null,
                    marked('teal', 'font_color', literal.attrs),
                    plain(' '),
                    marked('cyan', 'font_color', literal.attrs),
                ),
            ],
            policy: { features: { 'marks.font-color': { create: true, edit: true, remove: true, paste: true } } },
        });
        const loaded = marksOf(mounted);
        setSelection(mounted.handle, { text: 'teal' });

        const menu = openMenu(mounted);
        const rows = namesOf([...menu.querySelectorAll<HTMLElement>('[role^="menuitem"]')]);
        pick('Brand blue');
        setSelection(mounted.handle, { text: 'cyan' });
        openMenu(mounted);
        act(() => {
            fireEvent.click(screen.getByRole('menuitem', { name: 'Clear color' }));
        });

        expect(loaded).toEqual([
            ['teal', [literal]],
            [' ', []],
            ['cyan', [literal]],
        ]);
        expect(rows).toEqual(['Brand red', 'Brand blue', 'Clear color']);
        expect(marksOf(mounted)).toEqual([
            ['teal', [{ type: 'font_color', attrs: { tokenId: 'brand.blue', value: null } }]],
            [' cyan', []],
        ]);
    });

    it('limits the menu to the tokens a tokenIds payload names', () => {
        const mounted = mountStyled({ blocks: [styled(null, plain('word'))] });
        setSelection(mounted.handle, { text: 'word' });

        openMenu(mounted, { tokenIds: ['brand.blue'] });

        expect(
            screen.getAllByRole('menuitemradio').map((item) => item.getAttribute('aria-describedby') !== null),
        ).toEqual([true]);
        expect(screen.getByRole('menuitemradio', { name: 'Brand blue' })).toBeInTheDocument();
    });

    it('offers a custom colour row for each colour feature with literalColors', () => {
        const mounted = mountStyled({ model: styleModel(true), blocks: [styled(null, plain('word'))] });
        setSelection(mounted.handle, { text: 'word' });

        openMenu(mounted);

        expect(screen.getByRole('menuitemradio', { name: 'Custom text color', checked: false })).toBeInTheDocument();
        expect(
            screen.getByRole('menuitemradio', { name: 'Custom highlight color', checked: false }),
        ).toBeInTheDocument();
    });

    it('closes the colour menu when a swatch is chosen by keyboard, which moves focus to the editor', () => {
        const mounted = mountStyled({ blocks: [styled(null, plain('word'))] });
        setSelection(mounted.handle, { text: 'word' });
        openMenu(mounted);
        const blue = screen.getByRole('menuitemradio', { name: 'Brand blue' });

        act(() => {
            blue.focus();
            fireEvent.keyDown(blue, { key: 'Enter' });
        });

        expect(marksOf(mounted)).toEqual([
            ['word', [{ type: 'font_color', attrs: { tokenId: 'brand.blue', value: null } }]],
        ]);
        expect(screen.queryByRole('menu', { name: 'Color' })).toBeNull();
        expect(mounted.view.dom).toHaveFocus();
    });

    it('names the colour menu by its localized label', () => {
        const mounted = mountStyled({ blocks: [styled(null, plain('word'))] });
        setSelection(mounted.handle, { text: 'word' });

        expect(openMenu(mounted)).toHaveAccessibleName('Color');
    });

    it('shows each swatch as a chip filled with its colour, and a check mark on the checked swatch only', () => {
        const mounted = mountStyled({ blocks: [styled(null, marked('word', 'font_color', red.attrs))] });
        setSelection(mounted.handle, { text: 'word' });

        openMenu(mounted);
        const swatches = screen
            .getAllByRole('menuitemradio')
            .map((swatch) => [
                swatch.textContent,
                swatch.querySelector<HTMLElement>('[data-rte-swatch]')?.style.getPropertyValue('--rte-chip-color'),
                swatch.querySelector('[data-name="right"] svg') !== null,
            ]);

        expect(swatches).toEqual([
            ['Brand red#c0392b', '#c0392b', true],
            ['Brand blue#1d4ed8', '#1d4ed8', false],
            ['Sun#fde68a', '#fde68a', false],
        ]);
    });

    it('checks the custom colour row, described by its hex, when the selection holds a literal colour', () => {
        const literal = { tokenId: null, value: '#0f766e' };
        const mounted = mountStyled({
            model: styleModel(true),
            blocks: [styled(null, marked('teal', 'font_color', literal), plain(' plain'))],
        });
        setSelection(mounted.handle, { text: 'teal' });

        openMenu(mounted);
        const custom = screen.getByRole('menuitemradio', { name: 'Custom text color' });

        expect(custom).toHaveAttribute('aria-checked', 'true');
        expect(custom).toHaveAccessibleDescription('#0f766e');
        expect(custom.querySelector('[data-name="right"] svg')).not.toBeNull();
        expect(screen.getByRole('menuitemradio', { name: 'Custom highlight color' })).toHaveAttribute(
            'aria-checked',
            'false',
        );
    });

    it('starts the custom colour draft from the value of the token the selection holds', () => {
        const mounted = mountStyled({
            model: styleModel(true),
            blocks: [styled(null, marked('word', 'font_color', red.attrs))],
        });
        setSelection(mounted.handle, { text: 'word' });

        openMenu(mounted);
        act(() => {
            fireEvent.click(screen.getByRole('menuitemradio', { name: 'Custom text color' }));
        });
        const picker = screen.getByRole('dialog', { name: 'Custom text color' });

        expect((within(picker).getAllByRole('textbox')[0] as HTMLInputElement).value.toLowerCase()).toContain('c0392b');
    });

    for (const apple of [true, false]) {
        const platform = apple ? 'Apple' : 'other';
        it(`runs mark.color.reapply with the ${platform} keys of the Shortcuts table, and not with the other platform's`, () => {
            vi.spyOn(navigator, 'platform', 'get').mockReturnValue(apple ? 'MacIntel' : 'Win32');
            const run = (own: boolean) => {
                const mounted = mountStyled({ blocks: [styled(null, plain('one two'))] });
                setSelection(mounted.handle, { text: 'one' });
                mounted.handle.execute('mark.font-color.set', { tokenId: 'brand.red' });
                setSelection(mounted.handle, { text: 'two' });
                press(mounted, own === apple);
                const reapplied = mounted.changes.filter(({ commandId }) => commandId === 'mark.color.reapply').length;
                const result = [reapplied, marksOf(mounted).at(-1)];
                mounted.unmount();
                return result;
            };

            expect(run(true)).toEqual([1, ['two', [red]]]);
            // On Apple platforms Ctrl+H deletes backward, as in every macOS text field, so only the colour is checked.
            expect(run(false)[0]).toBe(0);
        });
    }
});
