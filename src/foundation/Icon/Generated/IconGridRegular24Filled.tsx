import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconGridRegular24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconGridRegular24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.6 13A1.6 1.6 0 0 0 3 14.6v4.8A1.6 1.6 0 0 0 4.6 21h4.8a1.6 1.6 0 0 0 1.6-1.6v-4.8A1.6 1.6 0 0 0 9.4 13H4.6Zm10 0a1.6 1.6 0 0 0-1.6 1.6v4.8a1.6 1.6 0 0 0 1.6 1.6h4.8a1.6 1.6 0 0 0 1.6-1.6v-4.8a1.6 1.6 0 0 0-1.6-1.6h-4.8Zm0-10A1.6 1.6 0 0 0 13 4.6v4.8a1.6 1.6 0 0 0 1.6 1.6h4.8A1.6 1.6 0 0 0 21 9.4V4.6A1.6 1.6 0 0 0 19.4 3h-4.8Zm-10 0A1.6 1.6 0 0 0 3 4.6v4.8A1.6 1.6 0 0 0 4.6 11h4.8A1.6 1.6 0 0 0 11 9.4V4.6A1.6 1.6 0 0 0 9.4 3H4.6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconGridRegular24Filled);
export default Memo;
