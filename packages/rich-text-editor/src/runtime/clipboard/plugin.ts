/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dropCursor } from 'prosemirror-dropcursor';
import { Fragment, Slice } from 'prosemirror-model';
import { NodeSelection, Plugin, type Selection } from 'prosemirror-state';
import { dropPoint } from 'prosemirror-transform';
import { type EditorView } from 'prosemirror-view';

import { planOf } from '#/codecs/plan';
import { writeHtml } from '#/codecs/toHtml';
import { writeText } from '#/codecs/toText';
import { type PluginImplementation } from '#/definition';
import { type ContentModel } from '#/model';
import { markHrefPolicy, type TreeNode, codecContext, isApple } from '#/model/internal';
import { closeGroup } from '#/runtime/history';

import { clipboardKey, commit } from './commit';
import { loadMarkdownReaderOnIdle } from './markdown';
import {
    type FollowUp,
    hrefOf,
    insertAndSelect,
    islandsCannotStay,
    type Pasted,
    payloadOf,
    pastePayload,
    type Payload,
    prepareSlice,
    withoutIds,
} from './paste';
import {
    type ClipboardSession,
    type Connected,
    connectedOf,
    contextOf,
    reject,
    rejectsSize,
    settingsOf,
} from './session';
import { SLICE_TYPE, writeSlice } from './slice';

export { type ClipboardSession, connectClipboard } from './session';

/** Shift held at the last key, which Shift+Insert, a paste shortcut of its own, does not count. */
const shiftHeld = new WeakMap<EditorView, boolean>();
/** The slice a drag that started in the view carries. */
const drags = new WeakMap<EditorView, Slice>();
const ANDROID = /Android \d/;

/** Hands pasted or dropped files at `from` to `to` to the editor parts; `false` when none took them. */
export type FileIntake = (
    view: EditorView,
    files: readonly File[],
    origin: 'paste' | 'drop',
    from: number,
    to: number,
) => boolean;

/**
 * Whether the files of a paste or an outside drop go to the editor parts, as step 4 of the paste order: neither plain
 * text nor a pasted URL comes first.
 */
const offersFiles = (model: ContentModel, view: EditorView, payload: Payload, plain: boolean) => {
    if (plain) {
        return false;
    }

    return (
        view.state.schema.marks.link === undefined || hrefOf(payload.text, markHrefPolicy(model, 'link')) === undefined
    );
};

/** Runs the paste pipeline, reporting a throw as a rejection. */
const attempt = (connected: Connected, build: () => Pasted | undefined): Pasted | null | undefined => {
    try {
        return build();
    } catch (error) {
        // Markup nested past the parser's depth is a structure limit, as it is for `fromHTML`.
        if (error instanceof RangeError) {
            reject(connected, 'maxDepth');

            return null;
        }

        reject(connected, 'error');

        return null;
    }
};

/** Writes the three flavors of `slice`. */
const writeFlavors = (
    model: ContentModel,
    view: EditorView,
    session: ClipboardSession,
    data: DataTransfer,
    slice: Slice,
) => {
    const locale = session.locale();
    const context = codecContext(locale, locale, session.resolveAssetUrl?.());
    const plan = planOf(model);
    const tree: TreeNode = {
        type: 'doc',
        attrs: view.state.doc.attrs,
        content: withoutIds(slice.content).toJSON() as TreeNode[],
    };
    data.clearData();
    const resolveReference = session.resolveReference?.();
    data.setData('text/html', writeHtml(plan, tree, context, { resolveReference }).html);
    data.setData('text/plain', writeText(plan, tree, context, { resolveReference }).text);
    data.setData(SLICE_TYPE, JSON.stringify(writeSlice(model, view.state.doc, slice, contextOf(session))));
};

/** Whether the platform's copy modifier is held, Alt on Apple and Ctrl elsewhere, as ProseMirror reads it. */
const copies = (view: EditorView, event: DragEvent) => {
    const owner = view.dom.ownerDocument.defaultView;
    if (owner !== null && isApple(owner.navigator)) {
        return event.altKey;
    }

    return event.ctrlKey;
};

/** A closed paragraph, whose drop point is the block boundary nearest the pointer. */
const blockSlice = (view: EditorView) => new Slice(Fragment.from(view.state.schema.node('paragraph')), 0, 0);

