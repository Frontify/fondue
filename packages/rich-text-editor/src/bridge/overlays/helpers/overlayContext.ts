/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, type RefCallback } from 'react';

import { type OverlayAnchor } from '../../pluginApi/plugin';

import { type InteractionScope } from './interactionScope';

// Lives here, not beside its factory in anchor.ts, whose declarations reach prosemirror-view.
/** A rectangle an overlay anchors to, as Fondue's `virtualAnchor` takes it, which Floating UI reads each frame. */
export type SelectionAnchor = {
    getBoundingClientRect(): DOMRect;
    /** Holds the rectangle where it is beside the surface, so content changes next to it leave the overlay in place. */
    hold(held: boolean): void;
    /** Whether a scrolling ancestor clips the whole rectangle; never for an anchor no overlay has read yet, as a dialog's. */
    clipped(): boolean;
};

/** Where the editor's overlays render, and the interaction scope they share. */
export type Overlays = {
    /** `portalContainer`, else the editor's own overlay root inside its interaction scope. */
    container: HTMLElement | null;
    scope: InteractionScope;
    /** The element that had focus when the open overlay was asked for, before the overlay took focus. */
    opener?: Element | null;
};

export const OverlayContext = createContext<Overlays | null>(null);
OverlayContext.displayName = 'RichTextEditorOverlayContext';

/** What an editor overlay passes to its Fondue `Flyout`, `Dropdown` or `Dialog`. */
export type EditorOverlay = {
    /** The portal container to render into, `null` before the editor mounts. */
    container: HTMLElement | null;
    /** Takes the content element Fondue forwards, which hides while its anchor is clipped. */
    contentRef: RefCallback<HTMLDivElement>;
    /**
     * Takes every close request but one from a focus move or press inside the editor and outside this overlay, or from
     * a focus move during a press inside this overlay.
     */
    onOpenChange: (open: boolean) => void;
    /**
     * The virtual anchor for this overlay: the `anchor` target `useEditorOverlay` got, else the selection. Unlike
     * `OverlayProps.anchor`, which is the target the opener passed to `overlays.open` and which only places an overlay,
     * this one also hides the content while a scrolling ancestor clips it.
     */
    anchor: OverlayAnchor;
    /**
     * Where the next close returns focus that it leaves on `body`: `target`, such as the control that opened the
     * overlay, or the surface for `null`, in place of the element that had focus when the overlay opened.
     */
    returnFocusTo: (target: Element | null) => void;
};
