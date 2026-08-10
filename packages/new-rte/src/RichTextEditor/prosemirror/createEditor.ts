/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap, setBlockType as pmSetBlockType, toggleMark as pmToggleMark } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import {
    type MarkSpec as PmMarkSpec,
    type Node as PmNode,
    type NodeSpec as PmNodeSpec,
    Schema,
} from 'prosemirror-model';
import { type Command, EditorState, NodeSelection, type Plugin, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import {
    type FrontifyBlockNode,
    type FrontifyDocument,
    type FrontifyInlineNode,
    type FrontifyPoint,
} from '../core/document';
import { type EditorControlApi } from '../core/editor-api';
import {
    type AttributeSpec,
    type BlockSpec,
    type FondueRtePlugin,
    type InlineSpec,
    type MarkSpec,
} from '../core/plugin';

import { probeBlockDom, probeInlineDom, probeMarkDom, type ProbedDom, type ProbedInlineDom } from './dom-probe';

/**
 * The only module that knows ProseMirror exists. It translates plugin
 * declarations into engine configuration, hosts the live editor, converts
 * documents at the boundary, and implements the EditorControlApi.
 */

/** [attributeName, domAttributeName] pairs for attributes read back from pasted HTML. */
const domAttrPairsOf = (attributes: Record<string, AttributeSpec>): [string, string][] =>
    Object.entries(attributes)
        .filter(([, attribute]) => attribute.parseFromDomAttribute)
        .map(([name, attribute]) => [
            name,
            typeof attribute.parseFromDomAttribute === 'string' ? attribute.parseFromDomAttribute : name,
        ]);

const blockNodeSpec = (spec: BlockSpec): PmNodeSpec => {
    const isVoid = spec.isVoid ?? false;
    const domAttrPairs = domAttrPairsOf(spec.attributes ?? {});

    const probeCache = new Map<string, ProbedDom>();
    const probe = (attrs: Record<string, unknown>): ProbedDom => {
        const key = JSON.stringify(attrs);
        let probed = probeCache.get(key);
        if (!probed) {
            probed = probeBlockDom(spec, attrs);
            probeCache.set(key, probed);
        }
        return probed;
    };

    return {
        content: isVoid ? undefined : 'inline*',
        atom: isVoid,
        group: 'block',
        attrs: Object.fromEntries(
            Object.entries(spec.attributes ?? {}).map(([name, attribute]) => [name, { default: attribute.default }]),
        ),
        parseDOM: (spec.parseRules ?? []).map(({ tag, attributes }) => ({
            tag,
            getAttrs: (el: HTMLElement | string) =>
                typeof el === 'string'
                    ? (attributes ?? {})
                    : {
                          ...Object.fromEntries(
                              domAttrPairs.map(([name, domName]) => [name, el.getAttribute(domName)]),
                          ),
                          ...attributes,
                      },
        })),
        toDOM: (node) => {
            const { tag, attrs } = probe(node.attrs);
            return isVoid ? [tag, attrs] : [tag, attrs, 0];
        },
    };
};

const markPmSpec = (spec: MarkSpec): PmMarkSpec => {
    const attributes = spec.attributes ?? {};
    const attributeNames = Object.keys(attributes);
    const domAttrPairs = domAttrPairsOf(attributes);

    const probeCache = new Map<string, ProbedDom>();
    const probe = (value: Record<string, unknown>): ProbedDom => {
        const key = JSON.stringify(value);
        let probed = probeCache.get(key);
        if (!probed) {
            probed = probeMarkDom(spec, value);
            probeCache.set(key, probed);
        }
        return probed;
    };

    // The element the mark renders (probed with default values) is always
    // recognized when parsing; parseRules add more.
    const defaultValue = Object.fromEntries(attributeNames.map((name) => [name, attributes[name]?.default ?? null]));
    const parseRules = [{ tag: probe(defaultValue).tag, attributes: undefined }, ...(spec.parseRules ?? [])];

    return {
        attrs: Object.fromEntries(attributeNames.map((name) => [name, { default: attributes[name]?.default ?? null }])),
        // Value-carrying marks (links) should not extend when typing at their edge.
        inclusive: attributeNames.length === 0,
        parseDOM: parseRules.map(({ tag, attributes: ruleAttributes }) => ({
            tag,
            getAttrs: (el: HTMLElement | string) =>
                typeof el === 'string'
                    ? (ruleAttributes ?? null)
                    : {
                          ...Object.fromEntries(
                              domAttrPairs.map(([name, domName]) => [name, el.getAttribute(domName)]),
                          ),
                          ...ruleAttributes,
                      },
        })),
        toDOM: (markInstance) => {
            const { tag, attrs } = probe(markInstance.attrs);
            return [tag, attrs, 0];
        },
    };
};

const inlineNodeSpec = (spec: InlineSpec): PmNodeSpec => {
    const domAttrPairs = domAttrPairsOf(spec.attributes ?? {});

    const probeCache = new Map<string, ProbedInlineDom>();
    const probe = (attrs: Record<string, unknown>): ProbedInlineDom => {
        const key = JSON.stringify(attrs);
        let probed = probeCache.get(key);
        if (!probed) {
            probed = probeInlineDom(spec, attrs);
            probeCache.set(key, probed);
        }
        return probed;
    };

    return {
        group: 'inline',
        inline: true,
        atom: true,
        attrs: Object.fromEntries(
            Object.entries(spec.attributes ?? {}).map(([name, attribute]) => [name, { default: attribute.default }]),
        ),
        parseDOM: (spec.parseRules ?? []).map(({ tag, attributes }) => ({
            tag,
            getAttrs: (el: HTMLElement | string) =>
                typeof el === 'string'
                    ? (attributes ?? {})
                    : {
                          ...Object.fromEntries(
                              domAttrPairs.map(([name, domName]) => [name, el.getAttribute(domName)]),
                          ),
                          ...attributes,
                      },
        })),
        toDOM: (node) => {
            const { tag, attrs, text } = probe(node.attrs);
            return text === '' ? [tag, attrs] : [tag, attrs, text];
        },
    };
};

const buildSchema = (plugins: FondueRtePlugin[]): Schema => {
    // Node insertion order matters: the first node matching the doc's
    // `block+` content is the default block type (empty documents,
    // Enter-key splits) — the paragraph baseline stays first.
    const nodes: Record<string, PmNodeSpec> = {
        doc: { content: 'block+' },
        paragraph: {
            content: 'inline*',
            group: 'block',
            parseDOM: [{ tag: 'p' }],
            toDOM: () => ['p', 0],
        },
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

const inlinesToPm = (children: FrontifyInlineNode[], schema: Schema): PmNode[] => {
    const out: PmNode[] = [];
    for (const child of children) {
        if ('text' in child) {
            if (child.text === '') {
                continue;
            }
            const flags = child as Record<string, unknown>;
            const marks = Object.entries(schema.marks)
                .filter(([key]) => Boolean(flags[key]))
                .map(([key, markType]) => {
                    const value = flags[key];
                    return markType.create(typeof value === 'object' && value !== null ? value : undefined);
                });
            out.push(schema.text(child.text as string, marks));
            continue;
        }
        const nodeType = schema.nodes[child.type];
        if (!nodeType) {
            throw new Error(`Unknown inline type "${String(child.type)}". Did you forget to register a plugin?`);
        }
        const attrs: Record<string, unknown> = {};
        for (const name of Object.keys(nodeType.spec.attrs ?? {})) {
            if (child[name] !== undefined) {
                attrs[name] = child[name];
            }
        }
        out.push(nodeType.create(attrs));
    }
    return out;
};

const documentToPm = (doc: FrontifyDocument, schema: Schema): PmNode => {
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
            const flags = block as unknown as Record<string, unknown>;
            const attrs: Record<string, unknown> = {};
            for (const name of Object.keys(nodeType.spec.attrs ?? {})) {
                if (flags[name] !== undefined) {
                    attrs[name] = flags[name];
                }
            }
            return nodeType.create(attrs, block.children ? inlinesToPm(block.children, schema) : []);
        }),
    );
};

