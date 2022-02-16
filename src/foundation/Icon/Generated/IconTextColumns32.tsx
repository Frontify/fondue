import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextColumns32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTextColumns32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M5.333 11a1 1 0 1 1 0-2H12a1 1 0 0 1 0 2H5.333ZM19 10a1 1 0 0 0 1 1h6.667a1 1 0 1 0 0-2H20a1 1 0 0 0-1 1Zm0 4a1 1 0 0 0 1 1h5.334a1 1 0 1 0 0-2H20a1 1 0 0 0-1 1Zm0 4a1 1 0 0 0 1 1h6.667a1 1 0 1 0 0-2H20a1 1 0 0 0-1 1ZM5.333 19a1 1 0 1 1 0-2H12a1 1 0 0 1 0 2H5.333Zm-1-5a1 1 0 0 0 1 1h5.334a1 1 0 1 0 0-2H5.334a1 1 0 0 0-1 1Zm1 9a1 1 0 1 1 0-2h5.334a1 1 0 1 1 0 2H5.334ZM19 22a1 1 0 0 0 1 1h5.334a1 1 0 1 0 0-2H20a1 1 0 0 0-1 1Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextColumns32);
export default Memo;
