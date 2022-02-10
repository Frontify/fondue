import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPolygon16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPolygon16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m12.12 14.333 2.546-7.828L8 1.667 1.333 6.505l2.546 7.828h8.24Zm-7.451-1.085L2.61 6.92 8 3.008l5.39 3.911-2.06 6.33H4.67Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPolygon16);
export default Memo;
