import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextBottom24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMediaObjectTextBottom24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18 16.755a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 .75-.75Zm-1 3.042a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 .75.75ZM19.5 6v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5Zm1.5 6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextBottom24);
export default Memo;
