import React, { FC, HTMLAttributes } from "react";

export type AriaSectionProps = {
    sectionProps: HTMLAttributes<HTMLElement>;
    groupProps: HTMLAttributes<HTMLElement>;
};

export const AriaSection: FC<AriaSectionProps> = ({ sectionProps, groupProps, children }) => (
    <li
        {...sectionProps}
        className="tw-border-b tw-border-b-black-40 last:tw-border-0"
        data-test-id="menu-block-divider"
    >
        <ul {...groupProps} className="tw-py-2 tw-px-0 tw-m-0 tw-list-none" data-test-id="menu-item-list">
            {children}
        </ul>
    </li>
);
