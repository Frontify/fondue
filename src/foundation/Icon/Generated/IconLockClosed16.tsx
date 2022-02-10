import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLockClosed16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLockClosed16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.356 4.667a3.333 3.333 0 0 0-6.667 0v1.11h-.556c-.92 0-1.666.747-1.666 1.667V13c0 .92.746 1.667 1.666 1.667h7.778c.92 0 1.667-.746 1.667-1.667V7.444c0-.92-.746-1.666-1.667-1.666h-.555V4.667ZM4.133 6.889a.556.556 0 0 0-.555.555V13c0 .307.249.556.555.556h7.778a.556.556 0 0 0 .556-.556V7.444a.556.556 0 0 0-.556-.555H4.133Zm6.112-1.111V4.667a2.222 2.222 0 0 0-4.445 0v1.11h4.445ZM6.91 9.667c0 .411.224.77.556.962v.704a.556.556 0 0 0 1.11 0v-.704a1.11 1.11 0 1 0-1.666-.962Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockClosed16);
export default Memo;
