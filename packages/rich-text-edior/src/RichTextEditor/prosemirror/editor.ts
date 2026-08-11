/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type EditorControlApi, type RteDocumentOf, type RtePlugin } from '../types';

import { createApi } from './api';
import { documentToPm, pmToDocument } from './document';
import { buildEnginePlugins } from './enginePlugins';
import { createFloatingLocator, type FloatingPlacement } from './floating';
import { placeholderPlugin } from './placeholder';
import { TOGGLE_ATTRIBUTE } from './render';
import { buildSchema } from './schema';
import { createTriggerController } from './triggers';

/**
 * The live editor: builds the engine from the plugin set, hosts the view, and
 * hands back the handle the React component drives it through.
 */

export type EditorOptions = {
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
};

export type EditorHandle = {
    api: EditorControlApi;
    /** Replace the content with an externally-set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    /** Turn editing off or back on, keeping the content, the selection and the undo history. */
    setReadOnly(readOnly: boolean): void;
    /** Change the text shown while the document is empty. Empty string means none. */
    setPlaceholder(placeholder: string): void;
    /**
     * Where each declared piece of floating UI hangs, in mount order. One whose
     * anchor is not currently in the document is simply absent from the list.
     */
    floating: {
        placements(): FloatingPlacement[];
        /** Delete the open trigger and its query, so a choice can take their place. */
        clearQuery(): void;
        /** Close the open trigger until the caret moves on (Escape). */
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
}: EditorOptions): EditorHandle => {
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
                ...buildEnginePlugins(plugins, bundle, () => api),
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
    const triggers = createTriggerController(view);

    return {
        api,
        floating: {
            placements: createFloatingLocator(view, plugins, schema, triggers),
            clearQuery: triggers.clear,
            dismiss: triggers.dismiss,
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
        destroy() {
            view.destroy();
        },
    };
};
