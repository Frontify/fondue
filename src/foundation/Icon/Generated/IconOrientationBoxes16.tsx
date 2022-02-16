import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientationBoxes16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconOrientationBoxes16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.555 1.333h3.89c1.227 0 2.222.995 2.222 2.223v2.777h2.777c1.228 0 2.223.995 2.223 2.223v3.889a2.222 2.222 0 0 1-2.223 2.222H5.778a2.222 2.222 0 0 1-2.222-2.223 2.222 2.222 0 0 1-2.223-2.222V3.556c0-1.228.995-2.223 2.222-2.223Zm2.223 12.223a1.111 1.111 0 0 1-1.111-1.111h2.777a2.222 2.222 0 0 0 2.223-2.223V7.445h2.777a1.11 1.11 0 0 1 1.111 1.11v3.89a1.11 1.11 0 0 1-1.11 1.11H5.777Zm-3.334-10c0-.614.498-1.111 1.111-1.111h3.89c.613 0 1.11.497 1.11 1.11v6.667a1.11 1.11 0 0 1-1.11 1.111h-3.89a1.111 1.111 0 0 1-1.11-1.11V3.555Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconOrientationBoxes16);
export default Memo;
