/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "@utilities/merge";
import { Children, FC, PropsWithChildren } from "react";

export enum ChecklistDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type ChecklistProps = PropsWithChildren<{
    direction?: ChecklistDirection;
}>;

export const Checklist: FC<ChecklistProps> = ({ direction = ChecklistDirection.Horizontal, children }) => {
    return (
        <ul
            data-test-id="checklist"
            className={merge([
                "flex",
                direction === ChecklistDirection.Horizontal ? "flex-row gap-12" : "flex-col gap-4",
            ])}
        >
            {Children.map(children, (child) => (
                <li>{child}</li>
            ))}
        </ul>
    );
};