/**
 * The selection's content, or for a node-selected leaf that only stands inside its parent, such as a figure's image,
 * that parent whole, so a paste keeps what the parent stores.
 */
const selectedSlice = (selection: Selection): Slice => {
    const { $from } = selection;
    const parent = $from.parent;
    if (
        selection instanceof NodeSelection &&
        $from.depth > 0 &&
        parent.childCount === 1 &&
        !parent.type.contentMatch.validEnd &&
        !selection.node.type.isInGroup('block')
    ) {
        return new Slice(Fragment.from(parent), 0, 0);
    }

    return selection.content();
};

const copy = (model: ContentModel, view: EditorView, event: ClipboardEvent) => {
    const connected = connectedOf(view);
    if (connected === undefined) {
        return false;
    }

    const { selection } = view.state;
    if (selection.empty || event.clipboardData === null) {
        return true;
    }

    event.preventDefault();
    writeFlavors(model, view, connected.session, event.clipboardData, selectedSlice(selection));
    // `handleDOMEvents` runs while the view is not editable too.
    if (event.type === 'cut' && view.editable) {
        view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta('uiEvent', 'cut'));
    }

    return true;
};

/** Whether a paste is left alone: the view is read-only, or composing outside Android, as ProseMirror leaves it. */
const pasteBlocked = (view: EditorView) => !view.editable || (view.composing && !ANDROID.test(navigator.userAgent));

/** Runs the paste order on a payload that is already read. */
const pasteFrom = (
    model: ContentModel,
    intake: FileIntake,
    view: EditorView,
    connected: Connected,
    payload: Payload,
    files: readonly File[],
) => {
    if (rejectsSize(connected, payload)) {
        return;
    }

    const { tr } = view.state;
    const { from, to } = tr.selection;
    const plain = shiftHeld.get(view) === true;
    // The text flavors that come with files are left unread.
    if (files.length > 0 && offersFiles(model, view, payload, plain) && intake(view, files, 'paste', from, to)) {
        return;
    }

    const settings = settingsOf(model, view, connected, plain);
    const pasted = attempt(connected, () => pastePayload(tr, from, to, payload, settings));
    if (pasted !== null) {
        commit(view, connected, tr.scrollIntoView(), pasted, 'paste');
    }
};

const paste = (model: ContentModel, intake: FileIntake, view: EditorView, event: ClipboardEvent) => {
    const connected = connectedOf(view);
    if (connected === undefined) {
        return false;
    }

    if (pasteBlocked(view) || event.clipboardData === null) {
        return true;
    }

    event.preventDefault();
    pasteFrom(model, intake, view, connected, payloadOf(event.clipboardData), [...event.clipboardData.files]);

    return true;
};

const feeds = new WeakMap<EditorView, (payload: Payload, files: readonly File[]) => void>();

/** Feeds `view`'s paste order a payload as a browser hands it after the clipboard read, with no clipboard event. */
export const pasteInto = (view: EditorView, payload: Payload, files: readonly File[]): void => {
    feeds.get(view)?.(payload, files);
};

const drop = (model: ContentModel, intake: FileIntake, view: EditorView, event: DragEvent) => {
    const dragged = drags.get(view);
    drags.delete(view);
    view.dragging = null;
    const connected = connectedOf(view);
    if (connected === undefined) {
        return false;
    }

    const data = event.dataTransfer;
    const at = view.posAtCoords({ left: event.clientX, top: event.clientY });
    if (!view.editable || data === null || at === null) {
        return true;
    }

    event.preventDefault();
    const { tr } = view.state;
    let pasted: Pasted | null | undefined;
    const copying = copies(view, event);
    const payload = payloadOf(data);
    // A move pastes nothing new, so only a copy or a drop from outside is checked against `maxPasteBytes`.
    if ((dragged === undefined || copying) && rejectsSize(connected, payload)) {
        return true;
    }

    // A copy of an island whose `nodeId` is already here takes the dropped flavors instead, as a paste would.
    if (dragged === undefined || (copying && islandsCannotStay(dragged, tr.doc, false))) {
        // A drop from outside, or an inside copy that falls back, takes the paste order at the drop cursor's block boundary.
        let position = at.pos;
        // A single-line field takes the drop inside its one paragraph, never beside it.
        if (connected.session.singleLine !== true) {
            position = dropPoint(tr.doc, at.pos, blockSlice(view)) ?? at.pos;
        }

        const files = [...data.files];
        if (dragged === undefined && files.length > 0 && offersFiles(model, view, payload, false)) {
            view.focus();
            if (intake(view, files, 'drop', position, position)) {
                return true;
            }
        }

        const settings = settingsOf(model, view, connected, false);
        pasted = attempt(connected, () => pastePayload(tr, position, position, payload, settings));
    } else {
        // A drag inside moves its content with the same `nodeId`s, or with the copy modifier inserts a copy.
        let slice = dragged;
        const point = dropPoint(tr.doc, at.pos, slice) ?? at.pos;
        // A move pastes nothing new, so the paste policy filters only a copy.
        if (copying) {
            slice = prepareSlice(slice, tr.doc.type.schema, model, connected.runtime.policy.features);
        } else {
            tr.deleteSelection();
        }

        const position = tr.mapping.map(point);
        insertAndSelect(tr, position, position, slice);
        pasted = { droppedMedia: 0 };
    }

    if (pasted === null) {
        return true;
    }

    view.focus();
    commit(view, connected, tr, pasted, 'drop');

    return true;
};

