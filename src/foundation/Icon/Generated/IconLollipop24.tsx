import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLollipop24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLollipop24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M9.25 8v7a.75.75 0 0 0 1.5 0V8a.75.75 0 0 0-1.5 0Zm4 7V8a.75.75 0 0 1 1.5 0v7a.75.75 0 0 1-1.5 0Z" />
                <path
                    fillRule="evenodd"
                    d="M12 2a7 7 0 0 1 7 7v6.552a3 3 0 0 1-3 3h-1.5v.948a2.5 2.5 0 0 1-5 0v-.948H8a3 3 0 0 1-3-3V9a7 7 0 0 1 7-7Zm-1 16.552v.948a1 1 0 1 0 2 0v-.948h-2ZM12 3.5A5.5 5.5 0 0 0 6.5 9v6.552a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9A5.5 5.5 0 0 0 12 3.5Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLollipop24);
export default Memo;
