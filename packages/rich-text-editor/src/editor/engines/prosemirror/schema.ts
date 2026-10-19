/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkSpec as PmMarkSpec, type NodeSpec as PmNodeSpec, Schema } from 'prosemirror-model';

import {
    ANY_LIST,
    type BlockDefinition,
    blockHtml,
    type InlineDefinition,
    type MarkDefinition,
    PARAGRAPH,
    type PluginRegistry,
} from '#/core';

import { plainTextOf, RAW_ATTR, UNKNOWN_BLOCK, UNKNOWN_INLINE, UNKNOWN_MARKS, VALUE_ATTR } from './documentConversion';
import { htmlSpecToDom } from './htmlSpecToDom';
import { blockParseRules, INLINE_PRIORITY, MARK_PRIORITY, valueParseRules } from './pasteRules';

/**
 * The mounted features -> one engine schema (`buildSchema`, at the bottom, with
 * the per-kind spec builders above it). Built once at mount: the schema is
 * immutable, so changing the feature set means building a new editor.
 *
 * Four invariants live here, each marked where it is carried:
 *
 * (1) The paragraph baseline is declared FIRST (the registry puts it there).
 *     The first node matching the document's `block+` content is the engine's
 *     default block type — what an empty document holds and what pressing
 *     Enter creates.
 * (2) Marks are declared in NESTING order, not mount order, since the
 *     first-declared mark wraps the rest.
 * (3) Every content block except paragraph and lists is `defining`, which makes
 *     pasted content keep the block it was copied out of.
 * (4) A list item stays OUT of the `block` group; it is only ever reached
 *     through its list. That is also why the selection snapshot's `block` is the
 *     paragraph inside an item rather than the item itself.
 */

const contentExpression = (
    type: string,
    definition: BlockDefinition,
    known: Set<string>,
    lists: Set<string>,
): string | undefined => {
    const { content } = definition;
    if (content === undefined) {
        return undefined;
    }
    if (content === 'text') {
        return 'inline*';
    }
    if ('items' in content) {
        // Thrown, as with `blocks` below: left out, the list would lose its items on the way out.
        if (!known.has(content.items)) {
            throw new Error(`Block "${type}" declares items of type "${content.items}", which is not registered.`);
        }
        return `${content.items}+`;
    }
    const expanded = content.blocks.flatMap((name) => (name === ANY_LIST ? [...lists] : [name]));
    const contains = [...new Set(expanded)].filter((name) => known.has(name));
    if (contains.length === 0) {
        throw new Error(`Block "${type}" declares content blocks but none of those types are registered.`);
    }
    // Wherever blocks go, one no plugin knows may stand in for one.
    return `(${[...contains, UNKNOWN_BLOCK].join(' | ')})+`;
};

const blockNodeSpec = (
    type: string,
    definition: BlockDefinition,
    {
        registry,
        isListItem,
        known,
        lists,
    }: { registry: PluginRegistry; isListItem: boolean; known: Set<string>; lists: Set<string> },
): PmNodeSpec => {
    const isVoid = definition.content === undefined;
    const isList = typeof definition.content === 'object' && 'items' in definition.content;
    // Attributes every text block carries are engine attributes of each one.
    const carried = definition.content === 'text' ? [...registry.blockAttributes] : [];

    return {
        content: contentExpression(type, definition, known, lists),
        atom: isVoid,
        // Mod-click selects the innermost selectable node whole; for a block of
        // text that would only draw a ring around it.
        selectable: isVoid || definition.render?.edit !== undefined,
        // invariant (3)
        ...(isVoid || isList || type === PARAGRAPH ? {} : { defining: true }),
        // invariant (4)
        ...(isListItem ? {} : { group: 'block' }),
        attrs: {
            ...Object.fromEntries(
                Object.entries(definition.defaults ?? {}).map(([name, value]) => [name, { default: value ?? null }]),
            ),
            ...Object.fromEntries(carried.map(([name, attribute]) => [name, { default: attribute.default ?? null }])),
        },
        parseDOM: blockParseRules(definition, carried),
        toDOM: (node) => htmlSpecToDom(blockHtml(registry, definition, node.attrs)),
    };
};

