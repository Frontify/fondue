/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap, setBlockType as pmSetBlockType, toggleMark as pmToggleMark } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { InputRule, inputRules, textblockTypeInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import {
    type MarkSpec as PmMarkSpec,
    type MarkType as PmMarkType,
    type Node as PmNode,
    type NodeSpec as PmNodeSpec,
    type NodeType as PmNodeType,
    Schema,
    type TagParseRule,
} from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem as pmSplitListItem, wrapInList } from 'prosemirror-schema-list';
import { type Command, EditorState, Plugin as PmPlugin, PluginKey, TextSelection } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import {
    type AttributeSpec,
    type BlockAttributeSpec,
    type BlockSpec,
    type EditorControlApi,
    type InlineSpec,
    type MarkSpec,
    type ParseRule,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RteInputRule,
    type RtePlugin,
} from './types';

/**
 * The only module that knows ProseMirror exists. It translates plugin
 * declarations into engine configuration, hosts the live editor, converts
 * documents at the boundary, and implements the EditorControlApi.
 */

/** Attribute a rendered element uses to make itself a click-toggle for a boolean attribute. */
const TOGGLE_ATTRIBUTE = 'data-rte-toggle';

// ---------------------------------------------------------------------------
// Rendering: React render functions → tag + DOM attributes
// ---------------------------------------------------------------------------

/** Stands in for the editable content slot while probing. */
const SENTINEL = ' RTE_HOLE ';

/** The engine's DOM description: a tag, its attributes, and children — `0` marking the content slot. */
type DomChild = string | 0 | DomElement;
type DomElement = [string, Record<string, string>, ...DomChild[]];

/** The root element's tag and attributes, plus the whole tree the render produced. */
type ProbedDom = {
    tag: string;
    attrs: Record<string, string>;
    element: DomElement;
};

/**
 * Turn one rendered node into the engine's description of it. The text holding
 * the sentinel becomes the content slot; the engine requires that slot to be
 * the only thing inside its element, so text rendered beside it is dropped.
 */
const toDomChild = (node: ChildNode): DomChild | null => {
    if (node.nodeType === node.TEXT_NODE) {
        const text = node.textContent ?? '';
        if (text.includes(SENTINEL)) {
            return 0;
        }
        return text === '' ? null : text;
    }
    if (node.nodeType !== node.ELEMENT_NODE) {
        return null;
    }
    const element = node as Element;
    return [
        element.tagName.toLowerCase(),
        Object.fromEntries(Array.from(element.attributes, (attr) => [attr.name, attr.value])),
        ...Array.from(element.childNodes, toDomChild).filter((child): child is DomChild => child !== null),
    ];
};

/**
 * Plugins declare rendering as React functions; the engine needs a DOM
 * description. Bridge: render the function statically and walk the result.
 * Nested elements survive (a check item's checkbox beside its text), the one
 * rule being that the children slot is alone inside its element.
 */
const probeDom = (render: () => ReactNode): ProbedDom => {
    const markup = renderToStaticMarkup(createElement(render));
    const root = new DOMParser().parseFromString(markup, 'text/html').body.firstElementChild;
    if (!root) {
        throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
    }
    const element = toDomChild(root) as DomElement;
    return { tag: element[0], attrs: element[1], element };
};

