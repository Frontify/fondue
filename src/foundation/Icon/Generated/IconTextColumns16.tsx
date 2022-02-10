import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextColumns16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextColumns16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2.667 5.5a.5.5 0 0 1 0-1H6a.5.5 0 0 1 0 1H2.667ZM9.5 5a.5.5 0 0 0 .5.5h3.333a.5.5 0 0 0 0-1H10a.5.5 0 0 0-.5.5Zm0 2a.5.5 0 0 0 .5.5h2.666a.5.5 0 0 0 0-1H10a.5.5 0 0 0-.5.5Zm0 2a.5.5 0 0 0 .5.5h3.333a.5.5 0 0 0 0-1H10a.5.5 0 0 0-.5.5Zm-6.833.5a.5.5 0 0 1 0-1H6a.5.5 0 0 1 0 1H2.667Zm-.5-2.5a.5.5 0 0 0 .5.5h2.666a.5.5 0 0 0 0-1H2.666a.5.5 0 0 0-.5.5Zm.5 4.5a.5.5 0 0 1 0-1h2.666a.5.5 0 0 1 0 1H2.666ZM9.5 11a.5.5 0 0 0 .5.5h2.666a.5.5 0 0 0 0-1H10a.5.5 0 0 0-.5.5Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextColumns16);
export default Memo;
