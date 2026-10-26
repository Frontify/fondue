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

import { drawStill } from '../helpers/drawStill';
import styles from '../styles/image.module.scss';

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
    src: string;
    alt: string | undefined;
    width: number | undefined;
    height: number | undefined;
    /** A CSS width of the content width, or `undefined` at natural size. */
    shownWidth: string | undefined;
    paused: boolean;
    frameRef: RefObject<HTMLSpanElement>;
    onFailed: () => void;
    /** Selects the image, since node chrome keeps its own mouse events from the editor. */
    onMouseDown: (event: MouseEvent) => void;
    /** The resize handle, drawn over the frame's edge. */
    children?: ReactNode;
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

ContentImage.displayName = 'ContentImage';
