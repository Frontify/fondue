/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { IconArrowSwap, IconPause, IconPlay } from '@frontify/fondue-icons';
import {
    type MouseEvent,
    type PointerEvent,
    type RefObject,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';

import { AnnouncerContext } from '#/bridge/announcer';
import { NodeChromeMenu } from '#/bridge/chrome-toolbar';
import { NodeChromeButton, NodeChromeToolbar, type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { type JsonObject } from '#/model';
import { altOf, figureAlign, imageOutput, unavailableOf } from '#/model/assets';
import { altReviewOf, withAltReview } from '#/runtime/alt-review';
import { positionOf } from '#/runtime/positions';
import { type EditorRuntime } from '#/runtime/runtime';
import { AltTextDialog, altTextStrings } from '#/ui/media/alt-text-dialog';
import { MAX_WIDTH, MIN_WIDTH, SET_SIZE, WidthDialog } from '#/ui/media/width-dialog';

import { mayAnimate } from './animation';
import { ContentImage } from './image';
import { ImageUnavailable } from './reader';
import styles from './styles/image.module.scss';

const PRESETS = [25, 50, 75, 100] as const;
const SIDES = ['left', 'center', 'right'] as const;
const SIDE_KEYS = {
    left: 'RichTextEditor_imageAlignLeft',
    center: 'RichTextEditor_imageAlignCenter',
    right: 'RichTextEditor_imageAlignRight',
} as const;
// How far a pointer moves before a press on the handle counts as a horizontal resize, or as a scroll.
const SLOP = 8;

/** The side of the figure that holds the image `nodeId`, which its chrome's alignment menu shows. */
const sideOf = (runtime: EditorRuntime | undefined, nodeId: string | null) => {
    const doc = runtime?.state.doc;
    const pos = doc === undefined || nodeId === null ? undefined : positionOf(doc, nodeId);
    if (doc === undefined || pos === undefined) {
        return 'center';
    }
    return figureAlign(doc.resolve(pos).parent.attrs as JsonObject);
};

/** A drag's width as a whole percent of the content width, within the stored bounds. */
const percentOf = (pixels: number, total: number) =>
    Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round((pixels / total) * 100)));

const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