/** `toDOM` runs on every render, probing renders React — so cache per attribute set. */
const probeCachedBy = (render: (attrs: Record<string, unknown>) => ReactNode) => {
    const cache = new Map<string, ProbedDom>();
    return (attrs: Record<string, unknown>): ProbedDom => {
        const key = JSON.stringify(attrs);
        let probed = cache.get(key);
        if (!probed) {
            probed = probeDom(() => render(attrs));
            cache.set(key, probed);
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
 * contract (`toStyle` takes one), so anything else counts as unset.
 */
const injectedDeclarations = (attrs: Record<string, unknown>, injected: readonly BlockAttributeSpec[]): string[] =>
    injected.flatMap((attribute) => {
        const value: unknown = attrs[attribute.name];
        return typeof value === 'string' && value !== '' ? [attribute.toStyle(value)] : [];
    });

/** Injected CSS lands on the outermost element the plugin rendered. */
const withRootStyle = (element: DomElement, declarations: string[]): DomElement => {
    if (declarations.length === 0) {
        return element;
    }
    const [tag, attrs, ...children] = element;
    return [tag, withExtraStyle(attrs, declarations), ...children];
};

// ---------------------------------------------------------------------------
// Schema: plugin specs → engine schema
// ---------------------------------------------------------------------------

/** Attributes are always optional in the engine; an absent value round-trips as missing. */
const pmAttrs = (attributes: Record<string, AttributeSpec> = {}): Record<string, { default: unknown }> =>
    Object.fromEntries(
        Object.entries(attributes).map(([name, attribute]) => [name, { default: attribute.default ?? null }]),
    );

const pmInjectedAttrs = (injected: readonly BlockAttributeSpec[]): Record<string, { default: unknown }> =>
    Object.fromEntries(injected.map((attribute) => [attribute.name, { default: attribute.default ?? null }]));

/** Rules for recognizing pasted HTML: the tag, the attributes it implies, and any read off the element or its style. */
const pmParseDom = (
    attributes: Record<string, AttributeSpec>,
    rules: readonly ParseRule[],
    injected: readonly BlockAttributeSpec[] = [],
): TagParseRule[] => {
    const domAttributeNames = Object.entries(attributes)
        .filter(([, attribute]) => attribute.parseFromDomAttribute)
        .map(([name, attribute]): [string, string] => [
            name,
            typeof attribute.parseFromDomAttribute === 'string' ? attribute.parseFromDomAttribute : name,
        ]);
    const styleNames: [string, string][] = [
        ...Object.entries(attributes)
            .filter(([, attribute]) => attribute.parseFromStyle)
            .map(([name, attribute]): [string, string] => [name, attribute.parseFromStyle as string]),
        ...injected
            .filter((attribute) => attribute.parseFromStyle)
            .map((attribute): [string, string] => [attribute.name, attribute.parseFromStyle as string]),
    ];

    return rules.map(({ tag, attributes: implied }) => ({
        tag,
        getAttrs: (element: HTMLElement) => ({
            ...Object.fromEntries(domAttributeNames.map(([name, domName]) => [name, element.getAttribute(domName)])),
            ...Object.fromEntries(
                styleNames.map(([name, property]) => [name, element.style.getPropertyValue(property) || null]),
            ),
            ...implied,
        }),
    }));
};

/**
 * What the engine allows inside a block: text, or the block types a container
 * declared. The first `contains` entry ends up first in the expression, which
 * is what makes it the type a newly created container is filled with.
 */
const pmContent = (spec: BlockSpec, known: Set<string>): string | undefined => {
    if (spec.isVoid) {
        return undefined;
    }
    if (spec.content !== 'blocks') {
        return 'inline*';
    }
    // A container may name block types from plugins that are not mounted — a
    // list item nesting a check list. Those simply drop out of the grammar.
    const contains = (spec.contains ?? []).filter((type) => known.has(type));
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
    }: { injected: readonly BlockAttributeSpec[]; isListItem: boolean; known: Set<string> },
): PmNodeSpec => {
    const isVoid = spec.isVoid ?? false;
    const carriesInjected = !isVoid && spec.content !== 'blocks';
    const injectedHere = carriesInjected ? injected : [];
    const ownAttrNames = Object.keys(spec.attributes ?? {});
    const probe = probeCachedBy((attrs) => spec.render({ node: { type: spec.type, ...attrs }, children: SENTINEL }));

    return {
        content: pmContent(spec, known),
        atom: isVoid,
        // A list item is only ever reached through its list, so it deliberately
        // stays out of the `block` group the document accepts at top level.
        ...(isListItem ? {} : { group: 'block' }),
        attrs: { ...pmAttrs(spec.attributes), ...pmInjectedAttrs(injectedHere) },
        parseDOM: pmParseDom(spec.attributes ?? {}, spec.parseRules ?? [], injectedHere),
        toDOM: (node) => {
            // The render function only knows the attributes it declared; the
            // injected ones become CSS on the element it produced.
            const { element } = probe(Object.fromEntries(ownAttrNames.map((name) => [name, node.attrs[name]])));
            return withRootStyle(element, injectedDeclarations(node.attrs, injectedHere));
        },
    };
};

const inlineNodeSpec = (spec: InlineSpec): PmNodeSpec => {
    const probe = probeCachedBy((attrs) => spec.render({ node: { type: spec.type, ...attrs } }));

    return {
        group: 'inline',
        inline: true,
        atom: true,
        attrs: pmAttrs(spec.attributes),
        parseDOM: pmParseDom(spec.attributes ?? {}, spec.parseRules ?? []),
        toDOM: (node) => probe(node.attrs).element,
    };
};

const markPmSpec = (spec: MarkSpec): PmMarkSpec => {
    const attrs = pmAttrs(spec.attributes);
    const probe = probeCachedBy((value) => spec.render({ children: SENTINEL, value }));
    // The element the mark renders (probed with default values) is always
    // recognized when parsing; parseRules add more.
    const defaults = Object.fromEntries(Object.entries(attrs).map(([name, attr]) => [name, attr.default]));

    return {
        attrs,
        // Value-carrying marks (links) should not extend when typing at their edge.
        inclusive: Object.keys(attrs).length === 0,
        parseDOM: pmParseDom(spec.attributes ?? {}, [{ tag: probe(defaults).tag }, ...(spec.parseRules ?? [])]),
        toDOM: (mark) => probe(mark.attrs).element,
    };
};

/**
 * The schema plus what the list commands need to know about it: which block is
 * a list, and which of its `contains` types is the item. Plugins declare it
 * with `isList`, so the API can stay free of item-type arguments.
 */
type SchemaBundle = {
    schema: Schema;
    itemTypeByList: Map<string, string>;
};

const buildSchema = (plugins: RtePlugin[]): SchemaBundle => {
    const blockSpecs = plugins.flatMap((plugin) => [...(plugin.schema?.blocks ?? [])]);
    const injected = plugins.flatMap((plugin) => [...(plugin.schema?.blockAttributes ?? [])]);

    const itemTypeByList = new Map<string, string>();
    for (const spec of blockSpecs) {
        const item = spec.isList ? spec.contains?.[0] : undefined;
        if (item) {
            itemTypeByList.set(spec.type, item);
        }
    }
    const itemTypes = new Set(itemTypeByList.values());
    const known = new Set(['paragraph', ...blockSpecs.map((spec) => spec.type)]);

    // Node insertion order matters: the first node matching the doc's
    // `block+` content is the default block type (empty documents, Enter-key
    // splits) — the paragraph baseline stays first.
    const nodes: Record<string, PmNodeSpec> = {
        doc: { content: 'block+' },
        paragraph: {
            content: 'inline*',
            group: 'block',
            attrs: pmInjectedAttrs(injected),
            parseDOM: pmParseDom({}, [{ tag: 'p' }], injected),
            toDOM: (node) => ['p', withExtraStyle({}, injectedDeclarations(node.attrs, injected)), 0],
        },
        text: { group: 'inline' },
    };
    const marks: Record<string, PmMarkSpec> = {};

    for (const plugin of plugins) {
        for (const block of plugin.schema?.blocks ?? []) {
            nodes[block.type] = blockNodeSpec(block, { injected, isListItem: itemTypes.has(block.type), known });
        }
        for (const inline of plugin.schema?.inlines ?? []) {
            nodes[inline.type] = inlineNodeSpec(inline);
        }
    }

    // Marks nest in the order they are declared — the first wraps the rest —
    // so their order here is what a mark's `nesting` asks for, rather than the
    // order the editor happened to be given its plugins in.
    const markSpecs = plugins
        .flatMap((plugin) => [...(plugin.schema?.marks ?? [])])
        .map((mark, index) => ({ mark, index }))
        .sort((left, right) => (left.mark.nesting ?? 0) - (right.mark.nesting ?? 0) || left.index - right.index);

    for (const { mark } of markSpecs) {
        marks[mark.key] = markPmSpec(mark);
    }

    return { schema: new Schema({ nodes, marks }), itemTypeByList };
};

// ---------------------------------------------------------------------------
// Documents: RTE format ↔ engine format
// ---------------------------------------------------------------------------

/** ProseMirror nodes are not iterable — children have to be indexed. */
const mapChildren = <TResult>(node: PmNode, map: (child: PmNode) => TResult): TResult[] => {
    const results: TResult[] = [];
    for (let index = 0; index < node.childCount; index++) {
        results.push(map(node.child(index)));
    }
    return results;
};

/** Attributes with a value; unset ones are absent from the document, not null. */
const definedAttrs = (attrs: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(attrs).filter(([, value]) => value !== null && value !== undefined));

/** The attributes a node type declared, picked off a document node (they live flat on it). */
const declaredAttrs = (
    node: Record<string, unknown>,
    declared: Record<string, unknown> = {},
): Record<string, unknown> =>
    Object.fromEntries(
        Object.keys(declared)
            .filter((name) => node[name] !== undefined)
            .map((name) => [name, node[name]]),
    );

const inlinesToPm = (children: RteInlineNode[], schema: Schema): PmNode[] => {
    const nodes: PmNode[] = [];
    for (const child of children) {
        // Text nodes carry `text`, inline elements carry `type`. Both shapes
        // are open, so the check has to be on the value, not on the key.
        if (typeof child.text === 'string') {
            if (child.text === '') {
                continue;
            }
            const marks = Object.entries(schema.marks)
                .filter(([key]) => Boolean(child[key]))
                .map(([key, markType]) => {
                    const value = child[key];
                    return markType.create(typeof value === 'object' && value !== null ? value : undefined);
                });
            nodes.push(schema.text(child.text, marks));
            continue;
        }
        const type = String(child.type);
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            throw new Error(`Unknown inline type "${type}". Did you forget to register a plugin?`);
        }
        nodes.push(nodeType.create(declaredAttrs(child, nodeType.spec.attrs)));
    }
    return nodes;
};

/**
 * A block's children are inlines or blocks depending on what the block type
 * declared — the schema decides, so the document format needs no marker.
 */
const childrenToPm = (nodeType: PmNodeType, children: RteInlineNode[] | RteBlockNode[], schema: Schema): PmNode[] =>
    nodeType.isTextblock
        ? inlinesToPm(children as RteInlineNode[], schema)
        : (children as RteBlockNode[]).map((child) => blockToPm(child, schema));

const blockToPm = (block: RteBlockNode, schema: Schema): PmNode => {
    const nodeType = schema.nodes[block.type];
    if (!nodeType) {
        throw new Error(`Unknown block type "${block.type}". Did you forget to register a plugin?`);
    }
    const attrs = declaredAttrs(block as Record<string, unknown>, nodeType.spec.attrs);
    return nodeType.create(attrs, block.children ? childrenToPm(nodeType, block.children, schema) : []);
};

const documentToPm = (doc: RteDocumentOf, schema: Schema): PmNode => {
    const docType = schema.nodes.doc;
    if (!docType) {
        throw new Error('Schema is missing the "doc" node type.');
    }
    return docType.create(
        null,
        doc.blocks.map((block) => blockToPm(block, schema)),
    );
};

const inlineFromPm = (child: PmNode): RteInlineNode => {
    if (!child.isText) {
        return { type: child.type.name, ...definedAttrs(child.attrs) };
    }
    const text: Record<string, unknown> = { text: child.text ?? '' };
    for (const mark of child.marks) {
        const carriesValue = Object.keys(mark.type.spec.attrs ?? {}).length > 0;
        text[mark.type.name] = carriesValue ? definedAttrs(mark.attrs) : true;
    }
    return text as RteInlineNode;
};

const blockFromPm = (node: PmNode): RteBlockNode => {
    const block: Record<string, unknown> = { type: node.type.name, ...definedAttrs(node.attrs) };
    if (node.isTextblock) {
        block.children = mapChildren(node, inlineFromPm);
    } else if (!node.isAtom) {
        block.children = mapChildren(node, blockFromPm);
    }
    return block as unknown as RteBlockNode;
};

const pmToDocument = (doc: PmNode): RteDocumentOf => ({
    version: 1,
    blocks: mapChildren(doc, blockFromPm),
});

/** Type and attributes only — what the toolbar needs, without dragging the subtree along. */
const shallowBlockFromPm = (node: PmNode): RteBlockNode =>
    ({ type: node.type.name, ...definedAttrs(node.attrs) }) as unknown as RteBlockNode;

// ---------------------------------------------------------------------------
// Input rules: declarations → engine rules
// ---------------------------------------------------------------------------

const escapeForRegExp = (text: string): string => text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * `**bold**` → a bold mark over `bold`. Written here rather than taken from the
 * engine, which ships block and text rules but no mark rule.
 */
const markInputRule = (delimiter: string, markName: string, schema: Schema): InputRule => {
    const escaped = escapeForRegExp(delimiter);
    const firstChar = escapeForRegExp(delimiter.charAt(0));
    // The character before the opening delimiter must not be the delimiter
    // itself, or typing `**bold**` fires the italic rule on `**bold*` first.
    const pattern = new RegExp(`(?:^|[^${firstChar}])${escaped}([^${firstChar}]+)${escaped}$`);

    return new InputRule(pattern, (state, match, _start, end) => {
        const content = match[1];
        const markType = schema.marks[markName];
        if (!content || !markType) {
            return null;
        }
        // The match may include that preceding character; the rewrite starts
        // at the opening delimiter.
        const from = end - (delimiter.length * 2 + content.length);
        return state.tr
            .delete(from, end)
            .insertText(content, from)
            .addMark(from, from + content.length, markType.create())
            .removeStoredMark(markType);
    });
};

/** `"` opens or closes depending on what precedes it — the one rule that has to look back. */
const quotesInputRule = (match: string, open: string, close: string): InputRule =>
    new InputRule(new RegExp(`${escapeForRegExp(match)}$`), (state, _match, start, end) => {
        const before = start > 0 ? state.doc.textBetween(start - 1, start) : '';
        const opens = before === '' || /[\s([{<'"“‘]/.test(before);
        return state.tr.insertText(opens ? open : close, start, end);
    });

const buildInputRules = (plugins: RtePlugin[], schema: Schema, itemTypeByList: Map<string, string>): PmPlugin[] => {
    const rules: InputRule[] = [];

    const add = (rule: RteInputRule): void => {
        switch (rule.kind) {
            case 'text':
                rules.push(new InputRule(new RegExp(`${escapeForRegExp(rule.match)}$`), rule.replaceWith));
                return;
            case 'quotes':
                rules.push(quotesInputRule(rule.match, rule.open, rule.close));
                return;
            case 'mark':
                rules.push(markInputRule(rule.delimiter, rule.key, schema));
                return;
            case 'block': {
                const nodeType = schema.nodes[rule.block];
                if (nodeType) {
                    rules.push(
                        textblockTypeInputRule(
                            new RegExp(`^${escapeForRegExp(rule.match)}$`),
                            nodeType,
                            rule.attributes ?? null,
                        ),
                    );
                }
                return;
            }
            case 'list': {
                const listType = schema.nodes[rule.list];
                if (listType && itemTypeByList.has(rule.list)) {
                    rules.push(wrappingInputRule(new RegExp(`^${escapeForRegExp(rule.match)}$`), listType));
                }
                return;
            }
        }
    };

    const declared = plugins.flatMap((plugin) => [...(plugin.inputRules ?? [])]);
    // Longer mark delimiters have to be tried first, or `**bold**` is read as an
    // italic `*` wrapping `*bold*`. Everything else keeps its declared order.
    const markRules = declared
        .filter((rule) => rule.kind === 'mark')
        .sort((left, right) => right.delimiter.length - left.delimiter.length);
    for (const rule of [...markRules, ...declared.filter((rule) => rule.kind !== 'mark')]) {
        add(rule);
    }

    return rules.length > 0 ? [inputRules({ rules })] : [];
};

// ---------------------------------------------------------------------------
// Combobox: trigger tracking
// ---------------------------------------------------------------------------

/** What the host needs to render a picker: which plugin owns it, what was typed, and where. */
export type ActiveCombobox = {
    pluginId: string;
    trigger: string;
    query: string;
    /** Viewport coordinates of the trigger character. */
    coords: { left: number; top: number; bottom: number };
};

type ComboboxTracked = {
    pluginId: string;
    trigger: string;
    query: string;
    from: number;
    to: number;
};

type ComboboxPluginState = {
    tracked: ComboboxTracked | null;
    /** Where a picker was dismissed, so it stays closed until the caret moves on. */
    dismissedFrom: number | null;
};

const comboboxKey = new PluginKey<ComboboxPluginState>('rte-combobox');
const DISMISS = 'dismiss';

/** A trigger only counts at the start of a word, and only while the query has no spaces. */
const trackCombobox = (
    state: EditorState,
    triggers: { pluginId: string; trigger: string }[],
): ComboboxTracked | null => {
    const { selection } = state;
    if (!selection.empty) {
        return null;
    }
    const { $from } = selection;
    if (!$from.parent.isTextblock) {
        return null;
    }
    // Inline atoms count as one character each, so text offsets stay aligned
    // with document positions.
    const textBefore = $from.parent.textBetween(0, $from.parentOffset, undefined, '￼');

    let best: ComboboxTracked | null = null;
    let bestIndex = -1;
    for (const { pluginId, trigger } of triggers) {
        const index = textBefore.lastIndexOf(trigger);
        if (index === -1 || index < bestIndex) {
            continue;
        }
        const query = textBefore.slice(index + trigger.length);
        if (/\s/.test(query)) {
            continue;
        }
        const before = index === 0 ? '' : textBefore.charAt(index - 1);
        if (before !== '' && !/[\s([]/.test(before)) {
            continue;
        }
        bestIndex = index;
        best = { pluginId, trigger, query, from: $from.start() + index, to: $from.pos };
    }
    return best;
};

const comboboxPlugin = (triggers: { pluginId: string; trigger: string }[]): PmPlugin<ComboboxPluginState> =>
    new PmPlugin<ComboboxPluginState>({
        key: comboboxKey,
        state: {
            init: () => ({ tracked: null, dismissedFrom: null }),
            apply: (transaction, previous, _oldState, newState) => {
                const tracked = trackCombobox(newState, triggers);
                if (transaction.getMeta(comboboxKey) === DISMISS) {
                    return { tracked: null, dismissedFrom: tracked?.from ?? null };
                }
                if (tracked && tracked.from === previous.dismissedFrom) {
                    return { tracked: null, dismissedFrom: previous.dismissedFrom };
                }
                return { tracked, dismissedFrom: null };
            },
        },
    });

// ---------------------------------------------------------------------------
// Panels: what a plugin's content-anchored UI hangs under
// ---------------------------------------------------------------------------

/** Where one plugin's panel currently belongs on screen. */
export type PanelAnchor = {
    pluginId: string;
    /** The box the anchored content occupies, in viewport coordinates. */
    rect: { left: number; top: number; width: number; height: number };
};

// ---------------------------------------------------------------------------
// The editor
// ---------------------------------------------------------------------------

/** The innermost ancestor that is a list of items, with the position it sits at. */
const findList = (state: EditorState, itemTypeByList: Map<string, string>): { node: PmNode; pos: number } | null => {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (itemTypeByList.has(node.type.name)) {
            return { node, pos: $from.before(depth) };
        }
    }
    return null;
};

/**
 * The stretch of text around the selection start that carries a mark, or null
 * when the mark is not there. Adjacent text nodes may be split by other marks,
 * so a run is a stretch of consecutive children rather than a single node —
 * which is what makes a partly-bold link still count as one link.
 */
const findMarkRange = (state: EditorState, markType: PmMarkType): { from: number; to: number } | null => {
    const { $from } = state.selection;
    const block = $from.parent;
    if (!block.isTextblock) {
        return null;
    }
    let position = $from.start();
    let runFrom: number | null = null;
    let runTo = position;
    let range: { from: number; to: number } | null = null;
    const closeRun = (): void => {
        if (runFrom !== null && $from.pos >= runFrom && $from.pos <= runTo) {
            range = { from: runFrom, to: runTo };
        }
        runFrom = null;
    };
    for (let index = 0; index < block.childCount; index++) {
        const child = block.child(index);
        if (markType.isInSet(child.marks)) {
            runFrom ??= position;
            runTo = position + child.nodeSize;
        } else {
            closeRun();
        }
        position += child.nodeSize;
    }
    closeRun();
    return range;
};

/** The item type of the innermost list the selection sits in — what the list commands need. */
const findItemType = (state: EditorState, itemTypeByList: Map<string, string>, schema: Schema): PmNodeType | null => {
    const list = findList(state, itemTypeByList);
    const itemName = list ? itemTypeByList.get(list.node.type.name) : undefined;
    return (itemName ? schema.nodes[itemName] : undefined) ?? null;
};

const createApi = (view: EditorView, { schema, itemTypeByList }: SchemaBundle): EditorControlApi => {
    const runListCommand = (command: (itemType: PmNodeType) => Command): boolean => {
        const itemType = findItemType(view.state, itemTypeByList, schema);
        if (!itemType) {
            return false;
        }
        return command(itemType)(view.state, view.dispatch, view);
    };

    return {
        toggleMark(key, value) {
            const markType = schema.marks[key];
            if (markType) {
                pmToggleMark(markType, value)(view.state, view.dispatch);
                view.focus();
            }
        },
        isMarkActive(key) {
            const markType = schema.marks[key];
            if (!markType) {
                return false;
            }
            const { from, to, empty, $from } = view.state.selection;
            return empty
                ? Boolean(markType.isInSet(view.state.storedMarks ?? $from.marks()))
                : view.state.doc.rangeHasMark(from, to, markType);
        },
        getMarkValue(key) {
            const markType = schema.marks[key];
            if (!markType) {
                return null;
            }
            const { $from, from, to, empty } = view.state.selection;
            if (empty) {
                const mark = markType.isInSet(view.state.storedMarks ?? $from.marks());
                return mark ? definedAttrs(mark.attrs) : null;
            }
            let found: Record<string, unknown> | null = null;
            view.state.doc.nodesBetween(from, to, (node) => {
                if (found === null && node.isText) {
                    const mark = markType.isInSet(node.marks);
                    if (mark) {
                        found = definedAttrs(mark.attrs);
                    }
                }
            });
            return found;
        },
        getMarkRun(key) {
            const markType = schema.marks[key];
            const range = markType ? findMarkRange(view.state, markType) : null;
            if (!markType || range === null) {
                return null;
            }
            // The run starts at a text node carrying the mark, so its attributes
            // are the run's — the whole point of a run being one stretch.
            const first = view.state.doc.resolve(range.from).nodeAfter;
            const mark = first ? markType.isInSet(first.marks) : null;
            return {
                value: mark ? definedAttrs(mark.attrs) : {},
                // Void nodes in between contribute nothing, so what comes back
                // is what the user can actually read — as with getSelectedText.
                text: view.state.doc.textBetween(range.from, range.to, ' '),
            };
        },
        removeAllMarks() {
            const { from, to, empty } = view.state.selection;
            const transaction = empty ? view.state.tr.setStoredMarks([]) : view.state.tr.removeMark(from, to, null);
            view.dispatch(transaction);
            view.focus();
        },
        selectMark(key) {
            const markType = schema.marks[key];
            if (!markType) {
                return false;
            }
            const { $from, empty } = view.state.selection;
            if (!empty) {
                return Boolean(markType.isInSet($from.marks()));
            }
            const range = findMarkRange(view.state, markType);
            if (range === null) {
                return false;
            }
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, range.from, range.to)));
            return true;
        },
        setBlockType(type, attrs) {
            const nodeType = schema.nodes[type];
            if (nodeType) {
                pmSetBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
                view.focus();
            }
        },
        isBlockActive(type, attrs) {
            const { $from } = view.state.selection;
            for (let depth = $from.depth; depth >= 0; depth--) {
                const node = $from.node(depth);
                if (node.type.name === type) {
                    return !attrs || Object.entries(attrs).every(([name, value]) => node.attrs[name] === value);
                }
            }
            return false;
        },
        updateBlockAttributes(attrs) {
            const { from, to } = view.state.selection;
            const transaction = view.state.tr;
            view.state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.isTextblock) {
                    // Attributes a node type never declared are ignored by the
                    // engine, so this is safe across mixed selections.
                    transaction.setNodeMarkup(pos, undefined, { ...node.attrs, ...attrs });
                }
            });
            if (transaction.docChanged) {
                view.dispatch(transaction);
            }
            view.focus();
        },
        insert(type, attrs) {
            const nodeType = schema.nodes[type];
            if (nodeType) {
                view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
                view.focus();
            }
        },
        insertText(text) {
            view.dispatch(view.state.tr.insertText(text));
            view.focus();
        },
        getSelectedText() {
            const { from, to, empty } = view.state.selection;
            // Void nodes in between (a mention, a line break) contribute
            // nothing, so what comes back is what the user can actually read.
            return empty ? '' : view.state.doc.textBetween(from, to, ' ');
        },
        replaceSelectionWithText(text) {
            if (text === '') {
                return;
            }
            const { from, to } = view.state.selection;
            // Positions count text in the same units as a JS string, so the end
            // of the inserted run is simply `from` plus its length.
            const transaction = view.state.tr.insertText(text, from, to);
            transaction.setSelection(TextSelection.create(transaction.doc, from, from + text.length));
            view.dispatch(transaction);
            view.focus();
        },
        getCurrentBlock() {
            const { $from } = view.state.selection;
            for (let depth = $from.depth; depth >= 0; depth--) {
                const node = $from.node(depth);
                if (node.type.spec.group === 'block') {
                    return shallowBlockFromPm(node);
                }
            }
            // A selected void block (image): the selection sits at doc level.
            const after = $from.nodeAfter;
            return after && after.type.spec.group === 'block' ? shallowBlockFromPm(after) : null;
        },
        toggleList(type) {
            const listType = schema.nodes[type];
            const itemName = itemTypeByList.get(type);
            const itemType = itemName ? schema.nodes[itemName] : undefined;
            if (!listType || !itemType) {
                return;
            }
            const current = findList(view.state, itemTypeByList);

            if (!current) {
                wrapInList(listType)(view.state, view.dispatch);
            } else if (current.node.type === listType) {
                runListCommand(liftListItem);
            } else {
                // Switching list type converts in place. It has to happen in a
                // single step: a check list holding bullet items (or the other
                // way round) is invalid content, so two steps would throw.
                const converted = listType.create(
                    current.node.attrs,
                    mapChildren(current.node, (item) =>
                        item.type === itemType ? item : itemType.create(item.attrs, item.content),
                    ),
                );
                view.dispatch(view.state.tr.replaceWith(current.pos, current.pos + current.node.nodeSize, converted));
            }
            view.focus();
        },
        indentListItem: () => runListCommand(sinkListItem),
        outdentListItem: () => runListCommand(liftListItem),
        splitListItem: () => runListCommand(pmSplitListItem),
        unwrapLists() {
            const { from, to } = view.state.selection;
            const lists: { node: PmNode; pos: number }[] = [];
            view.state.doc.nodesBetween(from, to, (node, pos) => {
                if (!itemTypeByList.has(node.type.name)) {
                    return true;
                }
                // Outermost lists only: their nested ones come along below.
                lists.push({ node, pos });
                return false;
            });
            if (lists.length === 0) {
                return false;
            }

            const transaction = view.state.tr;
            const contentOf = (list: PmNode): PmNode[] =>
                mapChildren(list, (item) =>
                    mapChildren(item, (child) => (itemTypeByList.has(child.type.name) ? contentOf(child) : [child])),
                ).flat(2);
            // From the end backwards, so the earlier positions stay valid.
            for (const { node, pos } of [...lists].reverse()) {
                transaction.replaceWith(pos, pos + node.nodeSize, contentOf(node));
            }
            view.dispatch(transaction);
            view.focus();
            return true;
        },
        isSelectionCollapsed() {
            return view.state.selection.empty;
        },
        focus() {
            view.focus();
        },
        blur() {
            view.dom.blur();
        },
    };
};

