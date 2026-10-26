/* (c) Copyright Frontify Ltd., all rights reserved. */

import { altOf, unavailableOf } from '#/model';

import { SET_SIZE } from '../helpers/dialogStrings';
import { type ImageChromeState } from '../hooks/useImageChromeState';
import { ImageUnavailable } from '../reader';
import styles from '../styles/image.module.scss';
import { ContentImage } from './image';
import { UploadSlot } from '../helpers/uploadParts';

/** A stored intrinsic size, or `null` where the image has none. */
const sizeOf = (value: unknown) => (typeof value === 'number' ? value : null);

/** The image, its upload slot or its placeholder, whichever the node shows. */
export const ImageBody = ({ chrome }: { chrome: ImageChromeState }) => {
    const { attrs, context, t, shown, unavailable, unfinished, status, resize, decided, animated, paused } = chrome;
    const { frameRef, setFailed, selectImage } = chrome;
    if (status !== undefined) {
        return (
            <UploadSlot
                status={status}
                width={sizeOf(attrs.width)}
                height={sizeOf(attrs.height)}
                t={t}
                onMouseDown={selectImage}
            />
        );
    }

    if (unfinished) {
        return (
            // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- a press selects the node as on any atom; the keyboard selects it with the arrows.
            <span className={styles.placeholder} onMouseDown={selectImage}>
                {t('RichTextEditor_imageUnfinished')}
            </span>
        );
    }

    if (shown.kind === 'image' && !unavailable) {
        let width = shown.cssWidth;
        if (resize.shown !== undefined) {
            width = `${resize.shown}%`;
        }

        return (
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
    }

    return (
        <ImageUnavailable
            unavailable={unavailableOf(attrs, context)}
            className={styles.placeholder}
            onMouseDown={selectImage}
        />
    );
};
