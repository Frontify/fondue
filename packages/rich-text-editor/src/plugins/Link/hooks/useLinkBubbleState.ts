/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useId, useMemo, useRef, useState } from 'react';

import {
    sameRange,
    type StandingOverlayProps,
    useClientLayoutEffect,
    useEditorApi,
    useEditorOverlay,
    useEditorValue,
    useScopedFocus,
} from '#/bridge/plugin';
import { type CodecContext } from '#/model';

import { caretLink, caretOf, linkBubbleStrings, returnFocus, sameLink } from '../helpers/linkBubbleModel';

/** The link bubble's state, effects and handlers; none while there is no link to show. */
export const useLinkBubbleState = ({ toolbarRef, covered }: StandingOverlayProps) => {
    const api = useEditorApi();
    let translate: CodecContext['t'] = (key) => key;
    let testId = '';
    if (api !== undefined) {
        translate = api.t;
        testId = api.testId();
    }

    const strings = linkBubbleStrings(translate);
    const link = useEditorValue(caretLink, sameLink);
    const caret = useEditorValue(caretOf, sameRange);
    const focus = useScopedFocus();
    const urlId = useId();
    const [closed, setClosed] = useState<{ at: ReturnType<typeof caretOf> }>();
    // A caret move ends the close, so moving again within or into the link shows the bubble once more.
    if (closed !== undefined && !sameRange(closed.at, caret)) {
        setClosed(undefined);
    }

    const [hovered, setHovered] = useState(false);
    // A bubble an overlay hides hears no pointer leave, so the hold ends when it hides.
    if (covered && hovered) {
        setHovered(false);
    }

    // The link last shown, which the bubble keeps while held once the caret leaves it.
    const [kept, setKept] = useState(link);
    if (link !== undefined && !sameLink(kept, link)) {
        setKept(link);
    }

    // A document change can leave the kept range pointing at nothing, which the writer then refuses to read, ending the hold.
    const targetable = useEditorValue((read) => kept === undefined || read?.content.read(kept.range) !== undefined);
    const stale = link === undefined && !targetable;
    if (stale && hovered) {
        setHovered(false);
    }

    const held = !stale && (hovered || (focus !== null && focus.closest('[data-rte-link-bubble]') !== null));
    let shown = link;
    if (shown === undefined && held) {
        shown = kept;
    }

    const caretRef = useRef(caret);
    const keptRef = useRef(kept);
    useClientLayoutEffect(() => {
        caretRef.current = caret;
        keptRef.current = kept;
    });
    const setOpen = useCallback((next: boolean) => {
        if (!next) {
            // A bubble that closes under the pointer hears no pointer leave.
            setHovered(false);
            setClosed({ at: caretRef.current });
        }
    }, []);
    // Hidden while an overlay a command opened shows, such as the link popover editing this link.
    const open = !covered && shown !== undefined && (focus !== null || held) && closed === undefined;
    const overlay = useEditorOverlay(open, setOpen);
    // The session arrives after the first render, so the anchor reads the API once it exists.
    const anchor = useMemo(() => api?.anchor(() => caretLink(api)?.range ?? keptRef.current?.range), [api]);
    // The toolbar inside the wrapper is in the DOM by the time React sets the wrapper's ref.
    const bubbleRef = useCallback(
        (element: HTMLDivElement | null) => toolbarRef(element?.querySelector<HTMLElement>('[role="toolbar"]') ?? null),
        [toolbarRef],
    );
    if (shown === undefined || api === undefined || anchor === undefined) {
        return undefined;
    }

    const href = typeof shown.attrs.href === 'string' ? shown.attrs.href : '';
    const back = (control: Element) => returnFocus(api, control.closest('[role="toolbar"]'));
    const { range } = shown;
    // A held bubble shows the link it kept, so its actions run there, not at the selection that left it.
    const runOnShown = (command: string) => {
        if (link !== undefined) {
            api.commands.execute(command);

            return;
        }

        const target = api.targets.capture(range);
        if (target !== undefined) {
            api.commands.execute(command, undefined, { target });
            api.targets.release(target);
        }
    };

    return { api, strings, testId, open, overlay, anchor, bubbleRef, urlId, href, setHovered, back, runOnShown };
};