const buildPmPlugins = (plugins: RtePlugin[], bundle: SchemaBundle, getApi: () => EditorControlApi): PmPlugin[] => {
    // More than one plugin may bind the same key; they run in mount order until
    // one reports that it handled it.
    const hotkeys = new Map<string, Array<(api: EditorControlApi) => boolean | void>>();
    for (const plugin of plugins) {
        for (const [keys, command] of Object.entries(plugin.hotkeys ?? {})) {
            const handlers = hotkeys.get(keys) ?? [];
            handlers.push(command);
            hotkeys.set(keys, handlers);
        }
    }
    const keyCommands: Record<string, Command> = Object.fromEntries(
        Array.from(hotkeys, ([keys, handlers]): [string, Command] => [
            keys,
            () => handlers.some((handler) => handler(getApi()) !== false),
        ]),
    );

    const triggers = plugins.flatMap((plugin) =>
        plugin.combobox ? [{ pluginId: plugin.id, trigger: plugin.combobox.trigger }] : [],
    );

    return [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Mod-Shift-z': redo }),
        keymap(keyCommands),
        ...buildInputRules(plugins, bundle.schema, bundle.itemTypeByList),
        ...(triggers.length > 0 ? [comboboxPlugin(triggers)] : []),
        keymap(baseKeymap),
    ];
};

