/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The domain: every contract the editor is built on, and nothing that knows how
 * any of it is carried out. It imports from no other layer; the ports, the
 * adapters, the React shell and the plugins all import from here.
 *
 * - `document.ts`   — the document format
 * - `schema.ts`     — what a plugin declares exists
 * - `plugin.ts`     — the plugin object itself, its keys and its floating UI
 * - `commands.ts`   — the verbs a plugin acts through
 * - `vocabulary.ts`, `protocol.ts` — the few names the core itself depends on
 *
 * This is the surface a plugin may import, enforced by the linter. The package
 * root re-exports only the four types an external plugin author has to name;
 * the rest is contextually typed inside the `RtePlugin` literal, and the
 * constants are conveniences a shipped plugin uses in place of a string
 * literal.
 */

export { type EditorControlApi, type RteSelectionSnapshot } from './commands';
export {
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
    type StoredMarkValue,
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
