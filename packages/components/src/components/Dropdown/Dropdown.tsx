/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretRight } from '@frontify/fondue-icons';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { useProcessedChildren } from './hooks/useProcessedChildren';
import styles from './styles/dropdown.module.scss';

export type DropdownRootProps = {
    children?: ReactNode;
    /**
     * When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
     * @default false
     */
    modal?: boolean;
    /**
     * Controls the open state of the dropdown.
     */
    open?: boolean;
    /**
     * Callback that is called when the open state of the dropdown changes.
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
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
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

export type DropdownContentProps = {
    children?: ReactNode;
    'data-test-id'?: string;
    /**
     * Defines the alignment of the dropdown.
     * @default "start"
     */
    align?: 'start' | 'center' | 'end';
    /**
     * Defines the preferred side of the dropdown. It will not be respected if there are collisions with the viewport.
     * @default "bottom"
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Prevents the focus from being set on the trigger when the dropdown is closed.
     */
    preventTriggerFocusOnClose?: boolean;
};

export const DropdownContent = (
    {
        side = 'bottom',
        align = 'start',
        children,
        preventTriggerFocusOnClose,
        'data-test-id': dataTestId = 'fondue-dropdown-content',
    }: DropdownContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixDropdown.Portal>
            <RadixDropdown.Content
                align={align}
                collisionPadding={8}
                sideOffset={8}
                side={side}
                className={styles.content}
                data-test-id={dataTestId}
                ref={ref}
                onCloseAutoFocus={(event) => {
                    if (preventTriggerFocusOnClose) {
                        event.preventDefault();
                    }
                }}
            >
                {children}
            </RadixDropdown.Content>
        </RadixDropdown.Portal>
    );
};
DropdownContent.displayName = 'Dropdown.Content';

export type DropdownGroupProps = { children: ReactNode; 'data-test-id'?: string };

export const DropdownGroup = (
    { children, 'data-test-id': dataTestId = 'fondue-dropdown-group' }: DropdownGroupProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixDropdown.Group className={styles.group} data-test-id={dataTestId} ref={ref}>
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
    return (
        <RadixDropdown.SubTrigger className={styles.subTrigger} data-test-id={dataTestId} ref={ref}>
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
    return (
        <RadixDropdown.Portal>
            <RadixDropdown.SubContent className={styles.subContent} data-test-id={dataTestId} ref={ref}>
                {children}
            </RadixDropdown.SubContent>
        </RadixDropdown.Portal>
    );
};
DropdownSubContent.displayName = 'Dropdown.SubContent';

export type DropdownItemProps = {
    children: ReactNode;
    /**
     * Disables the item.
     */
    disabled?: boolean;
    /**
     * The text value of the item that is passed to the onSelect callback.
     */
    textValue?: string;
    /**
     * The style of the item.
     * @default "default"
     */
    emphasis?: 'default' | 'danger';
    /**
     * Callback that is called when the item is selected.
     */
    onSelect?: (event: Event) => void;
    'data-test-id'?: string;
};

export const DropdownItem = (
    {
        children,
        disabled,
        textValue,
        onSelect,
        emphasis = 'default',
        'data-test-id': dataTestId = 'fondue-dropdown-subtrigger',
        ...props
    }: DropdownItemProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { content, isLink } = useProcessedChildren(children);

    const Wrapper = isLink ? Slot : 'div';

    return (
        <RadixDropdown.Item
            onSelect={onSelect}
            className={styles.item}
            textValue={textValue}
            data-test-id={dataTestId}
            data-emphasis={emphasis}
            ref={ref}
            disabled={disabled}
            asChild
            {...props}
        >
            <Wrapper>{content}</Wrapper>
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
