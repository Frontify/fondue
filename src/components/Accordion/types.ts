/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeState } from '@react-stately/tree';
import { PropsWithChildren, ReactNode } from 'react';
import { Node } from '@react-types/shared';

export type AccordionProps = {
    children?: ReactNode;
    divider?: boolean;
    border?: boolean;
};

export type AriaAccordionItemProps = {
    item: Node<AccordionItemProps>;
    state: TreeState<AccordionItemProps>;
    header: Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void };
    padding?: boolean;
    divider?: boolean;
    headerComponent?: (props: AccordionHeaderProps) => JSX.Element;
};

export type AccordionItemProps = PropsWithChildren<{
    header: Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void };
    padding?: boolean;
    divider?: boolean;
    headerComponent?: (props: AccordionHeaderProps) => JSX.Element;
}>;

export type AccordionHeaderIconSize = 'small' | 'medium' | 'large';

export type AccordionHeaderProps = {
    decorator?: ReactNode;
    children: string;
    disabled?: boolean;
    isOpen: boolean;
};

export type AccordionHeaderIconProps = {
    isOpen: boolean;
    size?: AccordionHeaderIconSize;
    disabled?: boolean;
};
