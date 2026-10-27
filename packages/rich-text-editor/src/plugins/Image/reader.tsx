/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type SyntheticEvent } from 'react';

import { figureAlign, imageOutput } from '#/model';
import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

import { ImageUnavailable } from './components/ImageUnavailable';

/** The figure on its side as `text-align`, with the direction of its placeholder text left to the browser. */
const Figure = ({ attrs, children }: ReaderNodeProps) => (
    <figure dir="auto" style={{ textAlign: figureAlign(attrs) }}>
        {children}
    </figure>
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
    if (image === null || figure === null || figure === undefined) {
        return;
    }

    if (figure.getAttribute(FAILED) !== image.getAttribute('src')) {
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

    let style: { width: string } | undefined;
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

/** The renderers of the `figure` and its `asset_image`. */
export const imageReader: ReaderRenderers = { figure: Figure, asset_image: Image };

/** The feature these renderers belong to. */
export const readerFeature = 'media.image';
