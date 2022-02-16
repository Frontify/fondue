import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageWithText32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconImageWithText32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M14.667 10.333a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1Zm-2.667 8a1 1 0 0 1-1 1H7.667a1 1 0 0 1 0-2H11a1 1 0 0 1 1 1Zm2.667-4a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1Zm4.666-1a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
                <path d="M26.667 7.333H5.333A.667.667 0 0 0 4.667 8v16c0 .368.298.667.666.667h21.334a.667.667 0 0 0 .666-.667V8a.667.667 0 0 0-.666-.667Zm-21.334-2A2.667 2.667 0 0 0 2.667 8v16a2.667 2.667 0 0 0 2.666 2.667h21.334A2.667 2.667 0 0 0 29.333 24V8a2.667 2.667 0 0 0-2.666-2.667H5.333Z" />
                <path d="m7.958 25.006 9.086-5.592a2.33 2.33 0 0 1 1.63-.31l9.152 1.62-.349 1.969-9.152-1.62a.334.334 0 0 0-.233.044L9.006 26.71l-1.048-1.703Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconImageWithText32);
export default Memo;
