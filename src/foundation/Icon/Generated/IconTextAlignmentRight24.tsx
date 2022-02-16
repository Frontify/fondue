import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentRight24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextAlignmentRight24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.25 6A.75.75 0 0 1 4 5.25h16.48a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 6Zm2.935 4a.75.75 0 0 1 .75-.75h13.544a.75.75 0 0 1 0 1.5H6.935a.75.75 0 0 1-.75-.75ZM3.25 14a.75.75 0 0 1 .75-.75h16.48a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Zm3.685 3.25h13.544a.75.75 0 0 1 0 1.5H6.935a.75.75 0 0 1 0-1.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentRight24);
export default Memo;
