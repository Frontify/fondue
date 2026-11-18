/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { type EditorControlApi } from '#/core';

import { mentionContent } from '../Mention';
import { type MentionValue } from '../types';

import { MentionEditor } from './MentionEditor';

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

describe('a click on a linked mention', () => {
    const href = (mention: MentionValue): string => `/people/${mention.id}`;

    const click = (container: HTMLElement): MouseEvent => {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        act(() => {
            container.querySelector('a')?.dispatchEvent(event);
        });
        return event;
    };

    const mountEditor = (editing: boolean): HTMLElement =>
        mount(
            <MentionEditor
                value={JANE}
                setValue={() => {}}
                isFocused={false}
                isSelected={false}
                isOpen={false}
                editing={editing}
                setOpen={() => {}}
                remove={() => {}}
                // The click never reaches the editor's commands.
                api={{} as EditorControlApi}
                items={() => []}
                trigger="@"
                href={href}
            />,
        );

    it('places the caret, leaving the link unfollowed, while the editor takes edits', () => {
        expect(click(mountEditor(true)).defaultPrevented).toBe(true);
    });

    it('follows the link when the editor is read-only', () => {
        expect(click(mountEditor(false)).defaultPrevented).toBe(false);
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
