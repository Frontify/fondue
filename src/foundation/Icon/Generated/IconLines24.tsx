import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLines24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLines24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3 8a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2H3Zm0 5a1 1 0 1 1 0-2h18a1 1 0 1 1 0 2H3Zm-1 4a1 1 0 0 0 1 1h18a1 1 0 1 0 0-2H3a1 1 0 0 0-1 1Z"
            />
        </svg>
    );
}

const Memo = memo(IconLines24);
export default Memo;
