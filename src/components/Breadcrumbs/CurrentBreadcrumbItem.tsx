import { Badge, BadgeProps } from "@elements/Badge/Badge";
import { merge } from "@utilities/merge";
import React, { FC } from "react";
import { Breadcrumb } from "./Breadcrumbs";

const ItemWithBadges: FC<{ badges?: BadgeProps[] }> = ({ badges, children }) => (
    <span className="tw-inline-flex tw-gap-x-2 tw-items-center">
        {children}

        {badges?.map(({ children: badge, ...props }, index) => (
            <Badge {...props} key={`breadcrumb-badge-${index}`}>
                {badge}
            </Badge>
        ))}
    </span>
);

export const CurrentBreadcrumbItem: FC<Breadcrumb> = ({ label, badges, bold, decorator, link, onClick }) => {
    const classNames = merge([decorator && "tw-flex tw-gap-x-1 tw-items-center", bold && "tw-font-bold"]);

    return (
        <li
            className="tw-w-full tw-h-6 tw-flex tw-gap-x-1 tw-items-center tw-text-m tw-text-black dark:tw-text-white"
            data-test-id="breadcrumb-item"
        >
            {link ? (
                <ItemWithBadges badges={badges}>
                    <a href={link} aria-current="page" className={classNames}>
                        {decorator}
                        {label}
                    </a>
                </ItemWithBadges>
            ) : onClick ? (
                <ItemWithBadges badges={badges}>
                    <button onClick={onClick} aria-current="page" className={classNames}>
                        {decorator}
                        {label}
                    </button>
                </ItemWithBadges>
            ) : (
                <>
                    {decorator}
                    <ItemWithBadges badges={badges}>
                        <span className={bold ? "tw-font-bold" : ""}>{label}</span>
                    </ItemWithBadges>
                </>
            )}
        </li>
    );
};
