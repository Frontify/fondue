import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextFormatItalic24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextFormatItalic24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.533 4.14c0 .415.336.75.75.75h1.328L9.418 18.924H8.116a.75.75 0 0 0 0 1.5h5.553a.75.75 0 0 0 0-1.5h-1.25L14.61 4.89h1.225a.75.75 0 1 0 0-1.5h-5.553a.75.75 0 0 0-.75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextFormatItalic24);
export default Memo;
