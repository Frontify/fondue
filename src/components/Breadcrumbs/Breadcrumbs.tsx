/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement } from "react";
import { Badge, BadgeProps } from "@elements/Badge/Badge";
import { IconProps } from "@elements/Icon/IconProps";

export type Breadcrumb = {
    link: string;
    label: string;
    decorator?: ReactElement<IconProps>;
    bold?: boolean;
    badges?: BadgeProps[];
};

export type BreadcrumbsProps = {
    items: Breadcrumb[];
};

const Seperator: FC = (props) => (
    <svg
        {...props}
        width="13"
        height="17"
        viewBox="0 0 13 17"
        fill="none"
        className="tw-stroke-current tw-text-black-20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="3.52447" y1="16.0623" x2="8.46874" y2="0.845385" />
    </svg>
);

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => (
    <nav className="tw-font-sans" aria-label="Breadcrumb">
        <ol className="tw-list-none tw-flex tw-flex-wrap tw-gap-y-1">
            {items.map((item, index) =>
                index < items.length - 1 ? (
                    <li
                        className="tw-flex tw-items-center tw-text-black-80 tw-text-xs dark:tw-text-black-10"
                        key={`breadcrumb-${index}`}
                        data-test-id="breadcrumb-item"
                    >
                        <a href={item.link}>{item.label}</a>
                        {index < items.length - 2 && <Seperator aria-hidden="true" />}
                    </li>
                ) : (
                    <li
                        className="tw-w-full tw-h-6 tw-flex tw-gap-x-1 tw-items-center tw-text-m tw-text-black dark:tw-text-white"
                        key={`breadcrumb-${index}`}
                        data-test-id="breadcrumb-item"
                    >
                        {item.decorator}
                        <span className="tw-inline-flex tw-gap-x-2 tw-items-center">
                            <a href={item.link} aria-current="page" className={item.bold ? "tw-font-bold" : ""}>
                                {item.label}
                            </a>
                            {item.badges?.map(({ children, ...props }, index) => (
                                <Badge {...props} key={`breadcrumb-badge-${index}`}>
                                    {children}
                                </Badge>
                            ))}
                        </span>
                    </li>
                ),
            )}
        </ol>
    </nav>
);
