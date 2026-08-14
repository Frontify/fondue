/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkSpec as PmMarkSpec, type NodeSpec as PmNodeSpec, Schema, type TagParseRule } from 'prosemirror-model';
import { type ReactNode } from 'react';

import {
    ANY_LIST,
    type AttributeSpec,
    type BlockAttributeSpec,
    type BlockSpec,
    type InlineSpec,
    type MarkSpec,
    PARAGRAPH,
    type RtePlugin,
} from '#/domain';
import { CONTENT_SLOT, type DomElement, type ProbedDom, type RenderProbe } from '#/ports';

import { pasteRules } from './pasteRules';

/**
 * The mounted features → one engine schema. Runs once, at mount: the schema is
 * immutable afterwards, which is why changing the feature set means building a
 * new editor rather than reconfiguring this one.
 *
 * Read top to bottom. It is one story in four parts: what a declared attribute
 * becomes, how a feature's React `render` becomes DOM the engine can use, how one
 * declared block/inline/mark becomes one engine spec, and finally how all of them
 * are assembled.
 *
 * Four invariants live here, each marked at the line that carries it:
 *
 * (1) The paragraph baseline is declared FIRST. The first node matching the
 *     document's `block+` content is the engine's default block type — what an
 *     empty document holds and what pressing Enter creates.
 * (2) Marks are declared in NESTING order, not mount order. The first-declared
 *     mark wraps the rest, so `nesting` decides the order here instead of the
 *     order the editor happened to be handed its features in.
 * (3) Every content block except paragraph and lists is `defining`. That is what
 *     makes pasted content keep the block it was copied out of.
 * (4) A list item stays OUT of the `block` group. It is only ever reached through
 *     its list — which is also why the selection snapshot's `block` is the
 *     paragraph inside an item rather than the item itself.
 */

/**
 * The schema plus what the list commands need to know about it: which block is
 * a list, and which of its `contains` types is the item. Features declare it
 * with `isList`, so the API can stay free of item-type arguments.
 */
export type SchemaBundle = {
    schema: Schema;
    itemTypeByList: Map<string, string>;
    /** Attributes features add to every text block, for resetting them generically. */
    blockAttributes: readonly BlockAttributeSpec[];
};

// ---------------------------------------------------------------------------
// Declared attributes → engine attributes
// ---------------------------------------------------------------------------

/** Attributes are always optional in the engine; an absent value round-trips as missing. */
const attrDefaults = (attributes: Record<string, AttributeSpec> = {}): Record<string, { default: unknown }> =>
    Object.fromEntries(
        Object.entries(attributes).map(([name, attribute]) => [name, { default: attribute.default ?? null }]),
    );

const injectedAttrDefaults = (injected: readonly BlockAttributeSpec[]): Record<string, { default: unknown }> =>
    Object.fromEntries(injected.map((attribute) => [attribute.name, { default: attribute.default ?? null }]));

// ---------------------------------------------------------------------------
// Rendering: probe caching, and the CSS injected block attributes contribute
//
// A feature renders with React, but the engine wants a DOM description. The
// probe bridges that (see ports/renderProbe.ts) and hands back exactly the shape
// ProseMirror's `toDOM` returns, so there is nothing to translate — what is left
// is caching and merging in the CSS that injected attributes (alignment) add.
// ---------------------------------------------------------------------------

/**
 * Probed renders, remembered per attribute set — `toDOM` runs every time the
 * engine draws a node, and probing renders React and reads the result back, which
 * is the most expensive thing in this file by a wide margin.
 *
 * The cache belongs to the DECLARATION rather than to the editor built from it,
 * which is what makes a page of editors affordable: twenty editors mounted over
 * the same plugin objects — a `defaultPlugins` evaluated once, as a module-level
 * array is — probe once between them instead of twenty times. Declarations built
 * fresh per editor still work; they simply have nothing to share, which is why
 * building the plugin array once is worth suggesting to a host that mounts many.
 *
 * Keyed on the probe as well, since a different probe is entitled to describe the
 * same render differently.
 */
const probeCaches = new WeakMap<RenderProbe, WeakMap<object, Map<string, ProbedDom>>>();

/**
 * How many attribute sets one declaration remembers. A mark or block whose
 * attributes come from a small vocabulary (a text style, an alignment, a bare
 * `bold`) sits far below this. The ones that do not — a link's href, a mention's
 * id — are why there is a limit at all: without one, a cache that now outlives
 * every editor would keep an entry per distinct link a session ever drew.
 */
const PROBE_CACHE_LIMIT = 128;