const generationOf = (runtime: EditorRuntime | undefined) => runtime?.handle.getSnapshot().stamp.generation;

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
    runtime: EditorRuntime | undefined,
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
        const figure = frame?.closest('figure') ?? frame?.parentElement;
        if (frame === null || figure === null || figure === undefined || figure.clientWidth <= 0) {
            return;
        }
        // A touch may still scroll, which its `touch-action` leaves to the browser; a mouse drag never selects text.
        if (event.pointerType === 'mouse') {
            event.preventDefault();
        }
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
            startY: event.clientY,
            startWidth: frame.getBoundingClientRect().width,
            total: figure.clientWidth,
            direction,
            generation: generationOf(runtime),
            resizing: false,
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
        if (drag !== null && drag.resizing && drag.generation === generationOf(runtime)) {
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

/** What a screen reader hears as the image becomes node-selected, since an image with an empty `alt` says nothing. */
const spokenOf = (attrs: JsonObject, context: Parameters<typeof imageOutput>[1], unavailable: boolean) => {
    const { t } = context;
    if (attrs.assetId === null) {
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

/**
 * The image as the author edits it, with the `alt` the reader writes, its placeholder when it cannot show, and its
 * chrome: alternative text, a visible Add alternative text while it is missing, size presets and a numeric width
 * beside a resize handle, alignment, Replace, and Pause for an image that may animate, paused at first under reduced
 * motion. After a replacement this session, it asks the author to review the alternative text.
 */
const ImageChrome = () => {
    const { attrs, nodeId, selected, context, execute, select } = useRichTextNodeView();
    const runtime = useContext(SessionContext);
    const announcer = useContext(AnnouncerContext);
    const { t } = context;
    const shown = useMemo(() => imageOutput(attrs, context), [attrs, context]);
    const src = shown.kind === 'image' ? shown.src : undefined;
    const [failed, setFailed] = useState<string>();
    // Whether the image at `src` may animate, once the check for that `src` answered.
    const [animation, setAnimation] = useState<{ readonly src: string; readonly may: boolean }>();
    // The author's own Pause or Play, for one `src` only: a new image starts as reduced motion has it.
    const [played, setPlayed] = useState<{ readonly src: string; readonly paused: boolean }>();
    const [dialog, setDialog] = useState<{ readonly kind: 'alt' | 'width'; readonly opener: Element | null }>();
    const pendingRef = useRef<'width' | undefined>(undefined);
    const barRef = useRef<HTMLDivElement>(null);
    const reviewId = useId();
    const frameRef = useRef<HTMLSpanElement>(null);
    const side = useSessionValue((session) => sideOf(session, nodeId), Object.is);
    const asked = useSessionValue(
        (session) => (session === undefined || nodeId === null ? undefined : altReviewOf(session.state, nodeId)),
        Object.is,
    );
    // An undone replacement gives back the old asset, which asks nothing.
    const review = asked !== undefined && asked === attrs.assetId;
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
    const spoken = spokenOf(attrs, context, unavailable);
    // A selected image is spoken as it becomes selected, and again when what it says changes, as when it fails to load.
    useEffect(() => {
        if (selected) {
            announcer?.announce(spoken);
        }
    }, [selected, spoken, announcer]);
    const altLabel = review ? t('RichTextEditor_imageAltReview') : undefined;
    // A new asset asks for a review once: focus moves to its action, which the prompt describes.
    useEffect(() => {
        if (altLabel === undefined) {
            return;
        }
        barRef.current?.querySelector<HTMLElement>(`button[aria-label="${CSS.escape(altLabel)}"]`)?.focus();
    }, [altLabel]);
    const displayWidth = typeof attrs.displayWidth === 'number' ? attrs.displayWidth : null;
    const resize = useResize(frameRef, runtime, (width) => {
        if (width !== displayWidth) {
            execute(SET_SIZE, { displayWidth: width });
        }
    });
    if (nodeId === null) {
        return null;
    }
    const open = (
        kind: 'alt' | 'width',
        opener: Element | null = barRef.current?.ownerDocument.activeElement ?? null,
    ) => setDialog({ kind, opener });
    const missing = attrs.altIntent !== 'meaningful' && attrs.altIntent !== 'decorative';
    let altText = t('RichTextEditor_imageAltEdit');
    if (review) {
        altText = t('RichTextEditor_imageAltReview');
    } else if (missing) {
        altText = t('RichTextEditor_imageAltAdd');
    }
    let sizeText = t('RichTextEditor_imageSizeOriginal');
    if (displayWidth !== null) {
        sizeText = t('RichTextEditor_imageSizePercent', { percent: displayWidth });
    }
    const unfinished = attrs.assetId === null;
    // The chrome keeps mouse events from the editor, so a press on the image selects it here, as on any atom, and
    // keeps the browser from putting the caret in a neighbouring block; on a selected image it starts the node's drag.
    const selectImage = (event: MouseEvent) => {
        if (selected && event.button === 0) {
            return;
        }
        event.preventDefault();
        select();
        if (runtime?.view?.hasFocus() === false) {
            runtime.view.focus();
        }
    };
    let content;
    if (unfinished) {
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
    const close = () => setDialog(undefined);
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
                    {unfinished && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageChooseAgain')}
                            onClick={() => execute('image.replace', { nodeId })}
                        />
                    )}
                    <NodeChromeButton
                        label={altText}
                        {...(review ? { describedBy: reviewId } : {})}
                        onClick={() => open('alt')}
                    />
                    {review && (
                        <NodeChromeButton
                            label={t('RichTextEditor_imageAltKeep')}
                            onClick={() => {
                                if (runtime?.view !== undefined) {
                                    runtime.view.dispatch(withAltReview(runtime.state.tr, nodeId, null));
                                }
                            }}
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
                            open('width', barRef.current?.querySelector(`[data-rte-command="${SET_SIZE}"]`) ?? null);
                        }}
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
                            onSelect={() => {
                                pendingRef.current = 'width';
                            }}
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
            {dialog?.kind === 'alt' && (
                <AltTextDialog nodeId={nodeId} opener={dialog.opener} strings={altTextStrings(t)} onClose={close} />
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
