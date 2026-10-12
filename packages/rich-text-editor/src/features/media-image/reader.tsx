/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent, type SyntheticEvent } from 'react';

import { figureAlign, imageOutput, type Unavailable } from '#/model/assets';
import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

/** The figure on its side as `text-align`, with the direction of its placeholder text left to the browser. */
const Figure = ({ attrs, children }: ReaderNodeProps) => (
    <figure dir="auto" style={{ textAlign: figureAlign(attrs) }}>
        {children}
    </figure>
);

/**
 * The "Image unavailable" placeholder with the label isolated for bidirectional text, as the editor, the reader and
 * `toHTML` show it; `hidden` beside an image until that image fails to load.
 */
export const ImageUnavailable = ({
    unavailable: { message, label },
    hidden = false,
    className,
    onMouseDown,
}: {
    readonly unavailable: Unavailable;
    readonly hidden?: boolean;
    readonly className?: string | undefined;
    readonly onMouseDown?: (event: MouseEvent) => void;
}) => (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- in the editor a press selects the node as on any atom; the keyboard selects it with the arrows.
    <span className={className} data-rte-image-unavailable="" hidden={hidden} onMouseDown={onMouseDown}>
        {label === '' ? message : `${message} `}
        {label !== '' && <bdi>{label}</bdi>}
    </span>
);

// The figure names the URL that failed, so the content stylesheet hides that image and shows the placeholder.
const FAILED = 'data-rte-image-failed';
const markFailed = (event: SyntheticEvent<HTMLImageElement>) =>
    event.currentTarget.closest('figure')?.setAttribute(FAILED, event.currentTarget.getAttribute('src') ?? '');
const clearFailed = (event: SyntheticEvent<HTMLImageElement>) =>
    event.currentTarget.closest('figure')?.removeAttribute(FAILED);
/** Drops the flag of a URL that failed once the image shows another one, since a new URL may load. */
const keepFailedFor = (image: HTMLImageElement | null) => {
    const figure = image?.closest('figure');
    if (
        image !== null &&
        figure !== null &&
        figure !== undefined &&
        figure.getAttribute(FAILED) !== image.getAttribute('src')
    ) {
        figure.removeAttribute(FAILED);
    }
};

/**
 * The image from `resolveAssetUrl` at render time with the `alt` its intent gives, none while it is missing, beside
 * its hidden placeholder, which shows when the image fails to load; or the placeholder alone when the image has no
 * URL. No asset ID reaches the markup.
 */
const Image = ({ attrs, context }: ReaderNodeProps) => {
    const shown = imageOutput(attrs, context);
    if (shown.kind === 'unavailable') {
        return <ImageUnavailable unavailable={shown} />;
    }
    let style: { readonly width: string } | undefined;
    if (shown.cssWidth !== undefined) {
        style = { width: shown.cssWidth };
    }
    return (
        <>
            <img
                // A new callback each render runs it again, so a rerender with another URL drops an old flag.
                ref={(image) => keepFailedFor(image)}
                src={shown.src}
                alt={shown.alt}
                width={shown.width}
                height={shown.height}
                style={style}
                onError={markFailed}
                onLoad={clearFailed}
            />
            <ImageUnavailable unavailable={shown.unavailable} hidden />
        </>
    );
};

export const imageReader: ReaderRenderers = { figure: Figure, asset_image: Image };