const probeCachedBy = (
    probe: RenderProbe,
    /** What the cache hangs off: the plugin's own spec object. */
    declaration: object,
    render: (attrs: Record<string, unknown>) => ReactNode,
) => {
    let byDeclaration = probeCaches.get(probe);
    if (!byDeclaration) {
        byDeclaration = new WeakMap<object, Map<string, ProbedDom>>();
        probeCaches.set(probe, byDeclaration);
    }
    let cache = byDeclaration.get(declaration);
    if (!cache) {
        cache = new Map<string, ProbedDom>();
        byDeclaration.set(declaration, cache);
    }
    const remembered = cache;

    return (attrs: Record<string, unknown>): ProbedDom => {
        const key = JSON.stringify(attrs);
        let probed = remembered.get(key);
        if (!probed) {
            probed = probe(() => render(attrs));
            if (remembered.size >= PROBE_CACHE_LIMIT) {
                // A Map iterates in insertion order, so the first key is the one
                // that has been there longest.
                const oldest = remembered.keys().next().value;
                if (oldest !== undefined) {
                    remembered.delete(oldest);
                }
            }
            remembered.set(key, probed);
        }
        return probed;
    };
};

/** Injected block attributes contribute CSS, which has to join whatever the render function already set. */
const withExtraStyle = (attrs: Record<string, string>, declarations: string[]): Record<string, string> => {
    if (declarations.length === 0) {
        return attrs;
    }
    const style = [attrs.style, ...declarations].filter(Boolean).join('; ');
    return { ...attrs, style };
};

/**
 * The CSS a node's injected attributes add. Their values are strings by
 * contract, and null while unset (`BlockAttributeSpec.default`) — which is what
 * the read below says, and the one place the engine's untyped attribute bag is
 * given that type.
 */
const injectedDeclarations = (attrs: Record<string, unknown>, injected: readonly BlockAttributeSpec[]): string[] =>
    injected.flatMap((attribute) => {
        const value = attrs[attribute.name] as string | null | undefined;
        return value ? [attribute.toStyle(value)] : [];
    });

/** Injected CSS lands on the outermost element the feature rendered. */
const withRootStyle = (element: DomElement, declarations: string[]): DomElement => {
    if (declarations.length === 0) {
        return element;
    }
    const [tag, attrs, ...children] = element;
    return [tag, withExtraStyle(attrs, declarations), ...children];
};

// ---------------------------------------------------------------------------
// One declared block, inline or mark → the engine's spec for it
// ---------------------------------------------------------------------------

/**
 * What the engine allows inside a block: text, or the block types a container
 * declared. The first `contains` entry ends up first in the expression, which
 * is what makes it the type a newly created container is filled with.
 */
const contentExpression = (spec: BlockSpec, known: Set<string>, lists: Set<string>): string | undefined => {
    if (spec.isVoid) {
        return undefined;
    }
    if (spec.content !== 'blocks') {
        return 'inline*';
    }
    // ANY_LIST stands for whatever lists are mounted, so an item can allow
    // nesting without naming the features that provide it. A container may also
    // name a type from a feature that is not mounted; those drop out of the
    // grammar, and the order of what remains is kept — the first entry is what a
    // new container is filled with.
    const expanded = (spec.contains ?? []).flatMap((type) => (type === ANY_LIST ? [...lists] : [type]));
    const contains = [...new Set(expanded)].filter((type) => known.has(type));
    if (contains.length === 0) {
        throw new Error(
            `Block "${spec.type}" declares content: 'blocks' but none of its \`contains\` types are registered.`,
        );
    }
    return contains.length === 1 ? `${contains[0]}+` : `(${contains.join(' | ')})+`;
};

const blockNodeSpec = (
    spec: BlockSpec,
    {
        injected,
        isListItem,
        known,
        lists,
        renderProbe,
    }: {
        injected: readonly BlockAttributeSpec[];
        isListItem: boolean;
        /** Every block type the mounted features declare, plus the paragraph baseline. */
        known: Set<string>;
        /** Those of them that are lists, for expanding `ANY_LIST`. */
        lists: Set<string>;
        renderProbe: RenderProbe;
    },
): PmNodeSpec => {
    const isVoid = spec.isVoid ?? false;
    const carriesInjected = !isVoid && spec.content !== 'blocks';
    const injectedHere = carriesInjected ? injected : [];
    const ownAttrNames = Object.keys(spec.attributes ?? {});
    const probe = probeCachedBy(renderProbe, spec, (attrs) =>
        spec.render({ node: { type: spec.type, ...attrs }, children: CONTENT_SLOT }),
    );

    return {
        content: contentExpression(spec, known, lists),
        atom: isVoid,
        // invariant (3): paragraph is the neutral block, everything else means
        // something — "this text is a caption", "this text is quoted". Saying so
        // is what makes pasted content keep the block it was copied out of
        // instead of dissolving into whatever block it lands in: the engine
        // treats the sides of such a block as a boundary editing does not cross.
        // Lists are left out, the way the engine's own list schema leaves them
        // out; there the boundary that matters belongs to the item, not the list.
        ...(isVoid || spec.isList === true ? {} : { defining: true }),
        // invariant (4): a list item is only ever reached through its list, so it
        // deliberately stays out of the `block` group the document accepts at top
        // level.
        ...(isListItem ? {} : { group: 'block' }),
        attrs: { ...attrDefaults(spec.attributes), ...injectedAttrDefaults(injectedHere) },
        parseDOM: pasteRules(spec.attributes ?? {}, spec.parseRules ?? [], injectedHere),
        toDOM: (node) => {
            // The render function only knows the attributes it declared; the
            // injected ones become CSS on the element it produced.
            const { element } = probe(Object.fromEntries(ownAttrNames.map((name) => [name, node.attrs[name]])));
            return withRootStyle(element, injectedDeclarations(node.attrs, injectedHere));
        },
    };
};

