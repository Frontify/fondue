/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ChangeEvent, useEffect, useId, useRef, useState } from 'react';

import { type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/plugin';
import { type CodecContext, type PresentationStyle } from '#/model';

import {
    capture,
    FIELD_PROBLEMS,
    type LinkInitial,
    linkPopoverStrings,
    linkStylesOf,
    searchOf,
} from './linkPopoverModel';
import { useDestinationField } from './useDestinationField';
import { useDestinationSearch } from './useDestinationSearch';
import { useLinkApply } from './useLinkApply';

/** The link popover's state, effects and handlers, which `LinkPopover` renders. */
export const useLinkPopoverState = ({
    initial,
    anchor: linkAnchor,
    opener,
    close: onClose,
}: OverlayProps & { readonly initial: LinkInitial }) => {
    const api = useEditorApi();
    const [{ policy, search }] = useState(() => searchOf(api));
    let presented: readonly PresentationStyle[] = [];
    let translate: CodecContext['t'] = (key) => key;
    let testId = '';
    if (api !== undefined) {
        presented = api.services.presentation().styles;
        translate = api.t;
        testId = api.testId();
    }
    const linkStyles = linkStylesOf(presented);
    const strings = linkPopoverStrings(translate);
    const [open, setOpen] = useState(true);
    const [target] = useState(() => capture(api, initial.link));
    const [href, setHref] = useState(initial.href);
    const [text, setText] = useState(initial.text);
    const [newWindow, setNewWindow] = useState(initial.openInNewWindow);
    const [styleId, setStyleId] = useState(initial.styleId);
    const [typed, setTyped] = useState(false);
    const destinationRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLInputElement | null>(null);
    const listId = useId();
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const dismiss = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }
        overlay.onOpenChange(next);
    };
    const anchor = initial.link === undefined ? overlay.anchor : linkAnchor;
    const targets = api?.targets;
    useEffect(
        () => () => {
            if (target !== undefined) {
                targets?.release(target);
            }
        },
        [targets, target],
    );
    const [results, index, setIndex] = useDestinationSearch(api, search, policy, href.trim(), typed, strings);
    const [problem, setProblem, messageOf, apply, insertNew, pick] = useLinkApply(
        api,
        strings,
        policy,
        initial.text,
        target,
        overlay,
        close,
        destinationRef,
        href,
        text,
        newWindow,
        styleId,
        results,
    );
    const invalid = FIELD_PROBLEMS.has(problem);
    const shown = results.length > 0;
    const [onKeyDown, combobox] = useDestinationField(search, results, index, setIndex, pick, listId);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHref(event.target.value);
        setTyped(true);
        if (invalid) {
            setProblem(undefined);
        }
    };
    return {
        initial,
        strings,
        testId,
        listId,
        overlay,
        open,
        dismiss,
        anchor,
        destinationRef,
        textRef,
        href,
        text,
        setText,
        newWindow,
        setNewWindow,
        styleId,
        setStyleId,
        linkStyles,
        problem,
        invalid,
        messageOf,
        apply,
        insertNew,
        results,
        index,
        setIndex,
        pick,
        shown,
        onKeyDown,
        combobox,
        onChange,
    };
};
