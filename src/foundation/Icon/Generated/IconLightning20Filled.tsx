import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightning20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLightning20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3.82 11.59h5.294l-2.457 6.075a.486.486 0 0 0 .782.538L17.112 9.2a.486.486 0 0 0-.332-.842h-5.65l2.322-6.03a.486.486 0 0 0-.793-.522l-9.178 8.95a.486.486 0 0 0 .34.835Z"
            />
        </svg>
    );
}

const Memo = memo(IconLightning20Filled);
export default Memo;
