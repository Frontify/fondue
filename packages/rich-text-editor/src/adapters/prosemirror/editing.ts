/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type EditorControlApi, type RteDocumentOf, type RtePlugin, TOGGLE_ATTRIBUTE } from '#/domain';
import { type EditorHandle } from '#/ports';

import { createControlApi } from './live/controlApi';
import { toEngineDocument, toRteDocument } from './live/documentConversion';
import { createFloatingLocator, createSelectionRectReader, createTriggerController } from './live/floating';
import { placeholderPlugin } from './live/placeholder';
import { keystrokePipeline } from './setup/keystrokes';
import { type SchemaBundle } from './setup/schema';
// The two engine stylesheet rules the editor needs. Imported for its side
// effect.
import './engine.scss';

/**
 * The editing half of the engine: everything that only matters once a document
 * is being changed rather than read. It is a module of its own because it is the
 * expensive one — the view, the state, the commands and the history — and
 * `mount.ts` fetches it only when something is actually going to be edited.
 *
 * It takes the schema rather than building one: `mount.ts` has already drawn the
 * document from it, and building a second would be the one way the two could
 * come to disagree.
 */

/** The live editor, as the thing that mounted it drives it. */
export type LiveEditor = {
    handle: EditorHandle;
    setDoc(doc: RteDocumentOf): void;
    setReadOnly(readOnly: boolean): void;
    setPlaceholder(placeholder: string): void;
    destroy(): void;
};

export type EditingOptions = {
    container: HTMLElement;
    bundle: SchemaBundle;
    features: RtePlugin[];
    /** What is on screen, and what the host and the editor already agree on. */
    doc: RteDocumentOf;
    readOnly: boolean;
    placeholder: string;
    contentClassName: string;
    placeholderClassName: string;
    onDocChange: (doc: RteDocumentOf) => void;
    onStateChange: () => void;
    onBlur: (doc: RteDocumentOf) => void;
};

/**
 * Marks a transaction as carrying a document the host set (the controlled
 * `value`) rather than an edit made in the editor. Read in two places, both
 * about that difference: the change is not reported back to whoever made it,
 * and undo should not take it back.
 */
const HOST_DOC = 'rte-host-doc';
export const startEditing = ({
    container,
    bundle,
    features,
    doc: initialDoc,
    readOnly,
    placeholder,
    contentClassName,
    placeholderClassName,
    onDocChange,
    onStateChange,
    onBlur,
}: EditingOptions): LiveEditor => {
    const { schema } = bundle;

    /**
     * The props that can change without rebuilding. Both are read through
     * thunks below, so setting one is a prop update — the selection and the
     * undo history survive it.
     */
    const current = { readOnly, placeholder };

    /**
     * Late binding, and the one piece of ordering that matters here: the
     * keystroke pipeline is assembled before the view exists, but the control
     * API needs the view. So key handlers reach it through this thunk, which is
     * only ever called once the editor is live and `api` is assigned.
     */
    let api!: EditorControlApi;
    const getApi = (): EditorControlApi => api;

    /**
     * The document the host and the editor last agreed on: what was handed out
     * through `onDocChange`, or what was last set through `setDoc`. Both write
     * it, so an echo of either — the same object coming back the other way — is
     * recognized by identity alone.
     *
     * This is what keeps a controlled `value` from looping. A host stores every
     * `onChange` and passes it back down as `value`; if the editor then
     * reported that back as a change, the host would store what it already had,
     * and a store that re-creates references on the way through would hand it
     * back as something new to set again, for as long as the page is open.
     */
    let agreedDoc = initialDoc;

    // Mount
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
            // A void INLINE element (a mention) is a character, not something
            // to select: clicking it puts the caret after it, so there is a
            // caret to see and typing simply continues. Void blocks (images)
            // keep the engine's own behaviour, where selecting the thing is the
            // point.
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
            // A document the host set is not news to the host — see
            // `agreedDoc`.
            if (transaction.docChanged && transaction.getMeta(HOST_DOC) !== true) {
                agreedDoc = toRteDocument(view.state.doc);
                onDocChange(agreedDoc);
            }
            onStateChange();
        },
    });

    // The live handle — everything below needs the mounted view
    api = createControlApi(view, bundle);
    const triggers = createTriggerController(view);

    /** Ask the view to re-read the thunks over `current` and redraw. */
    const refresh = (): void => view.setProps({});

    return {
        handle: {
            api,
            // The editor's own chrome asks for this; the plugins' floating UI
            // goes through `floating`. See EditorHandle in ports/editorEngine.ts.
            selectionRect: createSelectionRectReader(view),
            floating: {
                placements: createFloatingLocator(view, features, schema, triggers),
                clearQuery: triggers.clear,
                dismiss: triggers.dismiss,
            },
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
            // object says it. A host whose store re-creates references hands
            // back an equal document under a new identity after every
            // keystroke, and replacing the content for that would take the
            // caret away from someone in the middle of typing.
            if (next.eq(view.state.doc)) {
                agreedDoc = doc;
                return;
            }

            const { from, to } = view.state.selection;
            const transaction = view.state.tr.replaceWith(0, view.state.doc.content.size, next.content);
            // Put the selection back. Replacing the whole content leaves no
            // position pointing where it did, so the caret would otherwise
            // collapse to the start. The new document may be shorter than where
            // the caret was, hence the clamp; `between` then moves what it is
            // given to the nearest position text can actually occupy.
            const end = transaction.doc.content.size;
            transaction.setSelection(
                TextSelection.between(
                    transaction.doc.resolve(Math.min(from, end)),
                    transaction.doc.resolve(Math.min(to, end)),
                ),
            );
            transaction.setMeta(HOST_DOC, true);
            // Undo takes back what the user did. An update the host pushed in
            // is not that, and leaving it in the history means Mod-z reverts to
            // a document the host has never heard of — which it would then set
            // again.
            transaction.setMeta('addToHistory', false);
            view.dispatch(transaction);
            // Hold the host's own object, not a conversion of it: it is what
            // the next call hands back, so it is what makes that call a
            // comparison of two references.
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
