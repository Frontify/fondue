/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type LinkLabels, resolveLinkLabels } from '../helpers/labels';
import { type LinkPolicy } from '../helpers/policy';

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

const mountForm = (policy: LinkPolicy, mode: FormMode = { kind: 'edit' }, labels?: Partial<LinkLabels>) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onSave = vi.fn();
    act(() => {
        root.render(
            <LinkTargetForm
                initial={{ href: '' }}
                {...mode}
                policy={policy}
                labels={resolveLinkLabels(labels)}
                onSave={onSave}
                onCancel={vi.fn()}
            />,
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
    return { container, field, save: () => act(() => save.click()), type, press, alert, onSave };
};

/** The label text a person reads: Fondue's label repeats it in a hidden copy that only sizes the box. */
const labelOf = (container: HTMLElement, control: HTMLElement): string | undefined =>
    container.querySelector(`label[for="${control.id}"] span:not([aria-hidden])`)?.textContent ?? undefined;

describe('the link target form', () => {
    it('names what the policy allows when a typed link is refused, and keeps focus on the field', () => {
        const { field, type, save, alert, onSave } = mountForm({ allowedHosts: ['frontify.com', '*.frontify.com'] });
        type('example.com');
        act(() => field.blur());

        save();

        expect(alert()).toBe('Enter a link to frontify.com (or a subdomain).');
        expect(window.document.activeElement).toBe(field);
        expect(onSave).not.toHaveBeenCalled();
    });

    it('names the schemes when the policy limits them', () => {
        const { type, save, alert } = mountForm({ allowedSchemes: ['https'] });
        type('ana@example.com');

        save();

        expect(alert()).toBe('Links may use https.');
    });

    it('saves a link the policy allows', () => {
        const { type, save, alert, onSave } = mountForm({ allowedHosts: ['*.frontify.com'] });
        type('app.frontify.com');

        save();

        expect(alert()).toBe('');
        expect(onSave).toHaveBeenCalledWith({ href: 'https://app.frontify.com' });
    });

    it('keeps the generic messages for empty and unreadable input', () => {
        const { type, save, alert } = mountForm({ allowedHosts: ['frontify.com'] });

        save();
        expect(alert()).toBe('Enter where the link goes.');

        type('not a link');
        save();
        expect(alert()).toBe('Enter a web address (example.com), an email address, or a phone number (tel:…).');
    });

    it('saves with the address typed and no text when it has no Text field', () => {
        const { container, type, save, onSave } = mountForm({});
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
            const { container, type, save, onSave } = mountForm({}, { kind: 'create', text: 'the docs' });
            type('example.com');

            save();

            const field = textField(container);
            expect(labelOf(container, field)).toBe('Text');
            expect(field.value).toBe('the docs');
            expect(onSave.mock.calls).toEqual([[{ href: 'https://example.com' }, 'the docs']]);
        });

        it('names the Text field with the label a host passes', () => {
            const { container } = mountForm({}, { kind: 'create', text: '' }, { text: 'Beschriftung' });

            expect(labelOf(container, textField(container))).toBe('Beschriftung');
        });

        it('reads Text, Link to, Open in new tab, then the buttons', () => {
            const { container } = mountForm({}, { kind: 'create', text: 'the docs' });

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
                const { container, type, onSave } = mountForm({}, { kind: 'create', text: 'the docs' });
                type('example.com');

                pressEnterInText(container, { isComposing: true });

                expect(onSave).not.toHaveBeenCalled();
            });

            it('does not save when the browser reports it as key code 229', () => {
                const { container, type, onSave } = mountForm({}, { kind: 'create', text: 'the docs' });
                type('example.com');

                pressEnterInText(container, { keyCode: 229 });

                expect(onSave).not.toHaveBeenCalled();
            });
        });

        it('focuses Text when it is empty, and the address when there is text to keep', () => {
            const empty = mountForm({}, { kind: 'create', text: '' });
            expect(window.document.activeElement).toBe(textField(empty.container));

            const filled = mountForm({}, { kind: 'create', text: 'the docs' });
            expect(window.document.activeElement).toBe(filled.field);
        });
    });

    describe('Enter', () => {
        it('saves', () => {
            const { type, press, onSave } = mountForm({});
            type('example.com');

            press({});

            expect(onSave).toHaveBeenCalledTimes(1);
        });

        it('does not save when it confirms an input-method composition', () => {
            const { type, press, alert, onSave } = mountForm({});
            type('example.com');

            press({ isComposing: true });

            expect(onSave).not.toHaveBeenCalled();
            expect(alert()).toBe('');
        });

        it('does not save when the browser reports it as key code 229', () => {
            const { type, press, onSave } = mountForm({});
            type('example.com');

            press({ keyCode: 229 });

            expect(onSave).not.toHaveBeenCalled();
        });
    });
});
