/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, useState } from 'react';

import { type LinkInitial } from '../helpers/linkPopoverModel';

/** The destination, visible text, new-window and style fields the popover edits. */
export const useLinkFields = (initial: LinkInitial) => {
    const [href, setHref] = useState(initial.href);
    const [text, setText] = useState(initial.text);
    const [newWindow, setNewWindow] = useState(initial.openInNewWindow);
    const [styleId, setStyleId] = useState(initial.styleId);
    const [typed, setTyped] = useState(false);
    const destinationRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLInputElement | null>(null);

    return {
        href,
        setHref,
        text,
        setText,
        newWindow,
        setNewWindow,
        styleId,
        setStyleId,
        typed,
        setTyped,
        destinationRef,
        textRef,
    };
};
