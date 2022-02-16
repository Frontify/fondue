import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentCentre32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextAlignmentCentre32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24.32 13.19a1 1 0 0 1-1 1H8.655a1 1 0 0 1 0-2h14.667a1 1 0 0 1 1 1Zm0 11.144a1 1 0 0 1-1 1H8.655a1 1 0 0 1 0-2h14.667a1 1 0 0 1 1 1Zm3.654-16.667a1 1 0 0 1-1 1H5.001a1 1 0 0 1 0-2h21.973a1 1 0 0 1 1 1Zm0 11.071a1 1 0 0 1-1 1H5.001a1 1 0 1 1 0-2h21.973a1 1 0 0 1 1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentCentre32);
export default Memo;
