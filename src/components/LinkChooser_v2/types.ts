/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemType } from "@components/Dropdown/SelectMenu/SelectMenu";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { AriaComboBoxProps } from "@react-types/combobox";
import { Node } from "@react-types/shared";
import { Validation } from "@utilities/validation";
import { InputHTMLAttributes, Key, MouseEvent, ReactElement, ReactNode, RefObject } from "react";

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
    selectedKey?: Key | null;
    onLinkChange: (value: SearchResult | null) => void;
    getGlobalByQuery: (query: string) => Promise<SearchResult[]>;
};

export type ComboBoxProps = AriaComboBoxProps<any> & {
    onClear?: () => void;
};

export type ExtraSection = {
    id: string;
    title: string;
    getResults?: (query: string) => Promise<SearchResult[]>;
    renderPreview?: (item: SearchResult) => ReactElement;
};

export type SearchResult = Omit<MenuItemType, "title"> & { id: string | number; link?: string; title: string };

export type SearchResultListProps = AriaListBoxOptions<unknown> & {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
};

export type SearchResultSectionProps = {
    section: Node<unknown>;
    state: ListState<unknown>;
};

export type SearchResultOptionProps = {
    item: Node<unknown>;
    state: ListState<unknown>;
};

export type SearchInputProps = {
    id?: string;
    ariaProps: InputHTMLAttributes<HTMLInputElement>;
    selectedKey: Key | null;
    decorator?: ReactElement;
    clearable?: boolean;
    required?: boolean;
    disabled?: boolean;
    validation?: Validation;
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