const dragstart = (model: ContentModel, view: EditorView, event: DragEvent) => {
    const connected = connectedOf(view);
    if (connected === undefined) {
        return false;
    }

    const data = event.dataTransfer;
    const { selection } = view.state;
    // With nothing selected the browser keeps the drag data of what the pointer took, such as a link.
    if (data === null || selection.empty) {
        return true;
    }

    const slice = selectedSlice(selection);
    writeFlavors(model, view, connected.session, data, slice);
    data.effectAllowed = 'copyMove';
    drags.set(view, slice);
    view.dragging = { slice, move: !copies(view, event) };

    return true;
};

/** The package's own clipboard and drag handlers, since ProseMirror's parse before any byte check and write no internal slice. */
export const clipboardPlugin =
    (model: ContentModel, intake: FileIntake): PluginImplementation =>
    () =>
        new Plugin({
            key: clipboardKey,
            view: (view) => {
                feeds.set(view, (payload, files) => {
                    const connected = connectedOf(view);
                    if (connected === undefined || pasteBlocked(view)) {
                        return;
                    }

                    pasteFrom(model, intake, view, connected, payload, files);
                });

                // The Markdown reader loads once the editor is idle, and a dispose before then cancels it.
                return { destroy: loadMarkdownReaderOnIdle() };
            },
            props: {
                handleDOMEvents: {
                    keydown: (view, event) => {
                        shiftHeld.set(view, (event.key === 'Shift' || event.shiftKey) && event.key !== 'Insert');

                        return false;
                    },
                    keyup: (view, event) => {
                        if (event.key === 'Shift') {
                            shiftHeld.set(view, false);
                        }

                        return false;
                    },
                    copy: (view, event) => copy(model, view, event),
                    cut: (view, event) => copy(model, view, event),
                    paste: (view, event) => paste(model, intake, view, event),
                    dragstart: (view, event) => dragstart(model, view, event),
                    // The drop cursor snaps only for a drag it sees started here, so any other drag stands in a block.
                    dragover: (view) => {
                        const singleLine = connectedOf(view)?.session.singleLine === true;
                        if (view.dragging === null && view.editable && !singleLine) {
                            view.dragging = { slice: blockSlice(view), move: false };
                        }

                        return false;
                    },
                    dragleave: (view, event) => {
                        if (!drags.has(view) && !view.dom.contains(event.relatedTarget as Element | null)) {
                            view.dragging = null;
                        }

                        return false;
                    },
                    dragend: (view) => {
                        drags.delete(view);

                        return false;
                    },
                    drop: (view, event) => drop(model, intake, view, event),
                },
            },
            appendTransaction: (transactions, _old, state) => {
                const [root] = transactions;
                const followUp = root?.getMeta(clipboardKey) as FollowUp | undefined;
                if (followUp === undefined || transactions.length !== 1) {
                    return null;
                }

                const next = followUp(state);
                if (next === null) {
                    return null;
                }

                return closeGroup(next);
            },
        });

/** The drop cursor in the focus color. */
export const dropCursorPlugin: PluginImplementation = () =>
    dropCursor({ color: 'var(--color-focus-default)', width: 2 });
