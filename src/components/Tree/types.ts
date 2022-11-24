import { OnDropCallback } from '@components/DropZone';
import { ReactElement, ReactNode } from 'react';

export type TreeProps = {
    id: string;
    draggable?: boolean;
    children: ReactElement<TreeItemProps> | Array<ReactElement<TreeItemProps>>;
};

export type TreeItemProps = {
    id: string;
    sort: Nullable<number>;
    onNodeSelect?: (id: Nullable<string>) => void;
    onDrop?: OnDropCallback<{ id: string; sort: Nullable<number> }>;
    component: ReactNode;
    children?: ReactNode;
};
