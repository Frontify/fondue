import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentLeft20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextAlignmentLeft20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.484 4.792c0 .345-.28.625-.625.625H3.126a.625.625 0 1 1 0-1.25h13.733c.345 0 .625.28.625.625Zm-3.09 11.041H3.107a.625.625 0 0 1 0-1.25h11.287a.625.625 0 0 1 0 1.25Zm.626-7.589c0 .345-.28.625-.625.625H3.107a.625.625 0 0 1 0-1.25h11.287c.346 0 .626.28.626.625Zm2.464 3.467c0 .345-.28.625-.625.625H3.126a.625.625 0 1 1 0-1.25h13.733c.345 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentLeft20);
export default Memo;
