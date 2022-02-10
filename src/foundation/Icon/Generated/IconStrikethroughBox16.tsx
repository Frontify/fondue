import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStrikethroughBox16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconStrikethroughBox16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14.531 2.326a.555.555 0 0 0-.783-.058l-1.05.908a1.66 1.66 0 0 0-.81-.21H4.112c-.92 0-1.667.747-1.667 1.667V11.3c0 .221.043.432.122.626l-1.04.898a.556.556 0 0 0 .726.84l1.05-.906c.24.133.515.209.809.209h7.778c.92 0 1.666-.747 1.666-1.667V4.633c0-.221-.043-.432-.121-.625l1.04-.899a.556.556 0 0 0 .057-.783Zm-2.878 1.752H4.11a.556.556 0 0 0-.556.555v6.438l8.098-6.993Zm-7.306 7.777 8.097-6.993V11.3a.556.556 0 0 1-.556.555h-7.54Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStrikethroughBox16);
export default Memo;
