/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import {
    createContext,
    forwardRef,
    useCallback,
    useMemo,
    type CSSProperties,
    type ForwardedRef,
    type KeyboardEvent,
    type MouseEvent,
    type MouseEventHandler,
    type ReactNode,
} from 'react';

import styles from './styles/card.module.scss';

type CardContextType = {
    selected: boolean;
};

const CardContext = createContext<CardContextType>({ selected: false });
CardContext.displayName = 'CardContext';

export type CardRootProps = {
    'data-test-id'?: string;
    /**
     * Whether the card is in a selected state.
     * @default false
     */
    selected?: boolean;
    /**
     * Navigation URL. When provided the overlay renders as an anchor (`<a>`)
     * instead of a button, enabling native link behavior (middle-click,
     * right-click "Open in new tab", SEO).
     */
    href?: string;
    /**
     * Accessible label for the card's clickable overlay.
     */
    'aria-label'?: string;
    /**
     * ID of the element that describes the card (e.g. a subtitle element).
     */
    'aria-describedby'?: string;
    /**
     * Click callback for the card surface (e.g. select).
     * Does not fire when clicking action buttons.
     */
    onClick?: MouseEventHandler<HTMLElement>;
    /**
     * Double-click callback for the card surface (e.g. navigate).
     * Does not fire when clicking action buttons.
     */
    onDoubleClick?: MouseEventHandler<HTMLElement>;
    /**
     * Called when the pointer enters the card.
     */
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    /**
     * Called when the pointer leaves the card.
     */
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    children?: ReactNode;
};

export const CardRoot = (
    {
        'data-test-id': dataTestId = 'fondue-card',
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        selected = false,
        href,
        onClick,
        onDoubleClick,
        onMouseEnter,
        onMouseLeave,
        children,
    }: CardRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const contextValue = useMemo(() => ({ selected }), [selected]);
    const hasOverlay = !!(href || onClick || onDoubleClick);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                onClick?.(event as unknown as MouseEvent<HTMLElement>);
            }
            if (event.key === ' ') {
                event.preventDefault();
                onDoubleClick?.(event as unknown as MouseEvent<HTMLElement>);
            }
        },
        [onClick, onDoubleClick],
    );

    return (
        <CardContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={styles.root}
                data-test-id={dataTestId}
                data-selected={selected}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {hasOverlay &&
                    (href ? (
                        <a
                            className={styles.overlay}
                            href={href}
                            tabIndex={0}
                            aria-label={ariaLabel}
                            aria-describedby={ariaDescribedby}
                            aria-current={selected ? 'true' : undefined}
                            onClick={onClick}
                            onDoubleClick={onDoubleClick}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <button
                            className={styles.overlay}
                            type="button"
                            tabIndex={0}
                            aria-label={ariaLabel}
                            aria-describedby={ariaDescribedby}
                            aria-pressed={selected}
                            onClick={onClick}
                            onDoubleClick={onDoubleClick}
                            onKeyDown={handleKeyDown}
                        />
                    ))}
                {children}
            </div>
        </CardContext.Provider>
    );
};
CardRoot.displayName = 'Card.Root';

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
            <div className={styles.bannerOverlay} />
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

export type CardBannerImagesProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardBannerImages = (
    { 'data-test-id': dataTestId = 'fondue-card-banner-images', children }: CardBannerImagesProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.bannerImages} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardBannerImages.displayName = 'Card.BannerImages';

export type CardBannerIconProps = {
    'data-test-id'?: string;
    /**
     * The icon component to render.
     */
    icon: ReactNode;
    /**
     * The color of the icon.
     */
    color?: string;
    /**
     * The color of the icon on hover.
     */
    hoverColor?: string;
};

export const CardBannerIcon = (
    { 'data-test-id': dataTestId = 'fondue-card-banner-icon', icon, color, hoverColor }: CardBannerIconProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            ref={ref}
            className={styles.bannerIcon}
            data-test-id={dataTestId}
            aria-hidden="true"
            style={
                {
                    '--card-banner-icon-color': color,
                    '--card-banner-icon-hover-color': hoverColor,
                } as CSSProperties
            }
        >
            {icon}
        </div>
    );
};
CardBannerIcon.displayName = 'Card.BannerIcon';

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

