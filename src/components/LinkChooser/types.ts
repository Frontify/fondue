import { CheckboxState } from "@components/Checkbox/Checkbox";
import { MenuItemType, MenuBlock } from "@components/Menu/SelectMenu";
import { Validation } from "@components/TextInput/TextInput";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { ListState } from "@react-stately/list";
import { KeyboardEvent, FocusEvent } from "react";
import { RefObject, ReactNode, HTMLInputTypeAttribute, ReactElement, ChangeEventHandler } from "react";
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
    getGlobalByQuery?: (query: string) => Promise<SearchResult[]>;
    getGuidelinesByQuery?: (query: string) => Promise<SearchResult[]>;
    getTemplatesByQuery?: (query: string) => Promise<SearchResult[]>;
    openInNewTab: CheckboxState;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    onOpenInNewTabChange: (value: boolean) => void;
    onLinkChange: (value: SearchResult) => void;
};

export type SearchResult = Omit<MenuItemType, "title"> & { icon: string; title: string };

export type SearchResultListProps = AriaListBoxOptions<unknown> & {
    listBoxRef?: RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    menuBlocks: (Omit<MenuBlock, "menuItems"> & { menuItems: SearchResult[] })[];
    noBorder?: boolean;
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
    selectedResult: SearchResult | null;
    type?: HTMLInputTypeAttribute;
    decorator?: ReactElement;
    dotted?: boolean;
    previewable?: boolean;
    copyable?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validation?: Validation;
    value?: string | number | readonly string[];
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onEnterPressed?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    onPreview?: () => void;
    onClick?: () => void;
    size?: number;
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
    openInNewTab: CheckboxState;
    onOpenInNewTabChange: (value: boolean) => void;
    readonly getGlobalByQuery: (query: string) => Promise<SearchResult[]>; // context.getTemplateByQuery
    readonly getTemplatesByQuery: (query: string) => Promise<SearchResult[]>; // context.getTemplateByQuery
    readonly onLinkChange: (value: SearchResult) => void;
};

export type LinkChooserEventData = {
    searchResults?: SearchResult[];
    selectedResult?: SearchResult | null;
    query?: string;
    openInNewTab?: CheckboxState;
};
