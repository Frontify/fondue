import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    border: boolean;
    children: ReactNode;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(
    ({ ariaProps, border = true, children }, ref) => (
        <ul
            {...ariaProps}
            ref={ref}
            className={merge([
                "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-z-20 focus-visible:tw-outline-none",
                border && "tw-border tw-border-black-10 tw-rounded",
            ])}
        >
            {children}
        </ul>
    ),
);

AriaList.displayName = "AriaList";
