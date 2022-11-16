import { ReactElement, ReactNode } from 'react';
import { IconProps } from '@foundation/Icon';
import { BadgeProps } from '@components/Badge';

export type NewTreeProps = {
    children: ReactElement<NewTreeItemProps> | Array<ReactElement<NewTreeItemProps>>;
};

export type NewTreeItemProps = {
    parentId: NullableString;

    forceCaret?: boolean;

    strong?: boolean;
    nodeIndex?: number;
    activeIds?: NullableString[];
    parentIds?: string[];
    onClick: (id: NullableString) => void;
    isFirst: boolean;
    treeId: string;
    // onDrop?: OnDropCallback<TreeNodeItem>;
    onEditableSave?: (targetItemId: string, value: string) => void;
    onNodeExpand?: (itemId: string) => void;

    id: string;
    name: string;
    value?: string;
    label?: string;
    actions?: React.ReactNode[];
    icon?: ReactElement<IconProps>;
    badge?: ReactElement<IconProps> | ReactElement<BadgeProps>;
    tooltipContent?: ReactNode;
    editable?: boolean;

    children?: Nullable<ReactElement<NewTreeItemProps> | Array<ReactElement<NewTreeItemProps>>>;
};
