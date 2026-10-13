/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkSpec as PmMarkSpec, type NodeSpec as PmNodeSpec, Schema, type TagParseRule } from 'prosemirror-model';

import {
    ANY_LIST,
    type AttributeDefinition,
    type AttributeSpec,
    type BlockDefinition,
    type InlineDefinition,
    type MarkDefinition,
    type NodeParseRule,
    PARAGRAPH,
    type PluginRegistry,
} from '#/core';

import { htmlSpecToDom, withRootStyle } from './htmlSpec';
import { pasteRules } from './pasteRules';

/**
 * The mounted features → one engine schema. Runs once, at mount: the schema is
 * immutable afterwards, which is why changing the feature set means building a
 * new editor rather than reconfiguring this one.
 *
 * Four invariants live here, each marked at the line that carries it:
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

export type SchemaBundle = {
    schema: Schema;
    itemTypeByList: Map<string, string>;
    /** Attributes features add to every text block, for resetting them generically. */
    attributes: readonly AttributeDefinition[];
};

const attrDefaults = (attributes: Record<string, AttributeSpec> = {}): Record<string, { default: unknown }> =>
    Object.fromEntries(
        Object.entries(attributes).map(([name, attribute]) => [name, { default: attribute.default ?? null }]),
    );

const injectedAttrDefaults = (injected: readonly AttributeDefinition[]): Record<string, { default: unknown }> =>
    Object.fromEntries(injected.map((attribute) => [attribute.type, { default: attribute.default ?? null }]));

const injectedDeclarations = (attrs: Record<string, unknown>, injected: readonly AttributeDefinition[]): string[] =>
    injected.flatMap((attribute) => {
        const value = attrs[attribute.type] as string | null | undefined;
        return value ? [attribute.toStyle(value)] : [];
    });

const contentExpression = (spec: BlockDefinition, known: Set<string>, lists: Set<string>): string | undefined => {
    if (spec.children === undefined) {
        return undefined;
    }
    if (spec.children === 'text') {
        return 'inline*';
    }
    if ('items' in spec.children) {
        return known.has(spec.children.items) ? `${spec.children.items}+` : undefined;
    }
    const expanded = spec.children.blocks.flatMap((type) => (type === ANY_LIST ? [...lists] : [type]));
    const contains = [...new Set(expanded)].filter((type) => known.has(type));
    if (contains.length === 0) {
        throw new Error(`Block "${spec.type}" declares children blocks but none of those types are registered.`);
    }
    return contains.length === 1 ? `${contains[0]}+` : `(${contains.join(' | ')})+`;
};

const blockNodeSpec = (
    spec: BlockDefinition,
    {
        injected,
        isListItem,
        known,
        lists,
    }: {
        injected: readonly AttributeDefinition[];
        isListItem: boolean;
        known: Set<string>;
        lists: Set<string>;
    },
): PmNodeSpec => {
    const isVoid = spec.children === undefined;
    const isList = spec.children !== undefined && typeof spec.children === 'object' && 'items' in spec.children;
    const carriesInjected = spec.children === 'text';
    const injectedHere = carriesInjected ? injected : [];
    const ownAttrNames = Object.keys(spec.attributes ?? {});

    return {
        content: contentExpression(spec, known, lists),
        atom: isVoid,
        ...(isVoid || isList || spec.type === PARAGRAPH ? {} : { defining: true }),
        ...(isListItem ? {} : { group: 'block' }),
        attrs: { ...attrDefaults(spec.attributes), ...injectedAttrDefaults(injectedHere) },
        parseDOM: pasteRules(spec.attributes ?? {}, spec.parseRules, injectedHere),
        toDOM: (node) => {
            const own = Object.fromEntries(ownAttrNames.map((name) => [name, node.attrs[name]]));
            return withRootStyle(htmlSpecToDom(spec.toDom(own)), injectedDeclarations(node.attrs, injectedHere));
        },
    };
};

/**
 * Marks and inline elements keep their whole value in ONE engine attribute, so
 * the engine needs to know nothing about its shape; the document boundary
 * flattens it onto the document node.
 */
export const VALUE_ATTR = 'value';

/** Rules for pasted HTML; an element whose `value` comes back null is not this node. */
const valueParseRules = (rules: readonly NodeParseRule<unknown>[]): TagParseRule[] =>
    rules.map((rule) => ({
        tag: rule.tag,
        // Qualified selectors outrank bare tags, as in pasteRules.
        priority: 60,
        getAttrs: (element: HTMLElement) => {
            const value = rule.value(element);
            return value === null ? false : { [VALUE_ATTR]: value };
        },
    }));

const inlineNodeSpec = (spec: InlineDefinition): PmNodeSpec => ({
    group: 'inline',
    inline: true,
    atom: true,
    // With an editing UI, a node inserted without a value is a draft the UI
    // completes (null); without one there is nothing to complete it.
    attrs: { [VALUE_ATTR]: { default: spec.editorComponent ? null : {} } },
    parseDOM: valueParseRules(spec.parse),
    toDOM: (node) => {
        const value = node.attrs[VALUE_ATTR] as Record<string, unknown> | null;
        // A draft has nothing portable to say yet.
        return value === null ? ['span'] : htmlSpecToDom(spec.toHtml(value));
    },
});

const markSpec = (spec: MarkDefinition): PmMarkSpec => ({
    attrs: { [VALUE_ATTR]: { default: {} } },
    inclusive: spec.inclusive ?? true,
    parseDOM: valueParseRules(spec.parse),
    toDOM: (mark) => htmlSpecToDom(spec.toHtml(mark.attrs[VALUE_ATTR] as Record<string, unknown>)),
});

export const buildSchema = (registry: PluginRegistry): SchemaBundle => {
    const blockSpecs = [...registry.blocks.values()];
    const injected = registry.attributes;
    const itemTypeByList = registry.itemTypeByList;
    const itemTypes = new Set(itemTypeByList.values());
    const lists = new Set(itemTypeByList.keys());
    const known = new Set(blockSpecs.map((spec) => spec.type));

    const nodes: Record<string, PmNodeSpec> = { doc: { content: 'block+' }, text: { group: 'inline' } };

    for (const block of blockSpecs) {
        nodes[block.type] = blockNodeSpec(block, {
            injected,
            isListItem: itemTypes.has(block.type),
            known,
            lists,
        });
    }
    for (const [type, inline] of registry.inlines) {
        nodes[type] = inlineNodeSpec(inline);
    }

    const markSpecs = [...registry.marks]
        .map(([type, mark], index) => ({ type, mark, index }))
        .sort((left, right) => (left.mark.nesting ?? 0) - (right.mark.nesting ?? 0) || left.index - right.index);

    const marks: Record<string, PmMarkSpec> = {};
    for (const { type, mark } of markSpecs) {
        marks[type] = markSpec(mark);
    }

    return { schema: new Schema({ nodes, marks }), itemTypeByList, attributes: injected };
};
