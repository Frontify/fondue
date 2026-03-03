/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretRight } from '@frontify/fondue-icons';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { Children, forwardRef, useMemo, useRef, type ForwardedRef, type ReactNode } from 'react';

import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

import { useProcessedChildren } from './hooks/useProcessedChildren';
import styles from './styles/dropdown.module.scss';

export type DropdownRootProps = {
    children?: ReactNode;
    /**
     * When `true`, prevents interaction with the rest of the page and restricts screen-reader access to the menu only.
     * @default false
     */
    modal?: boolean;
    /**
     * The controlled open state. Use together with `onOpenChange` for programmatic control.
     */
    open?: boolean;
    /**
     * Callback fired when the dropdown opens or closes.
     */
    onOpenChange?: (open: boolean) => void;

    'data-test-id'?: string;
};

export const DropdownRoot = ({
    children,
    open,
    modal = false,
    onOpenChange,
    'data-test-id': dataTestId = 'fondue-dropdown',
}: DropdownRootProps) => {
    return (
        <RadixDropdown.Root open={open} modal={modal} onOpenChange={onOpenChange} data-test-id={dataTestId}>
            {children}
        </RadixDropdown.Root>
    );
};
DropdownRoot.displayName = 'Dropdown.Root';

export type DropdownTriggerProps = {
    /**
     * When `true`, merges the trigger's props and behavior onto its child element instead of rendering a wrapper button.
     * @default true
     */
    asChild?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

export const DropdownTrigger = (
    {
        asChild = true,
        children,
        'data-test-id': dataTestId = 'fondue-dropdown-trigger',
        ...props
    }: DropdownTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixDropdown.Trigger asChild={asChild} data-test-id={dataTestId} ref={ref} {...props}>
            {children}
        </RadixDropdown.Trigger>
    );
};
DropdownTrigger.displayName = 'Dropdown.Trigger';

