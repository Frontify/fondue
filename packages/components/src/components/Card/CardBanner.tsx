/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/card.module.scss';

export type CardBannerSize = 'small' | 'large';
export type CardBannerFit = 'cover' | 'contain';
/**
 * Inner padding applied to a banner image, giving the preview breathing room
 * inside the banner (e.g. logo or icon libraries).
 *
 * - `none` – no padding (default)
 * - `small` – 12px
 * - `medium` – 24px
 * - `large` – 32px
 */
export type CardBannerImagePadding = 'none' | 'small' | 'medium' | 'large';

/**
 * Background tone of the banner.
 *
 * - `dim` – pins `surface-dim` (the resting default) and opts out of the
 *   implicit hover/active background shift that otherwise kicks in when a
 *   `Card.BannerIcon` is nested.
 * - `inverted` – near-black background (`primary-default`) with a white icon,
 *   for states like a folder drop target.
 *
 * When omitted, the banner keeps its legacy behavior: `surface-dim` at rest,
 * shifting to hover/active surfaces on interaction when a `Card.BannerIcon` is present.
 */
export type CardBannerTone = 'dim' | 'inverted';

export type CardBannerProps = {
    'data-test-id'?: string;
    /**
     * The height variant of the banner.
     * @default 'large'
     */
    size?: CardBannerSize;
    /**
     * Pins the banner background, overriding the implicit hover/active shift
     * applied when a `Card.BannerIcon` is nested. Leave unset to keep the
     * default behavior.
     */
    tone?: CardBannerTone;
    children?: ReactNode;
};

export const CardBanner = (
    { 'data-test-id': dataTestId = 'fondue-card-banner', size = 'large', tone, children }: CardBannerProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.banner} data-test-id={dataTestId} data-size={size} data-tone={tone}>
            {children}
            <div
                className={styles.selectionIndicator}
                data-test-id="fondue-card-selection-indicator"
                aria-hidden="true"
            >
                <IconCheckMark size={16} />
            </div>
        </div>
    );
};
CardBanner.displayName = 'Card.Banner';

export type CardBannerImageProps = {
    'data-test-id'?: string;
    /**
     * The image source URL.
     */
    src: string;
    /**
     * Alternative text for the image.
     * @default ''
     */
    alt?: string;
    /**
     * How the image should fit within its container.
     * @default 'cover'
     */
    fit?: CardBannerFit;
    /**
     * Inner padding between the image and the banner edges, giving the preview
     * breathing room (e.g. logo or icon libraries). Pairs best with `fit="contain"`,
     * which lets the padded image scale down without cropping.
     * @default 'none'
     */
    padding?: CardBannerImagePadding;
};

export const CardBannerImage = (
    {
        'data-test-id': dataTestId = 'fondue-card-banner-image',
        src,
        alt = '',
        fit = 'cover',
        padding = 'none',
    }: CardBannerImageProps,
    ref: ForwardedRef<HTMLImageElement>,
) => {
    return (
        <img
            ref={ref}
            className={styles.bannerImage}
            data-test-id={dataTestId}
            data-fit={fit}
            data-padding={padding}
            src={src}
            alt={alt}
        />
    );
};
CardBannerImage.displayName = 'Card.BannerImage';

export type CardBannerIconVariant = 'default' | 'primary' | 'warning' | 'error' | 'success';

export type CardBannerIconProps = {
    'data-test-id'?: string;
    /**
     * The color variant of the icon.
     * @default 'default'
     */
    variant?: CardBannerIconVariant;
    children?: ReactNode;
};

export const CardBannerIcon = (
    { 'data-test-id': dataTestId = 'fondue-card-banner-icon', variant = 'default', children }: CardBannerIconProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            ref={ref}
            className={styles.bannerIcon}
            data-test-id={dataTestId}
            data-variant={variant}
            aria-hidden="true"
        >
            {children}
        </div>
    );
};
CardBannerIcon.displayName = 'Card.BannerIcon';
