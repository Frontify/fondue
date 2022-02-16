import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRectanglePortraitSquare20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconRectanglePortraitSquare20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M8.333 5h3.334c.92 0 1.666.746 1.666 1.667v6.666c0 .92-.746 1.667-1.666 1.667H8.333c-.92 0-1.666-.746-1.666-1.667V6.667c0-.92.746-1.667 1.666-1.667Zm0 1.417a.25.25 0 0 0-.25.25v6.666c0 .138.112.25.25.25h3.334a.25.25 0 0 0 .25-.25V6.667a.25.25 0 0 0-.25-.25H8.333Z" />
                <path d="M5 2.625h10A2.375 2.375 0 0 1 17.375 5v10A2.375 2.375 0 0 1 15 17.375H5A2.375 2.375 0 0 1 2.625 15V5A2.375 2.375 0 0 1 5 2.625Zm0 1.417A.957.957 0 0 0 4.042 5v10c0 .53.429.958.958.958h10c.53 0 .958-.429.958-.958V5A.958.958 0 0 0 15 4.042H5Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRectanglePortraitSquare20);
export default Memo;
