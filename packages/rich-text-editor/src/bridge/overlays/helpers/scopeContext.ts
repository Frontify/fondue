/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Interaction } from './interactionScope';

/** The focused element, followed into open shadow roots, since a shadow host takes focus for what it holds. */
const deepActive = (owner: Document): Element | null => {
    let active = owner.activeElement;
    while (active !== null && active.shadowRoot !== null && active.shadowRoot.activeElement !== null) {
        active = active.shadowRoot.activeElement;
    }

    return active;
};

const EVENTS = ['pointerdown', 'pointerup', 'pointercancel', 'keydown', 'focusin', 'focusout'] as const;
type EventType = (typeof EVENTS)[number];
type Handlers = Readonly<Record<EventType, (event: Event) => void>>;

/** The one capture listener per event type that every scope engaged in a document shares. */
type Hub = {
    scopes: Set<Handlers>;
    listeners: ReadonlyMap<EventType, EventListener>;
};
const hubs = new WeakMap<Document, Hub>();

const hubOf = (owner: Document): Hub => {
    let hub = hubs.get(owner);
    if (hub === undefined) {
        const scopes = new Set<Handlers>();
        const listeners = new Map<EventType, EventListener>(
            EVENTS.map((type) => [
                type,
                (event: Event) => {
                    for (const handlers of [...scopes]) {
                        handlers[type](event);
                    }
                },
            ]),
        );
        hub = { scopes, listeners };
        hubs.set(owner, hub);
    }

    return hub;
};

/** Adds `handlers` to the document's listeners, which exist only while a scope is joined; returns the leave. */
const join = (owner: Document, handlers: Handlers): (() => void) => {
    const hub = hubOf(owner);
    if (hub.scopes.size === 0) {
        // Capture runs before the overlays' own listeners, which close them on an outside press or focus.
        for (const [type, listener] of hub.listeners) {
            owner.addEventListener(type, listener, true);
        }
    }

    hub.scopes.add(handlers);

    return () => {
        hub.scopes.delete(handlers);
        if (hub.scopes.size === 0) {
            for (const [type, listener] of hub.listeners) {
                owner.removeEventListener(type, listener, true);
            }
        }
    };
};

/** The first node of the event's composed path, since a shadow root retargets events to its host; null for none. */
const targetOf = (event: Event): Node | null => {
    const [target] = event.composedPath();
    // A node of an iframe's document is no `Node` of this window.
    if (target !== undefined && 'nodeType' in target) {
        return target as Node;
    }

    return null;
};

/** Calls `engage` on the first focus or press in any of `elements`; returns the removal. */
const engageOn = (elements: readonly HTMLElement[], engage: (event: Event) => void): (() => void) => {
    for (const element of elements) {
        element.addEventListener('focusin', engage, true);
        element.addEventListener('pointerdown', engage, true);
    }

    return () => {
        for (const element of elements) {
            element.removeEventListener('focusin', engage, true);
            element.removeEventListener('pointerdown', engage, true);
        }
    };
};

/** The mutable record of one scope: its last interaction, who listens, and whether a hold keeps it engaged. */
export type ScopeContext = {
    last: Interaction;
    pressed: Node | null;
    listened: Document | undefined;
    startNow: (() => void) | undefined;
    stopUnlessInside: (() => void) | undefined;
    holds: number;
    listeners: Set<() => void>;
    contains: (node: Node | null) => boolean;
};

/** A scope over `roots`, read each call, before it listens. */
export const createScopeContext = (roots: () => readonly (HTMLElement | null)[]): ScopeContext => ({
    last: { kind: 'focus', target: null },
    pressed: null,
    listened: undefined,
    startNow: undefined,
    stopUnlessInside: undefined,
    holds: 0,
    listeners: new Set(),
    contains: (node) => node !== null && roots().some((root) => root !== null && root.contains(node)),
});

const notifyScope = (context: ScopeContext) => {
    for (const listener of [...context.listeners]) {
        listener();
    }
};

/** The focused element in the scope's document, followed into shadow roots, or null before it listens. */
export const scopeActive = (context: ScopeContext): Element | null => {
    if (context.listened === undefined) {
        return null;
    }

    return deepActive(context.listened);
};

/** Calls `listener` after each focus move in the scope's document; returns the removal. */
export const subscribeScope = (context: ScopeContext, listener: () => void): (() => void) => {
    context.listeners.add(listener);

    return () => {
        context.listeners.delete(listener);
    };
};

/** Keeps the scope listening until the returned release. A second release does nothing. */
export const holdScope = (context: ScopeContext): (() => void) => {
    context.holds += 1;
    context.startNow?.();
    let released = false;

    return () => {
        if (released) {
            return;
        }

        released = true;
        context.holds -= 1;
        context.stopUnlessInside?.();
    };
};

const handlersFor = (context: ScopeContext, owner: Document, end: (force?: boolean) => void): Handlers => {
    const record = (kind: Interaction['kind']) => (event: Event) => {
        context.last = { kind, target: targetOf(event) };
    };

    const onPointer = record('pointer');
    const onFocus = record('focus');
    const release = () => {
        context.pressed = null;
        if (!context.contains(deepActive(owner))) {
            end();
        }
    };

    return {
        pointerdown: (event) => {
            onPointer(event);
            context.pressed = context.last.target;
        },
        pointerup: release,
        pointercancel: release,
        keydown: record('key'),
        focusin: (event) => {
            onFocus(event);
            notifyScope(context);
            if (!context.contains(context.last.target)) {
                end();
            }
        },
        // A move between two elements also fires `focusin`, so only a move to nowhere notifies here.
        focusout: (event) => {
            if ((event as FocusEvent).relatedTarget === null) {
                notifyScope(context);
                end();
            }
        },
    };
};

/**
 * Starts listening in the document of `elements`, also inside an iframe, once focus or a press reaches one of them,
 * and stops when focus leaves the scope; returns the removal.
 */
export const listenScope = (context: ScopeContext, elements: readonly HTMLElement[]): (() => void) => {
    const [first] = elements;
    if (first === undefined) {
        return () => undefined;
    }

    const owner = first.ownerDocument;
    context.listened = owner;
    let leave: (() => void) | undefined;
    // Focus or a press that ends outside the scope ends the interaction, and the document listeners with it.
    const end = (force = false) => {
        if (context.holds > 0 && !force) {
            return;
        }

        leave?.();
        leave = undefined;
        context.pressed = null;
    };

    const handlers = handlersFor(context, owner, end);
    // The document listeners start with the first focus or press inside the scope, which the hub has not heard of yet.
    const engage = (event: Event) => {
        if (leave !== undefined) {
            return;
        }

        leave = join(owner, handlers);
        handlers[event.type as EventType](event);
    };

    // What `hold` needs of the running listen: to start listening now, and to stop if nothing keeps it.
    context.startNow = () => {
        if (leave === undefined) {
            leave = join(owner, handlers);
        }
    };

    context.stopUnlessInside = () => {
        if (!context.contains(deepActive(owner))) {
            end();
        }
    };

    if (context.holds > 0) {
        context.startNow();
    }

    const disengage = engageOn(elements, engage);
    // Focus already inside the scope, as with an editor that mounts focused, engages it now.
    const focused = deepActive(owner);
    if (context.contains(focused)) {
        context.last = { kind: 'focus', target: focused };
        leave = join(owner, handlers);
    }

    return () => {
        disengage();
        end(true);
        context.startNow = undefined;
        context.stopUnlessInside = undefined;
        context.listened = undefined;
    };
};
