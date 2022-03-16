/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeState } from "@react-stately/tree";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Node } from "@react-types/shared";
import { FieldsetHeaderSize, FieldsetHeaderType } from "..";

export type AccordionProps = {
    children?: ReactNode;
    divider?: boolean;
    border?: boolean;
};

export type AriaAccordionItemProps = {
    item: Node<AccordionItemProps>;
    state: TreeState<AccordionItemProps>;
    header: Omit<AccordionHeaderProps, "isOpen"> & { active?: boolean; onClick?: () => void };
    padding?: boolean;
    divider?: boolean;
    headerComponent?: FC<AccordionHeaderProps>;
};

export type AccordionItemProps = PropsWithChildren<{
    header: Omit<AccordionHeaderProps, "isOpen"> & { active?: boolean; onClick?: () => void };
    padding?: boolean;
    divider?: boolean;
    headerComponent?: FC<AccordionHeaderProps>;
}>;

export type AccordionHeaderProps = {
    decorator?: ReactNode;
    children: string;
    disabled?: boolean;
    isOpen: boolean;
    /** @deprecated use headerComponent prop for custom header styles */
    size?: FieldsetHeaderSize;
    /** @deprecated use headerComponent prop for custom header styles */
    bold?: boolean;
    /** @deprecated Icon type will be fixed to FieldsetHeaderType.Accordion.
    Use headerComponent prop for custom header styles */
    type?: FieldsetHeaderType;
    /** @deprecated use headerComponent prop for custom header styles */
    as?: keyof JSX.IntrinsicElements;
};

export type AccordionHeaderIconProps = {
    isOpen: boolean;
    size?: FieldsetHeaderSize;
    disabled?: boolean;
    /** @deprecated Icon type will be fixed to FieldsetHeaderType.Accordion.
    Use headerComponent prop for custom header styles */
    type?: FieldsetHeaderType;
};
