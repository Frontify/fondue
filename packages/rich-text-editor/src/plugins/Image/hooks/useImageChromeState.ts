/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

import { type MenuOption, useRichTextNodeView } from '#/bridge/pluginApi/define';
import { type EditorApi, useEditorApi, useEditorValue } from '#/bridge/pluginApi/plugin';
import { figureAlign, imageOutput, isRecord, REPLACED_ASSET } from '#/model';

import { mayAnimate } from '../helpers/animation';
import { altActionLabel, sizeActionLabel } from '../helpers/chromeText';
import { SET_SIZE } from '../helpers/dialogStrings';
import { type SIDES } from '../helpers/options';

import { useResize } from './useResize';
import { useReviewFocus } from './useReviewFocus';
import { useSpokenImage } from './useSpokenImage';
import { surfaceFocused, useUploadStatus } from './useUploadStatus';

/** The side of the figure that holds the image `nodeId`, which its chrome's alignment menu shows. */
const sideOf = (api: EditorApi | undefined, nodeId: string | null) => {
    if (api === undefined || nodeId === null) {
        return 'center';
    }

    const figure = api.nearest('figure', nodeId);
    const attrs = figure?.attrs;

    return figureAlign(attrs ?? {});
};

const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/**
 * A press on the image selects it, as on any atom, and keeps the browser from putting the caret in a neighbouring
 * block. The chrome keeps the mouse event from the editor. On a selected image the press starts the node's drag.
 */
const selectImageOnPress = (event: MouseEvent, selected: boolean, select: () => void, api: EditorApi | undefined) => {
    if (selected && event.button === 0) {
        return;
    }

    event.preventDefault();
    select();
    if (api?.surface() !== undefined && !surfaceFocused(api.surface)) {
        api.focus();
    }
};

type ImageCommands = {
    'image.replace': { nodeId: string };
    'image.size.set': { displayWidth: number | null };
    'image.align.set': { align: (typeof SIDES)[number] };
    'image.width.edit': undefined;
};

/** Whether the image at `src` may animate, and whether it shows paused. */
const useAnimation = (src: string | undefined, mediaType: string | null) => {
    // Whether the image at `src` may animate, once the check for that `src` answered.
    const [animation, setAnimation] = useState<{ src: string; may: boolean }>();
    // The author's own Pause or Play, for one `src` only: a new image starts as reduced motion has it.
    const [played, setPlayed] = useState<{ src: string; paused: boolean }>();
    useEffect(() => {
        if (src === undefined) {
            return undefined;
        }

        const controller = new AbortController();
        mayAnimate(src, mediaType, controller.signal)
            .then((may) => {
                if (!controller.signal.aborted) {
                    setAnimation({ src, may });
                }

                return may;
            })
            .catch(() => undefined);

        return () => controller.abort();
    }, [src, mediaType]);
    const decided = animation !== undefined && animation.src === src;
    const animated = decided && animation.may;
    let paused = reducedMotion();
    if (played !== undefined && played.src === src) {
        paused = played.paused;
    }

    return { decided, animated, paused, setPlayed };
};

/** The state, effects and handlers of the image chrome. */
export const useImageChromeState = () => {
    const { attrs, nodeId, selected, context, execute, select } = useRichTextNodeView<ImageCommands>();
    const api = useEditorApi();
    // It keeps its identity when a locale change gives a new API.
    const announce = api?.announce;
    const { translate } = context;
    const shown = useMemo(() => imageOutput(attrs, context), [attrs, context]);
    const src = shown.kind === 'image' ? shown.src : undefined;
    const [failed, setFailed] = useState<string>();
    const pendingRef = useRef<'width' | undefined>(undefined);
    const barRef = useRef<HTMLDivElement>(null);
    const reviewId = useId();
    const frameRef = useRef<HTMLSpanElement>(null);
    const side = useEditorValue((editor) => sideOf(editor, nodeId));
    const replaced = useEditorValue((editor) => {
        if (editor === undefined || nodeId === null) {
            return undefined;
        }

        return editor.nodeState.get(nodeId, REPLACED_ASSET);
    });
    // An undone replacement gives back the old asset, which asks for no review.
    const kept = attrs.altIntent === 'meaningful' || attrs.altIntent === 'decorative';
    const review = isRecord(replaced) && replaced.assetId === attrs.assetId;
    let mediaType: string | null = null;
    if (typeof attrs.mediaType === 'string') {
        mediaType = attrs.mediaType;
    }

    const { decided, animated, paused, setPlayed } = useAnimation(src, mediaType);
    const unavailable = shown.kind !== 'image' || failed === shown.src;
    // The upload chrome follows the session's upload of this slot, which no reload keeps.
    const upload = useUploadStatus(nodeId ?? '');
    const slot = attrs.assetId === null;
    useSpokenImage(attrs, context, unavailable, slot ? upload : undefined, slot, selected, announce);
    const altLabel = review ? translate('RichTextEditor_imageAltReview') : undefined;
    const takesFocus = isRecord(replaced) && replaced.focus === true;
    useReviewFocus(altLabel, takesFocus, barRef);
    let displayWidth: number | null = null;
    if (typeof attrs.displayWidth === 'number') {
        displayWidth = attrs.displayWidth;
    }

    const resize = useResize(frameRef, api, (width) => {
        if (width !== displayWidth) {
            execute(SET_SIZE, { displayWidth: width });
        }
    });
    // A menu choice acts on this image, as the node view's `execute` does.
    const runOption = (option: MenuOption) => {
        select();
        api?.commands.execute(option.command, option.payload);
    };

    const openWidth = () => {
        // The dialog returns focus to the size menu, which has it as the dialog opens.
        const menu = barRef.current?.querySelector<HTMLElement>(`[data-rte-command="${SET_SIZE}"]`);
        menu?.focus();
        execute('image.width.edit');
    };

    const altText = altActionLabel(translate, review, kept);
    const sizeText = sizeActionLabel(translate, displayWidth);
    const unfinished = attrs.assetId === null;
    const status = unfinished ? upload : undefined;
    const selectImage = (event: MouseEvent) => selectImageOnPress(event, selected, select, api);

    return {
        api,
        translate,
        context,
        attrs,
        nodeId,
        execute,
        shown,
        setFailed,
        setPlayed,
        pendingRef,
        barRef,
        frameRef,
        reviewId,
        side,
        review,
        decided,
        animated,
        paused,
        unavailable,
        unfinished,
        status,
        altText,
        sizeText,
        displayWidth,
        resize,
        runOption,
        openWidth,
        selectImage,
    };
};

export type ImageChromeState = ReturnType<typeof useImageChromeState>;
