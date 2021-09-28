/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, FC, PropsWithChildren } from "react";
import { merge } from "@utilities/merge";

export enum ChecklistDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

type Columns = 1 | 2 | 3 | 4;

const columnsStyle: Record<Columns, string> = {
    1: "tw-grid-cols-1",
    2: "tw-grid-cols-2",
    3: "tw-grid-cols-3",
    4: "tw-grid-cols-4",
};

export type ChecklistProps = PropsWithChildren<{
    direction?: ChecklistDirection;
    columns?: Columns;
}>;

export const Checklist: FC<ChecklistProps> = ({ direction = ChecklistDirection.Horizontal, columns = 1, children }) => {
    return (
        <ul
            data-test-id="checklist"
            className={merge([
                direction === ChecklistDirection.Horizontal
                    ? "tw-flex tw-flex-row tw-gap-12"
                    : `tw-grid tw-gap-4 ${columnsStyle[columns]}`,
            ])}
        >
            {Children.map(children, (child) => (
                <li>{child}</li>
            ))}
        </ul>
    );
};
