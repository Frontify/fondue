import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontal16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStackHorizontal16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.9 2.167c.423 0 .766.343.766.766v10.134a.767.767 0 0 1-.766.766H7.1a.767.767 0 0 1-.767-.766V2.933c0-.423.343-.766.767-.766h1.8Zm-.234 1H7.333v9.666h1.333V3.167Zm-4.093-1c.423 0 .767.343.767.766v10.134a.767.767 0 0 1-.767.766h-1.8a.767.767 0 0 1-.767-.766V2.933c0-.423.344-.766.767-.766h1.8Zm-.233 1H3.006v9.666H4.34V3.167Zm8.887-1c.423 0 .766.343.766.766v10.134a.767.767 0 0 1-.766.766h-1.8a.767.767 0 0 1-.767-.766V2.933c0-.423.343-.766.767-.766h1.8Zm-.234 1H11.66v9.666h1.333V3.167Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontal16);
export default Memo;
