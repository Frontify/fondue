/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";

export enum ScrollWrapperDirection {
    None = "None",
    Both = "Both",
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export const scrollWrapperDirections: Record<ScrollWrapperDirection, string> = {
    [ScrollWrapperDirection.None]: "",
    [ScrollWrapperDirection.Both]: "tw-",
    [ScrollWrapperDirection.Horizontal]: "tw-",
    [ScrollWrapperDirection.Vertical]: "tw-",
};

export type ScrollWrapperProps = {
    direction?: ScrollWrapperDirection;
    children?: ReactElement | ReactElement[];
};
