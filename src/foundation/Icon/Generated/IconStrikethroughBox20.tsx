import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStrikethroughBox20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStrikethroughBox20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.164 2.907a.694.694 0 0 0-.98-.072L15.873 3.97a2.074 2.074 0 0 0-1.011-.26H5.139c-1.15 0-2.084.932-2.084 2.083v8.333c0 .277.054.54.152.782l-1.3 1.123a.694.694 0 0 0 .908 1.051l1.313-1.134c.3.166.644.261 1.01.261h9.723c1.15 0 2.083-.933 2.083-2.083V5.792a2.08 2.08 0 0 0-.152-.783l1.3-1.122a.695.695 0 0 0 .072-.98Zm-3.598 2.19H5.139a.694.694 0 0 0-.695.695v8.047l10.122-8.742ZM5.434 14.82l10.121-8.741v8.047c0 .383-.31.694-.694.694H5.434Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStrikethroughBox20);
export default Memo;
