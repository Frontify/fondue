import { OnDropCallback } from '@components/DropZone';
import { ReactElement, ReactNode } from 'react';

export type NewTreeProps = {
    id: string;
    draggable?: boolean;
    children: ReactElement<NewTreeItemProps> | Array<ReactElement<NewTreeItemProps>>;
};

export type NewTreeItemProps = {
    id: string;
    sort: number;
    onClick?: (id: NullableString) => void;
    onSelect?: (ids: NullableString[]) => void;
    onDrop?: OnDropCallback<{ id: string; sort: number }>;
    component: ReactNode;
    children?: ReactNode;
};
