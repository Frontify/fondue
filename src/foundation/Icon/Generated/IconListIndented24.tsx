import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListIndented24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconListIndented24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.787 19a.75.75 0 0 1-.75-.75V5.75a.75.75 0 0 1 1.5 0v12.5a.75.75 0 0 1-.75.75ZM21 5.75a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1 0-1.5h12.75a.75.75 0 0 1 .75.75ZM6.75 18.25a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11a.75.75 0 0 1-.75-.75Zm12.5-8.357a.75.75 0 0 1-.75.75h-11a.75.75 0 0 1 0-1.5h11a.75.75 0 0 1 .75.75Zm1.75 4.16a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1 0-1.5h12.75a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListIndented24);
export default Memo;
