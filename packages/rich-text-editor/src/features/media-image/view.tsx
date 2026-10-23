/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowSwap, IconPause, IconPlay } from '@frontify/fondue-icons';
import { type MouseEvent, type PointerEvent, type RefObject, useEffect, useId, useMemo, useRef, useState } from 'react';

import {
    type MenuOption,
    NodeChromeButton,
    NodeChromeMenu,
    NodeChromeToolbar,
    OptionItem,
    type NodeViewDeclaration,
    useRichTextNodeView,
} from '#/bridge/define';
import { type EditorApi, type UploadStatus, useEditorApi, useEditorValue } from '#/bridge/plugin';
import { altOf, figureAlign, imageOutput, isRecord, type JsonObject, REPLACED_ASSET, unavailableOf } from '#/model';

import { AltTextDialog, altTextStrings } from './alt-text-dialog';
import { mayAnimate } from './animation';
import { ContentImage } from './image';
import { figureOf } from './nodes';
import { alignOptions, EDIT_WIDTH, type SIDES, SIDE_KEYS, sizeOptions } from './options';
import { ImageUnavailable } from './reader';
import styles from './styles/image.module.scss';
import { surfaceFocused, UploadControls, UploadSlot, uploadStatusText, useUploadStatus } from './upload';
import { MAX_WIDTH, MIN_WIDTH, SET_SIZE } from './width-dialog';

// How far a pointer moves before a press on the handle counts as a horizontal resize, or as a scroll.
const SLOP = 8;

/** The side of the figure that holds the image `nodeId`, which its chrome's alignment menu shows. */
const sideOf = (api: EditorApi | undefined, nodeId: string | null) => {
    if (api === undefined || nodeId === null) {
        return 'center';
    }
    const figure = api.nearest('figure', nodeId);
    const attrs = figure?.attrs;
    return figureAlign(attrs ?? {});
};

/** A stored intrinsic size, or `null` where the image has none. */
const sizeOf = (value: unknown) => (typeof value === 'number' ? value : null);

/**
 * Removes the figure that holds the image `nodeId`, as one undo step; an empty paragraph takes the place of a figure
 * that is the only block of its parent.
 */
const removeFigure = (api: EditorApi | undefined, nodeId: string) => {
    if (api === undefined) {
        return;
    }
    const figure = figureOf(api.document().content, nodeId);
    const attrs = figure?.attrs;
    const figureId = attrs?.nodeId;
    if (typeof figureId === 'string') {
        const removed = api.content.delete({ nodeId: figureId });
        // A write never leaves its parent without the content its type requires.
        if (removed.status === 'rejected' && removed.code === 'invalid') {
            api.content.replace({ nodeId: figureId }, [{ type: 'paragraph' }]);
        }
    }
    api.focus();
};

/** A drag's width as a whole percent of the content width, within the stored bounds. */
const percentOf = (pixels: number, total: number) =>
    Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round((pixels / total) * 100)));

const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

interface Drag {
    readonly startX: number;
    readonly startY: number;
    readonly startWidth: number;
    readonly total: number;
    /** -1 where the inline end is on the left. */
    readonly direction: number;
    /** The session generation the drag started in; a replacement since drops the drag. */
    readonly generation: number | undefined;
    /** Whether the pointer moved past the slop horizontally, so the drag resizes. */
    resizing: boolean;
    readonly stop: () => void;
}

/**
 * A resize drag from the frame's inline-end handle: once the pointer moves past the slop more across than down, the
 * frame shows the dragged width, and the drag's end runs `image.size.set` once, one undo step. A vertical move leaves
 * the page to scroll, and Escape during the drag, or a replaced document, restores the old width and runs nothing.
 */
