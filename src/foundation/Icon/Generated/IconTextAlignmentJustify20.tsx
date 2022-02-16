import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentJustify20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextAlignmentJustify20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.484 4.792c0 .345-.28.625-.625.625H3.126a.625.625 0 1 1 0-1.25h13.733c.345 0 .625.28.625.625Zm.008 3.452c0 .345-.28.625-.625.625H3.134a.625.625 0 0 1 0-1.25h13.733c.345 0 .625.28.625.625Zm0 6.964c0 .346-.28.625-.625.625H3.134a.625.625 0 1 1 0-1.25h13.733c.345 0 .625.28.625.625Zm-.008-3.497c0 .345-.28.625-.625.625H3.126a.625.625 0 1 1 0-1.25h13.733c.345 0 .625.28.625.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentJustify20);
export default Memo;
