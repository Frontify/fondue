import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextAlignmentRight20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTextAlignmentRight20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.708 5c0-.345.28-.625.625-.625h13.733a.625.625 0 0 1 0 1.25H3.333A.625.625 0 0 1 2.708 5Zm2.446 3.333c0-.345.28-.625.625-.625h11.287a.625.625 0 0 1 0 1.25H5.78a.625.625 0 0 1-.625-.625Zm-2.446 3.334c0-.345.28-.625.625-.625h13.733a.625.625 0 0 1 0 1.25H3.333a.625.625 0 0 1-.625-.625Zm3.071 2.708h11.287a.625.625 0 1 1 0 1.25H5.78a.625.625 0 1 1 0-1.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentRight20);
export default Memo;
