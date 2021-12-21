import { MenuItemProps } from "@components/MenuItem";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { FocusStrategy } from "@react-types/shared";

export enum MenuStyle {
    WithBorder = "WithBorder",
    WithoutBorder = "WithoutBorder",
}

export type ActionMenuItemType = MenuItemType & { onClick: () => void };

export type ActionMenuBlock = {
    id: string;
    menuItems: ActionMenuItemType[];
    ariaLabel?: string;
};

export type ActionMenuProps = {
    ariaLabel?: string;
    menuBlocks: ActionMenuBlock[];
    focus?: FocusStrategy;
    scrollable?: boolean;
    style?: MenuStyle;
};

export type MenuItemType = MenuItemProps & { id: string | number };

export type MenuBlock = {
    id: string;
    menuItems: MenuItemType[];
    ariaLabel?: string;
};

export type SelectMenuProps = {
    menuBlocks: MenuBlock[];
    ariaProps: AriaListBoxOptions<any>;
    state: ListState<any>;
    ariaLabel?: string;
    scrollable?: boolean;
};
