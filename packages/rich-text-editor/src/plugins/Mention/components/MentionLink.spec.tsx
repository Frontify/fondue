/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { type EditorControlApi } from '#/core';

import { mentionDisplay } from '../helpers/display';
import { DEFAULT_MENTION_CONTENT_LABELS } from '../helpers/labels';
import { mentionContent } from '../Mention';
import { type MentionValue } from '../types';

import { MentionEditor } from './MentionEditor';
import { MentionLink } from './MentionLink';
import { DEFAULT_MENTION_PICKER_LABELS } from './pickerLabels';

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
        const container = mount(<MentionLink value={JANE} display={display} placesCaret={false} />);
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
                labels={{ ...DEFAULT_MENTION_CONTENT_LABELS, ...DEFAULT_MENTION_PICKER_LABELS }}
                remove={() => {}}
                api={{} as EditorControlApi}
                items={() => []}
                trigger="@"
                href={href}
                resolve={undefined}
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
