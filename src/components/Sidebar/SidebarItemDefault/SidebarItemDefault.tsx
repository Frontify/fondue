/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback } from "react";
import css from "./SidebarItemDefault.module.css";

export type SidebarItemDefaultProps = {
    label: string;
    selected?: boolean;
    onClick: () => void;
};

export default function SidebarItemDefault({
    label,
    selected = false,
    onClick,
}: SidebarItemDefaultProps): ReactElement<SidebarItemDefaultProps> {
    const onKeyUp = useCallback(
        (event: React.KeyboardEvent): void => {
            // `event.keyCode` for IE
            if (event.keyCode === 32 || event.code === "Space") {
                onClick();
            }
        },
        [onClick],
    );

    // Disable scrolling when pressing space
    const onKeyDown = useCallback(
        (event: React.KeyboardEvent): void => {
            if (event.keyCode == 32 || event.code === "Space") {
                event.preventDefault();
            }
        },
        [onClick],
    );

    const sidebarRowItemClasses = [css.groupRow, ...(selected ? [css.groupRowSelected] : [])].join(" ");

    return (
        <span
            className={sidebarRowItemClasses}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            tabIndex={0}
            data-test-id="sidebar-item-default"
        >
            {label}
        </span>
    );
}
