import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPin24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPin24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M15.498 2.364a2.01 2.01 0 0 0-2.363.817L9.92 8.234a7.07 7.07 0 0 0-4.674.868l-.003.001a2.01 2.01 0 0 0-.402 3.158L7.76 15.18l-5.29 5.29a.75.75 0 1 0 1.06 1.06l5.29-5.29 2.92 2.92a2.012 2.012 0 0 0 3.157-.403l.002-.003a7.07 7.07 0 0 0 .868-4.674l5.052-3.215a2.01 2.01 0 0 0 .343-3.117l-4.91-4.91a2.01 2.01 0 0 0-.754-.474Z"
            />
        </svg>
    );
}

const Memo = memo(IconPin24Filled);
export default Memo;