export type CardLogoProps = {
    'data-test-id'?: string;
    /**
     * The logo image source URL.
     */
    src: string;
    /**
     * Alternative text for the logo.
     * @default ''
     */
    alt?: string;
    /**
     * When true, the logo overlaps the bottom-right of the banner area (collection-style).
     * @default false
     */
    overlap?: boolean;
};

export const CardLogo = (
    { 'data-test-id': dataTestId = 'fondue-card-logo', src, alt = '', overlap = false }: CardLogoProps,
    ref: ForwardedRef<HTMLImageElement>,
) => {
    return (
        <img ref={ref} className={styles.logo} data-test-id={dataTestId} data-overlap={overlap} src={src} alt={alt} />
    );
};
CardLogo.displayName = 'Card.Logo';

export type CardIconProps = {
    'data-test-id'?: string;
    /**
     * The icon component to render.
     */
    icon: ReactNode;
};

export const CardIcon = (
    { 'data-test-id': dataTestId = 'fondue-card-icon', icon }: CardIconProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.icon} data-test-id={dataTestId} aria-hidden="true">
            {icon}
        </div>
    );
};
CardIcon.displayName = 'Card.Icon';

export type CardTitleProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardTitle = (
    { 'data-test-id': dataTestId = 'fondue-card-title', children }: CardTitleProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.title} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardTitle.displayName = 'Card.Title';

export type CardMetaProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardMeta = (
    { 'data-test-id': dataTestId = 'fondue-card-meta', children }: CardMetaProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.meta} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardMeta.displayName = 'Card.Meta';

export type CardMetasProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardMetas = (
    { 'data-test-id': dataTestId = 'fondue-card-metas', children }: CardMetasProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.metas} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardMetas.displayName = 'Card.Metas';

export type CardActionsProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardActions = (
    { 'data-test-id': dataTestId = 'fondue-card-actions', children }: CardActionsProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.actions} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardActions.displayName = 'Card.Actions';

export type CardActionsButtonProps = {
    'data-test-id'?: string;
    /**
     * The icon component to render inside the button.
     */
    icon: ReactNode;
    /**
     * Accessible label for the button.
     */
    'aria-label'?: string;
    /**
     * Click callback for the button.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const CardActionsButton = (
    {
        'data-test-id': dataTestId = 'fondue-card-actions-button',
        'aria-label': ariaLabel,
        icon,
        onClick,
    }: CardActionsButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <button
            ref={ref}
            className={styles.actionsButton}
            data-test-id={dataTestId}
            aria-label={ariaLabel}
            type="button"
            onClick={onClick}
        >
            {icon}
        </button>
    );
};
CardActionsButton.displayName = 'Card.ActionsButton';

export const Card = {
    Root: forwardRef<HTMLDivElement, CardRootProps>(CardRoot),
    Banner: forwardRef<HTMLDivElement, CardBannerProps>(CardBanner),
    BannerImage: forwardRef<HTMLImageElement, CardBannerImageProps>(CardBannerImage),
    BannerImages: forwardRef<HTMLDivElement, CardBannerImagesProps>(CardBannerImages),
    BannerIcon: forwardRef<HTMLDivElement, CardBannerIconProps>(CardBannerIcon),
    Badges: forwardRef<HTMLDivElement, CardBadgesProps>(CardBadges),
    Logo: forwardRef<HTMLImageElement, CardLogoProps>(CardLogo),
    Icon: forwardRef<HTMLDivElement, CardIconProps>(CardIcon),
    Title: forwardRef<HTMLDivElement, CardTitleProps>(CardTitle),
    Meta: forwardRef<HTMLDivElement, CardMetaProps>(CardMeta),
    Metas: forwardRef<HTMLDivElement, CardMetasProps>(CardMetas),
    Actions: forwardRef<HTMLDivElement, CardActionsProps>(CardActions),
    ActionsButton: forwardRef<HTMLButtonElement, CardActionsButtonProps>(CardActionsButton),
};
