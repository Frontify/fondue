import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCursorClick20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCursorClick20"
            {...props}
        >
            <path
                fill="currentColor"
                d="m18.239 15.434-2.5-2.5 2.116-1.009a.5.5 0 0 0-.041-.916l-2.4-.834c.07-.39.106-.786.108-1.183a6.941 6.941 0 1 0-6.933 6.942c.262-.003.523-.022.783-.059h.208c.242-.034.48-.081.717-.141l.158-.05c.117 0 .225-.059.334-.1l.666 1.833a.501.501 0 0 0 .925.042l1-2.109 2.5 2.5a.335.335 0 0 0 .475 0l1.884-1.883a.352.352 0 0 0 0-.533Zm-7.95-1.017a6.25 6.25 0 0 1-.567.142l-.25.05c-.276.044-.554.07-.833.075a5.691 5.691 0 1 1 5.683-5.692c-.004.24-.02.479-.05.717l-1.283-.467a2.803 2.803 0 0 0 0-.275 4.45 4.45 0 1 0-3.05 4.167l.45 1.241-.1.042ZM8.23 8.425l1.284 3.542c-.29.097-.594.148-.9.15a3.125 3.125 0 1 1 3.108-3.333l-2.85-.992a.5.5 0 0 0-.642.633Zm7.884 7.834-2.5-2.5-.584-.584-.833 1.717-.175.375-.083-.225-.434-1.183-.991-2.75-.517-1.6 2.742 1 1.241.45 1.175.425.609.216-1.325.634-.767.358.4.408 2.675 2.675-.633.584Z"
            />
        </svg>
    );
}

const Memo = memo(IconCursorClick20);
export default Memo;