const pmToDocument = (doc: PmNode): FrontifyDocument => {
    const blocks: FrontifyBlockNode[] = [];
    for (let blockIndex = 0; blockIndex < doc.childCount; blockIndex++) {
        const blockNode = doc.child(blockIndex);
        const block: Record<string, unknown> = { type: blockNode.type.name };
        for (const [name, value] of Object.entries(blockNode.attrs)) {
            if (value !== null && value !== undefined) {
                block[name] = value;
            }
        }
        if (!blockNode.isAtom) {
            const children: FrontifyInlineNode[] = [];
            for (let childIndex = 0; childIndex < blockNode.childCount; childIndex++) {
                const child = blockNode.child(childIndex);
                if (!child.isText) {
                    const inline: Record<string, unknown> = { type: child.type.name };
                    for (const [name, value] of Object.entries(child.attrs)) {
                        if (value !== null && value !== undefined) {
                            inline[name] = value;
                        }
                    }
                    children.push(inline as FrontifyInlineNode);
                    continue;
                }
                const textNode: Record<string, unknown> = { text: child.text ?? '' };
                for (const mark of child.marks) {
                    const attrNames = Object.keys(mark.type.spec.attrs ?? {});
                    if (attrNames.length === 0) {
                        textNode[mark.type.name] = true;
                        continue;
                    }
                    const value: Record<string, unknown> = {};
                    for (const [name, attrValue] of Object.entries(mark.attrs)) {
                        if (attrValue !== null && attrValue !== undefined) {
                            value[name] = attrValue;
                        }
                    }
                    textNode[mark.type.name] = value;
                }
                children.push(textNode as FrontifyInlineNode);
            }
            block.children = children;
        }
        blocks.push(block as unknown as FrontifyBlockNode);
    }
    return { version: 1, blocks };
};

const posToPoint = (doc: PmNode, pos: number): FrontifyPoint => {
    const $pos = doc.resolve(pos);
    if ($pos.depth === 0) {
        // Between/on blocks (e.g. a selected void block): address the block itself.
        return { path: [$pos.index(0)], offset: 0 };
    }
    return { path: [$pos.index(0), $pos.index(1)], offset: $pos.textOffset };
};