const inlineNodeSpec = (definition: InlineDefinition): PmNodeSpec => ({
    group: 'inline',
    inline: true,
    atom: true,
    // With editing UI, a node inserted without a value is a draft (null) the UI
    // completes; without it, it stores the declared defaults.
    attrs: { [VALUE_ATTR]: { default: definition.render?.edit ? null : (definition.defaults ?? {}) } },
    parseDOM: valueParseRules(definition.parse, INLINE_PRIORITY),
    toDOM: (node) => {
        const value = node.attrs[VALUE_ATTR] as Record<string, unknown> | null;
        // A draft has nothing portable to say yet.
        return value === null ? ['span'] : htmlSpecToDom(definition.toHtml(value));
    },
});

const markSpec = (definition: MarkDefinition): PmMarkSpec => ({
    // A mark turned on without a value carries its declared defaults.
    attrs: { [VALUE_ATTR]: { default: definition.defaults ?? {} } },
    inclusive: definition.inclusive ?? true,
    parseDOM: valueParseRules(definition.parse, MARK_PRIORITY),
    toDOM: (mark) => htmlSpecToDom(definition.toHtml(mark.attrs[VALUE_ATTR] as Record<string, unknown>)),
});

// --- Content no mounted plugin knows (see `UNKNOWN_BLOCK` in documentConversion.ts) ---
//
// Shown, never edited: the words it holds, in a box the caret steps over. No
// parse rules, so pasting one in elsewhere brings its words, not the node.

const unknownBlockSpec: PmNodeSpec = {
    group: 'block',
    atom: true,
    selectable: true,
    attrs: { [RAW_ATTR]: {} },
    toDOM: (node) => ['div', { 'data-rte-unknown': '', contenteditable: 'false' }, plainTextOf(node.attrs[RAW_ATTR])],
};

const unknownInlineSpec: PmNodeSpec = {
    group: 'inline',
    inline: true,
    atom: true,
    attrs: { [RAW_ATTR]: {} },
    toDOM: (node) => ['span', { 'data-rte-unknown': '', contenteditable: 'false' }, plainTextOf(node.attrs[RAW_ATTR])],
};

/** Carried along with the text it is on, drawing nothing; typing next to it does not extend it. */
const unknownMarksSpec: PmMarkSpec = {
    attrs: { [RAW_ATTR]: {} },
    inclusive: false,
    toDOM: () => ['span', 0],
};

export const buildSchema = (registry: PluginRegistry): Schema => {
    const { itemTypeByList } = registry;
    const itemTypes = new Set(itemTypeByList.values());
    const lists = new Set(itemTypeByList.keys());
    const known = new Set(registry.blocks.keys());

    const nodes: Record<string, PmNodeSpec> = { doc: { content: 'block+' }, text: { group: 'inline' } };

    // invariant (1): the registry puts the paragraph first.
    for (const [type, block] of registry.blocks) {
        nodes[type] = blockNodeSpec(type, block, { registry, isListItem: itemTypes.has(type), known, lists });
    }
    for (const [type, inline] of registry.inlines) {
        nodes[type] = inlineNodeSpec(inline);
    }
    nodes[UNKNOWN_BLOCK] = unknownBlockSpec;
    nodes[UNKNOWN_INLINE] = unknownInlineSpec;

    // invariant (2): the registry already holds marks in nesting order.
    const marks: Record<string, PmMarkSpec> = {};
    for (const [type, mark] of registry.marks) {
        marks[type] = markSpec(mark);
    }
    // Last, so it wraps nothing a plugin's mark would.
    marks[UNKNOWN_MARKS] = unknownMarksSpec;

    return new Schema({ nodes, marks });
};
