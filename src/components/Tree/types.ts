/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Active, Collision, Over, Translate } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

import { InternalTreeItemProps, type Overlay } from './TreeItem';
import { type Projection } from './helpers';

export type SensorContext = MutableRefObject<{
    nodes: ReactElement[];
    offset: number;
}>;

export type OnSelectCallback = (id: string) => void;
export type OnExpandCallback = (id: string) => void;

export type OnShrinkCallback = (id: string) => void;
export type OnTreeDropCallback = (args: {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    contentComponent: Nullable<ReactNode>;
    parentType?: string;
}) => void;

export type TreeItemPropsSizing = 'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
type TreeItemContentFit = 'content-fit' | 'single-line';
type TreeItemBorderStyle = 'solid' | 'dashed' | 'dotted' | 'none';
export type TreeItemColors = 'neutral' | 'soft' | 'none';
type TreeItemColorStyles = {
    textColor: string;
    selectedTextColor: string;
    backgroundColor: string;
    selectedBackgroundColor: string;
    pressedBackgroundColor: string;
    dragHanlderTextColor: string;
    selectedDragHanlderTextColor: string;
};

export const TreeItemSpacingClassMap: Record<TreeItemPropsSizing, string> = {
    none: 'tw-my-0',
    'x-small': 'tw-my-0.5',
    small: 'tw-my-1',
    medium: 'tw-my-1.5',
    large: 'tw-my-2',
    'x-large': 'tw-my-2.5',
};

export const TreeItemShadowClassMap: Record<TreeItemPropsSizing, string> = {
    none: 'tw-shadow-none',
    'x-small': 'tw-shadow-sm',
    small: 'tw-shadow',
    medium: 'tw-shadow-md',
    large: 'tw-shadow-lg',
    'x-large': 'tw-shadow-xl',
};

export const TreeItemBorderRadiusClassMap: Record<TreeItemPropsSizing, string> = {
    none: 'tw-rounded-none',
    'x-small': 'tw-rounded-sm',
    small: 'tw-rounded',
    medium: 'tw-rounded-md',
    large: 'tw-rounded-lg',
    'x-large': 'tw-rounded-xl',
};

export const TreeItemBorderClassMap: Record<Exclude<TreeItemPropsSizing, 'x-large'>, string> = {
    none: 'tw-border-0',
    'x-small': 'tw-border',
    small: 'tw-border-2',
    medium: 'tw-border-4',
    large: 'tw-border-8',
};

export const TreeItemBorderStyleClassMap: Record<TreeItemBorderStyle, string> = {
    none: 'tw-border-none',
    solid: 'tw-border-solid',
    dotted: 'tw-border-dotted',
    dashed: 'tw-border-dashed',
};

export const TreeItemColorsClassMap: Record<TreeItemColors, TreeItemColorStyles> = {
    none: {
        textColor: '',
        selectedTextColor: '',
        backgroundColor: '',
        selectedBackgroundColor: '',
        pressedBackgroundColor: '',
        dragHanlderTextColor: '',
        selectedDragHanlderTextColor: '',
    },
    neutral: {
        textColor: 'tw-text-text',
        selectedTextColor: 'tw-font-medium tw-text-box-neutral-strong-inverse',
        backgroundColor: 'group-hover:tw-bg-box-neutral',
        selectedBackgroundColor: 'tw-bg-box-neutral-strong group-hover:tw-bg-box-neutral-strong-hover',
        pressedBackgroundColor: 'group-active:tw-bg-box-neutral-pressed',
        dragHanlderTextColor: 'tw-text-text',
        selectedDragHanlderTextColor: 'tw-text-box-neutral-strong-inverse',
    },
    soft: {
        textColor: 'tw-text-text',
        selectedTextColor: 'tw-font-medium tw-text-box-neutral-strong',
        backgroundColor: 'group-hover:tw-bg-box-neutral-hover',
        selectedBackgroundColor:
            'tw-bg-box-neutral-strong-inverse-hover group-hover:tw-bg-box-neutral-strong-inverse-hover',
        pressedBackgroundColor: 'group-active:tw-bg-box-neutral-pressed',
        dragHanlderTextColor: 'tw-text-text',
        selectedDragHanlderTextColor: 'tw-text-box-neutral-strong',
    },
};

export type TreeItemStyling = {
    spacingY?: TreeItemPropsSizing;
    contentHight?: TreeItemContentFit;
    shadow?: TreeItemPropsSizing;
    borderRadius?: TreeItemPropsSizing;
    borderWidth?: Exclude<TreeItemPropsSizing, 'x-large'>;
    borderStyle?: TreeItemBorderStyle;
    activeColorStyle?: TreeItemColors;
};

export type TreeProps = {
    id: string;
    draggable?: boolean;
    children: ReactNode;
    multiselect?: boolean;
    selectedIds?: string[];
    expandedIds?: string[];
    dragHandlerPosition?: 'left' | 'right' | 'none';
    showDragHandlerOnHoverOnly?: boolean;
    showContentWhileDragging?: boolean;
    itemStyle?: TreeItemStyling;
    'data-test-id'?: string;
    onSelect?: OnSelectCallback;
    onExpand?: OnExpandCallback;
    onShrink?: OnShrinkCallback;
    onDrop?: OnTreeDropCallback;
};

