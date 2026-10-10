/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dropCursor } from 'prosemirror-dropcursor';
import { Fragment, Slice } from 'prosemirror-model';
import { Plugin, PluginKey, Selection, type Transaction } from 'prosemirror-state';
import { dropPoint } from 'prosemirror-transform';
import { type EditorView } from 'prosemirror-view';

import { planOf } from '#/codecs/plan';
import { writeHtml } from '#/codecs/to-html';
import { writeText } from '#/codecs/to-text';
import { type PluginImplementation } from '#/definition';
import {
    type ContentModel,
    defaultIdSource,
    type ResourceLimits,
    type RichTextLocale,
    type TranslationStrings,
} from '#/model';
import { type TreeNode } from '#/model/content';
import { diagnostic } from '#/model/format';
import { codecContext } from '#/model/output';
import { isApple } from '#/model/platform';
import { exceedsBytes } from '#/model/read';
import { closeGroup } from '#/runtime/history';
import { type EditorRuntime, runtimeOfView } from '#/runtime/runtime';

import { exceededLimit } from './import/limits';
import { withoutRefused } from './import/policy';
import {
    type FollowUp,
    insertSlice,
    type Pasted,
    pastePayload,
    type PasteSettings,
    type Payload,
    withoutIds,
} from './paste-order';
import { SLICE_TYPE, writeSlice } from './slice';

/** What the host side of a session gives its clipboard handlers. */
export interface ClipboardSession {
    readonly limits: ResourceLimits;
    /** The presentation's `sliceContext`, read at each copy and paste. */
    readonly sliceContext: () => string | null;
    /** The locale of the announcements and of the island labels in copied HTML. */
    readonly locale: () => RichTextLocale;
    readonly announce: (message: string) => void;
}

const sessions = new WeakMap<EditorRuntime, ClipboardSession>();

/** Gives the clipboard handlers of `runtime`'s view what they read from the host. */
export const connectClipboard = (runtime: EditorRuntime, session: ClipboardSession): void => {
    sessions.set(runtime, session);
};

const connectedOf = (view: EditorView) => {
    const runtime = runtimeOfView(view);
    if (runtime === undefined) {
        return undefined;
    }
    const session = sessions.get(runtime);
    if (session === undefined) {
        return undefined;
    }
    return { runtime, session };
};
type Connected = NonNullable<ReturnType<typeof connectedOf>>;

let pageContext: string | undefined;

/** The presentation's slice context, else the package's value for this page load (SPEC-rich-text-clipboard, Internal slice). */
const contextOf = (session: ClipboardSession) => {
    const context = session.sliceContext();
    if (context !== null) {
        return context;
    }
    if (pageContext === undefined) {
        pageContext = defaultIdSource.next('session');
    }
    return pageContext;
};

/** Shift held at the last key, which Shift+Insert, a paste shortcut of its own, does not count (Event ownership). */
const shiftHeld = new WeakMap<EditorView, boolean>();
/** The slice a drag that started in the view carries. */
const drags = new WeakMap<EditorView, Slice>();
const followKey = new PluginKey('rte.clipboard');
const ANDROID = /Android \d/;

const announce = (
    session: ClipboardSession,
    key: keyof TranslationStrings,
    vars?: Readonly<Record<string, number>>,
) => {
    const locale = session.locale();
    session.announce(codecContext(locale, locale).t(key, vars));
};

const reject = ({ runtime }: Connected, reason: string) =>
    runtime.report(diagnostic('clipboard.paste-rejected', undefined, { reason }));

/** Paste order step 1: a flavor over `maxPasteBytes` stops the paste before anything parses it (SPEC-rich-text-clipboard/AC-001). */
const rejectsSize = (connected: Connected, payload: Payload) => {
    const { session } = connected;
    const max = session.limits.maxPasteBytes;
    if (![payload.text, payload.html, payload.slice].some((flavor) => exceedsBytes(flavor, max))) {
        return false;
    }
    reject(connected, 'maxPasteBytes');
    announce(session, 'RichTextEditor_pasteTooLarge');
    return true;
};

const payloadOf = (data: DataTransfer): Payload => ({
    text: data.getData('text/plain'),
    html: data.getData('text/html'),
    slice: data.getData(SLICE_TYPE),
});

/** Dispatches a paste or drop, or reports why it was refused with the document and selection unchanged (AC-020, AC-025). */
const commit = (
    view: EditorView,
    connected: Connected,
    tr: Transaction,
    pasted: Pasted | undefined,
    event: 'paste' | 'drop',
) => {
    if (pasted === undefined) {
        return;
    }
    const exceeded = exceededLimit(tr.doc, connected.session.limits);
    if (exceeded !== undefined) {
        reject(connected, exceeded);
        return;
    }
    if (pasted.followUp !== undefined) {
        tr.setMeta(followKey, pasted.followUp);
    }
    const before = view.state.doc;
    view.dispatch(tr.setMeta('uiEvent', event));
    if (tr.docChanged && view.state.doc === before) {
        reject(connected, 'not-allowed');
        return;
    }
    if (pasted.droppedMedia > 0) {
        announce(connected.session, 'RichTextEditor_pasteMediaDropped', { count: pasted.droppedMedia });
    }
};

