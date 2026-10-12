/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type PointerEvent, type RefObject, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { NodeChromeMenu } from '#/bridge/chrome-toolbar';
import { NodeChromeButton, NodeChromeToolbar, type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { UploadControls, UploadSlot, useUploadStatus } from '#/features/media-upload/view';
import { type JsonObject } from '#/model';
import { altOf, figureAlign, imageOutput } from '#/model/assets';
import { positionOf } from '#/runtime/positions';
import { type EditorRuntime } from '#/runtime/runtime';
import { AltTextDialog, altTextStrings } from '#/ui/media/alt-text-dialog';
import { MAX_WIDTH, MIN_WIDTH, SET_SIZE, WidthDialog } from '#/ui/media/width-dialog';

import { mayAnimate } from './animation';
import { ContentImage } from './image';
import styles from './styles/image.module.scss';

const PRESETS = [25, 50, 75, 100] as const;
const SIDES = ['left', 'center', 'right'] as const;
const SIDE_KEYS = {
    left: 'RichTextEditor_imageAlignLeft',
    center: 'RichTextEditor_imageAlignCenter',
    right: 'RichTextEditor_imageAlignRight',
} as const;

/** The side of the figure that holds the image `nodeId`, which its chrome's alignment menu shows. */
const sideOf = (runtime: EditorRuntime | undefined, nodeId: string | null) => {
    const doc = runtime?.state.doc;
    const pos = doc === undefined || nodeId === null ? undefined : positionOf(doc, nodeId);
    if (doc === undefined || pos === undefined) {
        return 'center';
    }
    return figureAlign(doc.resolve(pos).parent.attrs as JsonObject);
};

/** A stored intrinsic size, or `null` where the image has none. */
const sizeOf = (value: unknown) => (typeof value === 'number' ? value : null);

/** Removes the figure that holds the image `nodeId`, as one undo step. */
const removeFigure = (runtime: EditorRuntime | undefined, nodeId: string) => {
    const figureAt = () => {
        const doc = runtime?.state.doc;
        const pos = doc === undefined ? undefined : positionOf(doc, nodeId);
        if (doc === undefined || pos === undefined) {
            return undefined;
        }
        const $pos = doc.resolve(pos);
        return $pos.depth > 0 ? $pos.before() : undefined;
    };
    runtime?.nodeActions(figureAt).remove();
    runtime?.view?.focus();
};

/** A drag's width as a whole percent of the content width, within the stored bounds. */
const percentOf = (pixels: number, total: number) =>
    Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round((pixels / total) * 100)));

interface Drag {
    readonly startX: number;
    readonly startWidth: number;
    readonly total: number;
    /** -1 where the inline end is on the left. */
    readonly direction: number;
    readonly stop: () => void;
}

/**
 * A resize drag from the frame's inline-end handle: the frame shows the dragged width as it moves, and the drag's end
 * runs `image.size.set` once, one undo step. Escape during the drag restores the old width and runs nothing.
 */
