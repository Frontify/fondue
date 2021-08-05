/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, FC } from "react";
import { IconSize } from "@elements/Icon/IconSize";
import IconAddSimple from "@elements/Icon/Generated/IconAddSimple";

export enum AddBlockButtonDirection {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

export type AddBlockButtonProps = {
    onClick: (event: MouseEvent) => void;
    title?: string;
    orientation?: AddBlockButtonDirection;
};

export const AddBlockButton: FC<AddBlockButtonProps> = ({
    onClick,
    title,
    orientation = AddBlockButtonDirection.Horizontal,
}) => {
    return (
        <button
            data-test-id="add-block-button"
            style={{
                clipPath: `path(
                    "M27.3333 10.9369L21.7246 2C20.5 0.5 19.5 0 18 0H4C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H18C19.5 24 20.5 23.5 21.7246 22L27.3333 13.0631C27.7412 12.4131 27.7412 11.5869 27.3333 10.9369Z"
                )`,
            }}
            className={`text-white bg-violet-60 rounded inline-flex items-center w-7 h-6 relative p-1 transition-colors hover:bg-violet-70 active:bg-violet-70 ${
                orientation === AddBlockButtonDirection.Vertical ? "rotate-90" : ""
            }`}
            onClick={onClick}
            title={title}
        >
            <IconAddSimple size={IconSize.Size16} />
        </button>
    );
};
