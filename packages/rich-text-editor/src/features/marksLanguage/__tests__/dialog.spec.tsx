/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { codeBlock } from '#/features/blocksCode/feature';
import { language } from '#/features/marksLanguage/feature';
import { type ReactPresentation } from '#/index';
import { type ContentNodeJSON } from '#/model';
import { liveRegionFaults } from '#/react/__tests__/fixtures/liveRegion';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const passage = (value: string, lang: string): ContentNodeJSON =>
    ({ type: 'text', text: value, marks: [{ type: 'language', attrs: { lang, dir: null } }] }) as ContentNodeJSON;

const offeredModel = () => textModel([...textFeatures(), language({ languages: ['en', 'de', 'fr', 'ar'] })]);
const typedModel = () => textModel([...textFeatures(), language()]);

const mount = (
    model: ReturnType<typeof typedModel>,
    blocks: readonly ContentNodeJSON[],
    toolbar?: ReactPresentation['toolbar'],
) => {
    if (toolbar === undefined) {
        return mountText({ model, blocks });
    }
    return mountText({ model, blocks, toolbar });
};

const languageRadios = () => within(screen.getByRole('radiogroup', { name: 'Language tag' })).getAllByRole('radio');

const open = (handle: ReturnType<typeof mount>['handle']) => {
    act(() => {
        handle.execute('mark.language.edit');
        vi.advanceTimersToNextFrame();
    });
    return screen.getByRole('dialog', { name: 'Language' });
};

// Focus returns in a microtask once the dialog has closed.
const settle = () =>
    act(async () => {
        await Promise.resolve();
        vi.advanceTimersToNextFrame();
    });

