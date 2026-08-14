/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

/**
 * Plugins declare how things look as React render functions; an engine hosting
 * a contenteditable wants a static description of the DOM to build. This is the
 * contract between the two: the React shell supplies an implementation, the
 * engine adapter only calls it.
 */

/** A child of a described element: text, the content slot (`0`), or another element. */
export type DomChild = string | 0 | DomElement;

/** One element: its tag, its attributes, then its children. */
export type DomElement = [string, Record<string, string>, ...DomChild[]];

/**
 * What a probed render is worth knowing: the whole tree it produced, plus the
 * root tag on its own — a mark is recognized when pasting by the tag it
 * renders.
 */
export type ProbedDom = {
    tag: string;
    element: DomElement;
};

/**
 * Passed to a render function as its `children`, and recognized again in what
 * the render produced. The slot must be the only thing inside its own element:
 * content with siblings has nowhere to go, and a probe throws rather than
 * quietly dropping it.
 */
export const CONTENT_SLOT = ' RTE_HOLE ';

/**
 * Renders one node and describes the result. Throws when the render produced no
 * element at all, or put anything beside the content slot.
 */
export type RenderProbe = (render: () => ReactNode) => ProbedDom;