const inlineNodeSpec = (spec: InlineSpec, renderProbe: RenderProbe): PmNodeSpec => {
    const probe = probeCachedBy(renderProbe, spec, (attrs) => spec.render({ node: { type: spec.type, ...attrs } }));

    return {
        group: 'inline',
        inline: true,
        atom: true,
        attrs: attrDefaults(spec.attributes),
        parseDOM: pasteRules(spec.attributes ?? {}, spec.parseRules ?? []),
        toDOM: (node) => probe(node.attrs).element,
    };
};

const markNodeSpec = (spec: MarkSpec, renderProbe: RenderProbe): PmMarkSpec => {
    const attrs = attrDefaults(spec.attributes);
    const probe = probeCachedBy(renderProbe, spec, (value) => spec.render({ children: CONTENT_SLOT, value }));
    let parseDOM: TagParseRule[] | undefined;

    return {
        attrs,
        // Value-carrying marks (links) should not extend when typing at their edge.
        inclusive: Object.keys(attrs).length === 0,
        /**
         * The element the mark renders is always recognized when parsing, which
         * means probing it to learn its tag — and probing renders React.
         *
         * Built on first read rather than at mount, which is the only reason this
         * is a getter. The engine reads it when it first has HTML to make sense of
         * (a paste, or the DOM read after typing) and remembers the parser it
         * builds; doing it eagerly instead means every mark of every mounted
         * editor renders React before anyone has typed, to be ready for a paste
         * that may never come. It is the whole mount cost of a schema, and a page
         * holding twenty editors pays it twenty times over.
         */
        get parseDOM(): TagParseRule[] {
            parseDOM ??= pasteRules(spec.attributes ?? {}, [
                {
                    tag: probe(Object.fromEntries(Object.entries(attrs).map(([name, attr]) => [name, attr.default])))
                        .tag,
                },
                ...(spec.parseRules ?? []),
            ]);
            return parseDOM;
        },
        toDOM: (mark) => probe(mark.attrs).element,
    };
};

// ---------------------------------------------------------------------------
// All of them together → the schema
// ---------------------------------------------------------------------------

/** Which block is a list, and what its item type is called. */
const collectLists = (blocks: readonly { type: string; isList?: boolean; contains?: readonly string[] }[]) => {
    const itemTypeByList = new Map<string, string>();
    for (const spec of blocks) {
        const item = spec.isList ? spec.contains?.[0] : undefined;
        if (item) {
            itemTypeByList.set(spec.type, item);
        }
    }
    return itemTypeByList;
};

export const buildSchema = (features: RtePlugin[], renderProbe: RenderProbe): SchemaBundle => {
    const blockSpecs = features.flatMap((feature) => [...(feature.schema?.blocks ?? [])]);
    const injected = features.flatMap((feature) => [...(feature.schema?.blockAttributes ?? [])]);

    const itemTypeByList = collectLists(blockSpecs);
    const itemTypes = new Set(itemTypeByList.values());
    const lists = new Set(itemTypeByList.keys());
    const known = new Set([PARAGRAPH, ...blockSpecs.map((spec) => spec.type)]);

    // invariant (1): the paragraph baseline is declared first, so it is the
    // engine's default block type.
    const nodes: Record<string, PmNodeSpec> = {
        doc: { content: 'block+' },
        [PARAGRAPH]: {
            content: 'inline*',
            group: 'block',
            attrs: injectedAttrDefaults(injected),
            parseDOM: pasteRules({}, [{ tag: 'p' }], injected),
            toDOM: (node) => ['p', withExtraStyle({}, injectedDeclarations(node.attrs, injected)), 0],
        },
        text: { group: 'inline' },
    };

    for (const feature of features) {
        for (const block of feature.schema?.blocks ?? []) {
            nodes[block.type] = blockNodeSpec(block, {
                injected,
                isListItem: itemTypes.has(block.type),
                known,
                lists,
                renderProbe,
            });
        }
        for (const inline of feature.schema?.inlines ?? []) {
            nodes[inline.type] = inlineNodeSpec(inline, renderProbe);
        }
    }

    // invariant (2): marks nest in the order they are declared, so sort by what
    // each mark's `nesting` asks for and keep mount order as the tie-break.
    const markSpecs = features
        .flatMap((feature) => [...(feature.schema?.marks ?? [])])
        .map((mark, index) => ({ mark, index }))
        .sort((left, right) => (left.mark.nesting ?? 0) - (right.mark.nesting ?? 0) || left.index - right.index);

    const marks: Record<string, PmMarkSpec> = {};
    for (const { mark } of markSpecs) {
        marks[mark.key] = markNodeSpec(mark, renderProbe);
    }

    return { schema: new Schema({ nodes, marks }), itemTypeByList, blockAttributes: injected };
};
