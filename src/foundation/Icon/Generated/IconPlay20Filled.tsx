import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlay20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M16.13 9.172a.833.833 0 0 1 0 1.447L5.518 16.683a.833.833 0 0 1-1.247-.723V3.832a.833.833 0 0 1 1.247-.724L16.13 9.172Z"
            />
        </svg>
    );
}

const Memo = memo(IconPlay20Filled);
export default Memo;
