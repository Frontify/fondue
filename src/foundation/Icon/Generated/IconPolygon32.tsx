import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPolygon32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPolygon32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m24.24 28.667 5.093-15.657L16 3.333 2.666 13.01 7.76 28.667h16.48Zm-14.902-2.17L5.22 13.839 16 6.016l10.78 7.823-4.118 12.658H9.338Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPolygon32);
export default Memo;
