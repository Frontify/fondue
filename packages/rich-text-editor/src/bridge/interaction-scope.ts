/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The last focus move, pointer press or key in the editor's document, with its innermost target through shadow roots. */
export interface Interaction {
    readonly kind: 'focus' | 'pointer' | 'key';
    readonly target: Node | null;
}

/**
 * The editor's root, the host's portal container and the roots the host registers, between which focus and pointer
 * moves stay inside the editor, so no editor overlay closes for them (SPEC-rich-text-react/AC-047, AC-048).
 */
export interface InteractionScope {
    contains(node: Node | null): boolean;
    /** The focused element in the editor's document, followed into shadow roots. */
    active(): Element | null;
    /** The last interaction, which tells an overlay's close request from a move inside the scope. */
    last(): Interaction;
    /** Calls `listener` after each focus move in the editor's document. */
    subscribe(listener: () => void): () => void;
    /** Listens on the document that holds the editor's root, also inside an iframe; returns the removal. */
    listen(owner: Document): () => void;
}

/** The focused element, followed into open shadow roots, since a shadow host takes focus for what it holds. */
const deepActive = (owner: Document): Element | null => {
    let active = owner.activeElement;
    while (active !== null && active.shadowRoot !== null && active.shadowRoot.activeElement !== null) {
        active = active.shadowRoot.activeElement;
    }
    return active;
};

export const createInteractionScope = (roots: () => readonly (HTMLElement | null)[]): InteractionScope => {
    let last: Interaction = { kind: 'focus', target: null };
    let listened: Document | undefined;
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
        subscribe: (listener) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
        listen: (owner) => {
            listened = owner;
            // The first node of the composed path, since a shadow root retargets events to its host.
            const record = (kind: Interaction['kind']) => (event: Event) => {
                const [target] = event.composedPath();
                // A node of an iframe's document is no `Node` of this window.
                let node: Node | null = null;
                if (target !== undefined && 'nodeType' in target) {
                    node = target as Node;
                }
                last = { kind, target: node };
            };
            const onPointer = record('pointer');
            const onKey = record('key');
            const onFocus = record('focus');
            const onFocusIn = (event: FocusEvent) => {
                onFocus(event);
                notify();
            };
            // A move between two elements also fires `focusin`, so only a move to nowhere notifies here.
            const onFocusOut = (event: FocusEvent) => {
                if (event.relatedTarget === null) {
                    notify();
                }
            };
            // Capture runs before the overlays' own listeners, which close them on an outside press or focus.
            owner.addEventListener('pointerdown', onPointer, true);
            owner.addEventListener('keydown', onKey, true);
            owner.addEventListener('focusin', onFocusIn, true);
            owner.addEventListener('focusout', onFocusOut, true);
            return () => {
                owner.removeEventListener('pointerdown', onPointer, true);
                owner.removeEventListener('keydown', onKey, true);
                owner.removeEventListener('focusin', onFocusIn, true);
                owner.removeEventListener('focusout', onFocusOut, true);
                listened = undefined;
            };
        },
    };
};