const useResize = (
    frameRef: RefObject<HTMLSpanElement>,
    api: EditorApi | undefined,
    commit: (displayWidth: number) => void,
) => {
    const [shown, setShown] = useState<number>();
    const dragRef = useRef<Drag | null>(null);
    const shownRef = useRef<number | undefined>(undefined);
    const show = (width: number | undefined) => {
        shownRef.current = width;
        setShown(width);
    };
    const end = () => {
        dragRef.current?.stop();
        dragRef.current = null;
    };
    useEffect(() => end, []);
    const onPointerDown = (event: PointerEvent<HTMLSpanElement>) => {
        const frame = frameRef.current;
        if (frame === null) {
            return;
        }
        const figure = frame.closest('figure') ?? frame.parentElement;
        if (figure === null || figure.clientWidth <= 0) {
            return;
        }
        // A touch may still scroll, which its `touch-action` leaves to the browser; a mouse drag never selects text.
        if (event.pointerType === 'mouse') {
            event.preventDefault();
        }
        const handle = event.currentTarget;
        handle.setPointerCapture?.(event.pointerId);
        const document = frame.ownerDocument;
        // The surface holds focus, so its capture phase sees Escape before the chrome's own keys; no document listener.
        const surface = frame.closest('[data-rte-surface]') ?? frame;
        const onKey = (key: KeyboardEvent) => {
            if (key.key !== 'Escape') {
                return;
            }
            key.preventDefault();
            key.stopPropagation();
            end();
            show(undefined);
        };
        surface.addEventListener('keydown', onKey as EventListener, true);
        let direction = 1;
        if (document.defaultView?.getComputedStyle(frame).direction === 'rtl') {
            direction = -1;
        }
        dragRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            startWidth: frame.getBoundingClientRect().width,
            total: figure.clientWidth,
            direction,
            generation: api?.generation(),
            resizing: false,
            stop: () => {
                surface.removeEventListener('keydown', onKey as EventListener, true);
                if (handle.hasPointerCapture?.(event.pointerId) === true) {
                    handle.releasePointerCapture(event.pointerId);
                }
            },
        };
    };
    const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
        const drag = dragRef.current;
        if (drag === null) {
            return;
        }
        const across = Math.abs(event.clientX - drag.startX);
        const down = Math.abs(event.clientY - drag.startY);
        if (!drag.resizing) {
            if (down > SLOP && down >= across) {
                end();
                return;
            }
            if (across <= SLOP) {
                return;
            }
            drag.resizing = true;
        }
        show(percentOf(drag.startWidth + (event.clientX - drag.startX) * drag.direction, drag.total));
    };
    const onPointerUp = () => {
        const drag = dragRef.current;
        let dragged: number | undefined;
        if (drag !== null && drag.resizing && drag.generation === api?.generation()) {
            dragged = shownRef.current;
        }
        end();
        if (dragged !== undefined) {
            commit(dragged);
        }
        show(undefined);
    };
    const onPointerCancel = () => {
        end();
        show(undefined);
    };
    return { shown, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel } };
};

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
    readonly 'image.replace': { readonly nodeId: string };
    readonly 'image.size.set': { readonly displayWidth: number | null };
    readonly 'image.align.set': { readonly align: (typeof SIDES)[number] };
    readonly 'image.width.edit': undefined;
};

/**
 * The image as the author edits it, with the `alt` the reader writes, its placeholder when it cannot show, and its
 * chrome: alternative text, a visible Add alternative text while it is missing, size presets and a numeric width
 * beside a resize handle, alignment, Replace, and Pause for an image that may animate, paused at first under reduced
 * motion. After a replacement this session, it asks the author to review the alternative text.
 */
