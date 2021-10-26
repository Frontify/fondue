import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    noTopBorder?: boolean;
    children: ReactNode;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(
    ({ ariaProps, noTopBorder, children }, ref) => (
        <ul
            {...ariaProps}
            ref={ref}
            className={merge([
                "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-border tw-border-black-10 tw-rounded tw-z-20 focus-visible:tw-outline-none",
                noTopBorder && "tw-rounded-t-none tw-border-t-0",
            ])}
        >
            {children}
        </ul>
    ),
);

AriaList.displayName = "AriaList";
