/* (c) Copyright Frontify Ltd., all rights reserved. */

const CONTROLS = 'input, textarea, select, button';
// Drop-target events over chrome stay stopped, so ProseMirror never accepts a drop it would then not receive.
const DRAG_SOURCE_EVENTS: ReadonlySet<string> = new Set(['dragstart', 'drag', 'dragend']);
// A control with no text to copy, whose copy and cut events the editor's own selection owns.
const TEXTLESS_CONTROLS = 'input[type="checkbox"], input[type="radio"], button';
const CLIPBOARD_SOURCE_EVENTS: ReadonlySet<string> = new Set(['copy', 'cut']);

/** Whether `target` sits in an interactive control of the chrome, which keeps its own events. */
const inControl = (chrome: HTMLElement, target: Node) => {
    let element: Element | null = target.parentElement;
    if (target instanceof Element) {
        element = target;
    }

    const control = element?.closest(CONTROLS);

    return control !== null && control !== undefined && chrome.contains(control);
};

/** A change the view's mutation observer reports, or a selection change it reports in the same shape. */
type ViewMutation = MutationRecord | { readonly type: 'selection'; readonly target: Node };

export const sameTags = (a: readonly HTMLElement[], b: readonly HTMLElement[]) =>
    a.length === b.length && a.every((layer, index) => layer.tagName === b[index]?.tagName);

const attributesOf = (element: HTMLElement | undefined): readonly Attr[] => {
    if (element === undefined) {
        return [];
    }

    return [...element.attributes];
};

/** Gives each of `layers` the attributes of the same element of `fresh`, and drops those `fresh` no longer writes. */
export const syncLayers = (
    layers: readonly HTMLElement[],
    shown: readonly HTMLElement[],
    fresh: readonly HTMLElement[],
) => {
    for (const [index, layer] of layers.entries()) {
        const next = fresh[index];
        for (const { name } of attributesOf(shown[index])) {
            if (next?.hasAttribute(name) !== true) {
                layer.removeAttribute(name);
            }
        }

        for (const { name, value } of attributesOf(next)) {
            layer.setAttribute(name, value);
        }
    }
};

/** Moves `contentDOM` between its home and a slot of the chrome, and counts the moves ProseMirror must not read as edits. */
export const createPlacement = (chrome: HTMLElement, contentDOM: HTMLElement | null) => {
    const parent = contentDOM?.parentElement;
    const home = parent ?? null;
    // Each move here mutates one element outside the chrome, which the view must not read as an edit.
    let moves = 0;
    const place = (target: HTMLElement | null) => {
        if (contentDOM === null) {
            return;
        }

        if (target === null) {
            chrome.setAttribute('contenteditable', 'false');
            if (home !== null && contentDOM.parentElement !== home) {
                moves += 1;
                home.append(contentDOM);
            }

            return;
        }

        // Content under a non-editable element becomes its own editing host, whose focus the surface never sees.
        chrome.removeAttribute('contenteditable');
        if (contentDOM.parentElement === home) {
            moves += 1;
        }

        target.append(contentDOM);
    };

    const movedContent = (mutation: ViewMutation) => {
        if (moves === 0 || contentDOM === null || mutation.type !== 'childList') {
            return false;
        }

        if (![...mutation.addedNodes, ...mutation.removedNodes].includes(contentDOM)) {
            return false;
        }

        moves -= 1;

        return true;
    };

    return { place, movedContent };
};

/** The parts of one node view's DOM that its event and mutation checks read. */
export type ViewDom = {
    readonly dom: HTMLElement;
    readonly chrome: HTMLElement;
    readonly contentDOM: HTMLElement | null;
    readonly layers: readonly HTMLElement[];
};

// Chrome mutations are React's; ProseMirror reads the rest, a removed `contentDOM` included.
export const ignoresMutation = (
    { chrome, contentDOM, layers }: ViewDom,
    mutation: ViewMutation,
    movedContent: (mutation: ViewMutation) => boolean,
): boolean => {
    if (mutation.type === 'selection') {
        return false;
    }

    if (contentDOM?.contains(mutation.target) === true) {
        return mutation.type === 'attributes' && mutation.target === contentDOM;
    }

    if (mutation.type === 'attributes' && layers.includes(mutation.target as HTMLElement)) {
        return true;
    }

    return chrome.contains(mutation.target) || movedContent(mutation);
};

export const stopsEvent = ({ dom, chrome, contentDOM }: ViewDom, event: Event): boolean => {
    const { target } = event;
    if (!(target instanceof Node) || !chrome.contains(target) || contentDOM?.contains(target) === true) {
        return false;
    }

    // A selected node's copy comes from the first control the browser finds inside it, such as a task checkbox.
    if (CLIPBOARD_SOURCE_EVENTS.has(event.type) && target instanceof Element && target.matches(TEXTLESS_CONTROLS)) {
        return false;
    }

    // A draggable node drags from its chrome, as ProseMirror's default and Tiptap's NodeView let drag events through.
    return !DRAG_SOURCE_EVENTS.has(event.type) || !dom.draggable || inControl(chrome, target);
};
