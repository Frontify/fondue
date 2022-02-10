import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPaperclip24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPaperclip24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M9.5 7.5v8.25a2.5 2.5 0 0 0 5 0V6.5a4.25 4.25 0 0 0-8.5 0v9.25a6 6 0 0 0 12 0V7.5a.75.75 0 0 0-1.5 0v8.25a4.5 4.5 0 1 1-9 0V6.5a2.75 2.75 0 0 1 5.5 0v9.25a1 1 0 1 1-2 0V7.5a.75.75 0 0 0-1.5 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconPaperclip24);
export default Memo;
