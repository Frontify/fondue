/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type EditorControlApi, TOGGLE_ATTRIBUTE } from '#/domain';
import { type CreateEditor } from '#/ports';

import { createControlApi } from './live/controlApi';
import { toEngineDocument, toRteDocument } from './live/documentConversion';
import { createFloatingLocator, createSelectionRectReader, createTriggerController } from './live/floating';
import { placeholderPlugin } from './live/placeholder';
import { keystrokePipeline } from './setup/keystrokes';
import { buildSchema } from './setup/schema';
// The two engine stylesheet rules the editor needs. Imported for its side effect
// — there is nothing to bind.
import './engine.scss';

/**
 * The orchestrator, and the only file spanning both phases: it runs the `setup/`
 * work once, mounts the view, and wires the `live/` parts into the handle the
 * React shell drives the editor through. This is the ProseMirror implementation
 * of `CreateEditor`.
 */
export const createEditor: CreateEditor = ({
    container,
    initialDoc,
    plugins: features,
    readOnly,
    placeholder,
    contentClassName,
    placeholderClassName,
    probe,
    onDocChange,
    onStateChange,
    onBlur,
}) => {
    // -----------------------------------------------------------------------
    // Setup — runs once. Everything here is fixed for the editor's life, which
    // is why a changed feature set means a new editor rather than a reconfigured
    // one.
    // -----------------------------------------------------------------------
    const bundle = buildSchema(features, probe);
    const { schema } = bundle;

    /**
     * The props that can change without rebuilding. Both are read through thunks
     * below, so setting one is a prop update — the selection and the undo history
     * survive it.
     */
    const current = { readOnly, placeholder };

    /**
     * Late binding, and the one piece of ordering that matters here: the keystroke
     * pipeline is assembled before the view exists, but the control API needs the
     * view. So key handlers reach it through this thunk, which is only ever called
     * once the editor is live and `api` is assigned.
     */
    let api!: EditorControlApi;
    const getApi = (): EditorControlApi => api;

    /** The last document handed out, so an echo of our own change is not applied again. */
    let lastEmitted = initialDoc;

    // -----------------------------------------------------------------------
    // Mount
    // -----------------------------------------------------------------------
    const view: EditorView = new EditorView(container, {
        attributes: { class: contentClassName },
        editable: () => !current.readOnly,
        state: EditorState.create({
            doc: toEngineDocument(initialDoc, schema),
            plugins: [
                ...keystrokePipeline(features, bundle, getApi),
                placeholderPlugin(() => current.placeholder, placeholderClassName),
            ],
        }),
        handleDOMEvents: {
            blur: () => {
                onBlur(toRteDocument(view.state.doc));
                // Never claim the event: the browser still has to move focus.
                return false;
            },
        },
        handleClickOn(_view, _pos, node, nodePos, event) {
            // A rendered element may declare itself a toggle for one of its own
            // boolean attributes — the checkbox in a check list item.
            const target = event.target as HTMLElement | null;
            const name = target?.closest?.(`[${TOGGLE_ATTRIBUTE}]`)?.getAttribute(TOGGLE_ATTRIBUTE);
            if (name && name in node.attrs) {
                view.dispatch(
                    view.state.tr.setNodeMarkup(nodePos, undefined, { ...node.attrs, [name]: !node.attrs[name] }),
                );
                return true;
            }
            // A void INLINE element (a mention) is a character, not something to
            // select: clicking it puts the caret after it, so there is a caret to
            // see and typing simply continues. Void blocks (images) keep the
            // engine's own behaviour, where selecting the thing is the point.
            if (node.isInline && node.isAtom) {
                view.dispatch(
                    view.state.tr.setSelection(TextSelection.create(view.state.doc, nodePos + node.nodeSize)),
                );
                return true;
            }
            return false;
        },
        dispatchTransaction(transaction) {
            view.updateState(view.state.apply(transaction));
            if (transaction.docChanged) {
                lastEmitted = toRteDocument(view.state.doc);
                onDocChange(lastEmitted);
            }
            onStateChange();
        },
    });

    // -----------------------------------------------------------------------
    // The live handle — everything below needs the mounted view
    // -----------------------------------------------------------------------
    api = createControlApi(view, bundle);
    const triggers = createTriggerController(view);

    /** Ask the view to re-read the thunks over `current` and redraw. */
    const refresh = (): void => view.setProps({});

    return {
        api,
        floating: {
            placements: createFloatingLocator(view, features, schema, triggers),
            selectionRect: createSelectionRectReader(view),
            clearQuery: triggers.clear,
            dismiss: triggers.dismiss,
        },
        setDoc(doc) {
            if (doc !== lastEmitted) {
                const { content } = toEngineDocument(doc, schema);
                view.dispatch(view.state.tr.replaceWith(0, view.state.doc.content.size, content));
            }
        },
        setReadOnly(next) {
            current.readOnly = next;
            refresh();
        },
        setPlaceholder(next) {
            current.placeholder = next;
            refresh();
        },
        destroy() {
            view.destroy();
        },
    };
};
