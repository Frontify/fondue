import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDrops32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconDrops32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm9-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm8 18.667a1 1 0 0 1-1 1H9a1 1 0 0 1 0-2h14a1 1 0 0 1 1 1Zm-2.667 4a1 1 0 0 1-1 1h-8.666a1 1 0 1 1 0-2h8.666a1 1 0 0 1 1 1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDrops32);
export default Memo;