/**
 * "Nothing has been typed yet": a single empty text block. Deliberately not
 * "no text anywhere" — a document holding an empty paragraph *and* an image is
 * not something a placeholder should talk over.
 */
const isEmptyDoc = (doc: PmNode): boolean =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

/**
 * Draws the placeholder, reading the current text through a thunk so changing
 * the prop does not mean re-creating the editor.
 *
 * A decoration on the empty block rather than an overlay, so it sits inside the
 * block and inherits its box — the placeholder lines up with where typing will
 * actually start, whatever the block's margins. The text rides along in
 * `data-placeholder` for the stylesheet to draw.
 */
const placeholderPlugin = (getPlaceholder: () => string, className: string): PmPlugin =>
    new PmPlugin({
        props: {
            decorations(state) {
                const placeholder = getPlaceholder();
                const block = state.doc.firstChild;
                if (!placeholder || block === null || !isEmptyDoc(state.doc)) {
                    return null;
                }
                return DecorationSet.create(state.doc, [
                    Decoration.node(0, block.nodeSize, {
                        class: className,
                        'data-placeholder': placeholder,
                    }),
                ]);
            },
        },
    });

export type EditorHandle = {
    api: EditorControlApi;
    /** Replace the content with an externally-set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    /** Turn editing off or back on, keeping the content, the selection and the undo history. */
    setReadOnly(readOnly: boolean): void;
    /** Change the text shown while the document is empty. Empty string means none. */
    setPlaceholder(placeholder: string): void;
    /**
     * Where each mounted plugin's panel hangs, in mount order. A plugin whose
     * anchor is nowhere near the selection is simply absent from the list.
     */
    panels(): PanelAnchor[];
    /** The caret-anchored picker, if a plugin's trigger is currently open. */
    combobox: {
        active(): ActiveCombobox | null;
        /** Remove the trigger and its query, so the plugin can insert its choice in their place. */
        clear(): void;
        /** Close without touching the text (Escape). */
        dismiss(): void;
    };
    destroy(): void;
};

