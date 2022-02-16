import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPause16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPause16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4 2.667a.667.667 0 0 0-.667.666v9.334c0 .368.299.666.667.666h2.667a.667.667 0 0 0 .667-.666V3.333a.667.667 0 0 0-.667-.666H4Zm5.334 0a.667.667 0 0 0-.667.666v9.334c0 .368.298.666.667.666H12a.667.667 0 0 0 .667-.666V3.333A.667.667 0 0 0 12 2.667H9.334Z"
            />
        </svg>
    );
}

const Memo = memo(IconPause16Filled);
export default Memo;
