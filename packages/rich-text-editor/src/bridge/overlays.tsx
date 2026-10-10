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

import { type RuntimeEnvironment } from '#/model';
import { type EditorRuntime } from '#/runtime/runtime';

import { createSelectionAnchor, type SelectionAnchor } from './anchor';
import { useClientLayoutEffect } from './client-layout-effect';
import { SessionContext } from './hooks';
import { type InteractionScope } from './interaction-scope';

/** Where the editor's overlays render, and the interaction scope they share (SPEC-rich-text-react/AC-045, AC-047). */
export interface Overlays {
    /** `portalContainer`, else the editor's own overlay root inside its interaction scope. */
    readonly container: HTMLElement | null;
    readonly scope: InteractionScope;
    /** The session environment's scheduler: a microtask runs once Radix has removed a closed overlay's content. */
    readonly scheduler: RuntimeEnvironment['scheduler'];
}

export const OverlayContext = createContext<Overlays | null>(null);
OverlayContext.displayName = 'RichTextEditorOverlayContext';

/** The portal container of the editor around the caller (SPEC-rich-text-react/AC-045). */
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
export interface EditorOverlay {
    readonly container: HTMLElement | null;
    /** Takes the content element Fondue forwards, which hides while its anchor is clipped. */
    readonly contentRef: RefCallback<HTMLDivElement>;
    /** Takes every close request but one from a focus move or press inside the editor and outside this overlay. */
    readonly onOpenChange: (open: boolean) => void;
    /** The selection's rectangle as a virtual anchor. */
    readonly anchor: SelectionAnchor;
}

// Escapes that an overlay hands on after closing, so the chrome still moves focus for them.
const passedEscapes = new WeakSet<Event>();

/** Closes an overlay on Escape and still lets the key return focus from a toolbar to the surface (SPEC-rich-text-react/AC-035). */
export const passEscape = (event: KeyboardEvent): void => {
    passedEscapes.add(event);
};

/** Whether an overlay handed this Escape on, though it prevented its default. */
export const escapePassed = (event: Event): boolean => passedEscapes.has(event);

/** Whether `element` holds `node`, or is it. */
const holds = (element: HTMLElement | null, node: Node | null) => element !== null && element.contains(node);

const TABBABLE =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Lets Tab on an overlay's last control, or Shift+Tab on its first, move on past it, where the focus loop of a Radix
 * popover would wrap; a modal dialog's focus trap still holds focus (SPEC-rich-text-accessibility/AC-016).
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
 * Returns focus that a closed overlay left on `body` to the element that had it before the overlay opened, such as the
 * chrome button that opened a dialog, or, when that is the surface or gone, to the surface at ProseMirror's selection,
 * which it maps through every change made meanwhile (SPEC-rich-text-react/AC-083).
 */
const refocus = (runtime: EditorRuntime, before: Element | null) => {
    const { view } = runtime;
    if (view === undefined) {
        return;
    }
    const { activeElement, body } = view.dom.ownerDocument;
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
 * An overlay's place and focus rules: it renders into the portal container, stays open for moves inside the editor
 * (SPEC-rich-text-react/AC-047), closes when the document is replaced (SPEC-rich-text-persistence, Replacement steps,
 * step 8), and returns focus that a close leaves on `body` (SPEC-rich-text-react/AC-083).
 */
export const useEditorOverlay = (open: boolean, setOpen: (open: boolean) => void): EditorOverlay => {
    const { container, scope, scheduler } = useOverlays();
    const runtime = useContext(SessionContext);
    const runtimeRef = useRef(runtime);
    // A caller's inline `setOpen` is new on each render, which must not end and restart the open overlay's effect.
    const setOpenRef = useRef(setOpen);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
        setOpenRef.current = setOpen;
    });
    const elementRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useCallback((element: HTMLDivElement | null) => {
        elementRef.current?.removeEventListener('keydown', leaveOnTab);
        elementRef.current = element;
        element?.addEventListener('keydown', leaveOnTab);
    }, []);
    const [anchor] = useState(() => createSelectionAnchor(() => runtimeRef.current?.view));
    const onOpenChange = useCallback(
        (next: boolean) => {
            const { kind, target } = scope.last();
            if (!next && kind !== 'key' && scope.contains(target) && !holds(elementRef.current, target)) {
                return;
            }
            setOpenRef.current(next);
        },
        [scope],
    );
    useEffect(() => {
        if (!open || runtime === undefined) {
            return undefined;
        }
        const before = scope.active();
        const unsubscribe = runtime.handle.subscribe('replaced', () => setOpenRef.current(false));
        // Runs when the overlay closes and when it unmounts open, as the chrome of a deleted node does.
        return () => {
            unsubscribe();
            scheduler.microtask(() => refocus(runtime, before));
        };
    }, [open, runtime, scope, scheduler]);
    // Hides the content, keeping its state, while its anchor is clipped; Floating UI's `hide` middleware would, but
    // Fondue's `Flyout` and `Dropdown` do not expose `hideWhenDetached`.
    useEffect(() => {
        if (!open) {
            return undefined;
        }
        let frame = 0;
        const track = () => {
            const element = elementRef.current;
            let visibility = '';
            if (anchor.clipped()) {
                visibility = 'hidden';
            }
            if (element !== null && element.style.visibility !== visibility) {
                element.style.visibility = visibility;
            }
            frame = scheduler.frame(track);
        };
        frame = scheduler.frame(track);
        return () => scheduler.cancelFrame(frame);
    }, [open, anchor, scheduler]);
    return { container, contentRef, onOpenChange, anchor };
};

/** An overlay's body: one whose code loads lazily suspends here, so the surface stays mounted and editable (SPEC-rich-text-react/AC-023). */
export const OverlayBody = ({ children }: { readonly children: ReactNode }) => (
    <Suspense fallback={null}>{children}</Suspense>
);
OverlayBody.displayName = 'RichTextEditor.OverlayBody';
