/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type LinkAppearance, type LinkValue } from '../helpers/value';

import { LinkTargetForm } from './LinkTargetForm';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

type FormMode = { kind: 'create'; text: string } | { kind: 'edit' };

type EnterPressInit = KeyboardEventInit & { keyCode?: number };

type FormLink = {
    initial?: LinkValue;
    appearances?: readonly LinkAppearance[];
};

const mountForm = (mode: FormMode = { kind: 'edit' }, { initial = { href: '' }, appearances }: FormLink = {}) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onSave = vi.fn();
    act(() => {
        root.render(
            <LinkTargetForm initial={initial} appearances={appearances} {...mode} onSave={onSave} onCancel={vi.fn()} />,
        );
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    const field = container.querySelector<HTMLInputElement>('input[type="url"]');
    const save = [...container.querySelectorAll('button')].find((button) => button.textContent === 'Save');
    if (!field || !save) {
        throw new Error('the form did not render its field and Save');
    }
    const type = (value: string): void => {
        act(() => {
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(field, value);
            field.dispatchEvent(new Event('input', { bubbles: true }));
        });
    };
    const alert = (): string => container.querySelector('[role="alert"]')?.textContent ?? '';
    const press = (init: EnterPressInit): void => {
        act(() => {
            field.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true, ...init }),
            );
        });
    };
    const styleSelect = (): HTMLElement | null => container.querySelector<HTMLElement>('[role="combobox"]');
    const chooseStyle = (label: string): void => {
        act(() => styleSelect()?.click());
        const option = [...window.document.querySelectorAll<HTMLElement>('[role="option"]')].find(
            (candidate) => candidate.textContent === label,
        );
        if (!option) {
            throw new Error(`the Style select offers no ${label}`);
        }
        act(() => option.click());
    };
    return {
        container,
        field,
        save: () => act(() => save.click()),
        type,
        press,
        alert,
        onSave,
        styleSelect,
        chooseStyle,
    };
};

/** The label text a person reads: Fondue's label repeats it in a hidden copy that only sizes the box. */
const labelOf = (container: HTMLElement, control: HTMLElement): string | undefined =>
    container.querySelector(`label[for="${control.id}"] span:not([aria-hidden])`)?.textContent ?? undefined;

