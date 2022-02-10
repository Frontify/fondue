import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMapPointer16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMapPointer16"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M10.334 6.302a2.333 2.333 0 1 1-4.667 0 2.333 2.333 0 0 1 4.667 0Zm-1 0a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z" />
                <path d="M13.667 5.8c0 4.33-3.407 7.676-4.937 8.962a1.123 1.123 0 0 1-1.46 0C5.74 13.476 2.335 10.13 2.335 5.8 2.333 2.965 4.87.667 8 .667s5.667 2.298 5.667 5.133Zm-1 0c0 1.9-.748 3.624-1.723 5.061-.973 1.436-2.133 2.527-2.857 3.135A.133.133 0 0 1 8 14.03a.133.133 0 0 1-.086-.035c-.725-.608-1.885-1.699-2.858-3.135C4.082 9.424 3.333 7.7 3.333 5.8c0-2.192 1.995-4.133 4.667-4.133 2.673 0 4.667 1.94 4.667 4.133Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMapPointer16);
export default Memo;
