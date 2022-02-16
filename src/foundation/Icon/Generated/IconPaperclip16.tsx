import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPaperclip16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPaperclip16"
            {...props}
        >
            <path
                fill="currentColor"
                d="M6.333 5v5.5a1.667 1.667 0 1 0 3.334 0V4.333a2.833 2.833 0 0 0-5.667 0V10.5a4 4 0 0 0 8 0V5a.5.5 0 0 0-1 0v5.5a3 3 0 1 1-6 0V4.333a1.833 1.833 0 0 1 3.667 0V10.5a.667.667 0 1 1-1.334 0V5a.5.5 0 1 0-1 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconPaperclip16);
export default Memo;
