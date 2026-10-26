/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CSSProperties,
    type MouseEvent,
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useRef,
} from 'react';

import styles from './styles/image.module.scss';

// The longest side of a still in device pixels, whatever the image's own size.
const MAX_STILL = 4096;

/**
 * Draws the image's current frame on `canvas`, a still that covers it while its animation is paused, at the size the
 * image shows, in device pixels, at most `MAX_STILL` on either side.
 */
export const drawStill = (image: HTMLImageElement | null, canvas: HTMLCanvasElement | null) => {
    if (image === null || canvas === null || !image.complete || image.naturalWidth === 0) {
        return;
    }

    const { width, height } = image.getBoundingClientRect();
    const view = image.ownerDocument.defaultView;
    let ratio = 1;
    if (view !== null) {
        ratio = view.devicePixelRatio;
    }

    canvas.width = Math.max(1, Math.min(MAX_STILL, Math.round(width * ratio)));
    canvas.height = Math.max(1, Math.min(MAX_STILL, Math.round(height * ratio)));
    canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
};

/**
 * The image as the author edits it, at its stored width or the width a resize drag shows: the `img` keeps its `alt`
 * and intrinsic size, and while `paused` a still of its current frame covers it, hidden from assistive technology.
 */
export const ContentImage = ({
    src,
    alt,
    width,
    height,
    shownWidth,
    paused,
    frameRef,
    onFailed,
    onMouseDown,
    children,
}: {
    readonly src: string;
    readonly alt: string | undefined;
    readonly width: number | undefined;
    readonly height: number | undefined;
    /** A CSS width of the content width, or `undefined` at natural size. */
    readonly shownWidth: string | undefined;
    readonly paused: boolean;
    readonly frameRef: RefObject<HTMLSpanElement>;
    readonly onFailed: () => void;
    /** Selects the image, since node chrome keeps its own mouse events from the editor. */
    readonly onMouseDown: (event: MouseEvent) => void;
    /** The resize handle, drawn over the frame's edge. */
    readonly children?: ReactNode;
}) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const draw = useCallback(() => drawStill(imageRef.current, canvasRef.current), []);
    useEffect(() => {
        if (paused) {
            draw();
        }
    }, [paused, draw, src]);
    let style: CSSProperties | undefined;
    if (shownWidth !== undefined) {
        style = { inlineSize: shownWidth };
    }

    return (
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- a press selects the node as on any atom; the keyboard selects it with the arrows.
        <span ref={frameRef} className={styles.frame} style={style} onMouseDown={onMouseDown}>
            <img
                ref={imageRef}
                className={styles.picture}
                src={src}
                alt={alt}
                width={width}
                height={height}
                draggable={false}
                onLoad={draw}
                onError={onFailed}
            />
            {paused && <canvas ref={canvasRef} className={styles.still} aria-hidden="true" />}
            {children}
        </span>
    );
};