describe('language dialog', () => {
    it('focuses the radio of the language at the caret, and the first one with no language there', () => {
        const { handle, unmount } = mount(offeredModel(), [para(text('Hello '), passage('Bonjour', 'fr'))]);
        setSelection(handle, { text: 'Bonjour', from: 3, to: 3 });
        open(handle);

        expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'French' }));
        unmount();

        const plain = mount(offeredModel(), [para(text('Hello'))]);
        setSelection(plain.handle, { text: 'Hello', from: 2, to: 2 });
        open(plain.handle);

        expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'English' }));
    });

    it('offers and checks the language a range starts in, and focuses it, though the range ends in text with none', () => {
        const model = textModel([...textFeatures(), language({ languages: ['de', 'en'] })]);
        const { handle } = mount(model, [para(text('Hello '), passage('Bonjour', 'fr'), text(' tail'))]);
        setSelection(handle, { text: 'Bonjour tail', from: 3, to: 10 });
        open(handle);

        expect(languageRadios().map((radio) => radio.getAttribute('value'))).toEqual(['fr', 'de', 'en']);
        expect(screen.getByRole('radio', { name: 'French' }).getAttribute('aria-checked')).toBe('true');
        expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'French' }));
    });

    it('is disabled for a range from the middle of a code block into the next paragraph, and enabled in a paragraph', () => {
        const model = textModel([...textFeatures(), codeBlock(), language()]);
        const code = { type: 'code_block', attrs: { languageId: null }, content: [text('abcd')] } as ContentNodeJSON;
        const { handle } = mountText({ model, blocks: [code, para(text('after'))] });
        // The code block holds positions 1 to 5, the paragraph's text starts at 7.
        runtimeOf(handle)?.select({ anchor: 3, head: 9 });

        const inCode = handle.query('mark.language.edit');
        setSelection(handle, { text: 'after' });

        expect(inCode).toMatchObject({ enabled: false });
        expect(handle.query('mark.language.edit')).toMatchObject({ enabled: true });
    });

    it('offers a stored language the option does not list as the checked radio, which Apply keeps', () => {
        const { handle } = mount(offeredModel(), [para(passage('Ciao', 'it'))]);
        setSelection(handle, { text: 'Ciao', from: 2, to: 2 });
        open(handle);

        const italian = screen.getByRole('radio', { name: 'Italian' });
        expect(italian.getAttribute('aria-checked')).toBe('true');
        expect(document.activeElement).toBe(italian);
        expect(languageRadios().map((radio) => radio.getAttribute('value'))).toEqual(['it', 'en', 'de', 'fr', 'ar']);

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
        });

        const block = handle.getSnapshot().document.content.content?.[0];
        expect(block?.content).toEqual([passage('Ciao', 'it')]);
    });

    it('names and describes the error of a rejected tag on the field, marks it invalid and focuses it', () => {
        const { handle } = mount(typedModel(), [para(text('Hallo'))]);
        setSelection(handle, { text: 'Hallo' });
        open(handle);
        const field = screen.getByRole('textbox', { name: 'Language tag' });
        act(() => {
            fireEvent.change(field, { target: { value: 'en_US!' } });
        });
        const apply = screen.getByRole('button', { name: 'Apply' });
        apply.focus();

        act(() => {
            fireEvent.click(apply);
        });

        const error = screen.getByText('Enter a valid language tag.');
        expect(error.id).not.toBe('');
        expect(field.getAttribute('aria-errormessage')).toBe(error.id);
        expect(field.getAttribute('aria-describedby')).toBe(error.id);
        expect(field.getAttribute('aria-invalid')).toBe('true');
        expect(document.activeElement).toBe(field);
        expect(liveRegionFaults(document.body)).toEqual([]);
    });

    it('marks the group invalid and describes the radio a rejected language focuses by the error, once the error shows', () => {
        const { handle } = mount(offeredModel(), [para(passage('Bonjour', 'fr'))]);
        setSelection(handle, { text: 'Bonjour', from: 3, to: 3 });
        open(handle);
        const execute = vi.spyOn(handle, 'execute').mockReturnValue({
            status: 'rejected',
            code: 'invalid-payload',
        } as ReturnType<typeof handle.execute>);
        const french = screen.getByRole('radio', { name: 'French' });
        let shownAtFocus = false;
        french.addEventListener('focus', () => {
            shownAtFocus = screen.queryByText('Enter a valid language tag.') !== null;
        });
        const apply = screen.getByRole('button', { name: 'Apply' });
        apply.focus();

        act(() => {
            fireEvent.click(apply);
        });
        execute.mockRestore();

        const error = screen.getByText('Enter a valid language tag.');
        const group = screen.getByRole('radiogroup', { name: 'Language tag' });
        expect(error.id).not.toBe('');
        expect(group.getAttribute('aria-errormessage')).toBe(error.id);
        expect(group.getAttribute('aria-invalid')).toBe('true');
        expect(document.activeElement).toBe(french);
        expect(shownAtFocus).toBe(true);
        expect(french.getAttribute('aria-describedby')).toBe(error.id);
        expect(screen.getByRole('radio', { name: 'English' }).hasAttribute('aria-describedby')).toBe(false);
        expect(liveRegionFaults(document.body)).toEqual([]);
    });

    it('returns focus to the toolbar button on Cancel and Escape, and to the surface on Apply', async () => {
        const { handle, view } = mount(offeredModel(), [para(text('Hello'))], [['mark.language.edit']]);
        setSelection(handle, { text: 'Hello' });
        const button = screen.getByRole('button', { name: 'Language' });
        const press = () =>
            act(async () => {
                fireEvent.click(button);
                await Promise.resolve();
                vi.advanceTimersToNextFrame();
            });

        await press();
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        });
        await settle();
        expect(document.activeElement).toBe(button);

        await press();
        act(() => {
            fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
        });
        await settle();
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(document.activeElement).toBe(button);

        await press();
        act(() => {
            fireEvent.click(screen.getByRole('radio', { name: 'German' }));
        });
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
        });
        await settle();
        expect(document.activeElement).toBe(view.dom);
    });
});
