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

/**
 * Marks a transaction as carrying a document the host set (the controlled
 * `value`) rather than an edit made in the editor. Two things read it, and both
 * are about the difference between the two: the change is not reported back to
 * whoever made it, and it is not something undo should take back.
 */
const HOST_DOC = 'rte-host-doc';
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

    /**
     * The document the host and the editor last agreed on: what was handed out
     * through `onDocChange`, or what was last set through `setDoc`. Both write it,
     * so an echo of either — the same object coming back the other way — is
     * recognized by identity alone, without a document being converted to compare.
     */
    let agreedDoc = initialDoc;

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
            // A document the host set is not news to the host. Reporting it back is
            // what turns a controlled `value` into a loop: the host stores what it
            // already had, and a store that re-creates references on the way
            // through hands it back as a new document to set, for as long as the
            // page is open. `setDoc` records the agreement itself, holding the
            // host's own object rather than a conversion of it.
            if (transaction.docChanged && transaction.getMeta(HOST_DOC) !== true) {
                agreedDoc = toRteDocument(view.state.doc);
                onDocChange(agreedDoc);
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
        // The editor's own chrome asks for this; the plugins' floating UI goes
        // through `floating` below. See EditorHandle in ports/editorEngine.ts.
        selectionRect: createSelectionRectReader(view),
        floating: {
            placements: createFloatingLocator(view, features, schema, triggers),
            clearQuery: triggers.clear,
            dismiss: triggers.dismiss,
        },
        setDoc(doc) {
            // The document we and the host already agree on, handed back: the
            // ordinary shape of a controlled editor, and worth answering before
            // anything is converted.
            if (doc === agreedDoc) {
                return;
            }
            const next = toEngineDocument(doc, schema);
            // Everything else is compared by what it says rather than by which
            // object says it. A host whose store re-creates references — a round
            // trip through the server, a `JSON.parse`, a store that normalizes
            // what it is given — hands back an equal document under a new
            // identity after every keystroke, and replacing the content for that
            // would take the caret away from someone in the middle of typing.
            if (next.eq(view.state.doc)) {
                agreedDoc = doc;
                return;
            }

            const { from, to } = view.state.selection;
            const transaction = view.state.tr.replaceWith(0, view.state.doc.content.size, next.content);
            // Put the selection back. Replacing the whole content leaves every
            // position in it pointing at the same place, so the caret would
            // otherwise collapse to the start of what arrived. The new document
            // may be shorter than where the caret was, hence the clamp, and
            // `between` moves what it is given to the nearest position text can
            // actually occupy.
            const end = transaction.doc.content.size;
            transaction.setSelection(
                TextSelection.between(
                    transaction.doc.resolve(Math.min(from, end)),
                    transaction.doc.resolve(Math.min(to, end)),
                ),
            );
            transaction.setMeta(HOST_DOC, true);
            // Undo takes back what the user did. An update the host pushed in is
            // not that, and leaving it in the history means Mod-z reverts to a
            // document the host has never heard of — which it would then set
            // again.
            transaction.setMeta('addToHistory', false);
            view.dispatch(transaction);
            // Hold the host's own object rather than a conversion of the content it
            // produced: it is what the next call will be handing back, so it is
            // what makes that call a comparison of two references.
            agreedDoc = doc;
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
