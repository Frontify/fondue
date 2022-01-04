/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { MenuItemType, MenuBlock } from "@components/Menu/SelectMenu";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { InputHTMLAttributes } from "react";
import { RefObject, ReactNode, ReactElement } from "react";
import { Interpreter, DoneInvokeEvent } from "xstate";
import { Node } from "@react-types/shared";

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

export type TemplateMenuBlock = {
    id: string;
    menuItems: SearchResult[];
    ariaLabel?: string;
};

export type LinkChooserProps = {
    openInNewTab: boolean;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    onOpenInNewTabChange: (value: boolean) => void;
    onLinkChange: (value: SearchResult | null) => void;
    readonly clipboardOptions: Clipboard;
    readonly getGlobalByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly getGuidelinesByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly getTemplatesByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly openPreview: (value: string, target: string) => void;
};

export type SearchResult = Omit<MenuItemType, "title"> & { icon: string; title: string };

export type SearchResultListProps = AriaListBoxOptions<unknown> & {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    menuBlocks: (Omit<MenuBlock, "menuItems"> & { menuItems: SearchResult[] })[];
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

export type TemplateProps = {
    title: ReactNode;
    subtitle?: string;
    preview?: string;
};

export type SectionActionMenuProps = {
    machineService: MachineService;
};

export type SearchInputProps = {
    id?: string;
    ariaProps: InputHTMLAttributes<HTMLInputElement>;
    selectedResult: SearchResult | null;
    decorator?: ReactElement;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    machineService: MachineService;
    onClear?: () => void;
};

export type PopoverProps = {
    popoverRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
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
    copyId?: string;
    isFocused: boolean;
    buttonProps: React.HTMLAttributes<HTMLElement>;
    icon: ReactElement;
    onClick?: () => void;
};
