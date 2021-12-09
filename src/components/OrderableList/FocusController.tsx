/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from "@react-aria/focus";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, KeyboardEvent, MouseEvent, useRef } from "react";
import { FocusControllerProps, FocusControllerWidth, FocusControllerWidthClass } from ".";

export const FocusController: FC<FocusControllerProps> = ({ children, width = FocusControllerWidth.Max }) => {
    if (typeof children !== "object") {
        return children;
    }

    const { isFocused, focusProps } = useFocusRing();

    const focusControllerRef = useRef<HTMLDivElement | null>(null);
    const childRef = useRef<HTMLElement | null>(null);
    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        const isChildsEvent = event.currentTarget !== event.target;

        switch (event.code) {
            case "Space":
                if (!isChildsEvent) {
                    childRef?.current?.focus();
                }
                break;
            case "Enter":
                if (isChildsEvent) {
                    event.stopPropagation();
                } else {
                    childRef?.current?.focus();
                }
                break;
            case "Escape":
                if (isChildsEvent) {
                    focusControllerRef?.current?.focus();
                }
                break;
            case "ArrowLeft":
            case "ArrowRight":
                if (isChildsEvent) {
                    event.stopPropagation();
                }
                break;
        }
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        childRef?.current?.focus();
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            ref={focusControllerRef}
            className={merge([isFocused && FOCUS_STYLE, "tw-flex", FocusControllerWidthClass[width]])}
            {...focusProps}
        >
            <div hidden={true} className={merge(["tw-flex", FocusControllerWidthClass[width]])}>
                {{ ...children, ref: childRef }}
            </div>
        </div>
    );
};
