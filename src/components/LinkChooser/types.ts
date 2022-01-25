/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { MenuItemType, MenuBlock } from "@components/Dropdown/SelectMenu/SelectMenu";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import {
    HTMLAttributes,
    InputHTMLAttributes,
    Key,
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
    RefObject,
    ReactNode,
    ReactElement,
} from "react";
import { Interpreter, DoneInvokeEvent } from "xstate";
import { Node } from "@react-types/shared";
import { Validation } from "@components/TextInput";
import { ComboBoxState } from "@react-stately/combobox";

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

export const validationClassMap: Record<Validation, string> = {
    [Validation.Default]: "tw-border-black-20",
    [Validation.Loading]: "tw-border-black-10",
    [Validation.Success]: "tw-border-green-50",
    [Validation.Error]: "tw-border-red-60",
};

export enum IconLabel {
    Document = "DOCUMENT",
    Library = "LIBRARY",
    Link = "LINK",
    External = "EXTERNAL",
    Template = "TEMPLATE",
}

export type LinkChooserProps = {
    openInNewTab: boolean;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    required?: boolean;
    validation?: Validation;
    onOpenInNewTabChange: (value: boolean) => void;
    onLinkChange: (value: SearchResult | null) => void;
    readonly clipboardOptions?: Clipboard;
    readonly getGlobalByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly getGuidelinesByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly getTemplatesByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly openPreview?: (value: string, target: string) => void;
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
    query: string;
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
    section: { id: string; title: string };
    onPress: (event: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void;
    state: ListState<unknown>;
    direction?: "left" | "right";
    title: ReactNode;
};

export type SectionActionMenuItemProps = {
    section: { id: string; title: string };
    onPress: (event: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void;
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

export type LinkChooserContext = {
    searchResults: SearchResult[];
    selectedResult: SearchResult | null;
    query: string;
    interruptedFetch: boolean;
    readonly clipboardOptions: Clipboard;
    readonly getGlobalByQuery: (query: string) => Promise<SearchResult[]>; // context.getTemplateByQuery
    readonly getTemplatesByQuery: (query: string) => Promise<SearchResult[]>; // context.getTemplateByQuery
    readonly getGuidelinesByQuery: (query: string) => Promise<SearchResult[]>; // context.getGuidelinesByQuery
    readonly onLinkChange: (value: SearchResult | null) => void;
    readonly openPreview: (value: string, target: string) => void;
};

export type LinkChooserEventData = {
    searchResults?: SearchResult[];
    selectedResult?: SearchResult | null;
    query?: string;
    openInNewTab?: CheckboxState;
};

export type Clipboard = {
    writeText(newClipText: string): Promise<void>;
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

export type ManualComboBoxEventProps = {
    inputProps: HTMLAttributes<HTMLInputElement>;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    popoverRef: MutableRefObject<HTMLDivElement | null>;
    state: ComboBoxState<object>;
};

export type ManualComboBoxEvents = {
    onOpen: () => void;
    onClose: () => void;
    onNavigate: (key: Key) => void;
    onSelect: (key: Key) => void;
};
