/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

import { type MenuOption, useRichTextNodeView } from '#/bridge/pluginApi/define';
import { type EditorApi, type UploadStatus, useEditorApi, useEditorValue } from '#/bridge/pluginApi/plugin';
import { altOf, figureAlign, imageOutput, isRecord, type JsonObject, REPLACED_ASSET, unavailableOf } from '#/model';

import { mayAnimate } from '../helpers/animation';
import { SET_SIZE } from '../helpers/dialogStrings';
import { type SIDES } from '../helpers/options';

import { useResize } from './useResize';
import { surfaceFocused, uploadStatusText, useUploadStatus } from './useUploadStatus';

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
 * What a screen reader hears as the image becomes node-selected, since an image with an empty `alt` says nothing:
 * for a slot, its upload as it stands, with how to fix a failed one.
 */
const spokenOf = (
    attrs: JsonObject,
    context: Parameters<typeof imageOutput>[1],
    unavailable: boolean,
    upload: UploadStatus | undefined,
) => {
    const { t } = context;
    if (attrs.assetId === null) {
        if (upload !== undefined) {
            // The live region writes a value between U+2068 and U+2069 into a `bdi` of its own.
            const name = `\u2068${upload.name}\u2069`;

            return t('RichTextEditor_announceBoth', { first: name, second: uploadStatusText(upload, t) });
        }

        return t('RichTextEditor_imageUnfinished');
    }

    if (unavailable) {
        const { message, label } = unavailableOf(attrs, context);

        return label === '' ? message : `${message} ${label}`;
    }

    const alt = altOf(attrs);
    if (alt === undefined) {
        return t('RichTextEditor_imageSelectedMissing');
    }

    if (alt === '') {
        return t('RichTextEditor_imageSelectedDecorative');
    }

    return t('RichTextEditor_imageSelected', { description: alt });
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

/** Speaks a selected image as it becomes selected, and again when what it says changes. */
const useSelectionAnnouncement = (
    selected: boolean,
    spoken: string,
    heard: string,
    slot: boolean,
    announce: EditorApi['announce'] | undefined,
) => {
    const heardRef = useRef<{ heard: string; slot: boolean } | undefined>(undefined);
    // A selected image is spoken as it becomes selected, and again when what it says changes, as when it fails to
    // load; a slot that fills is not, since the upload's completion speaks for it.
    useEffect(() => {
        if (!selected) {
            heardRef.current = undefined;

            return;
        }

        const before = heardRef.current;
        heardRef.current = { heard, slot };
        if (before !== undefined && (before.heard === heard || (before.slot && !slot))) {
            return;
        }

        announce?.(spoken);
    }, [selected, spoken, heard, slot, announce]);
};

/** The state, effects and handlers of the image chrome. */
export const useImageChromeState = () => {
    const { attrs, nodeId, selected, context, execute, select } = useRichTextNodeView<ImageCommands>();
    const api = useEditorApi();
    // It keeps its identity when a locale change gives a new API.
    const announce = api?.announce;
    const { t } = context;
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
    const mediaType = typeof attrs.mediaType === 'string' ? attrs.mediaType : null;
    const { decided, animated, paused, setPlayed } = useAnimation(src, mediaType);
    const unavailable = shown.kind !== 'image' || failed === shown.src;
    // The upload chrome follows the session's upload of this slot, which no reload keeps.
    const upload = useUploadStatus(nodeId ?? '');
    const slot = attrs.assetId === null;
    const spoken = spokenOf(attrs, context, unavailable, slot ? upload : undefined);
    // A slot's progress is shown, not spoken: only whether it runs, failed or stopped counts as a change.
    let heard = spoken;
    if (slot && upload !== undefined) {
        heard = upload.state === 'failed' || upload.state === 'stopped' ? upload.state : 'running';
    }

    // A selected image is spoken as it becomes selected, and again when what it says changes, as when it fails to
    // load; a slot that fills is not, since the upload's completion speaks for it.
    useSelectionAnnouncement(selected, spoken, heard, slot, announce);
    const altLabel = review ? t('RichTextEditor_imageAltReview') : undefined;
    const takesFocus = isRecord(replaced) && replaced.focus === true;
    // After the author's own pick focus moves to the review action, which the prompt describes; a background
    // completion leaves focus where the author is, and its announcement carries the prompt.
    useEffect(() => {
        if (altLabel !== undefined && takesFocus) {
            const action = barRef.current?.querySelector<HTMLElement>(`button[aria-label="${CSS.escape(altLabel)}"]`);
            action?.focus();
        }
    }, [altLabel, takesFocus]);
    const displayWidth = typeof attrs.displayWidth === 'number' ? attrs.displayWidth : null;
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

    let altText = t('RichTextEditor_imageAltEdit');
    if (review) {
        altText = t('RichTextEditor_imageAltReview');
    } else if (!kept) {
        altText = t('RichTextEditor_imageAltAdd');
    }

    let sizeText = t('RichTextEditor_imageSizeOriginal');
    if (displayWidth !== null) {
        sizeText = t('RichTextEditor_imageSizePercent', { percent: displayWidth });
    }

    const unfinished = attrs.assetId === null;
    const status = unfinished ? upload : undefined;
    // The chrome keeps mouse events from the editor, so a press on the image selects it here, as on any atom, and
    // keeps the browser from putting the caret in a neighbouring block; on a selected image it starts the node's drag.
    const selectImage = (event: MouseEvent) => {
        if (selected && event.button === 0) {
            return;
        }

        event.preventDefault();
        select();
        if (api?.surface() !== undefined && !surfaceFocused(api.surface)) {
            api.focus();
        }
    };

    return {
        api,
        t,
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
