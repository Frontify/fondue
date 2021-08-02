/* (c) Copyright Frontify Ltd., all rights reserved. */

import Badge, { BadgeProps } from "@elements/Badge/Badge";
import IconProps from "@elements/Icon/IconProps";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

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
        className="stroke-current text-black-20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="3.52447" y1="16.0623" x2="8.46874" y2="0.845385" />
    </svg>
);

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="font-sans" aria-label="Breadcrumb">
            <ol className="list-none flex flex-wrap gap-y-1">
                {items.map((item, index) =>
                    index < items.length - 1 ? (
                        <li
                            className="flex items-center text-black-80 text-xs dark:text-black-10"
                            key={`breadcrumb-${index}`}
                            data-test-id="breadcrumb-item"
                        >
                            <Link to={item.link}>{item.label}</Link>
                            {index < items.length - 2 && <Seperator aria-hidden="true" />}
                        </li>
                    ) : (
                        <li
                            className="w-full h-6 flex gap-x-1 items-center text-m text-black dark:text-white"
                            key={`breadcrumb-${index}`}
                            data-test-id="breadcrumb-item"
                        >
                            {item.decorator}
                            <span className="inline-flex gap-x-2 items-center">
                                <Link to={item.link} aria-current="page" className={item.bold ? "font-bold" : ""}>
                                    {item.label}
                                </Link>
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
};
