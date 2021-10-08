import React, { ReactElement, HTMLAttributes, FC, PropsWithChildren, ReactNode, KeyboardEvent, FocusEvent, CSSProperties, ReactChild, MouseEvent } from 'react';
import { AriaListBoxOptions } from '@react-aria/listbox';
import { SelectState } from '@react-stately/select';
import { FocusStrategy } from '@react-types/shared';
import { AriaTooltipProps } from '@react-types/tooltip';

declare enum MenuItemContentSize {
    Small = "Small",
    Large = "Large"
}
declare enum MenuItemContentStyle {
    Primary = "Primary",
    Danger = "Danger"
}
declare type MenuItemContentProps = {
    title: string;
    decorator?: ReactElement;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
};
declare const MenuItemContent: FC<MenuItemContentProps>;

declare enum MenuItemStyle {
    Primary = "Primary",
    Danger = "Danger"
}
declare enum SelectionIndicatorIcon {
    Check = "Check",
    CaretRight = "CaretRight"
}
declare type MenuItemProps = {
    style?: MenuItemStyle;
    size?: MenuItemContentSize;
    disabled?: boolean;
    active?: boolean;
    selectionIndicator?: SelectionIndicatorIcon;
} & Omit<MenuItemContentProps, "iconSize">;
declare const MenuItem: FC<MenuItemProps>;

declare type MenuItemType = MenuItemProps & {
    id: string | number;
};
declare type MenuBlock = {
    id: string;
    menuItems: MenuItemType[];
    ariaLabel?: string;
};
declare type SelectMenuProps = {
    menuBlocks: MenuBlock[];
    ariaProps: AriaListBoxOptions<any>;
    state: SelectState<any>;
    ariaLabel?: string;
};
declare const SelectMenu: ({ menuBlocks, ariaProps, state, ariaLabel, }: SelectMenuProps) => ReactElement<SelectMenuProps>;

declare type ActionMenuItemType = MenuItemType & {
    onClick: () => void;
};
declare type ActionMenuBlock = {
    id: string;
    menuItems: ActionMenuItemType[];
    ariaLabel?: string;
};
declare type ActionMenuProps = {
    ariaLabel?: string;
    menuBlocks: ActionMenuBlock[];
    focus?: FocusStrategy;
};
declare const ActionMenu: ({ menuBlocks, ariaLabel, focus, }: ActionMenuProps) => ReactElement<ActionMenuProps>;

declare enum IconSize {
    Size8 = "Size8",
    Size12 = "Size12",
    Size16 = "Size16",
    Size20 = "Size20",
    Size24 = "Size24",
    Size32 = "Size32"
}
declare const IconSizeMap: {
    Size8: string;
    Size12: string;
    Size16: string;
    Size20: string;
    Size24: string;
    Size32: string;
};

interface IconProps {
    size?: IconSize;
}

declare type BaseAsset = {
    name: string;
};
declare type OtherAsset = BaseAsset & {
    type: "audio";
    extension: string;
    src?: undefined;
    alt?: undefined;
    icon?: undefined;
    size: number;
};
declare type ImageAsset = BaseAsset & {
    type: "image" | "logo";
    extension: string;
    src: string;
    alt?: string;
    icon?: undefined;
    size: number;
};
declare type IconAsset = BaseAsset & {
    type: "icon";
    extension?: undefined;
    src?: undefined;
    alt?: undefined;
    icon: ReactElement<IconProps>;
    size?: undefined;
};
declare type UploadSource = {
    source: "upload";
    sourceName?: undefined;
};
declare type LibrarySource = {
    source: "library";
    sourceName: string;
};
declare enum AssetInputSize {
    Small = "Small",
    Large = "Large"
}
declare type AssetProps = {
    asset: (ImageAsset & UploadSource) | (ImageAsset & LibrarySource) | (IconAsset & UploadSource) | (IconAsset & LibrarySource) | (OtherAsset & UploadSource) | (OtherAsset & LibrarySource);
    size: AssetInputSize;
    actions: ActionMenuProps["menuBlocks"];
};
declare type AssetInputProps = (AssetProps & {
    onUploadClick?: undefined;
    onLibraryClick?: undefined;
}) | {
    asset?: undefined;
    actions?: undefined;
    size?: undefined;
    onUploadClick: () => void;
    onLibraryClick?: () => void;
};
declare const AssetInput: FC<AssetInputProps>;

declare enum BadgeStatus {
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger"
}
declare enum BadgeStyle {
    Primary = "Primary",
    Positive = "Positive",
    Progress = "Progress",
    Warning = "Warning",
    Danger = "Danger"
}
declare type BadgeProps = PropsWithChildren<{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatus | string;
    onClick?: () => void;
    onDismiss?: () => void;
}>;
declare const Badge: FC<BadgeProps>;

declare type Breadcrumb = {
    label: string;
    link?: string;
    onClick?: () => void;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
};
declare type BreadcrumbsProps = {
    items: Breadcrumb[];
};
declare const Breadcrumbs: FC<BreadcrumbsProps>;

declare const BreadcrumbItem: React.ForwardRefExoticComponent<Pick<Breadcrumb, "link" | "label" | "onClick"> & {
    showSeparator: boolean;
    ariaProps: HTMLAttributes<HTMLElement>;
} & React.RefAttributes<HTMLSpanElement | HTMLAnchorElement | HTMLButtonElement | null>>;

declare const CurrentBreadcrumbItem: React.ForwardRefExoticComponent<Breadcrumb & {
    ariaProps: HTMLAttributes<HTMLElement>;
} & React.RefAttributes<HTMLSpanElement | HTMLAnchorElement | HTMLButtonElement | null>>;

declare type Color = {
    value?: string;
    rgba?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    hex: string;
    alpha?: number;
    name?: string;
};

declare type Palette = {
    title: string;
    colors: Color[];
};
declare type ColorPickerProps = {
    palettes?: Palette[];
    currentColor: Color;
    onSelect: (color: Color) => void;
};
declare enum ColorFormat {
    Hex = "Hex",
    Rgba = "Rgba"
}
declare const ColorPicker: FC<ColorPickerProps>;

declare const BrandColorPicker: FC<ColorPickerProps>;

declare enum TextInputType {
    Text = "text",
    Password = "password",
    Number = "number"
}
declare enum Validation {
    Default = "Default",
    Loading = "Loading",
    Success = "Success",
    Error = "Error"
}
declare type TextInputBaseProps = {
    id?: string;
    type?: TextInputType;
    decorator?: ReactNode;
    dotted?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validation?: Validation;
    value?: string;
    onChange?: (value: string) => void;
    onEnterPressed?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    size?: number;
};
declare type TextInputProps = ({
    type?: TextInputType.Text;
    obfuscated?: false;
} & TextInputBaseProps) | ({
    type?: TextInputType.Number;
    obfuscated?: false;
    min?: number;
    max?: number;
} & TextInputBaseProps) | ({
    type: TextInputType.Password;
    obfuscated?: boolean;
} & TextInputBaseProps);
declare const TextInput: FC<TextInputProps>;

