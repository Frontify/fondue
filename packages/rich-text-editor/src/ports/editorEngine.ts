/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorControlApi, type RteDocumentOf, type RtePlugin } from '#/domain';

import { type RenderProbe } from './renderProbe';

/**
 * The editor engine as a contract: what the React shell drives, and what an
 * engine adapter has to provide. Both sides depend on this file and neither on
 * the other.
 */

/** A box in viewport coordinates. */
export type FloatingRect = { left: number; top: number; width: number; height: number };

/** Where one plugin's declared floating UI currently belongs on screen. */
export type FloatingPlacement = {
    pluginId: string;
    /** For a `{ trigger }` anchor: what has been typed after it. Empty for the others. */
    query: string;
    /**
     * The box it hangs at, in viewport coordinates.
     *
     * A call rather than a field, because turning a document position into a
     * box forces the browser to lay the page out. A plugin decides whether to
     * draw anything *after* seeing the placement — a picker whose query matches
     * nothing draws nothing — so measuring up front would spend a layout on
     * every anchor that exists rather than on every one that shows.
     */
    measure(): FloatingRect;
};

export type MountOptions = {
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
    /**
     * How a plugin's React render function becomes a DOM description. Injected,
     * so the engine adapter never depends on a React renderer.
     */
    probe: RenderProbe;
    onDocChange: (doc: RteDocumentOf) => void;
    onStateChange: () => void;
    /** The editable element lost focus. Handed the current document, so a caller can commit it. */
    onBlur: (doc: RteDocumentOf) => void;
    /**
     * The document became editable, or stopped being — see `MountedDocument`.
     * Everything that can only be done to a live editor arrives this way rather
     * than being returned, because whether there is one is not known at mount.
     */
    onEditable: (handle: EditorHandle | null) => void;
};

/**
 * What a live editor offers over a drawn one: the commands, and where things are
 * on screen. Everything a document needs whether or not it is being edited —
 * setting it, the placeholder, taking it down — is on `MountedDocument`, so the
 * shell says those the same way in both cases.
 */
export type EditorHandle = {
    api: EditorControlApi;
    /**
     * The box around the selected text, or null while nothing is selected. For
     * the editor's OWN chrome — the toolbar, when the host placed it over the
     * selection. Deliberately not under `floating` below: that is the plugins'
     * mechanism, and a plugin wanting the same box declares an `anchor` of
     * `'selection'` and gets it as a placement instead.
     */
    selectionRect(): FloatingRect | null;
    /**
     * The plugins' floating UI: where each declared piece hangs, in mount
     * order, plus control over the trigger one of them may be anchored to. A
     * piece whose anchor is not currently in the document is absent from the
     * list.
     */
    floating: {
        placements(): FloatingPlacement[];
        /** Delete the open trigger and its query, so a choice can take their place. */
        clearQuery(): void;
        /** Close the open trigger until the caret moves on (Escape). */
        dismiss(): void;
    };
};

/**
 * A document on screen. It starts merely drawn and becomes editable when it has
 * to — which is not the same moment, because making a document editable costs
 * far more than showing one and a reader should not wait for it to read.
 *
 * The two are one object rather than two, and one contract rather than two,
 * because they are one document in one container: the schema is built once and
 * both draw from it, so what is shown before the editor arrives and what
 * replaces it cannot disagree. `readOnly` is the switch — an editor that is
 * never editable never pays for the editing half at all.
 */
export type MountedDocument = {
    /** Replace the content with an externally-set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    /**
     * Turn editing off or back on. Turning it on is what fetches the editing
     * half, so this is the one call here that finishes later; the handle arrives
     * through `onEditable`.
     */
    setReadOnly(readOnly: boolean): void;
    /** Change the text shown while the document is empty. Empty string means none. */
    setPlaceholder(placeholder: string): void;
    destroy(): void;
};

/**
 * What an engine adapter implements: put a document in a container, ready to
 * become editable.
 */
export type MountDocument = (options: MountOptions) => MountedDocument;
