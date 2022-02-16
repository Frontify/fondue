import React, { FC, ReactElement, useState } from "react";
import { Badge, BadgeProps } from "@components/Badge";
import { motion } from "framer-motion";
import { merge } from "@utilities/merge";

export type TabITemProps = {
    decorator?: ReactElement;
    badge?: BadgeProps;
    label: string;
    onClick: () => void;
    active: boolean;
    disabled: boolean;
};

export const TabItem: FC<TabITemProps> = (props: TabITemProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { onClick, label, active, decorator, badge, disabled } = props;
    return (
        <li
            role="none"
            className={merge([
                "tw-relative tw-pb-5 tw-pt-2 tw-px-2 tw-w-max tw-h-10 tw-cursor-pointer tw-flex tw-items-center tw-justify-center",
                disabled && "tw-pointer-events-none tw-text-text-disabled",
                active && "tw-font-medium",
            ])}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={onClick}
            onKeyPress={onClick}
        >
            {decorator ? decorator : null}
            <span className="tw-whitespace-nowrap tw-ml-1.5 tw-mr-1">{label}</span>
            {badge && (
                <Badge disabled={disabled} style={badge.style}>
                    {badge.children}
                </Badge>
            )}
            {active && (
                <motion.div
                    layoutId="underline"
                    className="tw-absolute tw-h-1 tw-bg-violet-60 tw-rounded-t-x-large tw-w-full tw-bottom-0"
                />
            )}
            {isVisible && !active && (
                <div className="tw-absolute tw-h-1 tw-bg-grey-20 tw-rounded-t-x-large tw-w-full tw-bottom-0" />
            )}
        </li>
    );
};