declare type ColorInputProps = {
    min?: number;
    max?: number;
} & Pick<TextInputBaseProps, "decorator" | "value" | "onChange" | "type" | "size" | "onBlur">;
declare const ColorInput: FC<ColorInputProps>;

declare const CustomColorPicker: FC<Omit<ColorPickerProps, "palette">>;

declare enum DropdownSize {
    Small = "Small",
    Large = "Large"
}
declare type DropdownProps = {
    id?: string;
    menuBlocks: MenuBlock[];
    onChange: (id?: string | number) => void;
    activeItemId?: string | number;
    placeholder?: string;
    size?: DropdownSize;
    disabled?: boolean;
    clearable?: boolean;
    ariaLabel?: string;
};
declare const Dropdown: FC<DropdownProps>;

declare const FLYOUT_DIVIDER_COLOR = "#eaebeb";
declare const FLYOUT_DIVIDER_HEIGHT = "10px";
declare type FlyoutProps = PropsWithChildren<{
    trigger: ReactNode;
    onClose?: () => void;
    onClick?: () => void;
    title?: string;
    decorator?: ReactNode;
    badges?: BadgeProps[];
}>;
declare const Flyout: FC<FlyoutProps>;

declare type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    children: ReactNode;
};
declare const AriaList: React.ForwardRefExoticComponent<AriaListProps & React.RefAttributes<HTMLUListElement | null>>;

declare type AriaOptionProps = {
    menuItem: MenuItemType | ActionMenuItemType;
    ariaProps: HTMLAttributes<HTMLElement>;
    isSelected?: boolean;
};
declare const AriaMenuItem: React.ForwardRefExoticComponent<AriaOptionProps & React.RefAttributes<HTMLLIElement | null>>;

declare type AriaSectionProps = {
    sectionProps: HTMLAttributes<HTMLElement>;
    groupProps: HTMLAttributes<HTMLElement>;
};
declare const AriaSection: FC<AriaSectionProps>;

declare type MenuStateType = {
    "aria-label": string;
    children: ReactNode;
};
declare const mapToAriaProps: (ariaLabel: string, menuBlocks: MenuBlock[] | ActionMenuBlock[]) => {
    "aria-label": string;
    children: JSX.Element[];
};
declare const getMenuItems: <T extends MenuBlock | ActionMenuBlock = MenuBlock>(menuBlocks: T[]) => T["menuItems"];
declare const getKeyItemRecord: <T extends MenuItemType | ActionMenuItemType = MenuItemType>(items: T[]) => Record<string, T>;
declare const getDisabledItemIds: <T extends MenuItemType | ActionMenuItemType = MenuItemType>(items: T[]) => Set<string>;

declare type IconItem = {
    id: string;
    icon: ReactElement<IconProps>;
    ariaLabel: string;
};
declare type TextOrNumberItem = {
    id: string;
    value: string | number;
};
declare type SliderProps = {
    id?: string;
    items: TextOrNumberItem[] | IconItem[];
    activeItemId: string;
    onChange: (id: string) => void;
    ariaLabel?: string;
    disabled?: boolean;
};
declare const Slider: FC<SliderProps>;

declare enum BrightHeaderStyle {
    Information = "Information",
    Warning = "Warning",
    Tip = "Tip",
    Note = "Note"
}
declare const brightHeaderBackgroundColors: Record<BrightHeaderStyle, string>;
declare type BrightHeaderProps = {
    headerStyle: BrightHeaderStyle;
};
declare const BrightHeader: FC<BrightHeaderProps>;

declare type TooltipButton = {
    label: string;
    action: () => void;
};
declare type PopperAttributes = {
    [key: string]: string;
};
declare type TooltipProps = {
    content: ReactNode;
    tooltipIcon?: ReactElement;
    heading?: ReactNode;
    headingIcon?: ReactElement;
    linkUrl?: string;
    linkLabel?: string;
    brightHeader?: BrightHeaderStyle;
    buttons?: [TooltipButton, TooltipButton] | [TooltipButton];
    tooltipAriaProps?: AriaTooltipProps;
    style?: CSSProperties;
    children?: ReactChild;
    popperAttributes?: PopperAttributes;
};
declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLDivElement>>;

declare type TooltipArrowProps = {
    style: CSSProperties;
    headerColor?: BrightHeaderStyle;
    placement?: string;
};
declare const TooltipArrow: React.ForwardRefExoticComponent<TooltipArrowProps & React.RefAttributes<HTMLDivElement>>;

declare type TreeNodeProps = {
    id: string;
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    nodes?: TreeNodeProps[];
};
declare type NodeProps = {
    node: TreeNodeProps;
    strong?: boolean;
    activeNodeId?: string | null;
    parentIds?: string[];
    onClick: (id: string | null) => void;
};
declare const TreeNode: ({ node: { id, value, name, label, icon, nodes }, strong, activeNodeId, onClick, parentIds, }: NodeProps) => ReactElement<NodeProps>;

declare type TreeProps = {
    nodes: TreeNodeProps[];
    onSelect: (id: string | null) => void;
    activeNodeId?: string | null;
};
declare const Tree: FC<TreeProps>;

declare enum FieldsetHeaderSize {
    Small = "Small",
    Large = "Large"
}
declare enum FieldsetHeaderType {
    Default = "Default",
    Switch = "Switch",
    Accordion = "Accordion",
    AddRemove = "AddRemove"
}
declare type FieldsetHeaderProps = {
    size?: FieldsetHeaderSize;
    active?: boolean;
    decorator?: ReactNode;
    type?: FieldsetHeaderType;
    disabled?: boolean;
    bold?: boolean;
    children: string;
    onClick?: () => void;
    as?: keyof JSX.IntrinsicElements;
    tabIndex?: number;
};
declare const FieldsetHeader: FC<FieldsetHeaderProps>;

declare type AccordionItemProps = PropsWithChildren<{
    header: FieldsetHeaderProps;
}>;
declare type AccordionProps = {
    children?: ReactNode;
};
declare const AccordionItem: ({ children }: AccordionItemProps) => ReactElement;
declare const Accordion: FC<AccordionProps>;

declare enum ButtonStyle {
    Secondary = "Secondary",
    Primary = "Primary",
    Danger = "Danger",
    Positive = "Positive"
}
declare enum ButtonSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}
declare type ButtonProps = {
    style?: ButtonStyle;
    size?: ButtonSize;
    solid?: boolean;
    inverted?: boolean;
    disabled?: boolean;
    icon?: ReactElement;
    children?: string;
    onClick?: () => void;
};
declare const Button: FC<ButtonProps>;

declare type ButtonGroupProps = PropsWithChildren<{
    size: ButtonSize;
}>;
declare const ButtonGroup: FC<ButtonGroupProps>;

declare enum ChecklistDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical"
}
declare type Columns = 1 | 2 | 3 | 4;
declare type ChecklistVertical = {
    direction: ChecklistDirection.Vertical;
    columns?: Columns;
};
declare type ChecklistHorizontal = {
    direction: ChecklistDirection.Horizontal;
    columns?: null;
};
declare type ChecklistProps = PropsWithChildren<ChecklistVertical | ChecklistHorizontal>;
declare const Checklist: FC<ChecklistProps>;

