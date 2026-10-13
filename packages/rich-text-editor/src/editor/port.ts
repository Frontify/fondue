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
 * What a live editor offers: the commands, and where the selection is on screen.
 */
export type EditorHandle = {
    api: EditorControlApi;
    /**
     * The box around the selected text, or null while nothing is selected. For
     * the editor's OWN chrome — the toolbar, when the host placed it over the
     * selection.
     */
    selectionRect(): FloatingRect | null;
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
