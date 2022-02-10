import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLines20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLines20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2.5 6.667A.833.833 0 0 1 2.5 5h15a.833.833 0 1 1 0 1.667h-15Zm0 4.166a.833.833 0 1 1 0-1.666h15a.833.833 0 1 1 0 1.666h-15Zm-.833 3.334c0 .46.373.833.833.833h15a.833.833 0 1 0 0-1.667h-15a.833.833 0 0 0-.833.834Z"
            />
        </svg>
    );
}

const Memo = memo(IconLines20);
export default Memo;
