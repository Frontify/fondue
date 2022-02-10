import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPlay20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.435 10.7a.818.818 0 0 0 0-1.402L5.33 3.438a.762.762 0 0 0-.383-.104c-.43 0-.78.36-.78.804v11.725a.83.83 0 0 0 .1.394.767.767 0 0 0 1.063.307l10.106-5.862ZM5.258 4.688 14.418 10l-9.16 5.312V4.687Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPlay20);
export default Memo;
