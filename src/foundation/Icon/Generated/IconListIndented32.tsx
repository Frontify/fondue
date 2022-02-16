import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListIndented32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconListIndented32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.049 25.333a1 1 0 0 1-1-1V7.667a1 1 0 1 1 2 0v16.666a1 1 0 0 1-1 1ZM28 7.667a1 1 0 0 1-1 1H10a1 1 0 0 1 0-2h17a1 1 0 0 1 1 1ZM9 24.333a1 1 0 0 1 1-1h14.666a1 1 0 0 1 0 2H10a1 1 0 0 1-1-1ZM25.666 13.19a1 1 0 0 1-1 1H10a1 1 0 1 1 0-2h14.666a1 1 0 0 1 1 1ZM28 18.738a1 1 0 0 1-1 1H10a1 1 0 1 1 0-2h17a1 1 0 0 1 1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListIndented32);
export default Memo;
