/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { mentionDisplay } from '../helpers/display';
import { mentionContent } from '../Mention';

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

    it('takes keyboard focus in the reading view, so its tooltip opens', () => {
        const container = mount(<MentionLink value={JANE} display={display} focusableWhenUnlinked />);

        expect(container.querySelector('span[data-mention-id]')?.getAttribute('tabindex')).toBe('0');
    });

    it('stays out of the tab order in the editor', () => {
        const container = mount(<MentionLink value={JANE} display={display} />);

        expect(container.querySelector('span[data-mention-id]')?.hasAttribute('tabindex')).toBe(false);
    });

    it('is focusable through the content the reading view renders', () => {
        const Component = mentionContent({ resolve }).inlines?.mention?.render?.component;
        if (!Component) {
            throw new Error('no reading view');
        }
        const container = mount(<Component value={JANE} />);

        expect(container.querySelector('span[data-mention-id]')?.getAttribute('tabindex')).toBe('0');
    });
});
