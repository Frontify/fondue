/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType, toggleMark } from 'prosemirror-commands';
import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type FrontifyBlock, type HeadingBlock, type ParagraphBlock } from '#/core/document';
import { type EditorControlApi, type PluginEventBus } from '#/core/editor-api';

import { documentToPm, pmToDocument } from './document';

const summarizeBlock = (nodeName: string, attrs: Record<string, unknown>): FrontifyBlock => {
    const align = (attrs.align as FrontifyBlock['align' & keyof FrontifyBlock]) ?? undefined;
    if (nodeName === 'heading') {
        const block: HeadingBlock = {
            type: 'heading',
            level: (attrs.level as 1 | 2 | 3 | 4) ?? 1,
            children: [],
        };
        if (align) {
            block.align = align;
        }
        return block;
    }
    const block: ParagraphBlock = { type: 'paragraph', children: [] };
    if (align) {
        block.align = align;
    }
    return block;
};

export type CreateEditorApiArgs = {
    getView: () => EditorView | null;
    schema: Schema;
    events: PluginEventBus;
};

export const createEditorControlApi = ({ getView, schema, events }: CreateEditorApiArgs): EditorControlApi => {
    const requireView = (): EditorView | null => getView();

    return {
        toggleMark(key) {
            const view = requireView();
            if (!view) {
                return;
            }
            const markType = schema.marks[key];
            if (!markType) {
                return;
            }
            toggleMark(markType)(view.state, view.dispatch);
            view.focus();
        },
        isMarkActive(key) {
            const view = requireView();
            if (!view) {
                return false;
            }
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
        removeAllMarks() {
            const view = requireView();
            if (!view) {
                return;
            }
            const { from, to } = view.state.selection;
            let tr = view.state.tr;
            for (const name of Object.keys(schema.marks)) {
                const markType = schema.marks[name];
                if (markType) {
                    tr = tr.removeMark(from, to, markType);
                }
            }
            view.dispatch(tr);
        },
        setBlockType(type, attrs) {
            const view = requireView();
            if (!view) {
                return;
            }
            const nodeType = schema.nodes[type];
            if (!nodeType) {
                return;
            }
            setBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
            view.focus();
        },
        isBlockActive(type, attrs) {
            const view = requireView();
            if (!view) {
                return false;
            }
            const { $from } = view.state.selection;
            for (let depth = $from.depth; depth >= 0; depth--) {
                const node = $from.node(depth);
                if (node.type.name !== type) {
                    continue;
                }
                if (!attrs) {
                    return true;
                }
                return Object.entries(attrs).every(([key, value]) => node.attrs[key] === value);
            }
            return false;
        },
        getCurrentBlock() {
            const view = requireView();
            if (!view) {
                return null;
            }
            const { $from } = view.state.selection;
            for (let depth = $from.depth; depth >= 0; depth--) {
                const node = $from.node(depth);
                if (node.type.spec.group === 'block' || node.type.name === 'paragraph') {
                    return summarizeBlock(node.type.name, node.attrs);
                }
            }
            return null;
        },
        insertInline() {
            /* not used by the spike's two plugins */
        },
        wrapSelection() {
            /* not used by the spike's two plugins */
        },
        unwrapInline() {
            /* not used by the spike's two plugins */
        },
        getSelection() {
            /* The spike's two plugins don't read selection — leave as null. */
            return null;
        },
        setSelection() {
            /* not used by the spike's two plugins */
        },
        isSelectionCollapsed() {
            const view = requireView();
            return view ? view.state.selection.empty : true;
        },
        isSelectionAcrossBlocks() {
            const view = requireView();
            if (!view) {
                return false;
            }
            const { $from, $to } = view.state.selection;
            return !$from.sameParent($to);
        },
        getDocument() {
            const view = requireView();
            if (!view) {
                return { version: 1, blocks: [] };
            }
            return pmToDocument(view.state.doc);
        },
        replaceDocument(doc) {
            const view = requireView();
            if (!view) {
                return;
            }
            const node = documentToPm(doc, schema);
            const tr = view.state.tr.replaceWith(0, view.state.doc.content.size, node.content);
            view.dispatch(tr);
        },
        focus() {
            requireView()?.focus();
        },
        blur() {
            const view = requireView();
            if (view) {
                view.dom.blur();
            }
        },
        events,
    };
};
