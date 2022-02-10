import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLines16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLines16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2 5.333A.667.667 0 1 1 2 4h12a.667.667 0 0 1 0 1.333H2Zm0 3.334a.667.667 0 0 1 0-1.334h12a.667.667 0 0 1 0 1.334H2Zm-.667 2.666c0 .368.299.667.667.667h12a.667.667 0 0 0 0-1.333H2a.667.667 0 0 0-.667.666Z"
            />
        </svg>
    );
}

const Memo = memo(IconLines16);
export default Memo;
