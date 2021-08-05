/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, FC, PropsWithChildren } from "react";
import { merge } from "@utilities/merge";

export enum Direction {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type ChecklistProps = PropsWithChildren<{
    direction?: Direction;
}>;

export const Checklist: FC<ChecklistProps> = ({ direction = Direction.Horizontal, children }) => {
    return (
        <ul
            data-test-id="checklist"
            className={merge(["flex", direction === Direction.Horizontal ? "flex-row gap-12" : "flex-col gap-4"])}
        >
            {Children.map(children, (child) => (
                <li>{child}</li>
            ))}
        </ul>
    );
};
