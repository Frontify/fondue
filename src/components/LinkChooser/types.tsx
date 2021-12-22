/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from "@components/Checkbox/Checkbox";
import { MenuBlock, MenuItemType } from "@components/Menu/types";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconDocumentLibrary from "@foundation/Icon/Generated/IconDocumentLibrary";
import IconExternalLink from "@foundation/Icon/Generated/IconExternalLink";
import IconLink from "@foundation/Icon/Generated/IconLink";
import IconTemplate from "@foundation/Icon/Generated/IconTemplate";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import React, { HTMLAttributes, InputHTMLAttributes, ReactElement, ReactNode, RefObject } from "react";
import { DoneInvokeEvent, Interpreter } from "xstate";

export enum IconType {
    Document = "Document",
    Library = "Library",
    Link = "Link",
    External = "External",
    Template = "Template",
}

export const IconOptions: Record<IconType | string, ReactElement> = {
    [IconType.Document]: <IconDocument />,
    [IconType.Library]: <IconDocumentLibrary />,
    [IconType.Link]: <IconLink />,
    [IconType.External]: <IconExternalLink />,
    [IconType.Template]: <IconTemplate />,
};

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

export type SearchResult = Omit<MenuItemType, "title" | "decorator"> & {
    title: string;
    link?: string;
    preview?: string;
    icon?: IconType;
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
    readonly getGlobalByQuery: (query: string) => Promise<SearchResult[]>;
    readonly getTemplatesByQuery: (query: string) => Promise<SearchResult[]>;
    readonly openPreview: (value: string, target: string) => void;
};

export type SearchResultListProps = AriaListBoxOptions<unknown> & {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    menuBlocks: MenuBlock[];
    border?: boolean;
    hasItems?: boolean;
    query: string;
    machineService: MachineService;
};

export type SearchResultSectionProps = {
    heading: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, MenuItemType>;
    machineService: MachineService;
};

export type SearchResultOptionProps = {
    item: Node<unknown>;
    state: ListState<unknown>;
    keyItemRecord: Record<string, MenuItemType>;
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
    ariaProps: InputHTMLAttributes<HTMLInputElement>;
    disabled?: boolean;
    clearable?: boolean;
    selectedResult: SearchResult | null;
    decorator?: ReactElement;
    placeholder?: string;
    onClear?: () => void;
    onClick?: () => void;
    machineService: MachineService;
};

export type PopoverProps = {
    children: ReactNode;
    onClose: () => void;
    popoverRef?: RefObject<HTMLDivElement>;
    isOpen?: boolean;
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

export type ButtonProps = {
    disabled: boolean;
    title: string;
    ariaLabel: string;
    testId: string;
    copyId?: string;
    isFocused: boolean;
    buttonProps: HTMLAttributes<HTMLElement>;
    icon: ReactElement;
    onClick?: () => void;
};
