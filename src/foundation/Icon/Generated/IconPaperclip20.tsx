import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPaperclip20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPaperclip20"
            {...props}
        >
            <path
                fill="currentColor"
                d="M7.917 6.25v6.875a2.083 2.083 0 1 0 4.166 0V5.417a3.542 3.542 0 1 0-7.083 0v7.708a5 5 0 0 0 10 0V6.25a.625.625 0 1 0-1.25 0v6.875a3.75 3.75 0 1 1-7.5 0V5.417a2.292 2.292 0 1 1 4.583 0v7.708a.833.833 0 0 1-1.666 0V6.25a.625.625 0 0 0-1.25 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconPaperclip20);
export default Memo;
