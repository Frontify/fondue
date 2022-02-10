import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDrops24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDrops24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0ZM12 3.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Zm6 14a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 .75.75Zm-2 3a.75.75 0 0 1-.75.75h-6.5a.75.75 0 0 1 0-1.5h6.5a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDrops24);
export default Memo;
