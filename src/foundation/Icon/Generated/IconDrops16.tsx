import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDrops16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDrops16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4 9.333a.5.5 0 0 1-.5.5h-7a.5.5 0 1 1 0-1h7a.5.5 0 0 1 .5.5Zm-1.333 2a.5.5 0 0 1-.5.5H5.833a.5.5 0 1 1 0-1h4.334a.5.5 0 0 1 .5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDrops16);
export default Memo;
