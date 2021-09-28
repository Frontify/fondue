/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, FC, PropsWithChildren } from "react";
import { merge } from "@utilities/merge";

export enum ChecklistDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type ChecklistProps = PropsWithChildren<{
    direction?: ChecklistDirection;
    columns?: 1 | 2 | 3 | 4;
}>;

export const Checklist: FC<ChecklistProps> = ({ direction = ChecklistDirection.Horizontal, columns = 1, children }) => {
    return (
        <ul
            data-test-id="checklist"
            className={merge([
                direction === ChecklistDirection.Horizontal
                    ? "tw-flex tw-flex-row tw-gap-12"
                    : `tw-grid tw-grid-cols-${columns} tw-gap-4`,
            ])}
        >
            {Children.map(children, (child) => (
                <li>{child}</li>
            ))}
        </ul>
    );
};
