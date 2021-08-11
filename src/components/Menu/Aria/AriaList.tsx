import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    children: ReactNode;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(({ ariaProps, children }, ref) => (
    <ul
        {...ariaProps}
        ref={ref}
        className={merge([
            "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-outline-none tw-border tw-border-black-10 focus:tw-border-violet-60 tw-rounded tw-z-20",
        ])}
    >
        {children}
    </ul>
));

AriaList.displayName = "AriaList";