const ImageChrome = () => {
    const { attrs, nodeId, selected, context, execute, select } = useRichTextNodeView<ImageCommands>();
    const api = useEditorApi();
    // It keeps its identity when a locale change gives a new API.
    const announce = api?.announce;
    const { t } = context;
    const shown = useMemo(() => imageOutput(attrs, context), [attrs, context]);
    const src = shown.kind === 'image' ? shown.src : undefined;
    const [failed, setFailed] = useState<string>();
    // Whether the image at `src` may animate, once the check for that `src` answered.
    const [animation, setAnimation] = useState<{ readonly src: string; readonly may: boolean }>();
    // The author's own Pause or Play, for one `src` only: a new image starts as reduced motion has it.
    const [played, setPlayed] = useState<{ readonly src: string; readonly paused: boolean }>();
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
    const heardRef = useRef<{ readonly heard: string; readonly slot: boolean } | undefined>(undefined);
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
    if (nodeId === null) {
        return null;
    }
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
    let content;
    if (status !== undefined) {
        content = (
            <UploadSlot
                status={status}
                width={sizeOf(attrs.width)}
                height={sizeOf(attrs.height)}
                t={t}
                onMouseDown={selectImage}
            />
        );
    } else if (unfinished) {
        content = (
            // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- a press selects the node as on any atom; the keyboard selects it with the arrows.
            <span className={styles.placeholder} onMouseDown={selectImage}>
                {t('RichTextEditor_imageUnfinished')}
            </span>
        );
    } else if (shown.kind === 'image' && !unavailable) {
        let width = shown.cssWidth;
        if (resize.shown !== undefined) {
            width = `${resize.shown}%`;
        }
        content = (
            <ContentImage
                src={shown.src}
                alt={altOf(attrs)}
                width={shown.width}
                height={shown.height}
                shownWidth={width}
                // Under reduced motion the still shows while the check runs, so nothing moves before it answers.
                paused={paused && (animated || !decided)}
                frameRef={frameRef}
                onFailed={() => setFailed(shown.src)}
                onMouseDown={selectImage}
            >
                <span
                    className={styles.handle}
                    aria-hidden="true"
                    draggable={false}
                    data-rte-drag={SET_SIZE}
                    {...resize.handlers}
                />
            </ContentImage>
        );
    } else {
        content = (
            <ImageUnavailable
                unavailable={unavailableOf(attrs, context)}
                className={styles.placeholder}
                onMouseDown={selectImage}
            />
        );
    }
    return (
        <div ref={barRef} className={styles.root} data-rte-image="">
            {content}
            {review && (
                <p id={reviewId} className={styles.review}>
                    {t('RichTextEditor_imageAltReviewPrompt')}
                </p>
            )}
            <div className={styles.controls}>
                <NodeChromeToolbar aria-label={t('RichTextEditor_image')}>
                    {status !== undefined && (
                        <UploadControls
                            nodeId={nodeId}
                            status={status}
                            t={t}
                            onRemove={() => removeFigure(api, nodeId)}
                        />
                    )}
                    {unfinished && status === undefined && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageChooseAgain')}
                            onClick={() => execute('image.replace', { nodeId })}
                        />
                    )}
                    <NodeChromeButton
                        label={altText}
                        {...(review ? { describedBy: reviewId } : {})}
                        onClick={() => api?.overlays.open(AltTextDialog, { nodeId, strings: altTextStrings(t) })}
                    />
                    {review && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageAltKeep')}
                            onClick={() => api?.nodeState.set(nodeId, REPLACED_ASSET, null)}
                        />
                    )}
                    <NodeChromeMenu
                        label={t('RichTextEditor_imageSize', { size: sizeText })}
                        text={sizeText}
                        command={SET_SIZE}
                        onCloseAutoFocus={(event) => {
                            if (pendingRef.current === undefined) {
                                return;
                            }
                            // The width dialog opens once the menu returned focus, so its field keeps it.
                            pendingRef.current = undefined;
                            event.preventDefault();
                            openWidth();
                        }}
                    >
                        {sizeOptions(t, displayWidth).map((option) => (
                            <OptionItem
                                key={option.key}
                                checked={option.checked}
                                onSelect={() => {
                                    if (option.command === EDIT_WIDTH) {
                                        pendingRef.current = 'width';
                                        return;
                                    }
                                    runOption(option);
                                }}
                            >
                                {option.label}
                            </OptionItem>
                        ))}
                    </NodeChromeMenu>
                    <NodeChromeMenu
                        label={t('RichTextEditor_imageAlign', { side: t(SIDE_KEYS[side]) })}
                        text={t(SIDE_KEYS[side])}
                    >
                        {alignOptions(t, side).map((option) => (
                            <OptionItem key={option.key} checked={option.checked} onSelect={() => runOption(option)}>
                                {option.label}
                            </OptionItem>
                        ))}
                    </NodeChromeMenu>
                    {!unfinished && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageReplace')}
                            icon={<IconArrowSwap size={16} aria-hidden />}
                            onClick={() => execute('image.replace', { nodeId })}
                        />
                    )}
                    {animated && shown.kind === 'image' && (
                        <NodeChromeButton
                            label={paused ? t('RichTextEditor_imagePlay') : t('RichTextEditor_imagePause')}
                            icon={paused ? <IconPlay size={16} aria-hidden /> : <IconPause size={16} aria-hidden />}
                            onClick={() => setPlayed({ src: shown.src, paused: !paused })}
                        />
                    )}
                </NodeChromeToolbar>
            </div>
        </div>
    );
};

/** The chrome of `asset_image`, which the feature's editor part attaches. */
export const imageView: NodeViewDeclaration = { node: 'asset_image', component: ImageChrome };
