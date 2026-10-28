/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createScopeContext, holdScope, listenScope, scopeActive, subscribeScope } from './scopeContext';

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

/** A scope over `roots`, read each call; it listens in the document only while `listen` has engaged it or a `hold` is open. */
export const createInteractionScope = (roots: () => readonly (HTMLElement | null)[]): InteractionScope => {
    const context = createScopeContext(roots);

    return {
        contains: (node) => context.contains(node),
        active: () => scopeActive(context),
        last: () => context.last,
        pressed: () => context.pressed,
        subscribe: (listener) => subscribeScope(context, listener),
        hold: () => holdScope(context),
        listen: (elements) => listenScope(context, elements),
    };
};
