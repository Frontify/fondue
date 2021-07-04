/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useCallback } from "react";
import css from "./TabTitle.module.css";

export interface TabTitleProps {
    id: string;
    title: string;
    index: number;
    selected?: boolean;
    onClick: (index: number) => void;
}

export default function TabTitle({
    id,
    title,
    index,
    selected = false,
    onClick,
}: TabTitleProps): ReactElement<TabTitleProps> {
    const setSelectedTab = useCallback(() => {
        onClick(index);
    }, [onClick, index]);

    const onKeyUp = useCallback(
        (event: React.KeyboardEvent): void => {
            // `event.keyCode` for IE
            if (event.keyCode === 32 || event.code === "Space") {
                event.preventDefault();
                onClick(index);
            }
        },
        [onClick, index],
    );

    // Disable scrolling when pressing space
    const onKeyDown = useCallback(
        (event: React.KeyboardEvent): void => {
            if (event.keyCode == 32 || event.code === "Space") {
                event.preventDefault();
            }
        },
        [onClick, index],
    );

    const tabTitleClasses = [css.title, ...(selected ? [css.selected] : [])].join(" ");

    return (
        <li
            id={id}
            onClick={setSelectedTab}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            className={tabTitleClasses}
            tabIndex={0}
            role="tab"
            aria-selected={selected}
            data-test-id="tab-title"
        >
            {title}
        </li>
    );
}