describe('the link target form', () => {
    it('refuses an unsafe link, says what it takes, and keeps focus on the field', () => {
        const { field, type, save, alert, onSave } = mountForm();
        type('javascript:alert(1)');
        act(() => field.blur());

        save();

        expect(alert()).toBe('Enter a web address (example.com), an email address, or a phone number (tel:…).');
        expect(window.document.activeElement).toBe(field);
        expect(onSave).not.toHaveBeenCalled();
    });

    it('saves a typed address as a web link', () => {
        const { type, save, alert, onSave } = mountForm();
        type('app.frontify.com');

        save();

        expect(alert()).toBe('');
        expect(onSave).toHaveBeenCalledWith({ href: 'https://app.frontify.com' });
    });

    it('keeps the generic messages for empty and unreadable input', () => {
        const { type, save, alert } = mountForm();

        save();
        expect(alert()).toBe('Enter where the link goes.');

        type('not a link');
        save();
        expect(alert()).toBe('Enter a web address (example.com), an email address, or a phone number (tel:…).');
    });

    it('saves with the address typed and no text when it has no Text field', () => {
        const { container, type, save, onSave } = mountForm();
        type('example.com');

        save();

        expect(container.querySelector('input[type="text"]')).toBeNull();
        expect(onSave.mock.calls).toEqual([[{ href: 'https://example.com' }]]);
    });

    describe('with a Text field', () => {
        const textField = (container: HTMLElement): HTMLInputElement => {
            const field = container.querySelector<HTMLInputElement>('input[type="text"]');
            if (!field) {
                throw new Error('no Text field');
            }
            return field;
        };

        it('labels it Text, prefilled, and saves the text with the address', () => {
            const { container, type, save, onSave } = mountForm({ kind: 'create', text: 'the docs' });
            type('example.com');

            save();

            const field = textField(container);
            expect(labelOf(container, field)).toBe('Text');
            expect(field.value).toBe('the docs');
            expect(onSave.mock.calls).toEqual([[{ href: 'https://example.com' }, 'the docs']]);
        });

        it('reads Text, Link to, Open in new tab, then the buttons', () => {
            const { container } = mountForm({ kind: 'create', text: 'the docs' });

            const stops = [...container.querySelectorAll<HTMLElement>('input, button')].map(
                (control) => labelOf(container, control) ?? control.textContent,
            );

            expect(stops).toEqual(['Text', 'Link to', 'Open in new tab', 'Cancel', 'Save']);
        });

        describe('Enter in the Text field', () => {
            const pressEnterInText = (container: HTMLElement, init: EnterPressInit): void => {
                const field = textField(container);
                act(() => {
                    field.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true, ...init }),
                    );
                });
            };

            it('does not save when it confirms an input-method composition', () => {
                const { container, type, onSave } = mountForm({ kind: 'create', text: 'the docs' });
                type('example.com');

                pressEnterInText(container, { isComposing: true });

                expect(onSave).not.toHaveBeenCalled();
            });

            it('does not save when the browser reports it as key code 229', () => {
                const { container, type, onSave } = mountForm({ kind: 'create', text: 'the docs' });
                type('example.com');

                pressEnterInText(container, { keyCode: 229 });

                expect(onSave).not.toHaveBeenCalled();
            });
        });

        it('focuses Text when it is empty, and the address when there is text to keep', () => {
            const empty = mountForm({ kind: 'create', text: '' });
            expect(window.document.activeElement).toBe(textField(empty.container));

            const filled = mountForm({ kind: 'create', text: 'the docs' });
            expect(window.document.activeElement).toBe(filled.field);
        });
    });

    describe('the Style select', () => {
        const BUTTON_STYLES: readonly LinkAppearance[] = ['primary', 'secondary', 'tertiary'];

        const styleOptions = (): (string | null)[] =>
            [...window.document.querySelectorAll('[role="option"]')].map((option) => option.textContent);

        it('is not there without appearances', () => {
            expect(mountForm().styleSelect()).toBeNull();
            expect(mountForm({ kind: 'edit' }, { appearances: [] }).styleSelect()).toBeNull();
        });

        it('is labelled Style and sits between Link to and Open in new tab', () => {
            const { container, styleSelect } = mountForm({ kind: 'edit' }, { appearances: BUTTON_STYLES });

            const stops = [...container.querySelectorAll<HTMLElement>('input, [role="combobox"], button')].map(
                (control) => labelOf(container, control) ?? control.textContent,
            );

            expect(styleSelect()).not.toBeNull();
            expect(stops.slice(0, 3)).toEqual(['Link to', 'Style', 'Open in new tab']);
            const nameId = styleSelect()?.getAttribute('aria-labelledby') ?? '';
            expect(window.document.getElementById(nameId)?.textContent).toContain('Style');
        });

        it('offers No style, then the offered styles in order', () => {
            const { styleSelect } = mountForm({ kind: 'edit' }, { appearances: ['tertiary', 'primary'] });

            act(() => styleSelect()?.click());

            expect(styleOptions()).toEqual(['No style', 'Tertiary button', 'Primary button']);
        });

        it('saves the chosen style with the link', () => {
            const { type, save, chooseStyle, onSave } = mountForm({ kind: 'edit' }, { appearances: BUTTON_STYLES });
            type('example.com');

            chooseStyle('Secondary button');
            save();

            expect(onSave).toHaveBeenCalledWith({ href: 'https://example.com', appearance: 'secondary' });
        });

        it('saves no style when No style is chosen', () => {
            const { save, chooseStyle, onSave } = mountForm(
                { kind: 'edit' },
                { initial: { href: 'https://example.com', appearance: 'primary' }, appearances: BUTTON_STYLES },
            );

            chooseStyle('No style');
            save();

            expect(onSave).toHaveBeenCalledWith({ href: 'https://example.com' });
        });

        it('starts on the stored style', () => {
            const { save, onSave } = mountForm(
                { kind: 'edit' },
                { initial: { href: 'https://example.com', appearance: 'tertiary' }, appearances: BUTTON_STYLES },
            );

            save();

            expect(onSave).toHaveBeenCalledWith({ href: 'https://example.com', appearance: 'tertiary' });
        });

        it('keeps a stored style the editor does not offer selectable, and on save', () => {
            const { styleSelect, save, onSave } = mountForm(
                { kind: 'edit' },
                { initial: { href: 'https://example.com', appearance: 'tertiary' }, appearances: ['primary'] },
            );

            act(() => styleSelect()?.click());
            expect(styleOptions()).toEqual(['No style', 'Primary button', 'Tertiary button']);
            act(() => window.document.body.click());
            save();

            expect(onSave).toHaveBeenCalledWith({ href: 'https://example.com', appearance: 'tertiary' });
        });

        it('keeps a stored style when the form has no Style select', () => {
            const { save, onSave } = mountForm(
                { kind: 'edit' },
                { initial: { href: 'https://example.com', appearance: 'primary' } },
            );

            save();

            expect(onSave).toHaveBeenCalledWith({ href: 'https://example.com', appearance: 'primary' });
        });
    });

    describe('Enter', () => {
        it('saves', () => {
            const { type, press, onSave } = mountForm();
            type('example.com');

            press({});

            expect(onSave).toHaveBeenCalledTimes(1);
        });

        it('does not save when it confirms an input-method composition', () => {
            const { type, press, alert, onSave } = mountForm();
            type('example.com');

            press({ isComposing: true });

            expect(onSave).not.toHaveBeenCalled();
            expect(alert()).toBe('');
        });

        it('does not save when the browser reports it as key code 229', () => {
            const { type, press, onSave } = mountForm();
            type('example.com');

            press({ keyCode: 229 });

            expect(onSave).not.toHaveBeenCalled();
        });
    });
});
