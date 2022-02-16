import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListBullet16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconListBullet16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M2 12.167a.667.667 0 1 1 1.333 0 .667.667 0 0 1-1.333 0Zm0-5.572a.667.667 0 1 1 1.333 0 .667.667 0 0 1-1.333 0Zm0 2.774a.667.667 0 1 1 1.333 0 .667.667 0 0 1-1.333 0Zm0-5.536a.667.667 0 1 1 1.333 0 .667.667 0 0 1-1.333 0Z" />
                <path
                    fillRule="evenodd"
                    d="M14 3.833a.5.5 0 0 1-.5.5H5a.5.5 0 0 1 0-1h8.5a.5.5 0 0 1 .5.5Zm-9.5 8.334a.5.5 0 0 1 .5-.5h7.167a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5Zm8.167-5.572a.5.5 0 0 1-.5.5H5a.5.5 0 1 1 0-1h7.167a.5.5 0 0 1 .5.5ZM14 9.369a.5.5 0 0 1-.5.5H5a.5.5 0 1 1 0-1h8.5a.5.5 0 0 1 .5.5Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconListBullet16);
export default Memo;
