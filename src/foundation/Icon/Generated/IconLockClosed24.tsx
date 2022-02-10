import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockClosed24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLockClosed24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.034 7a5 5 0 1 0-10 0v1.667H6.2a2.5 2.5 0 0 0-2.5 2.5V19.5A2.5 2.5 0 0 0 6.2 22h11.667a2.5 2.5 0 0 0 2.5-2.5v-8.333a2.5 2.5 0 0 0-2.5-2.5h-.834V7ZM6.2 10.333a.833.833 0 0 0-.833.834V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833v-8.333a.833.833 0 0 0-.833-.834H6.2Zm9.167-1.666V7A3.333 3.333 0 0 0 8.7 7v1.667h6.667Zm-5 5.833c0 .617.335 1.155.833 1.444V17a.833.833 0 0 0 1.667 0v-1.056a1.666 1.666 0 1 0-2.5-1.444Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockClosed24);
export default Memo;
