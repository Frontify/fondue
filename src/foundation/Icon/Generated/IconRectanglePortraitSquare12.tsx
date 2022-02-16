import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconRectanglePortraitSquare12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconRectanglePortraitSquare12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M5 3h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm0 .85a.15.15 0 0 0-.15.15v4c0 .083.067.15.15.15h2A.15.15 0 0 0 7.15 8V4A.15.15 0 0 0 7 3.85H5Z" />
                <path d="M3 1.575h6c.787 0 1.425.638 1.425 1.425v6c0 .787-.638 1.425-1.425 1.425H3A1.425 1.425 0 0 1 1.575 9V3c0-.787.638-1.425 1.425-1.425Zm0 .85A.575.575 0 0 0 2.425 3v6c0 .318.257.575.575.575h6A.575.575 0 0 0 9.575 9V3A.575.575 0 0 0 9 2.425H3Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRectanglePortraitSquare12);
export default Memo;
