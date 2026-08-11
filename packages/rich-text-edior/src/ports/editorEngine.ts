/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorControlApi, type RteDocumentOf, type RtePlugin } from '#/domain';

import { type RenderProbe } from './renderProbe';

/**
 * The editor engine as a contract: what the React shell drives, and what an
 * engine adapter has to provide. Both sides depend on this file and neither on
 * the other, which is what makes swapping the engine a matter of writing one
 * more `CreateEditor`.
 */

/** A box in viewport coordinates. */
export type FloatingRect = { left: number; top: number; width: number; height: number };

/** Where one plugin's declared floating UI currently belongs on screen. */
export type FloatingPlacement = {
    pluginId: string;
    rect: FloatingRect;
    /** For a `{ trigger }` anchor: what has been typed after it. Empty for the others. */
    query: string;
};

export type EditorOptions = {
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
     * How a plugin's React render function becomes a DOM description. Injected
     * rather than reached for, so that hosting a document and rendering React are
     * separate concerns: the engine adapter never depends on a React renderer.
     */
    probe: RenderProbe;
    onDocChange: (doc: RteDocumentOf) => void;
    onStateChange: () => void;
    /** The editable element lost focus. Handed the current document, so a caller can commit it. */
    onBlur: (doc: RteDocumentOf) => void;
};

export type EditorHandle = {
    api: EditorControlApi;
    /** Replace the content with an externally-set document (the controlled `value`). */
    setDoc(doc: RteDocumentOf): void;
    /** Turn editing off or back on, keeping the content, the selection and the undo history. */
    setReadOnly(readOnly: boolean): void;
    /** Change the text shown while the document is empty. Empty string means none. */
    setPlaceholder(placeholder: string): void;
    /**
     * Where each declared piece of floating UI hangs, in mount order. One whose
     * anchor is not currently in the document is simply absent from the list.
     */
    floating: {
        placements(): FloatingPlacement[];
        /**
         * The box around the selected text, for the editor's own floating UI —
         * the toolbar, when it is the one hanging over the selection. Null while
         * nothing is selected.
         */
        selectionRect(): FloatingRect | null;
        /** Delete the open trigger and its query, so a choice can take their place. */
        clearQuery(): void;
        /** Close the open trigger until the caret moves on (Escape). */
        dismiss(): void;
    };
    destroy(): void;
};

/**
 * What an engine adapter implements: build a live editor over a container and
 * hand back the handle the React shell drives it through.
 */
export type CreateEditor = (options: EditorOptions) => EditorHandle;
