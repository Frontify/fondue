/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { mentionDisplay } from '../helpers/display';
import { mentionContent } from '../Mention';
import { type MentionValue } from '../types';

import { MentionLink } from './MentionLink';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };
const resolve = () => ({ status: 'unavailable' }) as const;

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const mount = (node: ReactNode): HTMLElement => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    act(() => root.render(node));
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    return container;
};

describe('an unavailable mention', () => {
    const display = mentionDisplay(JANE, { resolve, trigger: '@' });

    it('is text with the note after its isolated name, and no tab stop', () => {
        const container = mount(<MentionLink value={JANE} display={display} />);
        const mention = container.querySelector('span[data-mention-id]');

        expect(mention?.textContent).toBe('@jane (unavailable)');
        expect(mention?.querySelector('bdi')?.textContent).toBe('@jane');
        expect(mention?.hasAttribute('tabindex')).toBe(false);
    });

    it('says the note in the labels it is given when it is read', () => {
        const Component = mentionContent({ resolve, labels: { unavailable: '(indisponible)' } }).inlines?.mention
            ?.render?.component;
        if (!Component) {
            throw new Error('no reading view');
        }
        const container = mount(<Component value={JANE} />);

        expect(container.querySelector('span[data-mention-id]')?.textContent).toBe('@jane (indisponible)');
    });

    it('stays out of the tab order in the reading view', () => {
        const Component = mentionContent({ resolve }).inlines?.mention?.render?.component;
        if (!Component) {
            throw new Error('no reading view');
        }
        const container = mount(<Component value={JANE} />);

        expect(container.querySelector('span[data-mention-id]')?.hasAttribute('tabindex')).toBe(false);
    });
});

describe('a mention stored with a field of the wrong type', () => {
    it('is drawn without throwing, named by its kind and with no kind attribute', () => {
        // Stored documents are not validated, so a field can be missing or the wrong type.
        const wrongType = { id: 'x', username: 7, name: 'X', kind: 7 } as unknown as MentionValue;
        const display = mentionDisplay(wrongType, { trigger: '@' });
        const container = mount(<MentionLink value={wrongType} display={display} />);

        expect(container.querySelector('[data-mention-id]')?.textContent).toBe('Unknown person');
        expect(container.querySelector('[data-mention-kind]')).toBeNull();
    });
});