const pointToPos = (doc: PmNode, point: FrontifyPoint): number => {
    const [blockIndex, childIndex] = point.path;
    if (blockIndex === undefined || blockIndex < 0 || blockIndex >= doc.childCount) {
        throw new Error(`Invalid selection point: no block at index ${String(blockIndex)}.`);
    }
    let pos = 0;
    for (let i = 0; i < blockIndex; i++) {
        pos += doc.child(i).nodeSize;
    }
    if (childIndex === undefined) {
        return pos; // the position addressing the block itself
    }
    const block = doc.child(blockIndex);
    let inner = pos + 1;
    for (let i = 0; i < Math.min(childIndex, block.childCount); i++) {
        inner += block.child(i).nodeSize;
    }
    return inner + point.offset;
};

const createApi = (view: EditorView, schema: Schema): EditorControlApi => ({
    toggleMark(key, value) {
        const markType = schema.marks[key];
        if (!markType) {
            return;
        }
        pmToggleMark(markType, value)(view.state, view.dispatch);
        view.focus();
    },
    isMarkActive(key) {
        const markType = schema.marks[key];
        if (!markType) {
            return false;
        }
        const { from, to, empty, $from } = view.state.selection;
        if (empty) {
            return Boolean(markType.isInSet(view.state.storedMarks ?? $from.marks()));
        }
        return view.state.doc.rangeHasMark(from, to, markType);
    },
    setBlockType(type, attrs) {
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            return;
        }
        pmSetBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
        view.focus();
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
    insertBlock(type, attrs) {
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            return;
        }
        view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
        view.focus();
    },
    insertInline(type, attrs) {
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            return;
        }
        view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
        view.focus();
    },
    getCurrentBlock() {
        const { $from } = view.state.selection;
        const summarize = (node: PmNode): FrontifyBlockNode => {
            const block: Record<string, unknown> = { type: node.type.name };
            for (const [name, value] of Object.entries(node.attrs)) {
                if (value !== null && value !== undefined) {
                    block[name] = value;
                }
            }
            return block as unknown as FrontifyBlockNode;
        };
        for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (node.type.spec.group === 'block') {
                return summarize(node);
            }
        }
        // A selected void block (image): the selection sits at doc level.
        const after = $from.nodeAfter;
        return after && after.type.spec.group === 'block' ? summarize(after) : null;
    },
    getSelection() {
        const { selection, doc } = view.state;
        return {
            anchor: posToPoint(doc, selection.anchor),
            focus: posToPoint(doc, selection.head),
        };
    },
    setSelection(selection) {
        const { doc, tr } = view.state;
        if (selection.anchor.path.length === 1) {
            view.dispatch(tr.setSelection(NodeSelection.create(doc, pointToPos(doc, selection.anchor))));
            return;
        }
        const anchor = pointToPos(doc, selection.anchor);
        const head = pointToPos(doc, selection.focus);
        view.dispatch(tr.setSelection(TextSelection.create(doc, anchor, head)));
    },
    isSelectionCollapsed() {
        return view.state.selection.empty;
    },
    focus() {
        view.focus();
    },
});

const buildPmPlugins = (plugins: FondueRtePlugin[], getApi: () => EditorControlApi): Plugin[] => {
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
    destroy(): void;
    getApi(): EditorControlApi;
    updateExternalDoc(doc: FrontifyDocument): void;
};

export type CreateEditorArgs = {
    container: HTMLElement;
    initialDoc: FrontifyDocument;
    plugins: FondueRtePlugin[];
    onDocChange(doc: FrontifyDocument): void;
    onStateChange(): void;
    editorClass?: string;
};

export const createEditor = ({
    container,
    initialDoc,
    plugins,
    onDocChange,
    onStateChange,
    editorClass,
}: CreateEditorArgs): EditorHandle => {
    const schema = buildSchema(plugins);
    let api: EditorControlApi | null = null;
    const getApi = (): EditorControlApi => {
        if (!api) {
            throw new Error('Editor API accessed before it was initialised.');
        }
        return api;
    };
    let lastEmitted = initialDoc;

    const view: EditorView = new EditorView(container, {
        attributes: editorClass ? { class: editorClass } : {},
        state: EditorState.create({
            doc: documentToPm(initialDoc, schema),
            plugins: buildPmPlugins(plugins, getApi),
        }),
        dispatchTransaction(transaction) {
            const newState = view.state.apply(transaction);
            view.updateState(newState);
            if (transaction.docChanged) {
                lastEmitted = pmToDocument(newState.doc);
                onDocChange(lastEmitted);
            }
            onStateChange();
        },
    });

    api = createApi(view, schema);

    return {
        destroy() {
            view.destroy();
        },
        getApi,
        updateExternalDoc(doc) {
            if (doc === lastEmitted) {
                return;
            }
            const node = documentToPm(doc, schema);
            view.dispatch(view.state.tr.replaceWith(0, view.state.doc.content.size, node.content));
        },
    };
};
