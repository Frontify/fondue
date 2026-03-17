/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import {
    Children,
    forwardRef,
    isValidElement,
    useId,
    useEffect,
    useMemo,
    useRef,
    type ComponentProps,
    type CSSProperties,
    type ForwardedRef,
    type MouseEventHandler,
    type ReactNode,
} from 'react';

import { useSyncRefs } from '#/hooks/useSyncRefs';

import styles from './styles/card.module.scss';

type CardRootBaseProps = {
    'data-test-id'?: string;
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
     * Navigation URL. The overlay renders as an anchor (`<a>`),
     * enabling native link behavior (middle-click, right-click "Open in new tab", SEO).
     *
     * When the card is not selected, clicking the surface navigates.
     * When the card is selected and `onSelect` is provided, clicking the
     * surface fires `onSelect` instead (e.g. to deselect).
     */
    href: string;
    /**
     * Accessible label for the card's clickable overlay.
     */
    'aria-label'?: string;
    /**
     * ID of the element that describes the card (e.g. a subtitle element).
     */
    'aria-describedby'?: string;
};

export type CardRootProps = CardRootBaseProps &
    (
        | (CardRootInteractiveProps & {
              /**
               * Selection callback for the card's checkbox.
               * Also fires on the card surface when the card is selected.
               */
              onSelect: MouseEventHandler<HTMLElement>;
              /**
               * Whether the card is in a selected state.
               * @default false
               */
              selected?: boolean;
          })
        | (CardRootInteractiveProps & {
              onSelect?: never;
              selected?: never;
          })
        | {
              href?: never;
              onSelect?: never;
              selected?: never;
              'aria-label'?: never;
              'aria-describedby'?: never;
          }
    );

export const CardRoot = (
    {
        'data-test-id': dataTestId = 'fondue-card',
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        selected = false,
        href,
        onSelect,
        onMouseEnter,
        onMouseLeave,
        children,
    }: CardRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const isSelectable = !!onSelect;
    const isClickable = !!href || (isSelectable && selected);
    const showCheckbox = !!(href && onSelect);
    const generatedTitleId = useId();
    const titleId = `${generatedTitleId}-title`;

    const labelledby = ariaLabel ? undefined : titleId;

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

    const showLinkOverlay = !!href && !(isSelectable && selected);
    const showButtonOverlay = isSelectable && selected;

    return (
        <div
            ref={ref}
            className={styles.root}
            data-test-id={dataTestId}
            data-interactive={isClickable}
            data-selectable={isSelectable}
            data-selected={isSelectable && selected}
            data-title-id={titleId}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {showLinkOverlay && (
                <a
                    className={styles.overlay}
                    href={href}
                    tabIndex={0}
                    aria-label={ariaLabel}
                    aria-labelledby={labelledby}
                    aria-describedby={ariaDescribedby}
                    aria-current={selected ? 'true' : undefined}
                />
            )}
            {showButtonOverlay && (
                <button
                    className={styles.overlay}
                    type="button"
                    tabIndex={0}
                    aria-label={ariaLabel}
                    aria-labelledby={labelledby}
                    aria-describedby={ariaDescribedby}
                    aria-pressed={selected}
                    onClick={onSelect}
                />
            )}
            {showCheckbox && (
                <button
                    className={styles.checkbox}
                    type="button"
                    aria-label={selected ? 'Deselect' : 'Select'}
                    aria-pressed={selected}
                    onClick={onSelect}
                >
                    <IconCheckMark size={16} />
                </button>
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
    const localRef = useRef<HTMLDivElement>(null);
    useSyncRefs(localRef, externalRef);

    useEffect(() => {
        const node = localRef.current;
        if (node) {
            const root = node.closest<HTMLElement>(`.${styles.root}`);
            const titleId = root?.dataset.titleId;
            if (titleId) {
                node.id = titleId;
            }
        }
    }, []);

    return (
        <div ref={localRef} className={styles.title} data-test-id={dataTestId}>
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

export type CardActionButtonProps = {
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
} & Omit<ComponentProps<'button'>, 'children' | 'ref' | 'onClick' | 'aria-label'>;

export const CardActionButton = (
    {
        'data-test-id': dataTestId = 'fondue-card-action-button',
        'aria-label': ariaLabel,
        onClick,
        children,
        ...rest
    }: CardActionButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <button
            ref={ref}
            className={styles.actionButton}
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
CardActionButton.displayName = 'Card.ActionButton';

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
    ActionButton: forwardRef<HTMLButtonElement, CardActionButtonProps>(CardActionButton),
};
