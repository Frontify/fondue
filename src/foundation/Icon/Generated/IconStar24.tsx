import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStar24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconStar24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m7 14.14-1.18 6.88L12 17.77l6.18 3.25L17 14.14l5-4.874-6.91-1.004L12 2 8.91 8.261 2 9.265l5 4.874Zm8.377-.528.798 4.649L12 16.066 7.825 18.26l.797-4.649-3.377-3.292 4.668-.678L12 5.412l2.087 4.23 4.668.678-3.378 3.292Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStar24);
export default Memo;
