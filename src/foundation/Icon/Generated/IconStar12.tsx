import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStar12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStar12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m3.5 7.07-.59 3.44L6 8.887l3.09 1.625L8.5 7.07 11 4.633 7.545 4.13 6 1 4.455 4.13 1 4.634 3.5 7.07Zm4.189-.264.398 2.324L6 8.033 3.913 9.13l.398-2.324L2.623 5.16l2.333-.34L6 2.707l1.044 2.115 2.333.339L7.69 6.806Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStar12);
export default Memo;
