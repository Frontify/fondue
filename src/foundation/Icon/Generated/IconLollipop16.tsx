import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLollipop16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLollipop16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M6.166 5.333V10a.5.5 0 1 0 1 0V5.333a.5.5 0 0 0-1 0ZM8.833 10V5.333a.5.5 0 0 1 1 0V10a.5.5 0 1 1-1 0Z" />
                <path
                    fillRule="evenodd"
                    d="M8 1.333A4.667 4.667 0 0 1 12.666 6v4.368a2 2 0 0 1-2 2h-1V13a1.667 1.667 0 1 1-3.333 0v-.632h-1a2 2 0 0 1-2-2V6A4.667 4.667 0 0 1 8 1.333Zm-.667 11.035V13a.667.667 0 1 0 1.333 0v-.632H7.333ZM8 2.333A3.667 3.667 0 0 0 4.333 6v4.368a1 1 0 0 0 1 1h5.333a1 1 0 0 0 1-1V6A3.667 3.667 0 0 0 8 2.333Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLollipop16);
export default Memo;
