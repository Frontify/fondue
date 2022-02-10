import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentRight32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextAlignmentRight32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.333 8a1 1 0 0 1 1-1h21.973a1 1 0 0 1 0 2H5.333a1 1 0 0 1-1-1Zm3.913 5.333a1 1 0 0 1 1-1h18.06a1 1 0 0 1 0 2H9.246a1 1 0 0 1-1-1Zm-3.913 5.334a1 1 0 0 1 1-1h21.973a1 1 0 0 1 0 2H5.333a1 1 0 0 1-1-1ZM9.246 23h18.06a1 1 0 1 1 0 2H9.246a1 1 0 1 1 0-2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentRight32);
export default Memo;
