import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPaperclip12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPaperclip12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4.75 3.75v4.125a1.25 1.25 0 1 0 2.5 0V3.25a2.125 2.125 0 0 0-4.25 0v4.625a3 3 0 0 0 6 0V3.75a.375.375 0 1 0-.75 0v4.125a2.25 2.25 0 0 1-4.5 0V3.25a1.375 1.375 0 0 1 2.75 0v4.625a.5.5 0 0 1-1 0V3.75a.375.375 0 1 0-.75 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconPaperclip12);
export default Memo;