const settingsOf = (model: ContentModel, { runtime, session }: Connected, plain: boolean): PasteSettings => ({
    model,
    limits: session.limits,
    policy: runtime.policy.features,
    context: contextOf(session),
    plain,
});

/** Runs the paste pipeline, reporting a throw as a rejection (SPEC-rich-text-clipboard/AC-025). */
const attempt = (connected: Connected, build: () => Pasted | undefined): Pasted | null | undefined => {
    try {
        return build();
    } catch {
        reject(connected, 'error');
        return null;
    }
};

/** Writes the three flavors of `slice` (SPEC-rich-text-clipboard/AC-026, AC-027). */
const writeFlavors = (
    model: ContentModel,
    view: EditorView,
    session: ClipboardSession,
    data: DataTransfer,
    slice: Slice,
) => {
    const locale = session.locale();
    const context = codecContext(locale, locale);
    const plan = planOf(model);
    const tree: TreeNode = {
        type: 'doc',
        attrs: view.state.doc.attrs,
        content: withoutIds(slice.content).toJSON() as TreeNode[],
    };
    data.clearData();
    data.setData('text/html', writeHtml(plan, tree, context).html);
    data.setData('text/plain', writeText(plan, tree, context).text);
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
    writeFlavors(model, view, connected.session, event.clipboardData, selection.content());
    // `handleDOMEvents` runs while the view is not editable too (AC-050).
    if (event.type === 'cut' && view.editable) {
        view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta('uiEvent', 'cut'));
    }
    return true;
};

const paste = (model: ContentModel, view: EditorView, event: ClipboardEvent) => {
    const connected = connectedOf(view);
    if (connected === undefined) {
        return false;
    }
    // A paste during composition is left to the browser outside Android, as ProseMirror leaves it.
    const composing = view.composing && !ANDROID.test(navigator.userAgent);
    if (!view.editable || composing || event.clipboardData === null) {
        return true;
    }
    event.preventDefault();
    const payload = payloadOf(event.clipboardData);
    if (rejectsSize(connected, payload)) {
        return true;
    }
    const { tr } = view.state;
    const { from, to } = tr.selection;
    const settings = settingsOf(model, connected, shiftHeld.get(view) === true);
    const pasted = attempt(connected, () => pastePayload(tr, from, to, payload, settings));
    if (pasted !== null) {
        commit(view, connected, tr.scrollIntoView(), pasted, 'paste');
    }
    return true;
};

const drop = (model: ContentModel, view: EditorView, event: DragEvent) => {
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
    if (dragged === undefined) {
        // A drop from outside takes the paste order at the block boundary the drop cursor shows (AC-031, AC-046).
        const payload = payloadOf(data);
        if (rejectsSize(connected, payload)) {
            return true;
        }
        const position = dropPoint(tr.doc, at.pos, blockSlice(view)) ?? at.pos;
        const settings = settingsOf(model, connected, false);
        pasted = attempt(connected, () => pastePayload(tr, position, position, payload, settings));
    } else {
        // A drag inside moves its content with the same `nodeId`s, or with the copy modifier inserts a copy (AC-030).
        let slice = dragged;
        const point = dropPoint(tr.doc, at.pos, slice) ?? at.pos;
        if (copies(view, event)) {
            slice = new Slice(withoutIds(slice.content), slice.openStart, slice.openEnd);
        } else {
            tr.deleteSelection();
        }
        const position = tr.mapping.map(point);
        const kept = withoutRefused(slice, tr.doc.type.schema, model, connected.runtime.policy.features);
        const range = insertSlice(tr, position, position, kept);
        tr.setSelection(Selection.near(tr.doc.resolve(range.to), -1));
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
    const slice = selection.content();
    writeFlavors(model, view, connected.session, data, slice);
    data.effectAllowed = 'copyMove';
    drags.set(view, slice);
    view.dragging = { slice, move: !copies(view, event) };
    return true;
};

/** The package's own clipboard and drag handlers, since ProseMirror's parse before any byte check and write no internal slice (Event ownership). */
export const clipboardPlugin =
    (model: ContentModel): PluginImplementation =>
    () =>
        new Plugin({
            key: followKey,
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
                    paste: (view, event) => paste(model, view, event),
                    dragstart: (view, event) => dragstart(model, view, event),
                    // The drop cursor snaps only for a drag it sees started here, so any other drag stands in a block (AC-046).
                    dragover: (view) => {
                        if (view.dragging === null && view.editable) {
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
                    drop: (view, event) => drop(model, view, event),
                },
            },
            appendTransaction: (transactions, _old, state) => {
                const [root] = transactions;
                const followUp = root?.getMeta(followKey) as FollowUp | undefined;
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

/** The drop cursor in the focus color (SPEC-rich-text-clipboard/AC-046). */
export const dropCursorPlugin: PluginImplementation = () =>
    dropCursor({ color: 'var(--color-focus-default)', width: 2 });
