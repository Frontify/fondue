/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorControlApi, type RteDocumentOf, type RtePlugin } from '#/core';

/**
 * The editor engine as a contract: what the React shell drives, and what an
 * engine adapter has to provide. Both sides depend on this file and neither on
 * the other. There is no render probe — markup in the editor comes from
 * `toDom`, and readonly display is `RichTextRenderer`.
 */

/** A box in viewport coordinates. */
export type FloatingRect = { left: number; top: number; width: number; height: number };

/** Where one plugin's autocomplete currently belongs on screen. */
export type FloatingPlacement = {
    pluginId: string;
    /** What has been typed after the trigger. */
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
    onDocChange: (doc: RteDocumentOf) => void;
    onStateChange: () => void;
    /** The editable element lost focus. Handed the current document, so a caller can commit it. */
    onBlur: (doc: RteDocumentOf) => void;
};

/**
 * What a live editor offers: the commands, and where things are on screen.
 */
export type EditorHandle = {
    api: EditorControlApi;
    /**
     * The box around the selected text, or null while nothing is selected. For
     * the editor's OWN chrome — the toolbar, when the host placed it over the
     * selection.
     */
    selectionRect(): FloatingRect | null;
    /**
     * Autocomplete: where each declared picker hangs, plus control over the
     * trigger one of them may be anchored to. A picker whose trigger is not
     * currently in the document is absent from the list.
     */
    autocomplete: {
        placements(): FloatingPlacement[];
        /** Delete the open trigger and its query, so a choice can take their place. */
        clearQuery(): void;
        /** Close the open trigger until the caret moves on (Escape). */
        dismiss(): void;
    };
};

export type MountedDocument = {
    handle: EditorHandle;
    /** Replace the content with an externally-set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    /** Turn editing off or back on. */
    setReadOnly(readOnly: boolean): void;
    /** Change the text shown while the document is empty. Empty string means none. */
    setPlaceholder(placeholder: string): void;
    destroy(): void;
};

/**
 * What an engine adapter implements: put an editable document in a container.
 */
export type MountDocument = (options: MountOptions) => MountedDocument;
