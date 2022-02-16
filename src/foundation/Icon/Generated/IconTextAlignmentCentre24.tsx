import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentCentre24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextAlignmentCentre24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.24 9.893a.75.75 0 0 1-.75.75h-11a.75.75 0 0 1 0-1.5h11a.75.75 0 0 1 .75.75Zm0 8.357a.75.75 0 0 1-.75.75h-11a.75.75 0 0 1 0-1.5h11a.75.75 0 0 1 .75.75Zm2.74-12.5a.75.75 0 0 1-.75.75H3.751a.75.75 0 1 1 0-1.5h16.48a.75.75 0 0 1 .75.75Zm0 8.303a.75.75 0 0 1-.75.75H3.751a.75.75 0 0 1 0-1.5h16.48a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentCentre24);
export default Memo;
