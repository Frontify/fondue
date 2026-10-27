/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type MutableRefObject } from 'react';

import { type MountCoordinator } from '#/bridge/session/helpers/mount';

import { type ToolbarMode } from '../../types';
import { type Props } from '../types';

import { moveChromeFocus } from './chromeFocus';
import { toolbarShortcutOf } from './sessionHelpers';

type KeySources = {
    props: Props;
    coordinator: MountCoordinator;
    toolbarRef: MutableRefObject<HTMLDivElement | null>;
    bubbleRef: MutableRefObject<HTMLDivElement | null>;
    showBubbleRef: MutableRefObject<(() => void) | null>;
    overlayToolbarsRef: MutableRefObject<(HTMLElement | null)[]>;
    toolbarMode: ToolbarMode;
};

/** Moves focus between the surface and the chrome on the keys the root hears. */
export const chromeKeyDownOf =
    ({ props, coordinator, toolbarRef, bubbleRef, showBubbleRef, overlayToolbarsRef, toolbarMode }: KeySources) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
        // A disabled editor's toolbar takes no focus.
        let toolbar = toolbarRef.current;
        if (props.disabled === true) {
            toolbar = null;
        }

        let showBubble: (() => void) | null = null;
        if (toolbarMode === 'bubble') {
            showBubble = showBubbleRef.current;
        }

        const overlayToolbar = overlayToolbarsRef.current.find((element) => element?.isConnected === true) ?? null;

        moveChromeFocus(event, {
            runtime: coordinator.runtime,
            toolbar,
            overlayToolbar,
            bubble: bubbleRef.current,
            showBubble,
            shortcut: toolbarShortcutOf(props),
        });
    };
