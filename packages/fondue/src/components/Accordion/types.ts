/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeState } from '@react-stately/tree';
import { type Node } from '@react-types/shared';
import { type ReactElement, type ReactNode } from 'react';

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export type AccordionProps = {
    children?: ReactNode;
    divider?: boolean;
    border?: boolean;
    'data-test-id'?: string;
};

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export type AriaAccordionItemProps = {
    item: Node<AccordionItemProps>;
    state: TreeState<AccordionItemProps>;
    header: Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void };
    padding?: boolean;
    divider?: boolean;
    headerComponent?: (props: AccordionHeaderProps) => ReactElement;
    'data-test-id'?: string;
};

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export type AccordionItemProps = {
    header: Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void };
    padding?: boolean;
    divider?: boolean;
    headerComponent?: (props: AccordionHeaderProps) => ReactElement;
    'data-test-id'?: string;
    children?: ReactNode;
};

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export type AccordionHeaderIconSize = 'small' | 'medium' | 'large';

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export type AccordionHeaderProps = {
    decorator?: ReactNode;
    children: string;
    disabled?: boolean;
    isOpen: boolean;
    'data-test-id'?: string;
};

/**
 * @deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.
 */
export type AccordionHeaderIconProps = {
    isOpen: boolean;
    size?: AccordionHeaderIconSize;
    'data-test-id'?: string;
};
