/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The ports: the contracts between the layers that carry work out. The domain
 * says what a document and a plugin are; these say how a live editor is driven
 * (`editorEngine.ts`) and how a plugin's rendering is turned into DOM
 * (`renderProbe.ts`).
 *
 * They import from the domain and from nothing else, so an implementation on
 * either side — a different engine, a different way of probing a render — is a
 * new module rather than a change here.
 */

export {
    type CreateEditor,
    type EditorHandle,
    type EditorOptions,
    type FloatingPlacement,
    type FloatingRect,
} from './editorEngine';
export { CONTENT_SLOT, type DomChild, type DomElement, type ProbedDom, type RenderProbe } from './renderProbe';
