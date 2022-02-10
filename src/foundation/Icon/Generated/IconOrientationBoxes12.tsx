import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientationBoxes12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconOrientationBoxes12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.667 1h2.916c.92 0 1.667.746 1.667 1.667V4.75h2.083c.92 0 1.667.746 1.667 1.667v2.916c0 .92-.746 1.667-1.667 1.667h-5c-.92 0-1.666-.746-1.666-1.667C1.747 9.333 1 8.587 1 7.667v-5C1 1.747 1.746 1 2.667 1Zm1.666 9.167a.833.833 0 0 1-.833-.834h2.083c.92 0 1.667-.746 1.667-1.666V5.583h2.083c.46 0 .834.373.834.834v2.916c0 .46-.373.834-.834.834h-5Zm-2.5-7.5c0-.46.373-.834.834-.834h2.916c.46 0 .834.373.834.834v5c0 .46-.373.833-.834.833H2.667a.833.833 0 0 1-.834-.833v-5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconOrientationBoxes12);
export default Memo;
