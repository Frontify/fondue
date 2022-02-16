import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockOpen24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLockOpen24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.2 15.944a1.666 1.666 0 1 1 1.667 0V17a.833.833 0 0 1-1.667 0v-1.056Z" />
                <path
                    fillRule="evenodd"
                    d="M15.367 8.667v-2.5a2.5 2.5 0 0 0-2.5-2.5H11.2a2.5 2.5 0 0 0-2.5 2.5.833.833 0 0 1-1.666 0A4.167 4.167 0 0 1 11.2 2h1.667a4.167 4.167 0 0 1 4.166 4.167v2.5h.834a2.5 2.5 0 0 1 2.5 2.5V19.5a2.5 2.5 0 0 1-2.5 2.5H6.2a2.5 2.5 0 0 1-2.5-2.5v-8.333a2.5 2.5 0 0 1 2.5-2.5h9.167ZM6.2 10.333a.833.833 0 0 0-.833.834V19.5c0 .46.373.833.833.833h11.667c.46 0 .833-.373.833-.833v-8.333a.833.833 0 0 0-.833-.834H6.2Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLockOpen24);
export default Memo;
