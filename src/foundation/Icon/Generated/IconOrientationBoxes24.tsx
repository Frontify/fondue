import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientationBoxes24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconOrientationBoxes24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.333 2h5.834A3.333 3.333 0 0 1 14.5 5.333V9.5h4.167A3.333 3.333 0 0 1 22 12.833v5.834A3.333 3.333 0 0 1 18.667 22h-10a3.333 3.333 0 0 1-3.334-3.333A3.333 3.333 0 0 1 2 15.333v-10A3.333 3.333 0 0 1 5.333 2Zm3.334 18.333c-.92 0-1.667-.746-1.667-1.666h4.167a3.333 3.333 0 0 0 3.333-3.334v-4.166h4.167c.92 0 1.666.746 1.666 1.666v5.834c0 .92-.746 1.666-1.666 1.666h-10Zm-5-15c0-.92.746-1.666 1.666-1.666h5.834c.92 0 1.666.746 1.666 1.666v10c0 .92-.746 1.667-1.666 1.667H5.333c-.92 0-1.666-.746-1.666-1.667v-10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconOrientationBoxes24);
export default Memo;
