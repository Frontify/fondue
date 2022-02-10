import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageWithText20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconImageWithText20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M9.167 6.458c0 .345-.28.625-.625.625h-3.75a.625.625 0 1 1 0-1.25h3.75c.345 0 .625.28.625.625Zm-1.667 5c0 .345-.28.625-.625.625H4.792a.625.625 0 0 1 0-1.25h2.083c.345 0 .625.28.625.625Zm1.667-2.5c0 .345-.28.625-.625.625h-3.75a.625.625 0 1 1 0-1.25h3.75c.345 0 .625.28.625.625Zm2.916-.625a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm1.25-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
                <path d="M16.667 4.583H3.333A.417.417 0 0 0 2.917 5v10c0 .23.186.417.416.417h13.334c.23 0 .416-.187.416-.417V5a.417.417 0 0 0-.416-.417ZM3.333 3.333c-.92 0-1.666.746-1.666 1.667v10c0 .92.746 1.667 1.666 1.667h13.334c.92 0 1.666-.747 1.666-1.667V5c0-.92-.746-1.667-1.666-1.667H3.333Z" />
                <path d="m4.974 15.629 5.679-3.495a1.459 1.459 0 0 1 1.018-.194l5.72 1.012-.218 1.231-5.72-1.012a.209.209 0 0 0-.145.027l-5.68 3.495-.654-1.065Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconImageWithText20);
export default Memo;
