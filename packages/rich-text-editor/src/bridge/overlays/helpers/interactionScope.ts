/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The last focus move, pointer press or key in the editor's document, with its innermost target through shadow roots. */
export type Interaction = {
    kind: 'focus' | 'pointer' | 'key';
    target: Node | null;
};

/**
 * The editor's root, the host's portal container and the roots the host registers, between which focus and pointer
 * moves stay inside the editor, so no editor overlay closes for them.
 */
export type InteractionScope = {
    contains(node: Node | null): boolean;
    /** The focused element in the editor's document, followed into shadow roots. */
    active(): Element | null;
    /** The last interaction, which tells an overlay's close request from a move inside the scope. */
    last(): Interaction;
    /** The target of the pointer press still held, else `null`. */
    pressed(): Node | null;
    /** Calls `listener` after each focus move in the editor's document. */
    subscribe(listener: () => void): () => void;
    /** Keeps the scope listening, as an open overlay does, until the returned release; the scope is then listening. */
    hold(): () => void;
    /**
     * Starts listening in the document of `elements`, also inside an iframe, once focus or a press reaches one of them,
     * and stops when focus leaves the scope; returns the removal.
     */
    listen(elements: readonly HTMLElement[]): () => void;
};

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

/** A scope over `roots`, read each call; it listens in the document only while `listen` has engaged it or a `hold` is open. */
export const createInteractionScope = (roots: () => readonly (HTMLElement | null)[]): InteractionScope => {
    let last: Interaction = { kind: 'focus', target: null };
    let pressed: Node | null = null;
    let listened: Document | undefined;
    // What `hold` needs of the running `listen`: to start listening now, and to stop if nothing keeps it.
    let startNow: (() => void) | undefined;
    let stopUnlessInside: (() => void) | undefined;
    let holds = 0;
    const listeners = new Set<() => void>();
    const contains = (node: Node | null) =>
        node !== null && roots().some((root) => root !== null && root.contains(node));
    const notify = () => {
        for (const listener of [...listeners]) {
            listener();
        }
    };

    return {
        contains,
        active: () => {
            if (listened === undefined) {
                return null;
            }

            return deepActive(listened);
        },
        last: () => last,
        pressed: () => pressed,
        subscribe: (listener) => {
            listeners.add(listener);

            return () => {
                listeners.delete(listener);
            };
        },
        hold: () => {
            holds += 1;
            startNow?.();
            let released = false;

            return () => {
                if (released) {
                    return;
                }

                released = true;
                holds -= 1;
                stopUnlessInside?.();
            };
        },
        listen: (elements) => {
            const [first] = elements;
            if (first === undefined) {
                return () => undefined;
            }

            const owner = first.ownerDocument;
            listened = owner;
            const record = (kind: Interaction['kind']) => (event: Event) => {
                last = { kind, target: targetOf(event) };
            };

            const onPointer = record('pointer');
            const onFocus = record('focus');
            let leave: (() => void) | undefined;
            // Focus or a press that ends outside the scope ends the interaction, and the document listeners with it.
            const end = (force = false) => {
                if (holds > 0 && !force) {
                    return;
                }

                leave?.();
                leave = undefined;
                pressed = null;
            };

            const release = () => {
                pressed = null;
                if (!contains(deepActive(owner))) {
                    end();
                }
            };

            const handlers: Handlers = {
                pointerdown: (event) => {
                    onPointer(event);
                    pressed = last.target;
                },
                pointerup: release,
                pointercancel: release,
                keydown: record('key'),
                focusin: (event) => {
                    onFocus(event);
                    notify();
                    if (!contains(last.target)) {
                        end();
                    }
                },
                // A move between two elements also fires `focusin`, so only a move to nowhere notifies here.
                focusout: (event) => {
                    if ((event as FocusEvent).relatedTarget === null) {
                        notify();
                        end();
                    }
                },
            };
            // The document listeners start with the first focus or press inside the scope, which the hub has not heard of yet.
            const engage = (event: Event) => {
                if (leave !== undefined) {
                    return;
                }

                leave = join(owner, handlers);
                handlers[event.type as EventType](event);
            };

            startNow = () => {
                if (leave === undefined) {
                    leave = join(owner, handlers);
                }
            };

            stopUnlessInside = () => {
                if (!contains(deepActive(owner))) {
                    end();
                }
            };

            if (holds > 0) {
                startNow();
            }

            const disengage = engageOn(elements, engage);

            // Focus already inside the scope, as with an editor that mounts focused, engages it now.
            const focused = deepActive(owner);
            if (contains(focused)) {
                last = { kind: 'focus', target: focused };
                leave = join(owner, handlers);
            }

            return () => {
                disengage();
                end(true);
                startNow = undefined;
                stopUnlessInside = undefined;
                listened = undefined;
            };
        },
    };
};
