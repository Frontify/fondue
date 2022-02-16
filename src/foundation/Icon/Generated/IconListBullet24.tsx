import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListBullet24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconListBullet24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M3 18.25a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm0-8.357a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm0 4.16a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM3 5.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                <path
                    fillRule="evenodd"
                    d="M21 5.75a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1 0-1.5h12.75a.75.75 0 0 1 .75.75ZM6.75 18.25a.75.75 0 0 1 .75-.75h10.75a.75.75 0 0 1 0 1.5H7.5a.75.75 0 0 1-.75-.75ZM19 9.893a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1 0-1.5h10.75a.75.75 0 0 1 .75.75Zm2 4.16a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1 0-1.5h12.75a.75.75 0 0 1 .75.75Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconListBullet24);
export default Memo;
