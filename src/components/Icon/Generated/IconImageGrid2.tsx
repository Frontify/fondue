import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconImageGrid2(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconImageGrid2"
            {...props}
        >
            <path d="M4.5 8.667a.833.833 0 0 0-.833.833v5c0 .46.373.833.833.833h4.167c.46 0 .833-.373.833-.833v-5a.833.833 0 0 0-.833-.833H4.5ZM4.5 7h4.167a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5H4.5A2.5 2.5 0 0 1 2 14.5v-5A2.5 2.5 0 0 1 4.5 7Zm10.833 1.667a.833.833 0 0 0-.833.833v5c0 .46.373.833.833.833H19.5c.46 0 .833-.373.833-.833v-5a.833.833 0 0 0-.833-.833h-4.167Zm0-1.667H19.5A2.5 2.5 0 0 1 22 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-4.167a2.5 2.5 0 0 1-2.5-2.5v-5a2.5 2.5 0 0 1 2.5-2.5Z" />
        </svg>
    );
}

const Memo = memo(IconImageGrid2);
export default Memo;
