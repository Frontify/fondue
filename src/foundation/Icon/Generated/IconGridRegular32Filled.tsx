import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconGridRegular32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconGridRegular32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.133 17.333A2.133 2.133 0 0 0 4 19.467v6.4C4 27.045 4.955 28 6.133 28h6.4a2.133 2.133 0 0 0 2.134-2.133v-6.4a2.133 2.133 0 0 0-2.134-2.134h-6.4Zm13.334 0a2.133 2.133 0 0 0-2.134 2.134v6.4c0 1.178.956 2.133 2.134 2.133h6.4A2.133 2.133 0 0 0 28 25.867v-6.4a2.133 2.133 0 0 0-2.133-2.134h-6.4Zm0-13.333a2.133 2.133 0 0 0-2.134 2.133v6.4c0 1.178.956 2.134 2.134 2.134h6.4A2.133 2.133 0 0 0 28 12.533v-6.4A2.133 2.133 0 0 0 25.867 4h-6.4ZM6.133 4A2.133 2.133 0 0 0 4 6.133v6.4c0 1.178.955 2.134 2.133 2.134h6.4a2.133 2.133 0 0 0 2.134-2.134v-6.4A2.133 2.133 0 0 0 12.533 4h-6.4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconGridRegular32Filled);
export default Memo;
