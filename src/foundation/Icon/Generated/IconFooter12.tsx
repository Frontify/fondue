import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFooter12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFooter12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 2.25h6a.75.75 0 0 1 .75.75v4.75h-7.5V3A.75.75 0 0 1 3 2.25ZM2.25 8.5V9c0 .414.336.75.75.75h6A.75.75 0 0 0 9.75 9v-.5h-7.5ZM1.5 3A1.5 1.5 0 0 1 3 1.5h6A1.5 1.5 0 0 1 10.5 3v6A1.5 1.5 0 0 1 9 10.5H3A1.5 1.5 0 0 1 1.5 9V3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFooter12);
export default Memo;
