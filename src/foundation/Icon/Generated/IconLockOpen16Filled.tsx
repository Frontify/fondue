import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockOpen16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLockOpen16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.245 5.778V4.11c0-.92-.747-1.667-1.667-1.667H7.467c-.92 0-1.667.747-1.667 1.667a.556.556 0 1 1-1.111 0 2.778 2.778 0 0 1 2.778-2.778h1.11a2.778 2.778 0 0 1 2.779 2.778v1.667h.555c.92 0 1.667.746 1.667 1.666V13c0 .92-.746 1.667-1.667 1.667H4.133c-.92 0-1.666-.746-1.666-1.667V7.444c0-.92.746-1.666 1.666-1.666h6.112Zm-2.778 4.851a1.11 1.11 0 1 1 1.11 0v.704a.556.556 0 0 1-1.11 0v-.704Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockOpen16Filled);
export default Memo;
