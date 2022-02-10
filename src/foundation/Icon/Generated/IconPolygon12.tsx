import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPolygon12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPolygon12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.09 10.75 11 4.879l-5-3.63-5 3.63 1.91 5.87h6.18Zm-5.588-.814L1.958 5.19 6 2.256l4.042 2.933-1.544 4.747H3.502Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPolygon12);
export default Memo;
