/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The ports: the contracts between the layers that carry work out. The domain
 * says what a document and a plugin are; a port says how something gets *done*
 * to one. Two of them, and each has a named side on either end:
 *
 * - `editorEngine.ts` — `CreateEditor` / `EditorOptions` / `EditorHandle`.
 *   Implemented by `adapters/prosemirror/`, driven by `ui/useEditorHandle.ts`.
 *   Neither side imports the other, so swapping the engine means writing one more
 *   `CreateEditor`.
 * - `renderProbe.ts` — `RenderProbe` and the DOM description it produces.
 *   Implemented by `adapters/reactProbe/`, called by the engine adapter's schema
 *   builder, so that hosting a document and rendering React stay separate jobs.
 *
 * They import from the domain and from nothing else, so an implementation on
 * either side is a new module rather than a change here.
 */

export {
    type CreateEditor,
    type EditorHandle,
    type EditorOptions,
    type FloatingPlacement,
    type FloatingRect,
} from './editorEngine';
export { CONTENT_SLOT, type DomChild, type DomElement, type ProbedDom, type RenderProbe } from './renderProbe';
