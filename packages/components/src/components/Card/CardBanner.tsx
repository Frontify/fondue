/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/card.module.scss';

export type CardBannerSize = 'small' | 'large';
export type CardBannerFit = 'cover' | 'contain';

export type CardBannerProps = {
    'data-test-id'?: string;
    /**
     * The height variant of the banner.
     * @default 'large'
     */
    size?: CardBannerSize;
    children?: ReactNode;
};

export const CardBanner = (
    { 'data-test-id': dataTestId = 'fondue-card-banner', size = 'large', children }: CardBannerProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.banner} data-test-id={dataTestId} data-size={size}>
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
};

export const CardBannerImage = (
    { 'data-test-id': dataTestId = 'fondue-card-banner-image', src, alt = '', fit = 'cover' }: CardBannerImageProps,
    ref: ForwardedRef<HTMLImageElement>,
) => {
    return (
        <img ref={ref} className={styles.bannerImage} data-test-id={dataTestId} data-fit={fit} src={src} alt={alt} />
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
