import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    children: ReactNode;
    scrollable: boolean;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(
    ({ ariaProps, children, scrollable = false }, ref) => (
        <ul
            {...ariaProps}
            ref={ref}
            className={merge([
                "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-border tw-border-black-10 tw-rounded tw-z-20 focus-visible:tw-outline-none",
                scrollable && "tw-overflow-y-auto",
            ])}
        >
            {children}
        </ul>
    ),
);

AriaList.displayName = "AriaList";