declare type InputLabelProps = PropsWithChildren<{
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    bold?: boolean;
}>;
declare const InputLabel: FC<InputLabelProps>;

declare enum FormControlStyle {
    Primary = "Primary",
    Positive = "Positive",
    Danger = "Danger"
}
declare type HelperTextProps = {
    text: string;
    style: FormControlStyle;
    disabled?: boolean;
    fullWidth?: boolean;
};
declare enum HelperPosition {
    Before = "Before",
    After = "After"
}
declare enum FormControlDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical"
}
declare type FormControlProps = PropsWithChildren<{
    direction?: FormControlDirection;
    disabled?: boolean;
    label?: Omit<InputLabelProps, "disabled">;
    extra?: ReactNode;
    helper?: Omit<HelperTextProps, "disabled" | "style"> & {
        position?: HelperPosition;
    };
    style?: FormControlStyle;
}>;
declare const FormControl: FC<FormControlProps>;

declare enum AddBlockButtonDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical"
}
declare type AddBlockButtonProps = {
    onClick: () => void;
    title?: string;
    orientation?: AddBlockButtonDirection;
};
declare const AddBlockButton: FC<AddBlockButtonProps>;

declare enum CheckboxState {
    Checked = "Checked",
    Unchecked = "Unchecked",
    Mixed = "Mixed"
}
declare type CheckboxProps = {
    id?: string;
    state?: CheckboxState;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (isChecked: boolean) => void;
    label?: string;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    note?: string;
};
declare const Checkbox: FC<CheckboxProps>;

declare enum DividerStyle {
    NoLine = "noline",
    Dashed = "dashed",
    Solid = "solid",
    Dotted = "dotted"
}
declare enum DividerHeight {
    Small = "36px",
    Medium = "60px",
    Large = "96px"
}
declare type DividerProps = {
    style?: DividerStyle;
    height?: DividerHeight | string;
    color?: string;
};
declare const Divider: FC<DividerProps>;

declare type RadioPillProps = {
    label: string;
    active: boolean;
    icon?: React.ReactElement;
};
declare const RadioPill: FC<RadioPillProps>;

declare enum SwitchSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}
declare type SwitchProps = {
    id?: string;
    on?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    size?: SwitchSize;
    hug?: boolean;
    tooltip?: Omit<TooltipProps, "tooltipAriaProps">;
    onChange?: (e: MouseEvent) => void;
};
declare const Switch: FC<SwitchProps>;

declare enum TagType {
    Suggested = "Suggested",
    Selected = "Selected",
    SelectedWithFocus = "SelectedWithFocus",
    PreviouslySelected = "PreviouslySelected"
}
declare const tagStyles: Record<TagType, string>;
declare type TagProps = TagPropsUnselected | TagPropsSelected;
declare type TagPropsSelected = {
    type: TagType.Selected | TagType.SelectedWithFocus;
    label: string;
    onClick: () => void;
};
declare type TagPropsUnselected = {
    type: TagType.Suggested | TagType.PreviouslySelected;
    label: string;
    onClick?: null;
};
declare const Tag: FC<TagProps>;

declare type TextareaProps = PropsWithChildren<{
    id?: string;
    required?: boolean;
    decorator?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
}>;
declare const Textarea: FC<TextareaProps>;

