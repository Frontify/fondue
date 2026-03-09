/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import {
    Children,
    forwardRef,
    isValidElement,
    useCallback,
    useId,
    useMemo,
    useRef,
    type CSSProperties,
    type ForwardedRef,
    type KeyboardEvent,
    type MouseEvent,
    type MouseEventHandler,
    type ReactNode,
} from 'react';

import styles from './styles/card.module.scss';

type CardRootBaseProps = {
    'data-test-id'?: string;
    /**
     * Whether the card is in a selected state.
     * @default false
     */
    selected?: boolean;
    /**
     * Accessible label for the card's clickable overlay.
     */
    'aria-label'?: string;
    /**
     * ID of the element that describes the card (e.g. a subtitle element).
     */
    'aria-describedby'?: string;
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

type CardRootInteractiveProps = {
    /**
     * Double-click callback for the card surface (e.g. navigate).
     * Does not fire when clicking action buttons.
     * Only available when `onClick` or `href` is provided.
     */
    onDoubleClick?: MouseEventHandler<HTMLElement>;
};

export type CardRootProps = CardRootBaseProps &
    (
        | {
              /**
               * Navigation URL. When provided the overlay renders as an anchor (`<a>`)
               * instead of a button, enabling native link behavior (middle-click,
               * right-click "Open in new tab", SEO).
               */
              href: string;
              /**
               * Click callback for the card surface (e.g. select).
               * Does not fire when clicking action buttons.
               */
              onClick?: MouseEventHandler<HTMLElement>;
              onDoubleClick?: CardRootInteractiveProps['onDoubleClick'];
          }
        | {
              href?: never;
              /**
               * Click callback for the card surface (e.g. select).
               * Does not fire when clicking action buttons.
               */
              onClick: MouseEventHandler<HTMLElement>;
              onDoubleClick?: CardRootInteractiveProps['onDoubleClick'];
          }
        | {
              href?: never;
              onClick?: never;
              onDoubleClick?: never;
          }
    );

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
    const isClickable = !!(href || onClick || onDoubleClick);
    const hasDualAction = !!(onDoubleClick && (onClick || href));
    const generatedTitleId = useId();
    const titleId = `${generatedTitleId}-title`;
    const keyboardHintId = `${generatedTitleId}-keyboard-hint`;

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

    const labelledby = ariaLabel ? undefined : titleId;
    const describedby = hasDualAction ? [ariaDescribedby, keyboardHintId].filter(Boolean).join(' ') : ariaDescribedby;

    const { actions, otherChildren } = useMemo(() => {
        const actions: ReactNode[] = [];
        const otherChildren: ReactNode[] = [];

        Children.forEach(children, (child) => {
            if (isValidElement(child) && child.type === ForwardedRefCardAction) {
                actions.push(child);
            } else {
                otherChildren.push(child);
            }
        });

        return { actions, otherChildren };
    }, [children]);

    return (
        <div
            ref={ref}
            className={styles.root}
            data-test-id={dataTestId}
            data-interactive={isClickable}
            data-selected={isClickable && selected}
            data-title-id={titleId}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isClickable &&
                (href ? (
                    <a
                        className={styles.overlay}
                        href={href}
                        tabIndex={0}
                        aria-label={ariaLabel}
                        aria-labelledby={labelledby}
                        aria-describedby={describedby}
                        aria-current={selected ? 'true' : undefined}
                        aria-keyshortcuts={hasDualAction ? 'Enter Space' : undefined}
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
                        aria-labelledby={labelledby}
                        aria-describedby={describedby}
                        aria-pressed={selected}
                        aria-keyshortcuts={hasDualAction ? 'Enter Space' : undefined}
                        onClick={onClick}
                        onDoubleClick={onDoubleClick}
                        onKeyDown={handleKeyDown}
                    />
                ))}
            {hasDualAction && (
                <span id={keyboardHintId} hidden>
                    Press Enter to select, press Space to open
                </span>
            )}
            {otherChildren}
            {actions.length > 0 && (
                <div className={styles.actions} data-test-id="fondue-card-actions">
                    {actions}
                </div>
            )}
        </div>
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

export type CardBannerIconProps = {
    'data-test-id'?: string;
    /**
     * The color of the icon.
     */
    color?: string;
    /**
     * The color of the icon on hover.
     */
    hoverColor?: string;
    children?: ReactNode;
};

export const CardBannerIcon = (
    { 'data-test-id': dataTestId = 'fondue-card-banner-icon', color, hoverColor, children }: CardBannerIconProps,
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
            {children}
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
    externalRef: ForwardedRef<HTMLDivElement>,
) => {
    const internalRef = useRef<HTMLDivElement | null>(null);

    const setRef = useCallback(
        (node: HTMLDivElement | null) => {
            internalRef.current = node;

            if (typeof externalRef === 'function') {
                externalRef(node);
            } else if (externalRef) {
                externalRef.current = node;
            }

            if (node) {
                const root = node.closest(`.${styles.root}`);
                const titleId = root?.getAttribute('data-title-id');
                if (titleId) {
                    node.id = titleId;
                }
            }
        },
        [externalRef],
    );

    return (
        <div ref={setRef} className={styles.title} data-test-id={dataTestId}>
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

export type CardActionProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardAction = (
    { 'data-test-id': dataTestId = 'fondue-card-action', children }: CardActionProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.action} data-test-id={dataTestId}>
            {children}
        </div>
    );
};
CardAction.displayName = 'Card.Action';

const ForwardedRefCardAction = forwardRef<HTMLDivElement, CardActionProps>(CardAction);

export type CardActionsButtonProps = {
    'data-test-id'?: string;
    /**
     * Accessible label for the button.
     */
    'aria-label'?: string;
    /**
     * Click callback for the button.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
} & Omit<JSX.IntrinsicElements['button'], 'children' | 'ref'>;

export const CardActionsButton = (
    {
        'data-test-id': dataTestId = 'fondue-card-actions-button',
        'aria-label': ariaLabel,
        onClick,
        children,
        ...rest
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
            {...rest}
        >
            {children}
        </button>
    );
};
CardActionsButton.displayName = 'Card.ActionsButton';

export const Card = {
    Root: forwardRef<HTMLDivElement, CardRootProps>(CardRoot),
    Banner: forwardRef<HTMLDivElement, CardBannerProps>(CardBanner),
    BannerImage: forwardRef<HTMLImageElement, CardBannerImageProps>(CardBannerImage),

    BannerIcon: forwardRef<HTMLDivElement, CardBannerIconProps>(CardBannerIcon),
    Badges: forwardRef<HTMLDivElement, CardBadgesProps>(CardBadges),
    ThumbnailImage: forwardRef<HTMLImageElement, CardThumbnailImageProps>(CardThumbnailImage),
    ThumbnailIcon: forwardRef<HTMLDivElement, CardThumbnailIconProps>(CardThumbnailIcon),
    Title: forwardRef<HTMLDivElement, CardTitleProps>(CardTitle),
    Description: forwardRef<HTMLDivElement, CardDescriptionProps>(CardDescription),
    Action: ForwardedRefCardAction,
    ActionsButton: forwardRef<HTMLButtonElement, CardActionsButtonProps>(CardActionsButton),
};