export const createEditor = ({
    container,
    initialDoc,
    plugins,
    readOnly,
    placeholder,
    contentClassName,
    placeholderClassName,
    onDocChange,
    onStateChange,
    onBlur,
}: {
    container: HTMLElement;
    initialDoc: RteDocumentOf;
    plugins: RtePlugin[];
    /** Starting value; change it later through `setReadOnly`. */
    readOnly: boolean;
    /** Starting value; change it later through `setPlaceholder`. */
    placeholder: string;
    /**
     * Classes for the editable element. Styling belongs to the editor, so the
     * adapter is only told what to stamp on — the editor's own content class
     * plus whatever the mounted plugins contribute.
     */
    contentClassName: string;
    /** Class the placeholder decoration carries. */
    placeholderClassName: string;
    onDocChange: (doc: RteDocumentOf) => void;
    onStateChange: () => void;
    /** The editable element lost focus. Handed the current document, so a caller can commit it. */
    onBlur: (doc: RteDocumentOf) => void;
}): EditorHandle => {
    const bundle = buildSchema(plugins);
    const { schema } = bundle;
    // Hotkeys are wired before the view (and hence the api) exists, so they
    // reach it through a thunk that only runs once the editor is live.
    let api!: EditorControlApi;
    let lastEmitted = initialDoc;
    // Both are read through thunks below, so changing one is a prop update
    // rather than a rebuild — the selection and the undo history survive.
    let readOnlyNow = readOnly;
    let placeholderNow = placeholder;
    /** Ask the view to re-read the thunks above and redraw. */
    const refresh = (): void => view.setProps({});

    const view: EditorView = new EditorView(container, {
        attributes: { class: contentClassName },
        editable: () => !readOnlyNow,
        state: EditorState.create({
            doc: documentToPm(initialDoc, schema),
            plugins: [
                ...buildPmPlugins(plugins, bundle, () => api),
                placeholderPlugin(() => placeholderNow, placeholderClassName),
            ],
        }),
        handleDOMEvents: {
            blur: () => {
                onBlur(pmToDocument(view.state.doc));
                // Never claim the event: the browser still has to move focus.
                return false;
            },
        },
        // A rendered element may declare itself a toggle for one of its own
        // boolean attributes — the checkbox in a check list item.
        handleClickOn(_view, _pos, node, nodePos, event) {
            const target = event.target as HTMLElement | null;
            const name = target?.closest?.(`[${TOGGLE_ATTRIBUTE}]`)?.getAttribute(TOGGLE_ATTRIBUTE);
            if (!name || !(name in node.attrs)) {
                return false;
            }
            view.dispatch(
                view.state.tr.setNodeMarkup(nodePos, undefined, { ...node.attrs, [name]: !node.attrs[name] }),
            );
            return true;
        },
        dispatchTransaction(transaction) {
            view.updateState(view.state.apply(transaction));
            if (transaction.docChanged) {
                lastEmitted = pmToDocument(view.state.doc);
                onDocChange(lastEmitted);
            }
            onStateChange();
        },
    });

    api = createApi(view, bundle);

    const tracked = (): ComboboxTracked | null => comboboxKey.getState(view.state)?.tracked ?? null;

    const panelSpecs = plugins.flatMap((plugin) =>
        plugin.panel ? [{ pluginId: plugin.id, anchorTo: plugin.panel.anchorTo ?? ('selection' as const) }] : [],
    );

    return {
        api,
        panels() {
            return panelSpecs.flatMap(({ pluginId, anchorTo }) => {
                const { from, to } = view.state.selection;
                const markType = anchorTo === 'selection' ? null : schema.marks[anchorTo.mark];
                const range =
                    anchorTo === 'selection' ? { from, to } : markType ? findMarkRange(view.state, markType) : null;
                if (range === null) {
                    return [];
                }
                // The box around both ends of what the panel is about. A link
                // that wraps across lines spans both of them, which is the
                // honest answer: it is one link, and it is that tall.
                const start = view.coordsAtPos(range.from);
                const end = view.coordsAtPos(range.to);
                const left = Math.min(start.left, end.left);
                const top = Math.min(start.top, end.top);
                return [
                    {
                        pluginId,
                        rect: {
                            left,
                            top,
                            width: Math.max(start.right, end.right) - left,
                            height: Math.max(start.bottom, end.bottom) - top,
                        },
                    },
                ];
            });
        },
        setDoc(doc) {
            if (doc !== lastEmitted) {
                const { content } = documentToPm(doc, schema);
                view.dispatch(view.state.tr.replaceWith(0, view.state.doc.content.size, content));
            }
        },
        setReadOnly(next) {
            readOnlyNow = next;
            refresh();
        },
        setPlaceholder(next) {
            placeholderNow = next;
            refresh();
        },
        combobox: {
            active() {
                const open = tracked();
                if (!open) {
                    return null;
                }
                const { left, top, bottom } = view.coordsAtPos(open.from);
                return {
                    pluginId: open.pluginId,
                    trigger: open.trigger,
                    query: open.query,
                    coords: { left, top, bottom },
                };
            },
            clear() {
                const open = tracked();
                if (open) {
                    view.dispatch(view.state.tr.delete(open.from, open.to));
                }
            },
            dismiss() {
                view.dispatch(view.state.tr.setMeta(comboboxKey, DISMISS));
            },
        },
        destroy() {
            view.destroy();
        },
    };
};
