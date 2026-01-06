/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixPopover from '@radix-ui/react-popover';
import { Slot as RadixSlot } from '@radix-ui/react-slot';
import { type UseComboboxPropGetters, type UseSelectPropGetters } from 'downshift';
import { isValidElement, type ForwardedRef, type MouseEvent, type ReactElement, type ReactNode } from 'react';

import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

import { type SelectItemProps } from './SelectItem';
import styles from './styles/select.module.scss';
import { getSelectOptionValue, recursiveMap } from './utils';

export type SelectMenuViewportCollisionPadding = 'compact' | 'spacious';

export type SelectMenuProps = {
    /**
     * @internal
     * The index of the highlighted item in the menu.
     */
    highlightedIndex: number;
    /**
     * @internal
     * Callback function to retrieve the props for a menu element.
     */
    getMenuProps: UseSelectPropGetters<unknown>['getMenuProps'] | UseComboboxPropGetters<unknown>['getMenuProps'];
    /**
     * @internal
     * Callback function to retrieve the props for a item element.
     */
    getItemProps: UseSelectPropGetters<unknown>['getItemProps'] | UseComboboxPropGetters<unknown>['getItemProps'];
    /**
     * @internal
     * The children of the menu component. This can contain multiple `Select.Item` or `Select.Group` components.
     */
    children: ReactNode;
    /**
     * @internal
     * The filter text shown in the combobox input element.
     */
    filterText?: string;
    /**
     * @internal
     * The alignment of the menu.
     */
    align: 'start' | 'center' | 'end';
    /**
     * @internal
     * Defines the preferred side of the select. It will not be respected if there are collisions with the viewport.
     * @default "bottom"
     */
    side: 'left' | 'right' | 'bottom' | 'top';
    /**
     * @internal
     * The type of the menu.
     */
    selectedItems?:
        | {
              value: string;
          }[]
        | null;
    /**
     * @internal
     * A boolean to indicate if highlighted item was changed since opening the menu.
     * This is used to determine the style of the selected/highlighted item.
     */
    hasInteractedSinceOpening?: boolean;
    /**
     * Define the minimum distance between the select menu and the viewport edge
     * @default 'compact'
     */
    viewportCollisionPadding?: SelectMenuViewportCollisionPadding;
    /**
     * @internal
     * Event handler called when the escape key is pressed.
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
};

export const SelectMenu = ({
    highlightedIndex,
    getMenuProps,
    getItemProps,
    children,
    filterText,
    align,
    side,
    selectedItems,
    hasInteractedSinceOpening,
    viewportCollisionPadding = 'compact',
    onEscapeKeyDown,
}: SelectMenuProps) => {
    const handleOnOpenAutoFocus = (event: Event) => {
        event.preventDefault();
    };

    const VIEWPORT_COLLISION_PADDING_MAP: Record<SelectMenuViewportCollisionPadding, number> = {
        compact: 8,
        spacious: 24,
    };

    const { theme, dir } = useFondueTheme();

    const getAdjustedSide = (side: 'left' | 'right' | 'bottom' | 'top') => {
        if (dir === 'ltr') {
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
                <RadixPopover.Content
                    dir={dir}
                    align={align}
                    side={getAdjustedSide(side)}
                    collisionPadding={VIEWPORT_COLLISION_PADDING_MAP[viewportCollisionPadding] + 8}
                    onOpenAutoFocus={handleOnOpenAutoFocus}
                    onEscapeKeyDown={onEscapeKeyDown}
                    className={styles.portal}
                >
                    <ul
                        className={styles.menu}
                        // TODO: fix this accessibility issue
                        // We are mounting/unmounting the menu on open/close
                        // We should instead toggle its visibility for accessibility reasons
                        // https://github.com/downshift-js/downshift?tab=readme-ov-file#getmenuprops
                        {...getMenuProps({}, { suppressRefError: true })}
                        data-has-interacted={hasInteractedSinceOpening ? 'true' : 'false'}
                        data-test-id="fondue-select-menu"
                    >
                        {
                            recursiveMap(
                                children,
                                (child, index) => {
                                    const isValid = <TProps,>(
                                        child: ReactNode,
                                    ): child is ReactElement<TProps> & { ref: ForwardedRef<HTMLElement> } =>
                                        // @ts-expect-error - We are explicitly checking for ref
                                        isValidElement<TProps>(child) && child.ref !== undefined;

                                    if (isValid<SelectItemProps>(child)) {
                                        const optionData = getSelectOptionValue(child.props);
                                        const itemProps = getItemProps({
                                            item: optionData,
                                            index,
                                            ...(child.ref ? { ref: child.ref } : {}),
                                        });

                                        const isSelected = selectedItems?.some(
                                            (selectedItem) => selectedItem.value === optionData.value,
                                        );

                                        return (
                                            <RadixSlot
                                                className={styles.item}
                                                data-highlighted={highlightedIndex === index}
                                                data-selected={isSelected}
                                                key={child.props.value}
                                                // Workaround for the issue where the onClick event is not fired on touch devices because of portal usage
                                                onTouchStart={(event) => {
                                                    if (itemProps.onClick) {
                                                        itemProps.onClick(event as unknown as MouseEvent<HTMLElement>);
                                                    }
                                                }}
                                                {...itemProps}
                                                aria-selected={isSelected}
                                            >
                                                {child}
                                            </RadixSlot>
                                        );
                                    }
                                },
                                filterText,
                            ).parsedChildren
                        }
                    </ul>
                </RadixPopover.Content>
            </ThemeProvider>
        </RadixPopover.Portal>
    );
};
SelectMenu.displayName = 'Select.Menu';
