import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStar24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconStar24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M5.82 21.021 7 14.14 2 9.265l6.91-1.004L12 2l3.09 6.261L22 9.265l-5 4.874 1.18 6.882-6.18-3.25-6.18 3.25Z"
            />
        </svg>
    );
}

const Memo = memo(IconStar24Filled);
export default Memo;
