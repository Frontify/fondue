/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AriaListBoxOptions } from '@react-aria/listbox';
import { type ComboBoxState } from '@react-stately/combobox';
import { type ListState } from '@react-stately/list';
import { type Node } from '@react-types/shared';
import {
    type HTMLAttributes,
    type InputHTMLAttributes,
    type Key,
    type KeyboardEvent,
    type MouseEvent,
    type MutableRefObject,
    type ReactElement,
    type ReactNode,
    type RefObject,
} from 'react';
import { type DoneInvokeEvent, type Interpreter } from 'xstate';

import { type CheckboxState } from '@components/Checkbox/Checkbox';
import { type MenuBlock, type MenuItemType } from '@components/Dropdown/SelectMenu/SelectMenu';
import { type Validation } from '@utilities/validation';

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

export enum IconName {
    Block = 'BLOCK',
    Document = 'DOCUMENT',
    Library = 'LIBRARY',
    Link = 'LINK',
    External = 'EXTERNAL',
    Template = 'TEMPLATE',
}

export type ExtraSection = {
    id: string;
    title: string;
    getResults?: (query: string) => Promise<SearchResult[]>;
    renderPreview?: (item: SearchResult) => ReactElement;
};

export type LinkChooserProps = {
    selectedResult?: SearchResult | null;
    openInNewTab: boolean;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    required?: boolean;
    validation?: Validation;
    extraSections?: ExtraSection[];
    onOpenInNewTabChange: (value: boolean) => void;
    onLinkChange: (value: SearchResult | null) => void;
    readonly clipboardOptions?: Clipboard;
    readonly getGlobalByQuery?: (query: string) => Promise<SearchResult[]>;
    readonly openPreview?: (value: string, target: string) => void;
    'data-test-id'?: string;
};

export type SearchResult = Omit<MenuItemType, 'title'> & { icon: string; title: string; local?: boolean };

export type ImageSearchResult = SearchResult & { preview: string };

export type SearchMenuBlock = Omit<MenuBlock, 'menuItems'> & { menuItems: SearchResult[] };

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
    direction?: 'left' | 'right';
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
    extraSections: ExtraSection[];
    currentSectionId: string;
    getExtraResultsByQuery: ((query: string) => Promise<SearchResult[]>) | null;
    readonly clipboardOptions: Clipboard;
    readonly getGlobalByQuery: (query: string) => Promise<SearchResult[]>;
    readonly onLinkChange: (value: SearchResult | null) => void;
    readonly openPreview: (value: string, target: string) => void;
};

export type LinkChooserEventData = {
    searchResults?: SearchResult[];
    selectedResult?: SearchResult | null;
    query?: string;
    openInNewTab?: CheckboxState;
    getExtraResultsByQuery?: ((query: string) => Promise<SearchResult[]>) | null;
    currentSectionId?: string;
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
