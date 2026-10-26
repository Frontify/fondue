/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createContext,
    type ReactNode,
    type RefCallback,
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';

import { type EditorPort } from '#/runtime/port';
import { engineOf } from '#/runtime/portEngine';

import { createSelectionAnchor } from './anchor';
import { useClientLayoutEffect } from './clientLayoutEffect';
import { type InteractionScope } from './interactionScope';
import { type AnchorTarget, type OverlayAnchor } from './plugin';
import { SessionContext } from './session';

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
    readonly container: HTMLElement | null;
    readonly scope: InteractionScope;
    /** The element that had focus when the open overlay was asked for, before the overlay took focus. */
    readonly opener?: Element | null;
};

export const OverlayContext = createContext<Overlays | null>(null);
OverlayContext.displayName = 'RichTextEditorOverlayContext';

/** The portal container of the editor around the caller. */
export const useOverlayContainer = (): HTMLElement | null => {
    const overlays = useContext(OverlayContext);
    if (overlays === null) {
        return null;
    }

    return overlays.container;
};

const useOverlays = (): Overlays => {
    const overlays = useContext(OverlayContext);
    if (overlays === null) {
        throw new Error('An editor overlay must be rendered inside RichTextEditor.Root.');
    }

    return overlays;
};

const NO_FOCUS = () => null;

/** The focused element while focus is inside the editor's interaction scope, else `null`; each focus move rerenders. */
export const useScopedFocus = (): Element | null => {
    const { scope } = useOverlays();
    const read = () => {
        const active = scope.active();
        if (scope.contains(active)) {
            return active;
        }

        return null;
    };

    return useSyncExternalStore(scope.subscribe, read, NO_FOCUS);
};

/** What an editor overlay passes to its Fondue `Flyout`, `Dropdown` or `Dialog`. */
export type EditorOverlay = {
    readonly container: HTMLElement | null;
    /** Takes the content element Fondue forwards, which hides while its anchor is clipped. */
    readonly contentRef: RefCallback<HTMLDivElement>;
    /**
     * Takes every close request but one from a focus move or press inside the editor and outside this overlay, or from
     * a focus move during a press inside this overlay.
     */
    readonly onOpenChange: (open: boolean) => void;
    /**
     * The virtual anchor for this overlay: the `anchor` target `useEditorOverlay` got, else the selection. Unlike
     * `OverlayProps.anchor`, which is the target the opener passed to `overlays.open` and which only places an overlay,
     * this one also hides the content while a scrolling ancestor clips it.
     */
    readonly anchor: OverlayAnchor;
    /**
     * Where the next close returns focus that it leaves on `body`: `target`, such as the control that opened the
     * overlay, or the surface for `null`, in place of the element that had focus when the overlay opened.
     */
    readonly returnFocusTo: (target: Element | null) => void;
};

// Escapes that an overlay hands on after closing, so the chrome still moves focus for them.
const passedEscapes = new WeakSet<Event>();

/** Closes an overlay on Escape and still lets the key return focus from a toolbar to the surface. */
export const passEscape = (event: KeyboardEvent): void => {
    passedEscapes.add(event);
};

/** Whether an overlay handed this Escape on, though it prevented its default. */
export const escapePassed = (event: Event): boolean => passedEscapes.has(event);

/** Whether `element` holds `node`, or is it. */
const holds = (element: HTMLElement | null, node: Node | null) => element !== null && element.contains(node);

export const TABBABLE =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Lets Tab on an overlay's last control, or Shift+Tab on its first, move on past it, where the focus loop of a Radix
 * popover would wrap; a modal dialog's focus trap still holds focus.
 */
const leaveOnTab = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') {
        return;
    }

    const tabbables = (event.currentTarget as HTMLElement).querySelectorAll(TABBABLE);
    let edge = tabbables[tabbables.length - 1];
    if (event.shiftKey) {
        edge = tabbables[0];
    }

    if (edge !== undefined && event.target === edge) {
        event.stopPropagation();
    }
};

/**
 * Returns focus that a closed overlay left on `body` to `before`, by default the element that had it before the overlay
 * opened, such as the chrome button that opened a dialog, or, when that is the surface, `null` or gone, to the surface
 * at ProseMirror's selection, which it maps through every change made meanwhile.
 */
const refocus = (port: EditorPort, before: Element | null, panelControl: Element | null) => {
    const runtime = engineOf(port);
    const { view } = runtime;
    if (view === undefined) {
        return;
    }

    const { activeElement, body } = view.dom.ownerDocument;
    // A control a panel opened, such as from an issues panel repair, hands focus back to it after a change too.
    if (
        panelControl instanceof HTMLElement &&
        panelControl.isConnected &&
        (activeElement === body || activeElement === null || activeElement === view.dom)
    ) {
        panelControl.focus();

        return;
    }

    if (activeElement !== body && activeElement !== null) {
        return;
    }

    // An element of an iframe's document is no `HTMLElement` of this window.
    if (before !== null && before !== view.dom && before.isConnected && 'focus' in before) {
        (before as HTMLElement).focus();

        return;
    }

    runtime.handle.focus();
};

