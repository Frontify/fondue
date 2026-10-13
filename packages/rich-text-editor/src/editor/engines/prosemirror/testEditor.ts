/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { vi } from 'vitest';

import {
    buildPluginRegistry,
    type EditorControlApi,
    type RteBlockNode,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';
import { defaultPlugins } from '#/plugins';

import { createControlApi } from './controlApi';
import { toEngineDocument, toRteDocument } from './documentConversion';
import { inlineElementsCarryNoMarksPlugin } from './inlineMarks';
import { keystrokePipeline } from './keystrokes';
import { buildSchema } from './schema';

/**
 * The editor as `mountDocument` assembles it — schema, keystroke pipeline and
 * control API over one view — minus the React node views, and with the view
 * handed out, so a spec can put the selection where it needs it and type into
 * the editor the way the engine's input handling does.
 *
 * Test-only: imported by the specs next to it, never by the package.
 */

const mounted: EditorView[] = [];

/** Destroy every editor `editorWith` mounted. Call it from `afterEach`. */
export const destroyEditors = (): void => {
    for (const view of mounted.splice(0)) {
        view.destroy();
    }
    window.document.body.replaceChildren();
};

/** Where a stretch of text sits in the engine's document. Inline atoms count as one character. */
const findText = (doc: PmNode, needle: string): { from: number; to: number } => {
    let found: { from: number; to: number } | null = null;
    doc.descendants((node, pos) => {
        if (found !== null) {
            return false;
        }
        if (!node.isTextblock) {
            return true;
        }
        const positions: number[] = [];
        let text = '';
        let start = pos + 1;
        for (let childIndex = 0; childIndex < node.childCount; childIndex++) {
            const child = node.child(childIndex);
            const content = child.isText ? (child.text ?? '') : '￼';
            for (let index = 0; index < content.length; index++) {
                text += content.charAt(index);
                positions.push(start + index);
            }
            start += child.nodeSize;
        }
        const index = text.indexOf(needle);
        const first = positions[index];
        const last = positions[index + needle.length - 1];
        if (index >= 0 && first !== undefined && last !== undefined) {
            found = { from: first, to: last + 1 };
        }
        return false;
    });
    if (found === null) {
        throw new Error(`"${needle}" is not in the document`);
    }
    return found;
};

/**
 * A block as a spec writes it: the plugin's own attributes sit flat on it, which
 * the open `RteBlockNode` cannot name.
 */
type BlockInput = RteBlockNode | (Record<string, unknown> & { type: string });

/** Shipped plugins by id, taken from `defaultPlugins` — the one plugin import this folder may make. */
export const shipped = (...ids: string[]): RtePlugin[] => defaultPlugins.filter((plugin) => ids.includes(plugin.id));

export const editorWith = (plugins: RtePlugin[], blocks: BlockInput[]) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const onDocChange = vi.fn<(doc: RteDocumentOf) => void>();

    const registry = buildPluginRegistry(plugins);
    const bundle = buildSchema(registry);
    let api!: EditorControlApi;
    const view: EditorView = new EditorView(container, {
        state: EditorState.create({
            doc: toEngineDocument({ version: 1, blocks: blocks as RteBlockNode[] }, bundle.schema),
            plugins: [...keystrokePipeline(registry, bundle, () => api), inlineElementsCarryNoMarksPlugin()],
        }),
        dispatchTransaction(transaction) {
            view.updateState(view.state.apply(transaction));
            if (transaction.docChanged) {
                onDocChange(toRteDocument(view.state.doc));
            }
        },
    });
    mounted.push(view);
    api = createControlApi(view, bundle, { type: null, repaint: () => {} });

    const setSelection = (from: number, to = from): void => {
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));
    };

    return {
        api,
        view,
        onDocChange,
        /** The blocks of the document last reported to the host, or null when nothing was. */
        stored: (): RteBlockNode[] | null => onDocChange.mock.lastCall?.[0].blocks ?? null,
        /** Select the first occurrence of `text`. */
        select: (text: string): void => {
            const { from, to } = findText(view.state.doc, text);
            setSelection(from, to);
        },
        /** Select from the start of `first` to the end of `last`, across blocks. */
        selectBetween: (first: string, last: string): void => {
            setSelection(findText(view.state.doc, first).from, findText(view.state.doc, last).to);
        },
        caretBefore: (text: string): void => setSelection(findText(view.state.doc, text).from),
        caretAfter: (text: string): void => setSelection(findText(view.state.doc, text).to),
        /** Type character by character, through the engine's text-input handling as a keypress would. */
        type: (text: string): void => {
            for (const character of text) {
                const { from, to } = view.state.selection;
                const insert = () => view.state.tr.insertText(character, from, to);
                const handled = view.someProp('handleTextInput', (handle) => handle(view, from, to, character, insert));
                if (handled !== true) {
                    view.dispatch(insert());
                }
            }
        },
    };
};

export const paragraph = (...children: Record<string, unknown>[]): RteBlockNode =>
    ({ type: 'paragraph', children }) as RteBlockNode;

export const text = (value: string, marks: Record<string, unknown> = {}): Record<string, unknown> => ({
    text: value,
    ...marks,
});
