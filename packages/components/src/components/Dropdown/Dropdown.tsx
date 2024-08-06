/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretRight } from '@frontify/fondue-icons';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { forwardRef, useRef, type ForwardedRef, type ReactNode } from 'react';

import { usePreventDropdownOverflow } from '#/hooks/usePreventDropdownOverflow';
import { syncRefs } from '#/utilities/domUtilities';

import styles from './styles/dropdown.module.scss';

export type DropdownRootProps = {
    children?: ReactNode;
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
    onOpenChange,
    'data-test-id': dataTestId = 'fondue-dropdown',
}: DropdownRootProps) => {
    return (
        <RadixDropdown.Root open={open} onOpenChange={onOpenChange} data-test-id={dataTestId}>
            {children}
        </RadixDropdown.Root>
    );
};
DropdownRoot.displayName = 'Dropdown.Root';

export type DropdownTriggerProps = { children?: ReactNode; 'data-test-id'?: string };

export const DropdownTrigger = (
    { children, 'data-test-id': dataTestId = 'fondue-dropdown-trigger' }: DropdownTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixDropdown.Trigger asChild data-test-id={dataTestId} ref={ref}>
            {children}
        </RadixDropdown.Trigger>
    );
};
DropdownTrigger.displayName = 'Dropdown.Trigger';

export type DropdownContentProps = {
    children?: ReactNode;
    'data-test-id'?: string;
    onOpen?: () => void;
    onClose?: () => void;
};

export const DropdownContent = (
    { onOpen, onClose, children, 'data-test-id': dataTestId = 'fondue-dropdown-content' }: DropdownContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const localRef = useRef(null);
    const dropdownIsOpen = useRef(false);

    const { setMaxHeight } = usePreventDropdownOverflow(localRef);

    return (
        <RadixDropdown.Portal>
            <RadixDropdown.Content
                align="start"
                collisionPadding={8}
                sideOffset={8}
                className={styles.content}
                data-test-id={dataTestId}
                ref={localRef}
                onCloseAutoFocus={() => {
                    syncRefs(localRef, ref);
                    onClose && onClose();
                    dropdownIsOpen.current = false;
                }}
                onFocus={() => {
                    if (!dropdownIsOpen.current) {
                        setMaxHeight();
                        syncRefs(localRef, ref);
                        debugger;
                        onOpen && onOpen();
                        dropdownIsOpen.current = true;
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
    return (
        <RadixDropdown.SubTrigger className={styles.subTrigger} data-test-id={dataTestId} ref={ref}>
            {children}
            <IconCaretRight className={styles.subMenuIndicator} size={16} />
        </RadixDropdown.SubTrigger>
    );
};
DropdownSubTrigger.displayName = 'Dropdown.SubTrigger';

export type DropdownSubContentProps = { children: ReactNode; 'data-test-id'?: string };

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
     * Callback that is called when the item is selected.
     */
    onSelect: (event: Event) => void;
    'data-test-id'?: string;
};

export const DropdownItem = (
    {
        children,
        disabled,
        textValue,
        onSelect,
        'data-test-id': dataTestId = 'fondue-dropdown-subtrigger',
        ...props
    }: DropdownItemProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixDropdown.Item
            onSelect={onSelect}
            className={styles.item}
            textValue={textValue}
            data-test-id={dataTestId}
            ref={ref}
            disabled={disabled}
            {...props}
        >
            {children}
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
