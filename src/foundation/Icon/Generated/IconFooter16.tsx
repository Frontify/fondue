import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFooter16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFooter16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 3h8a1 1 0 0 1 1 1v6.333H3V4a1 1 0 0 1 1-1Zm-1 8.333V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.667H3ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFooter16);
export default Memo;
