import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";
import { MenuStyle } from "../types";

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    children: ReactNode;
    scrollable?: boolean;
    style?: MenuStyle;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(
    ({ ariaProps, children, style = MenuStyle.WithBorder, scrollable = false }, ref) => (
        <ul
            {...ariaProps}
            ref={ref}
            className={merge([
                "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none",
                scrollable && "tw-overflow-y-auto",
                style === MenuStyle.WithBorder && "tw-border tw-border-black-10 tw-rounded",
            ])}
        >
            {children}
        </ul>
    ),
);

AriaList.displayName = "AriaList";
