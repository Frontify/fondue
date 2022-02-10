import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStar12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStar12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="m2.91 10.51.59-3.44L1 4.633l3.455-.502L6 1l1.545 3.13L11 4.634 8.5 7.07l.59 3.44L6 8.887l-3.09 1.625Z"
            />
        </svg>
    );
}

const Memo = memo(IconStar12Filled);
export default Memo;
