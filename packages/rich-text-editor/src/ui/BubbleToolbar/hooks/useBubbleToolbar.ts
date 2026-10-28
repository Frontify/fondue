/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { type MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useHeldOverlay } from '#/bridge/overlays/hooks/useHeldOverlay';
import { useScopedFocus } from '#/bridge/overlays/hooks/useScopedFocus';
import { useEditorSelection } from '#/bridge/pluginApi/hooks/useEditorSelection';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { useApplePlatform } from '#/bridge/session/hooks/useApplePlatform';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { useSessionValue } from '#/bridge/session/hooks/useSessionValue';
import { type EditorPort, hasSurface, type SelectionSummary, selectionRectOf, selectionSpan } from '#/runtime/port';

/** Where the selection is, so a command that only maps it, as Mod+B does, leaves the toolbar as it was. */
const selectionOf = (runtime: EditorPort | undefined): string => {
    if (runtime === undefined) {
        return '';
    }

    const { anchor, head } = selectionSpan(runtime);

    return `${anchor} ${head}`;
};

// A closed or requested range keys the value too: the store compares to its last notification, not the rendered value.
const renderKeyOf = (runtime: EditorPort | undefined, closedAt: string | null, shownAt: string | null): string => {
    if (runtime === undefined || !hasSurface(runtime)) {
        return 'none';
    }

    const key = selectionOf(runtime);
    let rect = 'none';
    if (!selectionSpan(runtime).empty || shownAt === key) {
        const box = selectionRectOf(runtime);
        if (box !== undefined) {
            rect = `${box.left} ${box.top} ${box.width} ${box.height}`;
        }
    }

    if (closedAt !== null || shownAt !== null) {
        return `${rect} ${key}`;
    }

    return rect;
};

const holdsText = ({ kind, collapsed }: SelectionSummary) => (kind === 'text' || kind === 'all') && !collapsed;

/** Whether the bubble toolbar is open, and the focus it takes when Alt+F10 asked it to show. */
export const useBubbleToolbar = (
    showRef: MutableRefObject<(() => void) | null> | undefined,
    toolbarRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const apple = useApplePlatform();
    const { dir } = useFondueTheme();
    const runtime = useContext(SessionContext);
    const key = selectionOf(runtime);
    const selected = useEditorSelection(holdsText);
    const focus = useScopedFocus();
    const [closedAt, setClosedAt] = useState<string | null>(null);
    const [shownAt, setShownAt] = useState<string | null>(null);
    useSessionValue((current) => renderKeyOf(current, closedAt, shownAt), Object.is);
    // A move away ends both, so a later return to the same range shows the toolbar for its text again.
    if (closedAt !== null && closedAt !== key) {
        setClosedAt(null);
    }

    if (shownAt !== null && shownAt !== key) {
        setShownAt(null);
    }

    const [hovered, setHovered] = useState(false);
    const runtimeRef = useRef(runtime);
    const focusOnOpenRef = useRef(false);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
    });
    const setOpen = useCallback((next: boolean) => {
        if (next) {
            return;
        }

        // A toolbar that closes under the pointer hears no pointer leave.
        setHovered(false);
        setShownAt(null);
        setClosedAt(selectionOf(runtimeRef.current));
    }, []);
    const held = hovered || (focus !== null && focus.closest('[data-rte-bubble-toolbar]') !== null);
    const shown = focus !== null && (selected || shownAt === key);
    const open = (shown || held) && closedAt !== key;
    const overlay = useHeldOverlay(open, setOpen);
    const { anchor } = overlay;
    useEffect(() => anchor.hold(held), [anchor, held]);
    useClientLayoutEffect(() => {
        if (showRef === undefined) {
            return undefined;
        }

        showRef.current = () => {
            focusOnOpenRef.current = true;
            setClosedAt(null);
            setShownAt(selectionOf(runtimeRef.current));
        };

        return () => {
            showRef.current = null;
        };
    }, [showRef]);
    const onOpenAutoFocus = (event: { preventDefault(): void }) => {
        event.preventDefault();
        if (!focusOnOpenRef.current) {
            return;
        }

        focusOnOpenRef.current = false;
        const first = toolbarRef.current?.querySelector<HTMLElement>('button:not([disabled])');
        if (first !== null && first !== undefined) {
            first.focus();
        }
    };

    return { apple, dir, open, overlay, setHovered, onOpenAutoFocus };
};