type DropdownSpacing = 'compact' | 'comfortable' | 'spacious';
type DropdownViewportCollisionPadding = 'compact' | 'spacious';
export type DropdownContentProps = {
    children?: ReactNode;
    'data-test-id'?: string;
    /**
     * Controls the horizontal alignment of the menu relative to the trigger.
     * @default "start"
     */
    align?: 'start' | 'center' | 'end';
    /**
     * The preferred side the menu opens on. Falls back to the opposite side if there isn't enough viewport space.
     * @default "bottom"
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Controls the spacing between the dropdown menu and its trigger. `'compact'` for tight layouts, `'spacious'` for breathing room.
     * @default 'compact'
     */
    triggerOffset?: DropdownSpacing;
    /**
     * When `true`, prevents focus from returning to the trigger when the dropdown closes. Useful when the trigger is removed from the DOM on close.
     */
    preventTriggerFocusOnClose?: boolean;
    /**
     * Controls the minimum distance between the menu and the viewport edge.
     * @default 'compact'
     */
    viewportCollisionPadding?: DropdownViewportCollisionPadding;
    /**
     * When `true`, the menu content stays mounted in the DOM even when closed. Use sparingly — only when unmounting causes layout issues.
     * @default false
     */
    forceMount?: boolean;
    /**
     * Callback fired when the Escape key is pressed while the menu is open.
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
};

const SPACING_MAP: Record<DropdownSpacing, number> = {
    compact: 8,
    comfortable: 12,
    spacious: 16,
};

const VIEWPORT_COLLISION_PADDING_MAP: Record<DropdownViewportCollisionPadding, number> = {
    compact: 8,
    spacious: 24,
};

export const DropdownContent = (
    {
        side = 'bottom',
        align = 'start',
        triggerOffset = 'compact',
        children,
        preventTriggerFocusOnClose,
        viewportCollisionPadding = 'compact',
        forceMount = false,
        onEscapeKeyDown,
        'data-test-id': dataTestId = 'fondue-dropdown-content',
    }: DropdownContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const localRef = useRef<HTMLDivElement>(null);
    const { theme, dir } = useFondueTheme();
    const actualRef = ref || localRef;
    return (
        <RadixDropdown.Portal forceMount={forceMount || undefined}>
            <ThemeProvider theme={theme} dir={dir}>
                <RadixDropdown.Content
                    // @ts-expect-error - dir prop works at runtime but is not in the Radix UI type definition
                    dir={dir}
                    align={align}
                    collisionPadding={VIEWPORT_COLLISION_PADDING_MAP[viewportCollisionPadding]}
                    sideOffset={SPACING_MAP[triggerOffset]}
                    side={side}
                    className={styles.content}
                    data-test-id={dataTestId}
                    ref={actualRef}
                    onEscapeKeyDown={onEscapeKeyDown}
                    onPointerDownOutside={(event) => {
                        if (!forceMount) {
                            return;
                        }

                        if (!(event.target instanceof Element)) {
                            return;
                        }

                        if (!(actualRef instanceof Object) || !('current' in actualRef)) {
                            return;
                        }

                        let element: Element | null = event.target;
                        let controlsId: string | null = null;

                        while (element && element !== document.body) {
                            controlsId = element.getAttribute('aria-controls');

                            if (controlsId) {
                                break;
                            }

                            element = element.parentElement;
                        }

                        if (controlsId === actualRef.current?.id) {
                            event.preventDefault();
                        }
                    }}
                    onCloseAutoFocus={(event) => {
                        if (preventTriggerFocusOnClose) {
                            event.preventDefault();
                        }
                    }}
                    forceMount={forceMount || undefined}
                >
                    {children}
                </RadixDropdown.Content>
            </ThemeProvider>
        </RadixDropdown.Portal>
    );
};
DropdownContent.displayName = 'Dropdown.Content';

export type DropdownGroupProps = { children: ReactNode; heading?: string; 'data-test-id'?: string };

export const DropdownGroup = (
    { children, heading, 'data-test-id': dataTestId = 'fondue-dropdown-group' }: DropdownGroupProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const hasChildren = useMemo(
        () => Children.toArray(children).filter((child) => child !== null).length > 0,
        [children],
    );

    if (!hasChildren) {
        return null;
    }

    return (
        <RadixDropdown.Group className={styles.group} data-test-id={dataTestId} ref={ref}>
            {heading ? (
                <div className={styles.groupHeading}>
                    <span aria-label={heading}>{heading}</span>
                </div>
            ) : null}
            {children}
        </RadixDropdown.Group>
    );
};
DropdownGroup.displayName = 'Dropdown.Group';

export type DropdownSubMenuProps = { children: ReactNode; 'data-test-id'?: string };

export const DropdownSubMenu = ({
    children,
    'data-test-id': dataTestId = 'fondue-dropdown-submenu',
}: DropdownSubMenuProps) => {
    return <RadixDropdown.Sub data-test-id={dataTestId}>{children}</RadixDropdown.Sub>;
};
DropdownSubMenu.displayName = 'Dropdown.SubMenu';

export type DropdownSubTriggerProps = { children: ReactNode; 'data-test-id'?: string };

export const DropdownSubTrigger = (
    { children, 'data-test-id': dataTestId = 'fondue-dropdown-subtrigger' }: DropdownSubTriggerProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { content } = useProcessedChildren(children);
    const wasMouseInteracted = useRef(false);
    return (
        <RadixDropdown.SubTrigger
            className={styles.subTrigger}
            // eslint-disable-next-line react-hooks/refs
            data-show-focus-ring={wasMouseInteracted.current}
            data-test-id={dataTestId}
            ref={ref}
            onMouseEnter={() => {
                wasMouseInteracted.current = true;
            }}
            onFocus={(focusEvent) => {
                if (!wasMouseInteracted.current) {
                    focusEvent.target.dataset.showFocusRing = 'true';
                }
            }}
            onBlur={(blurEvent) => {
                blurEvent.target.dataset.showFocusRing = 'false';
                wasMouseInteracted.current = false;
            }}
        >
            {content}
            <IconCaretRight className={styles.subMenuIndicator} size={16} />
        </RadixDropdown.SubTrigger>
    );
};
DropdownSubTrigger.displayName = 'Dropdown.SubTrigger';

export type DropdownSubContentProps = {
    children: ReactNode;
    'data-test-id'?: string;
};

export const DropdownSubContent = (
    { children, 'data-test-id': dataTestId = 'fondue-dropdown-subcontent' }: DropdownSubContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { theme, dir } = useFondueTheme();

    return (
        <RadixDropdown.Portal>
            <ThemeProvider theme={theme} dir={dir}>
                <RadixDropdown.SubContent
                    // @ts-expect-error - dir prop works at runtime but is not in the Radix UI type definition
                    dir={dir}
                    className={styles.subContent}
                    data-test-id={dataTestId}
                    ref={ref}
                >
                    {children}
                </RadixDropdown.SubContent>
            </ThemeProvider>
        </RadixDropdown.Portal>
    );
};
DropdownSubContent.displayName = 'Dropdown.SubContent';

export type DropdownItemProps = {
    children: ReactNode;
    /**
     * Prevents interaction and dims the item visually.
     */
    disabled?: boolean;
    /**
     * A plain-text representation of the item's content, used for typeahead keyboard navigation.
     */
    textValue?: string;
    /**
     * Controls the item's visual tone. Use `'danger'` for destructive actions like delete.
     * @default "default"
     */
    emphasis?: 'default' | 'danger';
    /**
     * Callback fired when the user selects this item.
     */
    onSelect?: (event: Event) => void;
    /**
     * When `true`, merges the item's props and behavior onto its child element.
     * @default false
     */
    asChild?: boolean;
    'data-test-id'?: string;
};

