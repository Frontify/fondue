/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type HTMLAttributes, type MouseEvent, type ReactElement, type ReactNode } from 'react';

export enum AssetInputMenuItemContentSize {
    XSmall = 'XSmall',
    Small = 'Small',
    Large = 'Large',
}

export type AssetInputMenuItemContentProps = {
    title?: ReactNode;
    decorator?: ReactElement;
    subtitle?: string;
    size?: AssetInputMenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
    children?: ReactNode;
};

export enum AssetInputMenuItemStyle {
    Primary = 'Primary',
    Danger = 'Danger',
    Warning = 'Warning',
}

export enum AssetInputSelectionIndicatorIcon {
    Check = 'Check',
    CaretRight = 'CaretRight',
    None = 'None',
}
export type AssetInputMenuItemProps = {
    style?: AssetInputMenuItemStyle;
    disabled?: boolean;
    active?: boolean;
    checked?: boolean;
    selectionIndicator?: AssetInputSelectionIndicatorIcon;
    /** @deprecated this prop is not being used anymore */
    type?: string;
    link?: string;
    onBlur?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onClick?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onFocus?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: FocusEvent<T>) => void;
    onMouseEnter?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOut?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseOver?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T extends HTMLButtonElement | HTMLAnchorElement>(event: MouseEvent<T>) => void;
    children?: ReactNode;
    'data-test-id'?: string;
} & AssetInputMenuItemContentProps;

export type AssetInputMenuItemType = AssetInputMenuItemProps & {
    id: string | number;
    link?: string;
};

export type AssetInputMenuDefaultItemType = AssetInputMenuItemType & { onClick: () => void };

export type AssetInputMenuSwitchItemType = AssetInputMenuItemType & {
    onClick: (switchValue: boolean) => void;
    type: 'switch';
    initialValue: boolean;
};

export type AssetInputMenuBlock = {
    id: string;
    menuItems: (AssetInputMenuDefaultItemType | AssetInputMenuSwitchItemType)[];
    ariaLabel?: string;
};
