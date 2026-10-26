/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type NodeViewDeclaration } from '#/bridge/define';

import { ImageBody, ImageToolbar } from './ChromeParts';
import styles from './styles/image.module.scss';
import { useImageChromeState } from './useImageChromeState';

/**
 * The image as the author edits it, with the `alt` the reader writes, its placeholder when it cannot show, and its
 * chrome: alternative text, a visible Add alternative text while it is missing, size presets and a numeric width
 * beside a resize handle, alignment, Replace, and Pause for an image that may animate, paused at first under reduced
 * motion. After a replacement this session, it asks the author to review the alternative text.
 */
const ImageChrome = () => {
    const chrome = useImageChromeState();
    const { nodeId, t, review, reviewId, barRef } = chrome;
    if (nodeId === null) {
        return null;
    }

    return (
        <div ref={barRef} className={styles.root} data-rte-image="">
            <ImageBody chrome={chrome} />
            {review && (
                <p id={reviewId} className={styles.review}>
                    {t('RichTextEditor_imageAltReviewPrompt')}
                </p>
            )}
            <div className={styles.controls}>
                <ImageToolbar chrome={chrome} nodeId={nodeId} />
            </div>
        </div>
    );
};

/** The chrome of `asset_image`, which the feature's editor part attaches. */
export const imageView: NodeViewDeclaration = { node: 'asset_image', component: ImageChrome };
