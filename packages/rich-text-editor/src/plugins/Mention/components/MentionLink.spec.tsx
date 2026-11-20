/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { type EditorControlApi } from '#/core';

import { mentionDisplay } from '../helpers/display';
import { mentionContent } from '../Mention';
import { type MentionValue } from '../types';

import { MentionEditor } from './MentionEditor';
import { MentionLink } from './MentionLink';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const JANE = { id: 'jane', username: 'jane', name: 'Jane Doe' };

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

describe('a mention with nowhere to link to', () => {
    it('is text with its name isolated, and no tab stop', () => {
        const container = mount(
            <MentionLink value={JANE} display={mentionDisplay(JANE, { trigger: '@' })} placesCaret={false} />,
        );
        const mention = container.querySelector('span[data-mention-id]');

        expect(mention?.textContent).toBe('@jane');
        expect(mention?.querySelector('bdi')?.textContent).toBe('@jane');
        expect(mention?.hasAttribute('tabindex')).toBe(false);
    });

    it('stays out of the tab order in the reading view', () => {
        const Component = mentionContent().inlines?.mention?.render?.component;
        if (!Component) {
            throw new Error('no reading view');
        }
        const container = mount(<Component value={JANE} />);

        expect(container.querySelector('span[data-mention-id]')?.hasAttribute('tabindex')).toBe(false);
    });
});

describe('a click on a linked mention', () => {
    const href = (mention: MentionValue): string => `/people/${mention.id}`;

    const click = (container: HTMLElement): MouseEvent => {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        act(() => {
            container.querySelector('a')?.dispatchEvent(event);
        });
        return event;
    };

    const mountEditor = (): HTMLElement =>
        mount(
            <MentionEditor
                value={JANE}
                setValue={() => {}}
                isFocused={false}
                isSelected={false}
                isOpen={false}
                setOpen={() => {}}
                remove={() => {}}
                // The click never reaches the editor's commands.
                api={{} as EditorControlApi}
                items={() => []}
                trigger="@"
                href={href}
            />,
        );

    it('places the caret in the editor, leaving the link unfollowed', () => {
        expect(click(mountEditor()).defaultPrevented).toBe(true);
    });

    it('follows the link in the reading view', () => {
        const Component = mentionContent({ href }).inlines?.mention?.render?.component;
        if (!Component) {
            throw new Error('no reading view');
        }
        const container = mount(<Component value={JANE} />);

        expect(click(container).defaultPrevented).toBe(false);
    });
});

describe('a mention stored with a field of the wrong type', () => {
    it('is drawn without throwing, named by its kind and with no kind attribute', () => {
        // Stored documents are not validated, so a field can be missing or the wrong type.
        const wrongType = { id: 'x', username: 7, name: 'X', kind: 7 } as unknown as MentionValue;
        const display = mentionDisplay(wrongType, { trigger: '@' });
        const container = mount(<MentionLink value={wrongType} display={display} placesCaret={false} />);

        expect(container.querySelector('[data-mention-id]')?.textContent).toBe('Unknown person');
        expect(container.querySelector('[data-mention-kind]')).toBeNull();
    });
});
