/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark } from '@frontify/fondue-icons';
import {
    Children,
    type ForwardedRef,
    isValidElement,
    type MouseEvent,
    type MouseEventHandler,
    type ReactNode,
    useCallback,
    useId,
    useMemo,
} from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { useFondueRouter } from '../RouterProvider/RouterProvider';

import { ForwardedRefCardAction } from './CardAction';
import { CardContext } from './CardContext';
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
    /**
     * Called when the user activates the card's link overlay, before navigation.
     * Fires for plain clicks, modifier clicks (cmd/ctrl/shift/middle), and keyboard activation.
     * Does not fire when the card is selected (the overlay becomes a button that calls `onSelect`).
     * Useful for analytics/tracking. Call `event.preventDefault()` to cancel navigation.
     */
    onNavigate?: MouseEventHandler<HTMLAnchorElement>;
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
              onNavigate?: never;
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
        onNavigate,
        onSelect,
        onMouseEnter,
        onMouseLeave,
        children,
    }: CardRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();
    const { navigate, useHref: resolveHref } = useFondueRouter();
    const resolvedHref = href ? resolveHref(href) : '';

    const isSelectable = !!onSelect;
    const isClickable = !!href;
    const showCheckbox = !!(href && onSelect);
    const generatedTitleId = useId();
    const titleId = `${generatedTitleId}-title`;

    const handleLinkClick = useCallback(
        (event: MouseEvent<HTMLAnchorElement>) => {
            onNavigate?.(event);
            if (event.defaultPrevented) {
                return;
            }
            if (href && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
                event.preventDefault();
                navigate(href);
            }
        },
        [href, navigate, onNavigate],
    );

    const labelledby = ariaLabel ? undefined : titleId;
    const contextValue = useMemo(() => ({ titleId }), [titleId]);

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
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <CardContext.Provider value={contextValue}>
                {showLinkOverlay && (
                    <a
                        className={styles.overlay}
                        href={resolvedHref}
                        onClick={handleLinkClick}
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
                        aria-label={selected ? t('Card_deselect') : t('Card_select')}
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
            </CardContext.Provider>
        </div>
    );
};
CardRoot.displayName = 'Card.Root';
