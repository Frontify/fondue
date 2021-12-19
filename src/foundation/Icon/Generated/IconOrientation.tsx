import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconOrientation(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconOrientation"
            {...props}
        >
            <path d="M5.333 18.667A3.333 3.333 0 0 1 2 15.333v-10A3.333 3.333 0 0 1 5.333 2h5.834A3.333 3.333 0 0 1 14.5 5.333V9.5h4.167A3.333 3.333 0 0 1 22 12.833v5.834A3.333 3.333 0 0 1 18.667 22h-10a3.333 3.333 0 0 1-3.334-3.333Zm1.667 0c0 .92.746 1.666 1.667 1.666h10c.92 0 1.666-.746 1.666-1.666v-5.834c0-.92-.746-1.666-1.666-1.666H14.5v4.166a3.333 3.333 0 0 1-3.333 3.334H7Zm-1.667-15c-.92 0-1.666.746-1.666 1.666v10c0 .92.746 1.667 1.666 1.667h5.834c.92 0 1.666-.746 1.666-1.667v-10c0-.92-.746-1.666-1.666-1.666H5.333Z" />
        </svg>
    );
}

const Memo = memo(IconOrientation);
export default Memo;
