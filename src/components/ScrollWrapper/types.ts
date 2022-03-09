/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";

export enum ScrollWrapperDirection {
    Both = "Both",
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export const scrollWrapperDirections: Record<ScrollWrapperDirection, string> = {
    [ScrollWrapperDirection.Both]: "tw-w-full tw-h-full tw-overflow-scroll tw-p-6",
    [ScrollWrapperDirection.Horizontal]: "tw-w-full tw-overflow-x-scroll tw-overflow-y-hidden tw-px-6",
    [ScrollWrapperDirection.Vertical]: "tw-h-full tw-overflow-y-scroll tw-overflow-x-hidden tw-py-6",
};

export type ScrollWrapperProps = {
    direction?: ScrollWrapperDirection;
    children?: ReactElement | ReactElement[];
};
