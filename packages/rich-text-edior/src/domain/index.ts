/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The domain: every contract the editor is built on, and nothing that knows how
 * any of it is carried out. It imports from no other layer — the ports, the
 * adapters, the React shell and the plugins all import from here, which is what
 * makes an engine swap a rewrite of one adapter folder.
 *
 * The document format lives in `document.ts`, what a plugin declares in
 * `schema.ts` and `plugin.ts`, the verbs a plugin acts through in `commands.ts`,
 * and the few names and attributes the core itself depends on in `vocabulary.ts`
 * and `protocol.ts`.
 *
 * This is also the surface a plugin may import (enforced by the linter), and the
 * same set the package root re-exports — so anything a shipped plugin does, an
 * external plugin author can do too.
 */

export { type EditorControlApi, type RteSelectionSnapshot } from './commands';
export {
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
} from './document';
export {
    type FloatingAnchor,
    type FloatingContext,
    type FloatingKeyHandler,
    type FloatingSpec,
    type RteInputRule,
    type RtePlugin,
} from './plugin';
export { TOGGLE_ATTRIBUTE, toggles } from './protocol';
export {
    type AttributeSpec,
    type BlockAttributeSpec,
    type BlockSpec,
    type InlineSpec,
    type MarkSpec,
    type ParseRule,
} from './schema';
export { ANY_LIST, DOCUMENT_VERSION, emptyDocument, PARAGRAPH } from './vocabulary';
