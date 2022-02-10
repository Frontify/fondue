import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageWithText12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconImageWithText12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M5.5 3.875a.375.375 0 0 1-.375.375h-2.25a.375.375 0 1 1 0-.75h2.25c.207 0 .375.168.375.375Zm-1 3a.375.375 0 0 1-.375.375h-1.25a.375.375 0 1 1 0-.75h1.25c.207 0 .375.168.375.375Zm1-1.5a.375.375 0 0 1-.375.375h-2.25a.375.375 0 1 1 0-.75h2.25c.207 0 .375.168.375.375ZM7.25 5a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM8 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                <path d="M10 2.75H2a.25.25 0 0 0-.25.25v6c0 .138.112.25.25.25h8a.25.25 0 0 0 .25-.25V3a.25.25 0 0 0-.25-.25ZM2 2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2Z" />
                <path d="M2.984 9.377 6.392 7.28a.875.875 0 0 1 .61-.116l3.433.607-.131.739-3.432-.608a.125.125 0 0 0-.087.017l-3.408 2.097-.393-.639Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconImageWithText12);
export default Memo;
