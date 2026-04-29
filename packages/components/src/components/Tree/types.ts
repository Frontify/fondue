/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type Item = {
    id: string;
    name: string;
    children?: string[];
    isFolder?: boolean;
    parentId?: string;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    isFocused?: boolean;
    onFocusChange?: (isFocused: boolean) => void;
};

export type TreeNodeState = {
    id: string;
    name: string;
    isFolder: boolean;
    isExpanded?: boolean;
    isSelected?: boolean;
    isFocused?: boolean;
    children?: TreeNodeState[];
};

export type TreeChangeState = TreeNodeState[];

export type TreeRootProps = {
    children: ReactNode;
    onChange?: (state: TreeChangeState) => void;
};

export type TreeItemProps = {
    children: ReactNode;
    id: string;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    isFocused?: boolean;
    onFocusChange?: (isFocused: boolean) => void;
};

export type TreeFolderProps = {
    children: ReactNode;
    id: string;
    name: string;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    isFocused?: boolean;
    onFocusChange?: (isFocused: boolean) => void;
};
