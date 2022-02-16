import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPaperclip32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPaperclip32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M12.667 10v11a3.333 3.333 0 1 0 6.666 0V8.667A5.667 5.667 0 1 0 8 8.667V21a8 8 0 1 0 16 0V10a1 1 0 1 0-2 0v11a6 6 0 0 1-12 0V8.667a3.667 3.667 0 1 1 7.333 0V21a1.333 1.333 0 1 1-2.666 0V10a1 1 0 1 0-2 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconPaperclip32);
export default Memo;
