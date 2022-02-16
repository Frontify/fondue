import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScaleSmall12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconScaleSmall12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.23 3.9H1.77a.77.77 0 0 0-.77.77v2.69c0 .425.344.77.77.77h8.46a.77.77 0 0 0 .77-.77V4.67a.77.77 0 0 0-.77-.77ZM1.77 7.36V4.67h3.46v2.692H1.77Zm4.23 0V4.67h2.308v2.692H6Zm3.077 0h1.154V4.67H9.077v2.692Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScaleSmall12);
export default Memo;
