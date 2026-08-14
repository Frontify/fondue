/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf } from '#/domain';
import { type MountDocument } from '#/ports';

import { createDrawing } from './draw';
import { type LiveEditor } from './editing';
import { buildSchema } from './setup/schema';

/**
 * A document put on screen, and the ProseMirror implementation of
 * `MountDocument`. This is the half of the engine that can only show a document
 * — the schema and the serializer, and nothing that knows what editing is.
 *
 * It is split from `editing.ts` for one reason: showing a document costs a
 * fraction of what making it editable does, and a reader waiting to read should
 * not pay for the second. So this runs at once and fetches the other half only
 * when something is actually going to be edited — never, for an editor that
 * stays readonly.
 *
 * The split is safe to make invisible because both halves draw from the schema
 * built HERE, once, and the drawing itself is `draw.ts` — the serializer the
 * editable view uses, on the same `toDOM`. So what the reader sees now and what
 * replaces it are the same markup, including for a plugin nobody here has seen,
 * whose React render is only pure if the author made it so.
 */

export const mountDocument: MountDocument = ({
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
    onEditable,
}) => {
    // Runs once, and is what both halves are built on: a changed feature set
    // means a new mounting rather than a reconfigured one.
    const bundle = buildSchema(features, probe);
    const draw = createDrawing(bundle.schema, container.ownerDocument);

    /** What is on screen, and what a live editor would open with. */
    const current = { doc: initialDoc, readOnly, placeholder };

    /** The element the content lives in, so the editable one can replace it whole. */
    const content = container.ownerDocument.createElement('div');
    content.className = contentClassName;

    /** Null until something is going to be edited; from then on, everything goes through it. */
    let live: LiveEditor | null = null;
    /** Set while the editing half is on its way, so a second ask does not fetch it twice. */
    let loading = false;
    /** Taken down before it arrived. */
    let destroyed = false;

    const drawDocument = (): void => {
        const node = draw(content, current.doc);

        // The placeholder is a decoration on the empty block, so it is only
        // there while there is nothing in the document at all. Set before the
        // class, which is the order the decoration applies them in.
        const block = content.firstElementChild;
        const isEmpty = node.childCount === 1 && node.firstChild?.content.size === 0;
        if (isEmpty && block && current.placeholder !== '') {
            block.setAttribute('data-placeholder', current.placeholder);
            block.classList.add(placeholderClassName);
        }
    };

    /**
     * Send for the editing half. The document is already on screen and stays
     * there until this arrives — and if it never does, it stays readable, which
     * is why a failure only clears the flag: the next thing that wants editing
     * asks again rather than inheriting this attempt.
     */
    const sendForEditingHalf = (): void => {
        loading = true;
        import('./editing')
            .then(({ startEditing }) => {
                loading = false;
                if (destroyed || current.readOnly) {
                    return null;
                }
                // The drawn content goes as the editable one arrives, in that
                // order and without a paint between them.
                content.remove();
                live = startEditing({
                    container,
                    bundle,
                    features,
                    doc: current.doc,
                    readOnly: current.readOnly,
                    placeholder: current.placeholder,
                    contentClassName,
                    placeholderClassName,
                    onDocChange,
                    onStateChange,
                    onBlur,
                });
                onEditable(live.handle);
                return live;
            })
            .catch(() => {
                loading = false;
            });
    };

    container.append(content);
    drawDocument();
    if (!readOnly) {
        sendForEditingHalf();
    }

    return {
        setDoc(doc: RteDocumentOf) {
            current.doc = doc;
            if (live) {
                live.setDoc(doc);
                return;
            }
            drawDocument();
        },
        setReadOnly(next: boolean) {
            current.readOnly = next;
            if (live) {
                live.setReadOnly(next);
                return;
            }
            // Nothing to turn off that is not already off; turning it on is
            // what asks for the editing half.
            if (!next && !loading) {
                sendForEditingHalf();
            }
        },
        setPlaceholder(next: string) {
            current.placeholder = next;
            if (live) {
                live.setPlaceholder(next);
                return;
            }
            drawDocument();
        },
        destroy() {
            destroyed = true;
            live?.destroy();
            live = null;
            content.remove();
            onEditable(null);
        },
    };
};
