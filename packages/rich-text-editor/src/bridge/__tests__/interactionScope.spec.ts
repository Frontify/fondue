/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createInteractionScope, type InteractionScope } from '../interactionScope';

/** The net count of capture listeners on `document` by event type. */
const watchDocumentListeners = () => {
    const live = new Map<string, number>();
    const add = document.addEventListener.bind(document);
    const remove = document.removeEventListener.bind(document);
    vi.spyOn(document, 'addEventListener').mockImplementation((type, listener, options) => {
        live.set(type, (live.get(type) ?? 0) + 1);
        add(type, listener, options);
    });
    vi.spyOn(document, 'removeEventListener').mockImplementation((type, listener, options) => {
        live.set(type, (live.get(type) ?? 0) - 1);
        remove(type, listener, options);
    });
    return () => Object.fromEntries([...live].filter(([, count]) => count > 0));
};

const EVENT_TYPES = ['focusin', 'focusout', 'keydown', 'pointercancel', 'pointerdown', 'pointerup'];

interface Editor {
    readonly root: HTMLElement;
    readonly inside: HTMLButtonElement;
    readonly scope: InteractionScope;
    readonly stop: () => void;
}

const editor = (): Editor => {
    const root = document.createElement('div');
    const inside = document.createElement('button');
    root.append(inside);
    document.body.append(root);
    const scope = createInteractionScope(() => [root]);
    return { root, inside, scope, stop: scope.listen([root]) };
};

const outside = document.createElement('button');
let editors: Editor[] = [];

beforeEach(() => {
    document.body.append(outside);
});
afterEach(() => {
    for (const { stop, root } of editors) {
        stop();
        root.remove();
    }
    editors = [];
    outside.remove();
    vi.restoreAllMocks();
});

const mount = () => {
    const created = editor();
    editors.push(created);
    return created;
};

describe('an interaction scope', () => {
    it('listens on the document from the first focus inside it and records that focus', () => {
        const counts = watchDocumentListeners();
        const { inside, scope } = mount();
        const listened = vi.fn();
        scope.subscribe(listened);

        expect(counts()).toEqual({});

        inside.focus();

        expect(Object.keys(counts()).sort()).toEqual(EVENT_TYPES);
        expect(scope.last()).toEqual({ kind: 'focus', target: inside });
        expect(listened).toHaveBeenCalledTimes(1);
    });

    it('records keys and presses while focus is inside, and stops listening when focus moves outside', () => {
        const counts = watchDocumentListeners();
        const { inside, scope } = mount();
        const listened = vi.fn();
        scope.subscribe(listened);
        inside.focus();

        inside.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, composed: true }));
        expect(scope.last()).toEqual({ kind: 'key', target: inside });

        outside.focus();

        // The move out of the scope is told once, and nothing after it is heard.
        expect(listened).toHaveBeenCalledTimes(2);
        expect(counts()).toEqual({});
        outside.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true, composed: true }));
        expect(scope.last()).toEqual({ kind: 'focus', target: outside });
    });

    it('listens from a press inside the scope and stops at its end when focus stays outside', () => {
        const counts = watchDocumentListeners();
        const { root, scope } = mount();
        outside.focus();

        root.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));

        expect(Object.keys(counts()).sort()).toEqual(EVENT_TYPES);
        expect(scope.last()).toEqual({ kind: 'pointer', target: root });
        expect(scope.pressed()).toBe(root);

        root.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));

        expect(scope.pressed()).toBeNull();
        expect(counts()).toEqual({});
    });

    it('shares one document listener per event type between the scopes in use', () => {
        const counts = watchDocumentListeners();
        const first = mount();
        const second = mount();

        first.inside.focus();
        second.inside.focus();

        expect(Object.values(counts()).every((count) => count === 1)).toBe(true);
        expect(Object.keys(counts()).sort()).toEqual(EVENT_TYPES);

        outside.focus();
        expect(counts()).toEqual({});
    });

    it('keeps listening while an overlay holds it, so a press outside still closes the overlay, and stops at the release', () => {
        const counts = watchDocumentListeners();
        const { scope } = mount();
        outside.focus();

        const release = scope.hold();

        expect(Object.keys(counts()).sort()).toEqual(EVENT_TYPES);
        outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
        outside.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
        expect(scope.last()).toEqual({ kind: 'pointer', target: outside });
        expect(Object.keys(counts()).sort()).toEqual(EVENT_TYPES);

        release();
        release();

        expect(counts()).toEqual({});
    });

    it('listens at once when focus is already inside the scope', () => {
        const root = document.createElement('div');
        const inside = document.createElement('button');
        root.append(inside);
        document.body.append(root);
        inside.focus();
        const counts = watchDocumentListeners();
        const scope = createInteractionScope(() => [root]);
        const stop = scope.listen([root]);

        expect(Object.keys(counts()).sort()).toEqual(EVENT_TYPES);
        expect(scope.last()).toEqual({ kind: 'focus', target: inside });

        stop();
        expect(counts()).toEqual({});
        root.remove();
    });
});