const useResize = (frameRef: RefObject<HTMLSpanElement>, commit: (displayWidth: number) => void) => {
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
        const figure = frame?.closest('figure') ?? frame?.parentElement;
        if (frame === null || figure === null || figure === undefined || figure.clientWidth <= 0) {
            return;
        }
        // The node's own drag and the browser's text selection never start from the handle.
        event.preventDefault();
        const handle = event.currentTarget;
        handle.setPointerCapture?.(event.pointerId);
        const document = frame.ownerDocument;
        // Escape reaches the surface, which holds focus, so it is caught before the chrome's own keys read it.
        const onKey = (key: KeyboardEvent) => {
            if (key.key !== 'Escape') {
                return;
            }
            key.preventDefault();
            key.stopPropagation();
            end();
            show(undefined);
        };
        document.addEventListener('keydown', onKey, true);
        let direction = 1;
        if (document.defaultView?.getComputedStyle(frame).direction === 'rtl') {
            direction = -1;
        }
        dragRef.current = {
            startX: event.clientX,
            startWidth: frame.getBoundingClientRect().width,
            total: figure.clientWidth,
            direction,
            stop: () => {
                document.removeEventListener('keydown', onKey, true);
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
        show(percentOf(drag.startWidth + (event.clientX - drag.startX) * drag.direction, drag.total));
    };
    const onPointerUp = () => {
        const dragged = dragRef.current !== null ? shownRef.current : undefined;
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
 * The image as the author edits it, with the `alt` the reader writes, its placeholder when it cannot show, and its
 * chrome: alternative text, a visible Add alternative text while it is missing, size presets and a numeric width
 * beside a resize handle, alignment, Replace, and Pause for an image that may animate, paused at first under reduced
 * motion. After a replacement this session, it asks the author to review the alternative text.
 */
const ImageChrome = () => {
    const { attrs, nodeId, context, execute, select } = useRichTextNodeView();
    const runtime = useContext(SessionContext);
    const { t } = context;
    const shown = useMemo(() => imageOutput(attrs, context), [attrs, context]);
    const src = shown.kind === 'image' ? shown.src : undefined;
    const [failed, setFailed] = useState<string>();
    // Whether the image at `src` may animate, once the check for that `src` answered.
    const [animation, setAnimation] = useState<{ readonly src: string; readonly may: boolean }>();
    const [paused, setPaused] = useState(
        () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
    );
    const [dialog, setDialog] = useState<{ readonly kind: 'alt' | 'width'; readonly opener: Element | null }>();
    // The session's review list lives outside React, so a change to it rerenders the chrome by hand.
    const [, rerender] = useReducer((count: number) => count + 1, 0);
    const barRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLSpanElement>(null);
    const side = useSessionValue((session) => sideOf(session, nodeId), Object.is);
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
    const animated = animation !== undefined && animation.src === src && animation.may;
    const displayWidth = typeof attrs.displayWidth === 'number' ? attrs.displayWidth : null;
    const resize = useResize(frameRef, (width) => {
        if (width !== displayWidth) {
            execute(SET_SIZE, { displayWidth: width });
        }
    });
    // The upload chrome follows the session's upload of this slot, which no reload keeps.
    const upload = useUploadStatus(nodeId ?? '');
    if (nodeId === null) {
        return null;
    }
    const open = (
        kind: 'alt' | 'width',
        opener: Element | null = barRef.current?.ownerDocument.activeElement ?? null,
    ) => setDialog({ kind, opener });
    const missing = attrs.altIntent !== 'meaningful' && attrs.altIntent !== 'decorative';
    const review = runtime !== undefined && runtime.altReviews.get(nodeId) === attrs.assetId;
    let altLabel = t('RichTextEditor_imageAltEdit');
    if (review) {
        altLabel = t('RichTextEditor_imageAltReview');
    } else if (missing) {
        altLabel = t('RichTextEditor_imageAltAdd');
    }
    let sizeText = t('RichTextEditor_imageSizeOriginal');
    if (displayWidth !== null) {
        sizeText = t('RichTextEditor_imageSizePercent', { percent: displayWidth });
    }
    const unfinished = attrs.assetId === null;
    const status = unfinished ? upload : undefined;
    // The chrome keeps mouse events from the editor, so a press on the image selects it here, as on any atom.
    const selectImage = () => {
        select();
        if (runtime?.view?.hasFocus() === false) {
            runtime.view.focus();
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
    } else if (shown.kind === 'image' && failed !== shown.src) {
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
                paused={animated && paused}
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
        let label = '';
        if (typeof attrs.labelSnapshot === 'string') {
            label = attrs.labelSnapshot;
        }
        content = (
            // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- a press selects the node as on any atom; the keyboard selects it with the arrows.
            <span className={styles.placeholder} data-rte-image-unavailable="" onMouseDown={selectImage}>
                {label === '' ? t('RichTextEditor_imageUnavailable') : `${t('RichTextEditor_imageUnavailable')} `}
                {label !== '' && <bdi>{label}</bdi>}
            </span>
        );
    }
    const close = () => setDialog(undefined);
    return (
        <div ref={barRef} className={styles.root} data-rte-image="">
            {content}
            {review && <p className={styles.review}>{t('RichTextEditor_imageAltReviewPrompt')}</p>}
            <div className={styles.controls}>
                <NodeChromeToolbar aria-label={t('RichTextEditor_image')}>
                    {status !== undefined && (
                        <UploadControls
                            nodeId={nodeId}
                            status={status}
                            t={t}
                            onRemove={() => removeFigure(runtime, nodeId)}
                        />
                    )}
                    {unfinished && status === undefined && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageChooseAgain')}
                            onClick={() => execute('image.replace', { nodeId })}
                        />
                    )}
                    <NodeChromeButton label={altLabel} onClick={() => open('alt')} />
                    {review && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageAltKeep')}
                            onClick={() => {
                                runtime?.altReviews.delete(nodeId);
                                rerender();
                            }}
                        />
                    )}
                    <NodeChromeMenu
                        label={t('RichTextEditor_imageSize', { size: sizeText })}
                        text={sizeText}
                        command={SET_SIZE}
                    >
                        {PRESETS.map((preset) => (
                            <Dropdown.Item
                                key={preset}
                                {...{ role: 'menuitemradio', 'aria-checked': displayWidth === preset }}
                                onSelect={() => execute(SET_SIZE, { displayWidth: preset })}
                            >
                                {t('RichTextEditor_imageSizePercent', { percent: preset })}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Item
                            {...{ role: 'menuitemradio', 'aria-checked': displayWidth === null }}
                            onSelect={() => execute(SET_SIZE, { displayWidth: null })}
                        >
                            {t('RichTextEditor_imageSizeOriginal')}
                        </Dropdown.Item>
                        <Dropdown.Item
                            onSelect={() =>
                                open('width', barRef.current?.querySelector(`[data-rte-command="${SET_SIZE}"]`) ?? null)
                            }
                        >
                            {t('RichTextEditor_imageSizeCustom')}
                        </Dropdown.Item>
                    </NodeChromeMenu>
                    <NodeChromeMenu
                        label={t('RichTextEditor_imageAlign', { side: t(SIDE_KEYS[side]) })}
                        text={t(SIDE_KEYS[side])}
                    >
                        {SIDES.map((option) => (
                            <Dropdown.Item
                                key={option}
                                {...{ role: 'menuitemradio', 'aria-checked': side === option }}
                                onSelect={() => execute('image.align.set', { align: option })}
                            >
                                {t(SIDE_KEYS[option])}
                            </Dropdown.Item>
                        ))}
                    </NodeChromeMenu>
                    {!unfinished && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageReplace')}
                            onClick={() => execute('image.replace', { nodeId })}
                        />
                    )}
                    {animated && shown.kind === 'image' && (
                        <NodeChromeButton
                            label={paused ? t('RichTextEditor_imagePlay') : t('RichTextEditor_imagePause')}
                            onClick={() => setPaused((was) => !was)}
                        />
                    )}
                </NodeChromeToolbar>
            </div>
            {dialog?.kind === 'alt' && (
                <AltTextDialog
                    nodeId={nodeId}
                    opener={dialog.opener}
                    strings={altTextStrings(t)}
                    onClose={() => {
                        close();
                        rerender();
                    }}
                />
            )}
            {dialog?.kind === 'width' && (
                <WidthDialog
                    nodeId={nodeId}
                    width={displayWidth}
                    opener={dialog.opener}
                    strings={{
                        title: t('RichTextEditor_imageWidthTitle'),
                        field: t('RichTextEditor_imageWidthField'),
                        range: t('RichTextEditor_imageWidthRange', { min: MIN_WIDTH, max: MAX_WIDTH }),
                        apply: t('RichTextEditor_apply'),
                        cancel: t('RichTextEditor_cancel'),
                    }}
                    onClose={close}
                />
            )}
        </div>
    );
};

/** The chrome of `asset_image`, which `defineEditor` attaches through the shipped views. */
export const imageView: NodeViewDeclaration = { node: 'asset_image', component: ImageChrome };
