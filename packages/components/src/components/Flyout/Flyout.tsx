/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { useTranslation } from '#/hooks/useTranslation';
import { addAutoFocusAttribute, addShowFocusRing } from '#/utilities/domUtilities';

import { Button } from '../Button/Button';
import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

import styles from './styles/flyout.module.scss';

export type FlyoutRootProps = {
    /**
     * When `true`, prevents interaction with the rest of the page while the flyout is open.
     * @default false
     */
    modal?: boolean;
    /**
     * The controlled open state. Use together with `onOpenChange` for programmatic control.
     * @default false
     */
    open?: boolean;
    /**
     * Callback fired when the flyout opens or closes.
     */
    onOpenChange?: (open: boolean) => void;
    children?: ReactNode;
};

export const FlyoutRoot = ({ children, ...props }: FlyoutRootProps) => {
    return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};
FlyoutRoot.displayName = 'Flyout.Root';

export type FlyoutTriggerProps = {
    /**
     * When `true`, merges the trigger's props and behavior onto its child element instead of rendering a wrapper button.
     * @default true
     */
    asChild?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export const FlyoutTrigger = (
    { asChild = true, children, 'data-test-id': dataTestId = 'fondue-flyout-trigger', ...props }: FlyoutTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixPopover.Trigger
            onMouseDown={addAutoFocusAttribute}
            data-auto-focus-visible="true"
            data-auto-focus-trigger
            data-test-id={dataTestId}
            asChild={asChild}
            ref={ref}
            {...props}
        >
            {children}
        </RadixPopover.Trigger>
    );
};
FlyoutTrigger.displayName = 'Flyout.Trigger';

type FlyoutSpacing = 'compact' | 'comfortable' | 'spacious';
type FlyoutViewportCollisionPadding = 'compact' | 'spacious';
export type FlyoutContentProps = {
    /**
     * Controls the drop shadow. `'none'` for flat layouts, `'medium'` for standard elevation, `'large'` for prominent overlays.
     * @default "medium"
     */
    shadow?: 'none' | 'medium' | 'large';
    /**
     * Controls the border radius. `'none'` for sharp edges, `'medium'` for standard, `'large'` for more rounded corners.
     * @default "medium"
     */
    rounded?: 'none' | 'medium' | 'large';
    /**
     * The preferred side the flyout opens on. Falls back to the opposite side if there isn't enough viewport space.
     * @default "bottom"
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Controls the horizontal alignment of the flyout relative to the trigger.
     * @default "start"
     */
    align?: 'start' | 'center' | 'end';
    /**
     * Controls the inner padding of the flyout content.
     * @default "compact"
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * Sets a fixed width for the flyout. Accepts any CSS length value.
     * @default "fit-content"
     */
    width?: string;
    /**
     * Controls the spacing between the flyout and its trigger.
     * @default 'compact'
     */
    triggerOffset?: FlyoutSpacing;
    /**
     * The maximum width of the flyout. Accepts any CSS length value.
     * @default "360px"
     */
    maxWidth?: string;
    /**
     * Controls the minimum distance between the flyout and the viewport edge.
     * @default 'compact'
     */
    viewportCollisionPadding?: FlyoutViewportCollisionPadding;
    /**
     * Callback fired when the flyout auto-focuses on open. Call `event.preventDefault()` to take manual control of focus.
     */
    onOpenAutoFocus?: (event: Event) => void;
    /**
     * Callback fired when the Escape key is pressed while the flyout is open.
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    children?: ReactNode;
    'data-test-id'?: string;
};

const SPACING_MAP: Record<FlyoutSpacing, number> = {
    compact: 8,
    comfortable: 12,
    spacious: 16,
};

const VIEWPORT_COLLISION_PADDING_MAP: Record<FlyoutViewportCollisionPadding, number> = {
    compact: 8,
    spacious: 24,
};

export const FlyoutContent = (
    {
        align = 'start',
        maxWidth = '360px',
        padding = 'compact',
        rounded = 'medium',
        width = 'fit-content',
        shadow = 'medium',
        side,
        triggerOffset = 'compact',
        viewportCollisionPadding = 'compact',
        'data-test-id': dataTestId = 'fondue-flyout-content',
        children,
        ...props
    }: FlyoutContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { theme, dir } = useFondueTheme();

    const getAdjustedSide = (side?: 'top' | 'right' | 'bottom' | 'left') => {
        if (!side || dir === 'ltr') {
            return side;
        }

        if (side === 'left') {
            return 'right';
        }
        if (side === 'right') {
            return 'left';
        }

        return side;
    };

    return (
        <RadixPopover.Portal>
            <ThemeProvider theme={theme} dir={dir}>
                <div data-test-id="fondue-flyout-overlay" className={styles.overlay} />
                <RadixPopover.Content
                    dir={dir}
                    style={
                        {
                            '--flyout-max-width': maxWidth,
                            '--flyout-width': width,
                        } as CSSProperties
                    }
                    ref={ref}
                    align={align}
                    collisionPadding={VIEWPORT_COLLISION_PADDING_MAP[viewportCollisionPadding]}
                    sideOffset={SPACING_MAP[triggerOffset]}
                    side={getAdjustedSide(side)}
                    className={styles.root}
                    data-flyout-spacing={padding}
                    data-rounded={rounded}
                    data-shadow={shadow}
                    data-test-id={dataTestId}
                    onFocus={addShowFocusRing}
                    {...props}
                >
                    {children}
                </RadixPopover.Content>
            </ThemeProvider>
        </RadixPopover.Portal>
    );
};
FlyoutContent.displayName = 'Flyout.Content';

export type FlyoutHeaderProps = {
    /**
     * Shows a close button (x) in the header.
     * @default false
     */
    showCloseButton?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
    /**
     * Additional ARIA props forwarded to the close button for accessibility customization.
     */
    closeProps?: CommonAriaProps;
};

