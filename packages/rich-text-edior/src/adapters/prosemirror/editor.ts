/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { type EditorControlApi, TOGGLE_ATTRIBUTE } from '#/domain';
import { type CreateEditor } from '#/ports';

import { createApi } from './api';
import './engine.scss';
import { documentToPm, pmToDocument } from './document';
import { buildEnginePlugins } from './enginePlugins';
import { createFloatingLocator, createSelectionRectReader } from './floating';
import { placeholderPlugin } from './placeholder';
import { buildSchema } from './schema';
import { createTriggerController } from './triggers';

/**
 * The live editor: builds the engine from the plugin set, hosts the view, and
 * hands back the handle the React component drives it through. This is the
 * ProseMirror implementation of `CreateEditor`.
 */

export const createEditor: CreateEditor = ({
    container,
    initialDoc,
    plugins,
    readOnly,
    placeholder,
    contentClassName,
    placeholderClassName,
    probe,
    onDocChange,
    onStateChange,
    onBlur,
}) => {
    const bundle = buildSchema(plugins, probe);
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
            selectionRect: createSelectionRectReader(view),
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
