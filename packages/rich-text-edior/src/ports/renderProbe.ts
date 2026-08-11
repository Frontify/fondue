/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

/**
 * Plugins declare how things look as React render functions; an engine hosting a
 * contenteditable wants a static description of the DOM to build. This is the
 * contract between the two, so that neither side has to know the other: the
 * React shell supplies an implementation, the engine adapter only calls it.
 */

/** A child of a described element: text, the content slot (`0`), or another element. */
export type DomChild = string | 0 | DomElement;

/**
 * A static description of one element: its tag, its attributes, and its children,
 * with `0` marking the single slot the editable content goes into.
 */
export type DomElement = [string, Record<string, string>, ...DomChild[]];

/** The root element's tag and attributes, plus the whole tree the render produced. */
export type ProbedDom = {
    tag: string;
    attrs: Record<string, string>;
    element: DomElement;
};

/**
 * Passed to a render function as its `children`, and recognized again in what the
 * render produced. The slot must be the only thing inside its own element —
 * content with siblings has nowhere to go, and a probe says so rather than
 * quietly dropping what cannot be placed.
 */
export const CONTENT_SLOT = ' RTE_HOLE ';

/**
 * Renders one node and describes the result. Throws when the render produced no
 * element at all, or put anything beside the content slot.
 */
export type RenderProbe = (render: () => ReactNode) => ProbedDom;
