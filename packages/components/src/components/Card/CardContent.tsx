/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactNode } from 'react';

import { useCardContext } from './CardContext';
import styles from './styles/card.module.scss';

export type CardBadgesProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardBadges = (
    { 'data-test-id': dataTestId = 'fondue-card-badges', children }: CardBadgesProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.badges} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardBadges.displayName = 'Card.Badges';

export type CardThumbnailImageProps = {
    'data-test-id'?: string;
    /**
     * The thumbnail image source URL.
     */
    src: string;
    /**
     * Alternative text for the thumbnail image.
     * @default ''
     */
    alt?: string;
};

export const CardThumbnailImage = (
    { 'data-test-id': dataTestId = 'fondue-card-thumbnail-image', src, alt = '' }: CardThumbnailImageProps,
    ref: ForwardedRef<HTMLImageElement>,
) => {
    return <img ref={ref} className={styles.thumbnailImage} data-test-id={dataTestId} src={src} alt={alt} />;
};
CardThumbnailImage.displayName = 'Card.ThumbnailImage';

export type CardThumbnailIconProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardThumbnailIcon = (
    { 'data-test-id': dataTestId = 'fondue-card-thumbnail-icon', children }: CardThumbnailIconProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.thumbnailIcon} data-test-id={dataTestId} aria-hidden="true">
            {children}
        </div>
    );
};
CardThumbnailIcon.displayName = 'Card.ThumbnailIcon';

export type CardTitleProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardTitle = (
    { 'data-test-id': dataTestId = 'fondue-card-title', children }: CardTitleProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const context = useCardContext();

    return (
        <div ref={ref} id={context?.titleId} className={styles.title} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardTitle.displayName = 'Card.Title';

export type CardDescriptionProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardDescription = (
    { 'data-test-id': dataTestId = 'fondue-card-description', children }: CardDescriptionProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.description} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardDescription.displayName = 'Card.Description';
