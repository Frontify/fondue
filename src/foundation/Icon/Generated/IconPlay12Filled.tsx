import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlay12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M9.678 5.503a.5.5 0 0 1 0 .869L3.31 10.01a.5.5 0 0 1-.748-.434V2.299a.5.5 0 0 1 .748-.434l6.367 3.638Z"
            />
        </svg>
    );
}

const Memo = memo(IconPlay12Filled);
export default Memo;
