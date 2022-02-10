import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDrops12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDrops12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.625 4.5a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM6 1.875a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Zm3 7a.375.375 0 0 1-.375.375h-5.25a.375.375 0 1 1 0-.75h5.25c.207 0 .375.168.375.375Zm-1 1.5a.375.375 0 0 1-.375.375h-3.25a.375.375 0 0 1 0-.75h3.25c.207 0 .375.168.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDrops12);
export default Memo;