export const DropdownItem = (
    {
        children,
        disabled,
        textValue,
        onSelect,
        emphasis = 'default',
        asChild = false,
        'data-test-id': dataTestId = 'fondue-dropdown-subtrigger',
        ...props
    }: DropdownItemProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { content } = useProcessedChildren(children);
    const wasMouseInteracted = useRef(false);

    return (
        <RadixDropdown.Item
            onSelect={onSelect}
            className={styles.item}
            textValue={textValue}
            data-test-id={dataTestId}
            data-emphasis={emphasis}
            ref={ref}
            disabled={disabled}
            asChild={asChild}
            // eslint-disable-next-line react-hooks/refs
            data-show-focus-ring={wasMouseInteracted.current}
            onMouseEnter={() => {
                wasMouseInteracted.current = true;
            }}
            onFocus={(focusEvent) => {
                if (!wasMouseInteracted.current) {
                    focusEvent.target.dataset.showFocusRing = 'true';
                }
            }}
            onBlur={(blurEvent) => {
                blurEvent.target.dataset.showFocusRing = 'false';
                wasMouseInteracted.current = false;
            }}
            {...props}
        >
            {content}
        </RadixDropdown.Item>
    );
};
DropdownItem.displayName = 'Dropdown.Item';

export type DropdownSlotProps = { children: ReactNode; name?: 'left' | 'right'; 'data-test-id'?: string };

export const DropdownSlot = (
    { children, name, 'data-test-id': dataTestId = 'fondue-dropdown-slot' }: DropdownSlotProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div data-name={name} className={styles.slot} data-test-id={dataTestId} ref={ref}>
            {children}
        </div>
    );
};
DropdownSlot.displayName = 'Dropdown.Slot';

const ForwardedRefDropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(DropdownTrigger);
const ForwardedRefDropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(DropdownContent);
const ForwardedRefDropdownGroup = forwardRef<HTMLDivElement, DropdownGroupProps>(DropdownGroup);
const ForwardedRefDropdownSubTrigger = forwardRef<HTMLDivElement, DropdownSubTriggerProps>(DropdownSubTrigger);
const ForwardedRefDropdownSubContent = forwardRef<HTMLDivElement, DropdownSubContentProps>(DropdownSubContent);
const ForwardedRefDropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(DropdownItem);
const ForwardedRefDropdownSlot = forwardRef<HTMLDivElement, DropdownSlotProps>(DropdownSlot);

/** A menu triggered by a button — compose `Root` with `Trigger`, `Content`, `Item`, `Group`, `Slot`, `SubMenu`, `SubTrigger`, and `SubContent` sub-components. */
export const Dropdown = {
    Root: DropdownRoot,
    Trigger: ForwardedRefDropdownTrigger,
    Content: ForwardedRefDropdownContent,
    Group: ForwardedRefDropdownGroup,
    SubMenu: DropdownSubMenu,
    SubTrigger: ForwardedRefDropdownSubTrigger,
    SubContent: ForwardedRefDropdownSubContent,
    Item: ForwardedRefDropdownItem,
    Slot: ForwardedRefDropdownSlot,
};
