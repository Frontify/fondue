import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFooter32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFooter32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 6h16a2 2 0 0 1 2 2v12.667H6V8a2 2 0 0 1 2-2ZM6 22.667V24a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1.333H6ZM4 8a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFooter32);
export default Memo;
