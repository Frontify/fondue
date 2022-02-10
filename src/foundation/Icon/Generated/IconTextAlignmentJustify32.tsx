import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentJustify32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextAlignmentJustify32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27.974 7.667a1 1 0 0 1-1 1H5.001a1 1 0 0 1 0-2h21.973a1 1 0 0 1 1 1Zm.012 5.523a1 1 0 0 1-1 1H5.014a1 1 0 0 1 0-2h21.972a1 1 0 0 1 1 1Zm0 11.144a1 1 0 0 1-1 1H5.014a1 1 0 0 1 0-2h21.972a1 1 0 0 1 1 1Zm-.012-5.596a1 1 0 0 1-1 1H5.001a1 1 0 1 1 0-2h21.973a1 1 0 0 1 1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentJustify32);
export default Memo;
