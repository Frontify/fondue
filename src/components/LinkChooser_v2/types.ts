/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuBlock, MenuItemType } from "@components/Dropdown/SelectMenu/SelectMenu";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import { Validation } from "@utilities/validation";
import { InputHTMLAttributes, Key, KeyboardEvent, MouseEvent, ReactElement, ReactNode, RefObject } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";
import { LinkChooserContext, LinkChooserEventData } from "./state/machine";

export type MachineService = Interpreter<
    LinkChooserContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    DoneInvokeEvent<LinkChooserEventData>,
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
        context: LinkChooserContext;
    }
>;

export enum IconLabel {
    Block = "BLOCK",
    Document = "DOCUMENT",
    Library = "LIBRARY",
    Link = "LINK",
    External = "EXTERNAL",
    Template = "TEMPLATE",
}

export type ExtraSection = {
    id: string;
    title: string;
    getResults?: (query: string) => Promise<SearchResult[]>;
    renderPreview?: (item: SearchResult) => ReactElement;
};

export type LinkChooserProps = {
    openInNewTab: boolean;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    required?: boolean;
    validation?: Validation;
    extraSections?: ExtraSection[];
    activeSearchResultId?: Key | null;
    onOpenInNewTabChange: (value: boolean) => void;
    onLinkChange: (value: SearchResult | null) => void;
    readonly getGlobalByQuery?: (query: string) => Promise<SearchResult[]>;
};

export type SearchResult = Omit<MenuItemType, "title"> & { icon: string; title: string; local?: boolean };

export type ImageSearchResult = SearchResult & { preview: string };

export type SearchMenuBlock = Omit<MenuBlock, "menuItems"> & { menuItems: SearchResult[] };

export type SearchResultListProps = AriaListBoxOptions<unknown> & {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    menuBlocks: SearchMenuBlock[];
    border?: boolean;
    hasItems?: boolean;
    machineService: MachineService;
};

export type SearchResultSectionProps = {
    heading: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, SearchResult>;
    machineService: MachineService;
};

export type SearchResultOptionProps = {
    item: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, SearchResult>;
    machineService: MachineService;
};

export type ImageMenuItemProps = {
    title: ReactNode;
    subtitle?: string;
    preview?: string;
};

export type NavigationMenuProps = {
    machineService: MachineService;
    state: ListState<unknown>;
};

export type NavigationMenuItemProps = {
    section: ExtraSection;
    onPress: (event: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void;
    state: ListState<unknown>;
    direction?: "left" | "right";
};

export type SearchInputProps = {
    id?: string;
    ariaProps: InputHTMLAttributes<HTMLInputElement>;
    selectedResult: SearchResult | null;
    decorator?: ReactElement;
    clearable?: boolean;
    required?: boolean;
    disabled?: boolean;
    machineService: MachineService;
    validation: Validation;
    onClear?: () => void;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
};

export type PopoverProps = {
    popoverRef?: RefObject<HTMLDivElement>;
    maxHeight?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
};

export type IconButtonProps = {
    disabled: boolean;
    title: string;
    ariaLabel: string;
    testId: string;
    icon: ReactElement;
    isComboBoxControl?: boolean;
    onClick?: () => void;
};
