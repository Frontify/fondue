import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFooter20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFooter20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 3.75h10c.69 0 1.25.56 1.25 1.25v7.917H3.75V5c0-.69.56-1.25 1.25-1.25ZM3.75 14.167V15c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25v-.833H3.75ZM2.5 5A2.5 2.5 0 0 1 5 2.5h10A2.5 2.5 0 0 1 17.5 5v10a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 15V5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFooter20);
export default Memo;
