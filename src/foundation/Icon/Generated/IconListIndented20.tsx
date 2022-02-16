import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListIndented20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconListIndented20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.155 15.833a.625.625 0 0 1-.625-.625V4.792a.625.625 0 0 1 1.25 0v10.416c0 .346-.28.625-.625.625ZM17.5 4.792c0 .345-.28.625-.625.625H6.25a.625.625 0 0 1 0-1.25h10.625c.345 0 .625.28.625.625ZM5.625 15.208c0-.345.28-.625.625-.625h9.166a.625.625 0 0 1 0 1.25H6.25a.625.625 0 0 1-.625-.625Zm10.416-6.964c0 .345-.28.625-.625.625H6.25a.625.625 0 1 1 0-1.25h9.166c.345 0 .625.28.625.625Zm1.459 3.467c0 .345-.28.625-.625.625H6.25a.625.625 0 1 1 0-1.25h10.625c.345 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListIndented20);
export default Memo;