export const FlyoutHeader = (
    { showCloseButton, children, 'data-test-id': dataTestId = 'fondue-flyout-header', closeProps }: FlyoutHeaderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { t } = useTranslation();

    return (
        <div data-test-id={dataTestId} ref={ref} className={styles.header}>
            <div>{children}</div>
            {showCloseButton && (
                <RadixPopover.Close asChild {...closeProps}>
                    <Button
                        size="small"
                        aspect="square"
                        emphasis="weak"
                        aria-label={t('Flyout_close')}
                        data-test-id={`${dataTestId}-close`}
                    >
                        <IconCross size={20} />
                    </Button>
                </RadixPopover.Close>
            )}
        </div>
    );
};
FlyoutHeader.displayName = 'Flyout.Header';

export type FlyoutFooterProps = { children?: ReactNode; 'data-test-id'?: string };

export const FlyoutFooter = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-footer' }: FlyoutFooterProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-test-id={dataTestId} ref={ref} className={styles.footer}>
            {children}
        </div>
    );
};
FlyoutFooter.displayName = 'Flyout.Footer';

export type FlyoutBodyProps = {
    children?: ReactNode;
    'data-test-id'?: string;
    /**
     * When `true`, the body becomes scrollable when its content exceeds the flyout's max height.
     * @default false
     */
    scrollable?: boolean;
};

export const FlyoutBody = (
    { children, 'data-test-id': dataTestId = 'fondue-flyout-body', scrollable = false }: FlyoutBodyProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-test-id={dataTestId}
            ref={ref}
            data-flyout-spacing="compact"
            data-scrollable={scrollable}
            className={styles.body}
        >
            {children}
        </div>
    );
};
FlyoutBody.displayName = 'Flyout.Body';

/** A popover panel — compose `Root` with `Trigger`, `Content`, `Header`, `Body`, and `Footer` sub-components. */
export const Flyout = {
    Root: FlyoutRoot,
    Trigger: forwardRef<HTMLButtonElement, FlyoutTriggerProps>(FlyoutTrigger),
    Content: forwardRef<HTMLDivElement, FlyoutContentProps>(FlyoutContent),
    Header: forwardRef<HTMLDivElement, FlyoutHeaderProps>(FlyoutHeader),
    Footer: forwardRef<HTMLDivElement, FlyoutFooterProps>(FlyoutFooter),
    Body: forwardRef<HTMLDivElement, FlyoutBodyProps>(FlyoutBody),
};
