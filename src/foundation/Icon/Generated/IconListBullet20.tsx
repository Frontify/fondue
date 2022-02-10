import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconListBullet20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconListBullet20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M2.5 15.208a.833.833 0 1 1 1.667 0 .833.833 0 0 1-1.667 0Zm0-6.964a.833.833 0 1 1 1.667 0 .833.833 0 0 1-1.667 0Zm0 3.466a.833.833 0 1 1 1.667.001.833.833 0 0 1-1.667 0Zm0-6.918a.833.833 0 1 1 1.667 0 .833.833 0 0 1-1.667 0Z" />
                <path
                    fillRule="evenodd"
                    d="M17.5 4.792c0 .345-.28.625-.625.625H6.25a.625.625 0 0 1 0-1.25h10.625c.345 0 .625.28.625.625ZM5.625 15.208c0-.345.28-.625.625-.625h8.958a.625.625 0 1 1 0 1.25H6.25a.625.625 0 0 1-.625-.625Zm10.208-6.964c0 .345-.28.625-.625.625H6.25a.625.625 0 1 1 0-1.25h8.958c.345 0 .625.28.625.625ZM17.5 11.71c0 .346-.28.626-.625.626H6.25a.625.625 0 1 1 0-1.25h10.625c.345 0 .625.28.625.625Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconListBullet20);
export default Memo;
