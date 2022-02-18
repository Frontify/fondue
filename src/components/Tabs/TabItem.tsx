/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, ReactNode } from "react";
import { BadgeProps } from "@components/Badge";
import { merge } from "@utilities/merge";

export type TabItemProps = {
    id: string;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    decorator?: ReactElement;
    badge?: BadgeProps;
    children: ReactNode;
};

export const TabItem: FC<TabItemProps & { active?: boolean }> = ({ active, disabled, children }) => {
    return <div className={merge([(!active || disabled) && "tw-hidden"])}>{children}</div>;
};
