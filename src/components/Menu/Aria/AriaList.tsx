import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { forwardRef, HTMLAttributes, ReactNode } from "react";

export type AriaListProps = {
    ariaProps: HTMLAttributes<HTMLElement>;
    children: ReactNode;
};

export const AriaList = forwardRef<HTMLUListElement | null, AriaListProps>(({ ariaProps, children }, ref) => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <ul
            {...ariaProps}
            {...focusProps}
            ref={ref}
            className={merge([
                "tw-list-none tw-p-0 tw-m-0 tw-bg-white tw-border tw-border-black-10 tw-rounded tw-z-20",
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
        >
            {children}
        </ul>
    );
});

AriaList.displayName = "AriaList";
