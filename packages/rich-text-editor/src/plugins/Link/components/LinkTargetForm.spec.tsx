/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

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

const mountForm = (policy: LinkPolicy) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const onSave = vi.fn();
    act(() => {
        root.render(<LinkTargetForm initial={{ href: '' }} policy={policy} onSave={onSave} onCancel={vi.fn()} />);
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
    return { field, save: () => act(() => save.click()), type, alert, onSave };
};

describe('the link target form', () => {
    it('names what the policy allows when a typed link is refused, and keeps focus on the field', () => {
        const { field, type, save, alert, onSave } = mountForm({ allowedHosts: ['frontify.com', '*.frontify.com'] });
        type('example.com');
        act(() => field.blur());

        save();

        expect(alert()).toBe('Enter a link to frontify.com or its subdomains.');
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
});
