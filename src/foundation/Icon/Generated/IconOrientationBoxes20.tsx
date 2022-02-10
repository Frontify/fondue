import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientationBoxes20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconOrientationBoxes20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.445 1.667h4.86a2.778 2.778 0 0 1 2.778 2.778v3.472h3.473a2.778 2.778 0 0 1 2.777 2.777v4.862a2.778 2.778 0 0 1-2.777 2.777H7.222a2.778 2.778 0 0 1-2.777-2.777 2.778 2.778 0 0 1-2.778-2.778V4.445a2.778 2.778 0 0 1 2.778-2.778Zm2.777 15.278a1.389 1.389 0 0 1-1.389-1.39h3.473a2.778 2.778 0 0 0 2.777-2.777V9.306h3.473c.767 0 1.389.621 1.389 1.389v4.86a1.39 1.39 0 0 1-1.39 1.39H7.223Zm-4.166-12.5c0-.768.621-1.39 1.388-1.39h4.862a1.39 1.39 0 0 1 1.389 1.39v8.333a1.39 1.39 0 0 1-1.39 1.389h-4.86a1.389 1.389 0 0 1-1.39-1.39V4.446Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconOrientationBoxes20);
export default Memo;