declare function IconAcademy(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAcademy: React.MemoExoticComponent<typeof IconAcademy>;

declare function IconActions(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconActions: React.MemoExoticComponent<typeof IconActions>;

declare function IconActivities(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconActivities: React.MemoExoticComponent<typeof IconActivities>;

declare function IconActivity(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconActivity: React.MemoExoticComponent<typeof IconActivity>;

declare function IconAdd(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAdd: React.MemoExoticComponent<typeof IconAdd>;

declare function IconAddSimple(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAddSimple: React.MemoExoticComponent<typeof IconAddSimple>;

declare function IconAddToCollection(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAddToCollection: React.MemoExoticComponent<typeof IconAddToCollection>;

declare function IconAdobeCreativeCloud(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAdobeCreativeCloud: React.MemoExoticComponent<typeof IconAdobeCreativeCloud>;

declare function IconAlignBottom(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAlignBottom: React.MemoExoticComponent<typeof IconAlignBottom>;

declare function IconAlignCenter(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAlignCenter: React.MemoExoticComponent<typeof IconAlignCenter>;

declare function IconAlignLeft(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAlignLeft: React.MemoExoticComponent<typeof IconAlignLeft>;

declare function IconAlignMiddle(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAlignMiddle: React.MemoExoticComponent<typeof IconAlignMiddle>;

declare function IconAlignRight(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAlignRight: React.MemoExoticComponent<typeof IconAlignRight>;

declare function IconAlignTop(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAlignTop: React.MemoExoticComponent<typeof IconAlignTop>;

declare function IconAnalytics(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAnalytics: React.MemoExoticComponent<typeof IconAnalytics>;

declare function IconAngleDown(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAngleDown: React.MemoExoticComponent<typeof IconAngleDown>;

declare function IconAnimalsNature(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAnimalsNature: React.MemoExoticComponent<typeof IconAnimalsNature>;

declare function IconAnnotations(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAnnotations: React.MemoExoticComponent<typeof IconAnnotations>;

declare function IconAppearance(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAppearance: React.MemoExoticComponent<typeof IconAppearance>;

declare function IconApprove(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconApprove: React.MemoExoticComponent<typeof IconApprove>;

declare function IconArrow(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconArrow: React.MemoExoticComponent<typeof IconArrow>;

declare function IconArrowDown(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconArrowDown: React.MemoExoticComponent<typeof IconArrowDown>;

declare function IconArrowLeft(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconArrowLeft: React.MemoExoticComponent<typeof IconArrowLeft>;

declare function IconArrowRight(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconArrowRight: React.MemoExoticComponent<typeof IconArrowRight>;

declare function IconArrowUp(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconArrowUp: React.MemoExoticComponent<typeof IconArrowUp>;

declare function IconAssets(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAssets: React.MemoExoticComponent<typeof IconAssets>;

declare function IconAttachment(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAttachment: React.MemoExoticComponent<typeof IconAttachment>;

declare function IconAttentionFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAttentionFilled: React.MemoExoticComponent<typeof IconAttentionFilled>;

declare function IconAttributes(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAttributes: React.MemoExoticComponent<typeof IconAttributes>;

declare function IconAudio(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconAudio: React.MemoExoticComponent<typeof IconAudio>;

declare function IconBackward5Seconds(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconBackward5Seconds: React.MemoExoticComponent<typeof IconBackward5Seconds>;

declare function IconBold(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconBold: React.MemoExoticComponent<typeof IconBold>;

declare function IconBookmark(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconBookmark: React.MemoExoticComponent<typeof IconBookmark>;

declare function IconBrand(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconBrand: React.MemoExoticComponent<typeof IconBrand>;

declare function IconBriefing(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconBriefing: React.MemoExoticComponent<typeof IconBriefing>;

declare function IconBuilder(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconBuilder: React.MemoExoticComponent<typeof IconBuilder>;

declare function IconButton(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconButton: React.MemoExoticComponent<typeof IconButton>;

declare function IconCalendar(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCalendar: React.MemoExoticComponent<typeof IconCalendar>;

declare function IconCallout(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCallout: React.MemoExoticComponent<typeof IconCallout>;

declare function IconCampaign(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCampaign: React.MemoExoticComponent<typeof IconCampaign>;

declare function IconCampaignActivity(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCampaignActivity: React.MemoExoticComponent<typeof IconCampaignActivity>;

declare function IconCards(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCards: React.MemoExoticComponent<typeof IconCards>;

declare function IconCaretDown(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCaretDown: React.MemoExoticComponent<typeof IconCaretDown>;

declare function IconCaretLeft(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCaretLeft: React.MemoExoticComponent<typeof IconCaretLeft>;

declare function IconCaretRight(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCaretRight: React.MemoExoticComponent<typeof IconCaretRight>;

declare function IconCaretUp(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCaretUp: React.MemoExoticComponent<typeof IconCaretUp>;

declare function IconCenter(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCenter: React.MemoExoticComponent<typeof IconCenter>;

declare function IconCheck(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCheck: React.MemoExoticComponent<typeof IconCheck>;

declare function IconCheckFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCheckFilled: React.MemoExoticComponent<typeof IconCheckFilled>;

declare function IconCircle(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCircle: React.MemoExoticComponent<typeof IconCircle>;

declare function IconCollapse(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCollapse: React.MemoExoticComponent<typeof IconCollapse>;

declare function IconCollectionLarge(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCollectionLarge: React.MemoExoticComponent<typeof IconCollectionLarge>;

declare function IconCollectionMedium(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCollectionMedium: React.MemoExoticComponent<typeof IconCollectionMedium>;

declare function IconCollectionSmall(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCollectionSmall: React.MemoExoticComponent<typeof IconCollectionSmall>;

declare function IconColors(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconColors: React.MemoExoticComponent<typeof IconColors>;

declare function IconColorScale(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconColorScale: React.MemoExoticComponent<typeof IconColorScale>;

declare function IconColorScaleSmall(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconColorScaleSmall: React.MemoExoticComponent<typeof IconColorScaleSmall>;

declare function IconColorScaleTall(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconColorScaleTall: React.MemoExoticComponent<typeof IconColorScaleTall>;

declare function IconColorSwatch(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconColorSwatch: React.MemoExoticComponent<typeof IconColorSwatch>;

declare function IconColumnBreak(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconColumnBreak: React.MemoExoticComponent<typeof IconColumnBreak>;

declare function IconCopyToClipboard(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCopyToClipboard: React.MemoExoticComponent<typeof IconCopyToClipboard>;

declare function IconCrop(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCrop: React.MemoExoticComponent<typeof IconCrop>;

declare function IconCursorClick(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCursorClick: React.MemoExoticComponent<typeof IconCursorClick>;

declare function IconCut(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconCut: React.MemoExoticComponent<typeof IconCut>;

declare function IconDivider(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDivider: React.MemoExoticComponent<typeof IconDivider>;

declare function IconDocument(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDocument: React.MemoExoticComponent<typeof IconDocument>;

declare function IconDocumentLibrary(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDocumentLibrary: React.MemoExoticComponent<typeof IconDocumentLibrary>;

declare function IconDoDontsStrikethrough(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDoDontsStrikethrough: React.MemoExoticComponent<typeof IconDoDontsStrikethrough>;

declare function IconDoDontsUnderline(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDoDontsUnderline: React.MemoExoticComponent<typeof IconDoDontsUnderline>;

declare function IconDosImages(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDosImages: React.MemoExoticComponent<typeof IconDosImages>;

declare function IconDosText(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDosText: React.MemoExoticComponent<typeof IconDosText>;

declare function IconDownload(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDownload: React.MemoExoticComponent<typeof IconDownload>;

declare function IconDownloadAlternative(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDownloadAlternative: React.MemoExoticComponent<typeof IconDownloadAlternative>;

declare function IconDrops(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDrops: React.MemoExoticComponent<typeof IconDrops>;

declare function IconDuplicate(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconDuplicate: React.MemoExoticComponent<typeof IconDuplicate>;

declare function IconEmojiHappy(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconEmojiHappy: React.MemoExoticComponent<typeof IconEmojiHappy>;

declare function IconEmojiHappyFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconEmojiHappyFilled: React.MemoExoticComponent<typeof IconEmojiHappyFilled>;

declare function IconEmojiNeutral(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconEmojiNeutral: React.MemoExoticComponent<typeof IconEmojiNeutral>;

declare function IconEmojiNeutralFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconEmojiNeutralFilled: React.MemoExoticComponent<typeof IconEmojiNeutralFilled>;

declare function IconEmojiUnhappy(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconEmojiUnhappy: React.MemoExoticComponent<typeof IconEmojiUnhappy>;

declare function IconEmojiUnhappyFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconEmojiUnhappyFilled: React.MemoExoticComponent<typeof IconEmojiUnhappyFilled>;

declare function IconExpand(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconExpand: React.MemoExoticComponent<typeof IconExpand>;

declare function IconExternalAsset(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconExternalAsset: React.MemoExoticComponent<typeof IconExternalAsset>;

declare function IconExternalLink(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconExternalLink: React.MemoExoticComponent<typeof IconExternalLink>;

declare function IconFeedback(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFeedback: React.MemoExoticComponent<typeof IconFeedback>;

declare function IconFigureTextBottom(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFigureTextBottom: React.MemoExoticComponent<typeof IconFigureTextBottom>;

declare function IconFigureTextLeft(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFigureTextLeft: React.MemoExoticComponent<typeof IconFigureTextLeft>;

declare function IconFigureTextRight(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFigureTextRight: React.MemoExoticComponent<typeof IconFigureTextRight>;

declare function IconFigureTextTop(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFigureTextTop: React.MemoExoticComponent<typeof IconFigureTextTop>;

declare function IconFile(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFile: React.MemoExoticComponent<typeof IconFile>;

declare function IconFiletype(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFiletype: React.MemoExoticComponent<typeof IconFiletype>;

declare function IconFilter(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFilter: React.MemoExoticComponent<typeof IconFilter>;

declare function IconFitToScreen(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFitToScreen: React.MemoExoticComponent<typeof IconFitToScreen>;

declare function IconFlags(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFlags: React.MemoExoticComponent<typeof IconFlags>;

declare function IconFocalPoint(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFocalPoint: React.MemoExoticComponent<typeof IconFocalPoint>;

declare function IconFolder(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFolder: React.MemoExoticComponent<typeof IconFolder>;

declare function IconFolderUp(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFolderUp: React.MemoExoticComponent<typeof IconFolderUp>;

declare function IconFont(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFont: React.MemoExoticComponent<typeof IconFont>;

declare function IconFontKit(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFontKit: React.MemoExoticComponent<typeof IconFontKit>;

declare function IconFoodDrink(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFoodDrink: React.MemoExoticComponent<typeof IconFoodDrink>;

declare function IconForward5Seconds(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconForward5Seconds: React.MemoExoticComponent<typeof IconForward5Seconds>;

declare function IconFrequentlyUsed(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFrequentlyUsed: React.MemoExoticComponent<typeof IconFrequentlyUsed>;

declare function IconFullwidth(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconFullwidth: React.MemoExoticComponent<typeof IconFullwidth>;

declare function IconGeneral(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconGeneral: React.MemoExoticComponent<typeof IconGeneral>;

declare function IconGenericPost(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconGenericPost: React.MemoExoticComponent<typeof IconGenericPost>;

declare function IconGuidelines(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconGuidelines: React.MemoExoticComponent<typeof IconGuidelines>;

declare function IconHeader(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconHeader: React.MemoExoticComponent<typeof IconHeader>;

declare function IconIconAndText(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconIconAndText: React.MemoExoticComponent<typeof IconIconAndText>;

declare function IconIcons(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconIcons: React.MemoExoticComponent<typeof IconIcons>;

declare function IconIframe(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconIframe: React.MemoExoticComponent<typeof IconIframe>;

declare function IconImage(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImage: React.MemoExoticComponent<typeof IconImage>;

declare function IconImageAndText(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageAndText: React.MemoExoticComponent<typeof IconImageAndText>;

declare function IconImageFigure(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageFigure: React.MemoExoticComponent<typeof IconImageFigure>;

declare function IconImageGrid2(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageGrid2: React.MemoExoticComponent<typeof IconImageGrid2>;

declare function IconImageGrid3(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageGrid3: React.MemoExoticComponent<typeof IconImageGrid3>;

declare function IconImageGrid4(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageGrid4: React.MemoExoticComponent<typeof IconImageGrid4>;

declare function IconImageLibrary(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageLibrary: React.MemoExoticComponent<typeof IconImageLibrary>;

declare function IconImageTextRatio25(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageTextRatio25: React.MemoExoticComponent<typeof IconImageTextRatio25>;

declare function IconImageTextRatio33(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageTextRatio33: React.MemoExoticComponent<typeof IconImageTextRatio33>;

declare function IconImageTextRatio50(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageTextRatio50: React.MemoExoticComponent<typeof IconImageTextRatio50>;

declare function IconImageTextRatio66(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageTextRatio66: React.MemoExoticComponent<typeof IconImageTextRatio66>;

declare function IconImageTextRatio75(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconImageTextRatio75: React.MemoExoticComponent<typeof IconImageTextRatio75>;

declare function IconIndesign(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconIndesign: React.MemoExoticComponent<typeof IconIndesign>;

declare function IconInfo(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconInfo: React.MemoExoticComponent<typeof IconInfo>;

declare function IconIntegration(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconIntegration: React.MemoExoticComponent<typeof IconIntegration>;

declare function IconIntegrations(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconIntegrations: React.MemoExoticComponent<typeof IconIntegrations>;

declare function IconInteractions(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconInteractions: React.MemoExoticComponent<typeof IconInteractions>;

declare function IconItalic(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconItalic: React.MemoExoticComponent<typeof IconItalic>;

declare function IconLayoutGrid(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLayoutGrid: React.MemoExoticComponent<typeof IconLayoutGrid>;

declare function IconLayoutHorizontal(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLayoutHorizontal: React.MemoExoticComponent<typeof IconLayoutHorizontal>;

declare function IconLayoutVertical(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLayoutVertical: React.MemoExoticComponent<typeof IconLayoutVertical>;

declare function IconLightning(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLightning: React.MemoExoticComponent<typeof IconLightning>;

declare function IconLightningFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLightningFilled: React.MemoExoticComponent<typeof IconLightningFilled>;

declare function IconLineDashes(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLineDashes: React.MemoExoticComponent<typeof IconLineDashes>;

declare function IconLineDotted(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLineDotted: React.MemoExoticComponent<typeof IconLineDotted>;

declare function IconLineSolid(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLineSolid: React.MemoExoticComponent<typeof IconLineSolid>;

declare function IconLineSpacer(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLineSpacer: React.MemoExoticComponent<typeof IconLineSpacer>;

declare function IconLink(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLink: React.MemoExoticComponent<typeof IconLink>;

declare function IconListBullets(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconListBullets: React.MemoExoticComponent<typeof IconListBullets>;

declare function IconListChecklist(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconListChecklist: React.MemoExoticComponent<typeof IconListChecklist>;

declare function IconListIndented(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconListIndented: React.MemoExoticComponent<typeof IconListIndented>;

declare function IconListNumbers(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconListNumbers: React.MemoExoticComponent<typeof IconListNumbers>;

declare function IconLock(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLock: React.MemoExoticComponent<typeof IconLock>;

declare function IconLogo(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLogo: React.MemoExoticComponent<typeof IconLogo>;

declare function IconLogoGrid(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLogoGrid: React.MemoExoticComponent<typeof IconLogoGrid>;

declare function IconLogout(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconLogout: React.MemoExoticComponent<typeof IconLogout>;

declare function IconMarkArea(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMarkArea: React.MemoExoticComponent<typeof IconMarkArea>;

declare function IconMeasurements(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMeasurements: React.MemoExoticComponent<typeof IconMeasurements>;

declare function IconMedia(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMedia: React.MemoExoticComponent<typeof IconMedia>;

declare function IconMegamenu(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMegamenu: React.MemoExoticComponent<typeof IconMegamenu>;

declare function IconMetadata(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMetadata: React.MemoExoticComponent<typeof IconMetadata>;

declare function IconMinus(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMinus: React.MemoExoticComponent<typeof IconMinus>;

declare function IconModules(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconModules: React.MemoExoticComponent<typeof IconModules>;

declare function IconMore(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMore: React.MemoExoticComponent<typeof IconMore>;

declare function IconMove(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMove: React.MemoExoticComponent<typeof IconMove>;

declare function IconMovePage(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconMovePage: React.MemoExoticComponent<typeof IconMovePage>;

declare function IconNotifications(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconNotifications: React.MemoExoticComponent<typeof IconNotifications>;

declare function IconObjects(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconObjects: React.MemoExoticComponent<typeof IconObjects>;

declare function IconOpenLock(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconOpenLock: React.MemoExoticComponent<typeof IconOpenLock>;

declare function IconOpenLockFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconOpenLockFilled: React.MemoExoticComponent<typeof IconOpenLockFilled>;

declare function IconOrientation(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconOrientation: React.MemoExoticComponent<typeof IconOrientation>;

declare function IconPatternLibrary(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPatternLibrary: React.MemoExoticComponent<typeof IconPatternLibrary>;

declare function IconPause(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPause: React.MemoExoticComponent<typeof IconPause>;

declare function IconPen(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPen: React.MemoExoticComponent<typeof IconPen>;

declare function IconPills(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPills: React.MemoExoticComponent<typeof IconPills>;

declare function IconPlanning(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPlanning: React.MemoExoticComponent<typeof IconPlanning>;

declare function IconPlay(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPlay: React.MemoExoticComponent<typeof IconPlay>;

declare function IconPlus(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPlus: React.MemoExoticComponent<typeof IconPlus>;

declare function IconPointOut(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPointOut: React.MemoExoticComponent<typeof IconPointOut>;

declare function IconPolygon(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPolygon: React.MemoExoticComponent<typeof IconPolygon>;

declare function IconProcessing(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconProcessing: React.MemoExoticComponent<typeof IconProcessing>;

declare function IconProjects(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconProjects: React.MemoExoticComponent<typeof IconProjects>;

declare function IconPublication(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconPublication: React.MemoExoticComponent<typeof IconPublication>;

declare function IconQuestion(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconQuestion: React.MemoExoticComponent<typeof IconQuestion>;

declare function IconQuote(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconQuote: React.MemoExoticComponent<typeof IconQuote>;

declare function IconRectangle(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRectangle: React.MemoExoticComponent<typeof IconRectangle>;

declare function IconRefresh(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRefresh: React.MemoExoticComponent<typeof IconRefresh>;

declare function IconReject(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconReject: React.MemoExoticComponent<typeof IconReject>;

declare function IconRejectCircle(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRejectCircle: React.MemoExoticComponent<typeof IconRejectCircle>;

declare function IconRejectFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRejectFilled: React.MemoExoticComponent<typeof IconRejectFilled>;

declare function IconRevert(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRevert: React.MemoExoticComponent<typeof IconRevert>;

declare function IconRevisions(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRevisions: React.MemoExoticComponent<typeof IconRevisions>;

declare function IconRocket(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconRocket: React.MemoExoticComponent<typeof IconRocket>;

declare function IconSearch(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSearch: React.MemoExoticComponent<typeof IconSearch>;

declare function IconSection(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSection: React.MemoExoticComponent<typeof IconSection>;

declare function IconSettings(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSettings: React.MemoExoticComponent<typeof IconSettings>;

declare function IconShare(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconShare: React.MemoExoticComponent<typeof IconShare>;

declare function IconSide(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSide: React.MemoExoticComponent<typeof IconSide>;

declare function IconSketch(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSketch: React.MemoExoticComponent<typeof IconSketch>;

declare function IconSmileysPeople(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSmileysPeople: React.MemoExoticComponent<typeof IconSmileysPeople>;

declare function IconSnippet(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSnippet: React.MemoExoticComponent<typeof IconSnippet>;

declare function IconSpinner(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSpinner: React.MemoExoticComponent<typeof IconSpinner>;

declare function IconStar(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconStar: React.MemoExoticComponent<typeof IconStar>;

declare function IconStarFilled(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconStarFilled: React.MemoExoticComponent<typeof IconStarFilled>;

declare function IconStorybook(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconStorybook: React.MemoExoticComponent<typeof IconStorybook>;

declare function IconSubmit(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSubmit: React.MemoExoticComponent<typeof IconSubmit>;

declare function IconSymbols(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconSymbols: React.MemoExoticComponent<typeof IconSymbols>;

declare function IconTable(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTable: React.MemoExoticComponent<typeof IconTable>;

declare function IconTag(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTag: React.MemoExoticComponent<typeof IconTag>;

declare function IconTarget(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTarget: React.MemoExoticComponent<typeof IconTarget>;

declare function IconTeam(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTeam: React.MemoExoticComponent<typeof IconTeam>;

declare function IconTeamO(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTeamO: React.MemoExoticComponent<typeof IconTeamO>;

declare function IconTemplate(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTemplate: React.MemoExoticComponent<typeof IconTemplate>;

declare function IconTemplates(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTemplates: React.MemoExoticComponent<typeof IconTemplates>;

declare function IconText(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconText: React.MemoExoticComponent<typeof IconText>;

declare function IconTextAlignCenter(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextAlignCenter: React.MemoExoticComponent<typeof IconTextAlignCenter>;

declare function IconTextAlignJustify(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextAlignJustify: React.MemoExoticComponent<typeof IconTextAlignJustify>;

declare function IconTextAlignLeft(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextAlignLeft: React.MemoExoticComponent<typeof IconTextAlignLeft>;

declare function IconTextAlignRight(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextAlignRight: React.MemoExoticComponent<typeof IconTextAlignRight>;

declare function IconTextLibrary(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextLibrary: React.MemoExoticComponent<typeof IconTextLibrary>;

declare function IconTextMultiColumn(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextMultiColumn: React.MemoExoticComponent<typeof IconTextMultiColumn>;

declare function IconTextOnImage(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextOnImage: React.MemoExoticComponent<typeof IconTextOnImage>;

declare function IconTextSnippet(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTextSnippet: React.MemoExoticComponent<typeof IconTextSnippet>;

declare function IconTimeline(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTimeline: React.MemoExoticComponent<typeof IconTimeline>;

declare function IconTransfer(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTransfer: React.MemoExoticComponent<typeof IconTransfer>;

declare function IconTrash(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTrash: React.MemoExoticComponent<typeof IconTrash>;

declare function IconTrashOpen(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTrashOpen: React.MemoExoticComponent<typeof IconTrashOpen>;

declare function IconTravelPlaces(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTravelPlaces: React.MemoExoticComponent<typeof IconTravelPlaces>;

declare function IconTriangle(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTriangle: React.MemoExoticComponent<typeof IconTriangle>;

declare function IconTruck(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTruck: React.MemoExoticComponent<typeof IconTruck>;

declare function IconTypography(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTypography: React.MemoExoticComponent<typeof IconTypography>;

declare function IconTypostyles(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconTypostyles: React.MemoExoticComponent<typeof IconTypostyles>;

declare function IconUiPattern(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUiPattern: React.MemoExoticComponent<typeof IconUiPattern>;

declare function IconUnderline(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUnderline: React.MemoExoticComponent<typeof IconUnderline>;

declare function IconUnknown(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUnknown: React.MemoExoticComponent<typeof IconUnknown>;

declare function IconUnknownSimple(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUnknownSimple: React.MemoExoticComponent<typeof IconUnknownSimple>;

declare function IconUpload(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUpload: React.MemoExoticComponent<typeof IconUpload>;

declare function IconUploadAlternative(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUploadAlternative: React.MemoExoticComponent<typeof IconUploadAlternative>;

declare function IconUploadDoImages(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUploadDoImages: React.MemoExoticComponent<typeof IconUploadDoImages>;

declare function IconUploadDontImages(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUploadDontImages: React.MemoExoticComponent<typeof IconUploadDontImages>;

declare function IconUser(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUser: React.MemoExoticComponent<typeof IconUser>;

declare function IconUserO(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconUserO: React.MemoExoticComponent<typeof IconUserO>;

declare function IconVideo(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconVideo: React.MemoExoticComponent<typeof IconVideo>;

declare function IconVideoAndText(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconVideoAndText: React.MemoExoticComponent<typeof IconVideoAndText>;

declare function IconVideoFullscreen(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconVideoFullscreen: React.MemoExoticComponent<typeof IconVideoFullscreen>;

declare function IconView(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconView: React.MemoExoticComponent<typeof IconView>;

declare function IconViewSlash(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconViewSlash: React.MemoExoticComponent<typeof IconViewSlash>;

declare function IconVimeo(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconVimeo: React.MemoExoticComponent<typeof IconVimeo>;

declare function IconVolumeOff(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconVolumeOff: React.MemoExoticComponent<typeof IconVolumeOff>;

declare function IconVolumeOn(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconVolumeOn: React.MemoExoticComponent<typeof IconVolumeOn>;

declare function IconWorkflow(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconWorkflow: React.MemoExoticComponent<typeof IconWorkflow>;

declare function IconZoom(props: IconProps): React.ReactElement<IconProps>;
declare const MemoIconZoom: React.MemoExoticComponent<typeof IconZoom>;

export { Accordion, AccordionItem, AccordionItemProps, AccordionProps, ActionMenu, ActionMenuBlock, ActionMenuItemType, ActionMenuProps, AddBlockButton, AddBlockButtonDirection, AddBlockButtonProps, AriaList, AriaListProps, AriaMenuItem, AriaOptionProps, AriaSection, AriaSectionProps, AssetInput, AssetInputProps, AssetInputSize, Badge, BadgeProps, BadgeStatus, BadgeStyle, BrandColorPicker, Breadcrumb, BreadcrumbItem, Breadcrumbs, BreadcrumbsProps, BrightHeader, BrightHeaderStyle, Button, ButtonGroup, ButtonGroupProps, ButtonProps, ButtonSize, ButtonStyle, Checkbox, CheckboxProps, CheckboxState, Checklist, ChecklistDirection, ChecklistProps, ColorFormat, ColorInput, ColorInputProps, ColorPicker, ColorPickerProps, CurrentBreadcrumbItem, CustomColorPicker, Divider, DividerHeight, DividerProps, DividerStyle, Dropdown, DropdownProps, DropdownSize, FLYOUT_DIVIDER_COLOR, FLYOUT_DIVIDER_HEIGHT, FieldsetHeader, FieldsetHeaderProps, FieldsetHeaderSize, FieldsetHeaderType, Flyout, FlyoutProps, FormControl, FormControlDirection, FormControlProps, FormControlStyle, HelperPosition, MemoIconAcademy as IconAcademy, MemoIconActions as IconActions, MemoIconActivities as IconActivities, MemoIconActivity as IconActivity, MemoIconAdd as IconAdd, MemoIconAddSimple as IconAddSimple, MemoIconAddToCollection as IconAddToCollection, MemoIconAdobeCreativeCloud as IconAdobeCreativeCloud, MemoIconAlignBottom as IconAlignBottom, MemoIconAlignCenter as IconAlignCenter, MemoIconAlignLeft as IconAlignLeft, MemoIconAlignMiddle as IconAlignMiddle, MemoIconAlignRight as IconAlignRight, MemoIconAlignTop as IconAlignTop, MemoIconAnalytics as IconAnalytics, MemoIconAngleDown as IconAngleDown, MemoIconAnimalsNature as IconAnimalsNature, MemoIconAnnotations as IconAnnotations, MemoIconAppearance as IconAppearance, MemoIconApprove as IconApprove, MemoIconArrow as IconArrow, MemoIconArrowDown as IconArrowDown, MemoIconArrowLeft as IconArrowLeft, MemoIconArrowRight as IconArrowRight, MemoIconArrowUp as IconArrowUp, MemoIconAssets as IconAssets, MemoIconAttachment as IconAttachment, MemoIconAttentionFilled as IconAttentionFilled, MemoIconAttributes as IconAttributes, MemoIconAudio as IconAudio, MemoIconBackward5Seconds as IconBackward5Seconds, MemoIconBold as IconBold, MemoIconBookmark as IconBookmark, MemoIconBrand as IconBrand, MemoIconBriefing as IconBriefing, MemoIconBuilder as IconBuilder, MemoIconButton as IconButton, MemoIconCalendar as IconCalendar, MemoIconCallout as IconCallout, MemoIconCampaign as IconCampaign, MemoIconCampaignActivity as IconCampaignActivity, MemoIconCards as IconCards, MemoIconCaretDown as IconCaretDown, MemoIconCaretLeft as IconCaretLeft, MemoIconCaretRight as IconCaretRight, MemoIconCaretUp as IconCaretUp, MemoIconCenter as IconCenter, MemoIconCheck as IconCheck, MemoIconCheckFilled as IconCheckFilled, MemoIconCircle as IconCircle, MemoIconCollapse as IconCollapse, MemoIconCollectionLarge as IconCollectionLarge, MemoIconCollectionMedium as IconCollectionMedium, MemoIconCollectionSmall as IconCollectionSmall, MemoIconColorScale as IconColorScale, MemoIconColorScaleSmall as IconColorScaleSmall, MemoIconColorScaleTall as IconColorScaleTall, MemoIconColorSwatch as IconColorSwatch, MemoIconColors as IconColors, MemoIconColumnBreak as IconColumnBreak, MemoIconCopyToClipboard as IconCopyToClipboard, MemoIconCrop as IconCrop, MemoIconCursorClick as IconCursorClick, MemoIconCut as IconCut, MemoIconDivider as IconDivider, MemoIconDoDontsStrikethrough as IconDoDontsStrikethrough, MemoIconDoDontsUnderline as IconDoDontsUnderline, MemoIconDocument as IconDocument, MemoIconDocumentLibrary as IconDocumentLibrary, MemoIconDosImages as IconDosImages, MemoIconDosText as IconDosText, MemoIconDownload as IconDownload, MemoIconDownloadAlternative as IconDownloadAlternative, MemoIconDrops as IconDrops, MemoIconDuplicate as IconDuplicate, MemoIconEmojiHappy as IconEmojiHappy, MemoIconEmojiHappyFilled as IconEmojiHappyFilled, MemoIconEmojiNeutral as IconEmojiNeutral, MemoIconEmojiNeutralFilled as IconEmojiNeutralFilled, MemoIconEmojiUnhappy as IconEmojiUnhappy, MemoIconEmojiUnhappyFilled as IconEmojiUnhappyFilled, MemoIconExpand as IconExpand, MemoIconExternalAsset as IconExternalAsset, MemoIconExternalLink as IconExternalLink, MemoIconFeedback as IconFeedback, MemoIconFigureTextBottom as IconFigureTextBottom, MemoIconFigureTextLeft as IconFigureTextLeft, MemoIconFigureTextRight as IconFigureTextRight, MemoIconFigureTextTop as IconFigureTextTop, MemoIconFile as IconFile, MemoIconFiletype as IconFiletype, MemoIconFilter as IconFilter, MemoIconFitToScreen as IconFitToScreen, MemoIconFlags as IconFlags, MemoIconFocalPoint as IconFocalPoint, MemoIconFolder as IconFolder, MemoIconFolderUp as IconFolderUp, MemoIconFont as IconFont, MemoIconFontKit as IconFontKit, MemoIconFoodDrink as IconFoodDrink, MemoIconForward5Seconds as IconForward5Seconds, MemoIconFrequentlyUsed as IconFrequentlyUsed, MemoIconFullwidth as IconFullwidth, MemoIconGeneral as IconGeneral, MemoIconGenericPost as IconGenericPost, MemoIconGuidelines as IconGuidelines, MemoIconHeader as IconHeader, MemoIconIconAndText as IconIconAndText, MemoIconIcons as IconIcons, MemoIconIframe as IconIframe, MemoIconImage as IconImage, MemoIconImageAndText as IconImageAndText, MemoIconImageFigure as IconImageFigure, MemoIconImageGrid2 as IconImageGrid2, MemoIconImageGrid3 as IconImageGrid3, MemoIconImageGrid4 as IconImageGrid4, MemoIconImageLibrary as IconImageLibrary, MemoIconImageTextRatio25 as IconImageTextRatio25, MemoIconImageTextRatio33 as IconImageTextRatio33, MemoIconImageTextRatio50 as IconImageTextRatio50, MemoIconImageTextRatio66 as IconImageTextRatio66, MemoIconImageTextRatio75 as IconImageTextRatio75, MemoIconIndesign as IconIndesign, MemoIconInfo as IconInfo, MemoIconIntegration as IconIntegration, MemoIconIntegrations as IconIntegrations, MemoIconInteractions as IconInteractions, MemoIconItalic as IconItalic, IconItem, MemoIconLayoutGrid as IconLayoutGrid, MemoIconLayoutHorizontal as IconLayoutHorizontal, MemoIconLayoutVertical as IconLayoutVertical, MemoIconLightning as IconLightning, MemoIconLightningFilled as IconLightningFilled, MemoIconLineDashes as IconLineDashes, MemoIconLineDotted as IconLineDotted, MemoIconLineSolid as IconLineSolid, MemoIconLineSpacer as IconLineSpacer, MemoIconLink as IconLink, MemoIconListBullets as IconListBullets, MemoIconListChecklist as IconListChecklist, MemoIconListIndented as IconListIndented, MemoIconListNumbers as IconListNumbers, MemoIconLock as IconLock, MemoIconLogo as IconLogo, MemoIconLogoGrid as IconLogoGrid, MemoIconLogout as IconLogout, MemoIconMarkArea as IconMarkArea, MemoIconMeasurements as IconMeasurements, MemoIconMedia as IconMedia, MemoIconMegamenu as IconMegamenu, MemoIconMetadata as IconMetadata, MemoIconMinus as IconMinus, MemoIconModules as IconModules, MemoIconMore as IconMore, MemoIconMove as IconMove, MemoIconMovePage as IconMovePage, MemoIconNotifications as IconNotifications, MemoIconObjects as IconObjects, MemoIconOpenLock as IconOpenLock, MemoIconOpenLockFilled as IconOpenLockFilled, MemoIconOrientation as IconOrientation, MemoIconPatternLibrary as IconPatternLibrary, MemoIconPause as IconPause, MemoIconPen as IconPen, MemoIconPills as IconPills, MemoIconPlanning as IconPlanning, MemoIconPlay as IconPlay, MemoIconPlus as IconPlus, MemoIconPointOut as IconPointOut, MemoIconPolygon as IconPolygon, MemoIconProcessing as IconProcessing, MemoIconProjects as IconProjects, IconProps, MemoIconPublication as IconPublication, MemoIconQuestion as IconQuestion, MemoIconQuote as IconQuote, MemoIconRectangle as IconRectangle, MemoIconRefresh as IconRefresh, MemoIconReject as IconReject, MemoIconRejectCircle as IconRejectCircle, MemoIconRejectFilled as IconRejectFilled, MemoIconRevert as IconRevert, MemoIconRevisions as IconRevisions, MemoIconRocket as IconRocket, MemoIconSearch as IconSearch, MemoIconSection as IconSection, MemoIconSettings as IconSettings, MemoIconShare as IconShare, MemoIconSide as IconSide, IconSize, IconSizeMap, MemoIconSketch as IconSketch, MemoIconSmileysPeople as IconSmileysPeople, MemoIconSnippet as IconSnippet, MemoIconSpinner as IconSpinner, MemoIconStar as IconStar, MemoIconStarFilled as IconStarFilled, MemoIconStorybook as IconStorybook, MemoIconSubmit as IconSubmit, MemoIconSymbols as IconSymbols, MemoIconTable as IconTable, MemoIconTag as IconTag, MemoIconTarget as IconTarget, MemoIconTeam as IconTeam, MemoIconTeamO as IconTeamO, MemoIconTemplate as IconTemplate, MemoIconTemplates as IconTemplates, MemoIconText as IconText, MemoIconTextAlignCenter as IconTextAlignCenter, MemoIconTextAlignJustify as IconTextAlignJustify, MemoIconTextAlignLeft as IconTextAlignLeft, MemoIconTextAlignRight as IconTextAlignRight, MemoIconTextLibrary as IconTextLibrary, MemoIconTextMultiColumn as IconTextMultiColumn, MemoIconTextOnImage as IconTextOnImage, MemoIconTextSnippet as IconTextSnippet, MemoIconTimeline as IconTimeline, MemoIconTransfer as IconTransfer, MemoIconTrash as IconTrash, MemoIconTrashOpen as IconTrashOpen, MemoIconTravelPlaces as IconTravelPlaces, MemoIconTriangle as IconTriangle, MemoIconTruck as IconTruck, MemoIconTypography as IconTypography, MemoIconTypostyles as IconTypostyles, MemoIconUiPattern as IconUiPattern, MemoIconUnderline as IconUnderline, MemoIconUnknown as IconUnknown, MemoIconUnknownSimple as IconUnknownSimple, MemoIconUpload as IconUpload, MemoIconUploadAlternative as IconUploadAlternative, MemoIconUploadDoImages as IconUploadDoImages, MemoIconUploadDontImages as IconUploadDontImages, MemoIconUser as IconUser, MemoIconUserO as IconUserO, MemoIconVideo as IconVideo, MemoIconVideoAndText as IconVideoAndText, MemoIconVideoFullscreen as IconVideoFullscreen, MemoIconView as IconView, MemoIconViewSlash as IconViewSlash, MemoIconVimeo as IconVimeo, MemoIconVolumeOff as IconVolumeOff, MemoIconVolumeOn as IconVolumeOn, MemoIconWorkflow as IconWorkflow, MemoIconZoom as IconZoom, InputLabel, InputLabelProps, MenuBlock, MenuItem, MenuItemContent, MenuItemContentProps, MenuItemContentSize, MenuItemContentStyle, MenuItemProps, MenuItemStyle, MenuItemType, MenuStateType, RadioPill, RadioPillProps, SelectMenu, SelectMenuProps, SelectionIndicatorIcon, Slider, SliderProps, Switch, SwitchProps, SwitchSize, Tag, TagProps, TagType, TextInput, TextInputBaseProps, TextInputProps, TextInputType, TextOrNumberItem, Textarea, TextareaProps, Tooltip, TooltipArrow, TooltipArrowProps, TooltipButton, TooltipProps, Tree, TreeNode, TreeNodeProps, TreeProps, Validation, brightHeaderBackgroundColors, getDisabledItemIds, getKeyItemRecord, getMenuItems, mapToAriaProps, tagStyles };