/**
 * An overlay's place and focus rules: it renders into the portal container, stays open for moves inside the editor,
 * closes when the document is replaced, and returns focus that a close leaves on `body`. Its anchor is the selection, or
 * `anchor`, such as the range of a mark run that `marks.run` returned, which a function may read each frame.
 */
export const useEditorOverlay = (
    open: boolean,
    setOpen: (open: boolean) => void,
    anchor?: AnchorTarget,
): EditorOverlay => useHeldOverlay(open, setOpen, anchor);

/** `useEditorOverlay` with the anchor's `hold`, which chrome that stays beside the surface while it is hovered uses. */
export const useHeldOverlay = (
    open: boolean,
    setOpen: (open: boolean) => void,
    target?: AnchorTarget,
): EditorOverlay & { readonly anchor: SelectionAnchor } => {
    const { container, scope, opener = null } = useOverlays();
    const runtime = useContext(SessionContext);
    const runtimeRef = useRef(runtime);
    const openerRef = useRef(opener);
    // A caller's inline `setOpen` is new on each render, which must not end and restart the open overlay's effect.
    const setOpenRef = useRef(setOpen);
    const targetRef = useRef(target);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
        setOpenRef.current = setOpen;
        targetRef.current = target;
        openerRef.current = opener;
    });
    const elementRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useCallback((element: HTMLDivElement | null) => {
        elementRef.current?.removeEventListener('keydown', leaveOnTab);
        elementRef.current = element;
        element?.addEventListener('keydown', leaveOnTab);
    }, []);
    const [anchor] = useState(() =>
        createSelectionAnchor(
            () => {
                const live = runtimeRef.current;
                if (live === undefined) {
                    return undefined;
                }

                return engineOf(live).view;
            },
            () => targetRef.current,
        ),
    );
    const onOpenChange = useCallback(
        (next: boolean) => {
            const { kind, target } = scope.last();
            if (!next && kind !== 'key' && scope.contains(target) && !holds(elementRef.current, target)) {
                return;
            }

            // A host dialog's focus trap may move focus to its container while a press inside this overlay is held.
            if (!next && kind === 'focus' && holds(elementRef.current, scope.pressed())) {
                return;
            }

            setOpenRef.current(next);
        },
        [scope],
    );
    const returnRef = useRef<{ readonly target: Element | null } | undefined>(undefined);
    const returnFocusTo = useCallback((target: Element | null) => {
        returnRef.current = { target };
    }, []);
    useEffect(() => {
        if (!open || runtime === undefined) {
            return undefined;
        }

        const before = scope.active();
        // The control's own opener, read when it opened, since the overlay may move focus before this effect runs.
        let panelControl: Element | null = null;
        for (const candidate of [openerRef.current, before]) {
            if (panelControl === null && candidate !== null && candidate.closest('[data-rte-panel]') !== null) {
                panelControl = candidate;
            }
        }

        const unsubscribe = runtime.handle.subscribe('replaced', () => setOpenRef.current(false));
        // An open overlay keeps the scope listening, whether or not focus is inside, so an outside press still closes it.
        const release = scope.hold();

        // Runs when the overlay closes and when it unmounts open, as the chrome of a deleted node does.
        return () => {
            unsubscribe();
            release();
            let target = before;
            if (returnRef.current !== undefined) {
                target = returnRef.current.target;
            }

            returnRef.current = undefined;
            queueMicrotask(() => refocus(runtime, target, panelControl));
        };
    }, [open, runtime, scope]);
    // Hides the content while its anchor is clipped; Floating UI's `hide` middleware would, but Fondue's `Flyout` and
    // `Dropdown` do not expose `hideWhenDetached`. A zero scale with no pointer input, not `visibility: hidden`, which
    // blurs a focused field, keeps focus and state inside and the content in the accessibility tree, since focus may be
    // there.
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        let frame = 0;
        const track = () => {
            const element = elementRef.current;
            let transform = '';
            let pointerEvents = '';
            if (anchor.clipped()) {
                transform = 'scale(0)';
                pointerEvents = 'none';
            }

            if (element !== null && element.style.transform !== transform) {
                element.style.transform = transform;
                element.style.pointerEvents = pointerEvents;
            }

            frame = requestAnimationFrame(track);
        };

        frame = requestAnimationFrame(track);

        return () => cancelAnimationFrame(frame);
    }, [open, anchor]);

    return { container, contentRef, onOpenChange, anchor, returnFocusTo };
};

/** An overlay's body: one whose code loads lazily suspends here, so the surface stays mounted and editable. */
export const OverlayBody = ({ children }: { readonly children: ReactNode }) => (
    <Suspense fallback={null}>{children}</Suspense>
);
OverlayBody.displayName = 'RichTextEditor.OverlayBody';
