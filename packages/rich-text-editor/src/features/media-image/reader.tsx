/* (c) Copyright Frontify Ltd., all rights reserved. */

import { figureAlign, imageOutput } from '#/model/assets';
import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

/** The figure on its side as `text-align`, with the direction of its placeholder text left to the browser. */
const Figure = ({ attrs, children }: ReaderNodeProps) => (
    <figure dir="auto" style={{ textAlign: figureAlign(attrs) }}>
        {children}
    </figure>
);

/**
 * The image from `resolveAssetUrl` at render time with the `alt` its intent gives, none while it is missing, or the
 * "Image unavailable" placeholder with the label isolated for bidirectional text. No asset ID reaches the markup.
 */
const Image = ({ attrs, context }: ReaderNodeProps) => {
    const shown = imageOutput(attrs, context);
    if (shown.kind === 'unavailable') {
        return (
            <span data-rte-image-unavailable="">
                {shown.label === '' ? shown.message : `${shown.message} `}
                {shown.label !== '' && <bdi>{shown.label}</bdi>}
            </span>
        );
    }
    let style: { readonly width: string } | undefined;
    if (shown.cssWidth !== undefined) {
        style = { width: shown.cssWidth };
    }
    return <img src={shown.src} alt={shown.alt} width={shown.width} height={shown.height} style={style} />;
};

export const imageReader: ReaderRenderers = { figure: Figure, asset_image: Image };