type TreeItemBaseProps = {
    id: string;
    'data-test-id'?: string;
    onDrop?: OnTreeDropCallback;
    /**
     * The type of item being dragged.
     */
    type?: string;
    /**
     * The kinds of dragItems this dropTarget accepts
     *  @example 'itemA, itemA-within, itemA-deeper'
     * if suffix '-within' is appended, then it will allow dropping item inside it
     * if suffix '-deeper' is appended, then it will allow expand because it will allow dropping in levels deeper
     */
    accepts?: string;
    children?: ReactNode;
    draggable?: boolean;
    /** Removes the expand caret, recovering the space ignoring if there are children */
    expandable?: boolean;
    showDragHandlerOnHoverOnly?: boolean;
    /**
     * dragHandlerPosition = 'none' makes the whole item draggble rather than only the dragHandler
     */
    dragHandlerPosition?: 'left' | 'right' | 'none';
    showContentWhileDragging?: boolean;
    itemStyle?: TreeItemStyling;
    showCaret?: boolean;
    ignoreItemDoubleClick?: boolean;
    expandOnSelect?: boolean;
    levelConstraint?: Nullable<number>;
};

export type TreeItemWithLabelProps = {
    label?: string;
    contentComponent?: never;
} & TreeItemBaseProps;

export type TreeItemWithContentComponentProps = {
    label?: never;
    contentComponent?: ReactNode;
} & TreeItemBaseProps;

export type SortableProps = Partial<ReturnType<typeof useSortable>>;

export type TreeItemProps = SortableProps & (TreeItemWithLabelProps | TreeItemWithContentComponentProps);

export type SortableTreeItemProps = TreeItemProps;

export type TreeItemState = {
    parentId?: string;
    childrenIds?: string[];
    level: number;
    domElement?: HTMLElement;
};

export type TreeState = {
    selectedIds: Set<string>;
    expandedIds: Set<string>;
    selectionMode: 'single' | 'multiselect';
    overlay?: Overlay;
    nodes: ReactElement<InternalTreeItemProps>[];
    rootNodes: ReactElement<InternalTreeItemProps>[];
    projection: Nullable<Projection>;
};

export type TreeStateAction =
    | { type: 'REPLACE_STATE'; payload: TreeState }
    | { type: 'REGISTER_OVERLAY_ITEM'; payload: Overlay }
    | { type: 'SET_SELECT'; payload: string }
    | { type: 'EXPAND_NODE'; payload: string }
    | { type: 'SHRINK_NODE'; payload: string }
    | { type: 'SET_HIDDEN'; payload: { ids: string[]; isHidden: boolean } }
    | { type: 'SET_SELECTION_MODE'; payload: { selectionMode: TreeState['selectionMode'] } }
    | { type: 'SET_PROJECTION'; payload: Nullable<Projection> }
    | { type: 'REGISTER_NODE_CHILDREN'; payload: { id: string; children: ReactElement<InternalTreeItemProps>[] } }
    | { type: 'UNREGISTER_NODE_CHILDREN'; payload: string }
    | { type: 'REPLACE_EXPANDED'; payload: string[] }
    | { type: 'REPLACE_SELECTED'; payload: string[] }
    | { type: 'REGISTER_ROOT_NODES'; payload: ReactElement<InternalTreeItemProps>[] }
    | { type: 'REGISTER_NODES'; payload: ReactElement<InternalTreeItemProps>[] };

export type RegisterNodeChildrenPayload = Extract<TreeStateAction, { type: 'REGISTER_NODE_CHILDREN' }>['payload'];

export type CollisionPosition = Nullable<'before' | 'within' | 'after'>;

// dnd-kit type overrides
export type TreeActive = Omit<Active, 'id'> & {
    id: string;
};

export type TreeOver = Omit<Over, 'id'> & {
    id: string;
};

type TreeCollision = Omit<Collision, 'id'> & {
    id: string;
};

type TreeDragEvent = {
    activatorEvent: Event;
    active: TreeActive;
    collisions: TreeCollision[] | null;
    delta: Translate;
    over: TreeOver | null;
};

export type TreeDragStartEvent = Pick<TreeDragEvent, 'active'>;
export type TreeDragMoveEvent = TreeDragEvent;
export type TreeDragOverEvent = TreeDragMoveEvent;
export type TreeDragEndEvent = TreeDragEvent;
export type TreeDragCancelEvent = TreeDragEndEvent;

export type TreeAnnouncements = {
    onDragStart({ active }: Pick<TreeDragEvent, 'active'>): string | undefined;
    onDragMove?({ active, over }: TreeDragEvent): string | undefined;
    onDragOver({ active, over }: TreeDragEvent): string | undefined;
    onDragEnd({ active, over }: TreeDragEvent): string | undefined;
    onDragCancel({ active, over }: TreeDragEvent): string | undefined;
};
