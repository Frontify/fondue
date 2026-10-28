/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useId, useState } from 'react';

import { type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/pluginApi/plugin';
import { type CodecContext, type PresentationStyle } from '#/model';

import {
    captureLinkTarget,
    type LinkInitial,
    linkPopoverStrings,
    linkStylesOf,
    searchOf,
} from '../helpers/linkPopoverModel';

import { useLinkEditing } from './useLinkEditing';
import { useLinkFields } from './useLinkFields';

/** The link popover's state, effects and handlers, which `LinkPopover` renders. */
export const useLinkPopoverState = ({
    initial,
    anchor: linkAnchor,
    opener,
    close: onClose,
}: OverlayProps & { initial: LinkInitial }) => {
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
    const [target] = useState(() => captureLinkTarget(api, initial.link));
    const fields = useLinkFields(initial);
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
    const editing = useLinkEditing({
        api,
        search,
        policy,
        strings,
        initialText: initial.text,
        target,
        overlay,
        close,
        href: fields.href,
        setHref: fields.setHref,
        typed: fields.typed,
        setTyped: fields.setTyped,
        text: fields.text,
        newWindow: fields.newWindow,
        styleId: fields.styleId,
        destinationRef: fields.destinationRef,
        listId,
    });

    return {
        initial,
        strings,
        testId,
        listId,
        overlay,
        open,
        dismiss,
        anchor,
        destinationRef: fields.destinationRef,
        textRef: fields.textRef,
        href: fields.href,
        text: fields.text,
        setText: fields.setText,
        newWindow: fields.newWindow,
        setNewWindow: fields.setNewWindow,
        styleId: fields.styleId,
        setStyleId: fields.setStyleId,
        linkStyles,
        ...editing,
    };
};

export type LinkPopoverState = ReturnType<typeof useLinkPopoverState>;
