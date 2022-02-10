import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDrops20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconDrops20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.375 7.5a5.625 5.625 0 1 1 11.25 0 5.625 5.625 0 0 1-11.25 0ZM10 3.125a4.375 4.375 0 1 0 0 8.75 4.375 4.375 0 0 0 0-8.75Zm5 11.667c0 .345-.28.625-.625.625h-8.75a.625.625 0 0 1 0-1.25h8.75c.345 0 .625.28.625.625Zm-1.667 2.5c0 .345-.28.625-.625.625H7.292a.625.625 0 0 1 0-1.25h5.416c.345 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDrops20);
export default Memo;
