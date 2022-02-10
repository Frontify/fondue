import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFocalPoint24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFocalPoint24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4.543 4.498h4.25a.75.75 0 0 0 0-1.5h-5a.75.75 0 0 0-.75.75v5a.75.75 0 0 0 1.5 0v-4.25Zm10.664 0h4.25v4.25a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-.75-.75h-5a.75.75 0 0 0 0 1.5ZM4.554 19.442h4.25a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75v-5a.75.75 0 0 1 1.5 0v4.25Zm14.914 0h-4.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 .75-.75v-5a.75.75 0 0 0-1.5 0v4.25ZM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconFocalPoint24);
export default Memo;
