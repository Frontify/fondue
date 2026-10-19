/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The editor engine as a contract: what the React shell drives and what an
 * engine adapter provides. The shell and the adapter depend on this file and
 * never on each other. Readonly display does not go through it
 * (see `RichTextRenderer`).
 */

import { type ReactNode } from 'react';

import { type EditorControlApi, type PluginRegistry, type RteDocumentOf } from '#/core';

/** What an engine adapter implements: put an editable document in a container. */
export type MountDocument = (options: MountOptions) => MountedDocument;

export type MountOptions = {
    container: HTMLElement;
    initialDoc: RteDocumentOf;
    /** The mounted plugins, already gathered: the engine never reads a plugin itself. */
    registry: PluginRegistry;
    /** Starting value; change it later through `setPlaceholder`. */
    placeholder: string;
    /** Class the placeholder decoration carries. */
    placeholderClassName: string;
    /** Attributes for the editable element: its classes (the editor's own plus the plugins'; the adapter does no styling) and accessible name. Starting value; change it later through `setAttributes`. */
    attributes: Readonly<Record<string, string>>;
    /** The document changed through editing. */
    onDocChange: (doc: RteDocumentOf) => void;
    /** The editor state moved: any transaction, including a caret move. */
    onStateChange: () => void;
    /** The editable element lost focus. Handed the current document, so a caller can commit it. */
    onBlur: (doc: RteDocumentOf) => void;
    viewPortals: ViewPortals;
};

export type MountedDocument = {
    handle: EditorHandle;
    /** Replace the content with an externally set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    /** Change the text shown while the document is empty. Empty string means none. */
    setPlaceholder(placeholder: string): void;
    /** Replace the further attributes of the editable element. */
    setAttributes(attributes: Readonly<Record<string, string>>): void;
    destroy(): void;
};

/** What a live editor offers the shell: the commands, and where the selection is on screen. */
export type EditorHandle = {
    api: EditorControlApi;
    /**
     * The box around the selected text, or around the caret when nothing is
     * selected. For the editor's own chrome (the floating toolbar, the `/`
     * menu); plugin UI anchors itself.
     */
    selectionRect(): FloatingRect;
};

/**
 * Where the engine hands over the React its views draw (a plugin's
 * `render.edit`), one portal per view and keyed by the owning view. The shell
 * renders them all from one place inside its own tree, so they commit together
 * and see the host's context providers.
 */
export type ViewPortals = {
    set(owner: object, portal: ReactNode): void;
    delete(owner: object): void;
};

/** A box in viewport coordinates. */
export type FloatingRect = { left: number; top: number; width: number; height: number };
