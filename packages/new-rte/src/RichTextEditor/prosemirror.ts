/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap, setBlockType as pmSetBlockType, toggleMark as pmToggleMark } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import {
    type MarkSpec as PmMarkSpec,
    type Node as PmNode,
    type NodeSpec as PmNodeSpec,
    Schema,
    type TagParseRule,
} from 'prosemirror-model';
import { type Command, EditorState, type Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import {
    type AttributeSpec,
    type BlockSpec,
    type EditorControlApi,
    type InlineSpec,
    type MarkSpec,
    type ParseRule,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RtePlugin,
} from './types';

/**
 * The only module that knows ProseMirror exists. It translates plugin
 * declarations into engine configuration, hosts the live editor, converts
 * documents at the boundary, and implements the EditorControlApi.
 */

/** Class on the editable element; plugin styles and the editor's own CSS are scoped to it. */
export const EDITOR_CLASS = 'rte';

// ---------------------------------------------------------------------------
// Rendering: React render functions → tag + DOM attributes
// ---------------------------------------------------------------------------

/** Stands in for the editable content slot while probing. */
const SENTINEL = ' RTE_HOLE ';

type ProbedDom = {
    tag: string;
    attrs: Record<string, string>;
    /** Text the element renders itself (a void inline's visible label). */
    text: string;
};

/**
 * Plugins declare rendering as React functions; the engine needs a tag plus
 * DOM attributes. Bridge: render the function statically and read the
 * outermost element. Limitation (accepted): only a single root element
 * survives — no nested wrappers.
 */
const probeDom = (render: () => ReactNode): ProbedDom => {
    const markup = renderToStaticMarkup(createElement(render));
    const element = new DOMParser().parseFromString(markup, 'text/html').body.firstElementChild;
    if (!element) {
        throw new Error(`A plugin render function produced no element. Output was: ${markup}`);
    }
    return {
        tag: element.tagName.toLowerCase(),
        attrs: Object.fromEntries(Array.from(element.attributes, (attr) => [attr.name, attr.value])),
        text: element.textContent ?? '',
    };
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

// ---------------------------------------------------------------------------
// Schema: plugin specs → engine schema
// ---------------------------------------------------------------------------

/** Attributes are always optional in the engine; an absent value round-trips as missing. */
const pmAttrs = (attributes: Record<string, AttributeSpec> = {}): Record<string, { default: unknown }> =>
    Object.fromEntries(
        Object.entries(attributes).map(([name, attribute]) => [name, { default: attribute.default ?? null }]),
    );

/** Rules for recognizing pasted HTML: the tag, the attributes it implies, and any read off the element. */
const pmParseDom = (attributes: Record<string, AttributeSpec>, rules: readonly ParseRule[]): TagParseRule[] => {
    const domAttributeNames = Object.entries(attributes)
        .filter(([, attribute]) => attribute.parseFromDomAttribute)
        .map(([name, attribute]): [string, string] => [
            name,
            typeof attribute.parseFromDomAttribute === 'string' ? attribute.parseFromDomAttribute : name,
        ]);

    return rules.map(({ tag, attributes: implied }) => ({
        tag,
        getAttrs: (element: HTMLElement) => ({
            ...Object.fromEntries(domAttributeNames.map(([name, domName]) => [name, element.getAttribute(domName)])),
            ...implied,
        }),
    }));
};

const blockNodeSpec = (spec: BlockSpec): PmNodeSpec => {
    const isVoid = spec.isVoid ?? false;
    const probe = probeCachedBy((attrs) => spec.render({ node: { type: spec.type, ...attrs }, children: SENTINEL }));

    return {
        content: isVoid ? undefined : 'inline*',
        atom: isVoid,
        group: 'block',
        attrs: pmAttrs(spec.attributes),
        parseDOM: pmParseDom(spec.attributes ?? {}, spec.parseRules ?? []),
        toDOM: (node) => {
            const { tag, attrs } = probe(node.attrs);
            return isVoid ? [tag, attrs] : [tag, attrs, 0];
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
        toDOM: (node) => {
            const { tag, attrs, text } = probe(node.attrs);
            return text === '' ? [tag, attrs] : [tag, attrs, text];
        },
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
        toDOM: (mark) => {
            const { tag, attrs: domAttrs } = probe(mark.attrs);
            return [tag, domAttrs, 0];
        },
    };
};

const buildSchema = (plugins: RtePlugin[]): Schema => {
    // Node insertion order matters: the first node matching the doc's
    // `block+` content is the default block type (empty documents, Enter-key
    // splits) — the paragraph baseline stays first.
    const nodes: Record<string, PmNodeSpec> = {
        doc: { content: 'block+' },
        paragraph: { content: 'inline*', group: 'block', parseDOM: [{ tag: 'p' }], toDOM: () => ['p', 0] },
        text: { group: 'inline' },
    };
    const marks: Record<string, PmMarkSpec> = {};

    for (const plugin of plugins) {
        for (const block of plugin.schema?.blocks ?? []) {
            nodes[block.type] = blockNodeSpec(block);
        }
        for (const inline of plugin.schema?.inlines ?? []) {
            nodes[inline.type] = inlineNodeSpec(inline);
        }
        for (const mark of plugin.schema?.marks ?? []) {
            marks[mark.key] = markPmSpec(mark);
        }
    }

    return new Schema({ nodes, marks });
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

const documentToPm = (doc: RteDocumentOf, schema: Schema): PmNode => {
    const docType = schema.nodes.doc;
    if (!docType) {
        throw new Error('Schema is missing the "doc" node type.');
    }
    return docType.create(
        null,
        doc.blocks.map((block) => {
            const nodeType = schema.nodes[block.type];
            if (!nodeType) {
                throw new Error(`Unknown block type "${block.type}". Did you forget to register a plugin?`);
            }
            const attrs = declaredAttrs(block as Record<string, unknown>, nodeType.spec.attrs);
            return nodeType.create(attrs, block.children ? inlinesToPm(block.children, schema) : []);
        }),
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

const pmToDocument = (doc: PmNode): RteDocumentOf => ({
    version: 1,
    blocks: mapChildren(doc, (blockNode) => {
        const block: Record<string, unknown> = { type: blockNode.type.name, ...definedAttrs(blockNode.attrs) };
        if (!blockNode.isAtom) {
            block.children = mapChildren(blockNode, inlineFromPm);
        }
        return block as unknown as RteBlockNode;
    }),
});

// ---------------------------------------------------------------------------
// The editor
// ---------------------------------------------------------------------------

const blockFromPm = (node: PmNode): RteBlockNode =>
    ({ type: node.type.name, ...definedAttrs(node.attrs) }) as unknown as RteBlockNode;

const createApi = (view: EditorView, schema: Schema): EditorControlApi => ({
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
    insert(type, attrs) {
        const nodeType = schema.nodes[type];
        if (nodeType) {
            view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
            view.focus();
        }
    },
    getCurrentBlock() {
        const { $from } = view.state.selection;
        for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (node.type.spec.group === 'block') {
                return blockFromPm(node);
            }
        }
        // A selected void block (image): the selection sits at doc level.
        const after = $from.nodeAfter;
        return after && after.type.spec.group === 'block' ? blockFromPm(after) : null;
    },
    isSelectionCollapsed() {
        return view.state.selection.empty;
    },
    focus() {
        view.focus();
    },
});

const buildPmPlugins = (plugins: RtePlugin[], getApi: () => EditorControlApi): Plugin[] => {
    const hotkeys: Record<string, Command> = {};
    for (const plugin of plugins) {
        for (const [keys, command] of Object.entries(plugin.hotkeys ?? {})) {
            hotkeys[keys] = () => {
                command(getApi());
                return true;
            };
        }
    }
    return [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Mod-Shift-z': redo }),
        keymap(hotkeys),
        keymap(baseKeymap),
    ];
};

export type EditorHandle = {
    api: EditorControlApi;
    /** Replace the content with an externally-set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    destroy(): void;
};

export const createEditor = ({
    container,
    initialDoc,
    plugins,
    onDocChange,
    onStateChange,
}: {
    container: HTMLElement;
    initialDoc: RteDocumentOf;
    plugins: RtePlugin[];
    onDocChange: (doc: RteDocumentOf) => void;
    onStateChange: () => void;
}): EditorHandle => {
    const schema = buildSchema(plugins);
    // Hotkeys are wired before the view (and hence the api) exists, so they
    // reach it through a thunk that only runs once the editor is live.
    let api!: EditorControlApi;
    let lastEmitted = initialDoc;

    const view: EditorView = new EditorView(container, {
        attributes: { class: EDITOR_CLASS },
        state: EditorState.create({
            doc: documentToPm(initialDoc, schema),
            plugins: buildPmPlugins(plugins, () => api),
        }),
        dispatchTransaction(transaction) {
            view.updateState(view.state.apply(transaction));
            if (transaction.docChanged) {
                lastEmitted = pmToDocument(view.state.doc);
                onDocChange(lastEmitted);
            }
            onStateChange();
        },
    });

    api = createApi(view, schema);

    return {
        api,
        setDoc(doc) {
            if (doc !== lastEmitted) {
                const { content } = documentToPm(doc, schema);
                view.dispatch(view.state.tr.replaceWith(0, view.state.doc.content.size, content));
            }
        },
        destroy() {
            view.destroy();
        },
    };
};
