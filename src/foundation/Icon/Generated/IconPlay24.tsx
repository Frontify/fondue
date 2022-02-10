import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPlay24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlay24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.523 12.841a.981.981 0 0 0 0-1.682L6.395 4.124A.914.914 0 0 0 5.935 4C5.42 4 5 4.432 5 4.965v14.07c0 .166.041.328.12.473a.92.92 0 0 0 1.275.368l12.128-7.035ZM6.31 5.624 17.301 12l-10.99 6.375V5.625Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPlay24);
export default Memo;
