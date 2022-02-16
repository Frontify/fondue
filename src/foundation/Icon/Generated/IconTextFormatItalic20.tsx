import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatItalic20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextFormatItalic20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.944 3.45c0 .345.28.625.625.625h1.107L7.849 15.77H6.764a.625.625 0 1 0 0 1.25h4.627a.625.625 0 0 0 0-1.25h-1.042l1.827-11.695h1.02a.625.625 0 1 0 0-1.25H8.57a.625.625 0 0 0-.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatItalic20);
export default Memo;
