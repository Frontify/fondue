import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListCheck16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconListCheck16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 3.833a.5.5 0 0 1-.5.5H7.833a.5.5 0 1 1 0-1H13.5a.5.5 0 0 1 .5.5Zm-6.667 8.334a.5.5 0 0 1 .5-.5h4.334a.5.5 0 0 1 0 1H7.833a.5.5 0 0 1-.5-.5Zm5.334-5.572a.5.5 0 0 1-.5.5H7.833a.5.5 0 0 1 0-1h4.334a.5.5 0 0 1 .5.5ZM14 9.369a.5.5 0 0 1-.5.5H7.833a.5.5 0 0 1 0-1H13.5a.5.5 0 0 1 .5.5ZM3.76 6.04l-.644-.757a.5.5 0 1 0-.762.648l.991 1.165a.633.633 0 0 0 1.04-.109l1.552-2.866a.5.5 0 0 0-.88-.476L3.76 6.04ZM3 9.667v2h2v-2H3Zm-.333-1A.667.667 0 0 0 2 9.333V12c0 .368.298.667.667.667h2.666A.667.667 0 0 0 6 12V9.333a.667.667 0 0 0-.667-.666H2.667Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListCheck16);
export default Memo;
