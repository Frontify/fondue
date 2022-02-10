import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFocalPoint32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconFocalPoint32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.058 5.997h5.666a1 1 0 1 0 0-2H5.058a1 1 0 0 0-1 1v6.666a1 1 0 1 0 2 0V5.997Zm14.218 0h5.666v5.666a1 1 0 0 0 2 0V4.997a1 1 0 0 0-1-1h-6.666a1 1 0 1 0 0 2ZM6.073 25.922h5.667a1 1 0 1 1 0 2H5.073a1 1 0 0 1-1-1v-6.666a1 1 0 1 1 2 0v5.666Zm19.885 0H20.29a1 1 0 1 0 0 2h6.667a1 1 0 0 0 1-1v-6.666a1 1 0 1 0-2 0v5.666ZM17.333 16a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconFocalPoint32);
export default Memo;
