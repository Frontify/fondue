/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeProps } from "@elements/Badge/Badge";
import { IconProps } from "@elements/Icon/IconProps";
import React, { FC, ReactElement } from "react";
import { CurrentBreadcrumbItem } from "./CurrentBreadcrumbItem";

export type Breadcrumb = {
    label: string;
    link?: string;
    onClick?: () => void;
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
            {items.map(({ label, badges, bold, decorator, link, onClick }, index) =>
                index < items.length - 1 ? (
                    <li
                        className="tw-flex tw-items-center tw-text-black-80 tw-text-xs dark:tw-text-black-10"
                        key={`breadcrumb-${index}`}
                        data-test-id="breadcrumb-item"
                    >
                        {link ? (
                            <a href={link}>{label}</a>
                        ) : onClick ? (
                            <button onClick={onClick}>{label}</button>
                        ) : (
                            <span>{label}</span>
                        )}
                        {index < items.length - 2 && <Seperator aria-hidden="true" />}
                    </li>
                ) : (
                    <CurrentBreadcrumbItem
                        key={`breadcrumb-${index}`}
                        label={label}
                        badges={badges}
                        bold={bold}
                        decorator={decorator}
                        link={link}
                        onClick={onClick}
                    />
                ),
            )}
        </ol>
    </nav>
);
