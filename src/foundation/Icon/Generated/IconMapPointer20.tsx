import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMapPointer20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMapPointer20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M12.917 7.878a2.917 2.917 0 1 1-5.834 0 2.917 2.917 0 0 1 5.834 0Zm-1.25 0a1.667 1.667 0 1 1-3.333 0 1.667 1.667 0 0 1 3.333 0Z" />
                <path d="M17.083 7.25c0 5.412-4.258 9.596-6.171 11.202a1.404 1.404 0 0 1-1.824 0c-1.913-1.607-6.171-5.79-6.171-11.202C2.917 3.706 6.088.833 10 .833c3.912 0 7.083 2.873 7.083 6.417Zm-1.25 0c0 2.374-.935 4.53-2.152 6.327-1.217 1.794-2.667 3.158-3.573 3.918a.166.166 0 0 1-.108.043.166.166 0 0 1-.108-.043c-.905-.76-2.356-2.124-3.572-3.918C5.102 11.78 4.167 9.624 4.167 7.25c0-2.74 2.492-5.167 5.833-5.167 3.34 0 5.833 2.427 5.833 5.167Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMapPointer20);
export default Memo;
