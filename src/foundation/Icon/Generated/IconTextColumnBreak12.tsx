import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextColumnBreak12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextColumnBreak12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M1.5 4.125a.375.375 0 1 1 0-.75H4a.375.375 0 1 1 0 .75H1.5Zm4.625 0V9.25a.375.375 0 0 1-.375.375h-1a.375.375 0 1 1 0-.75h.625V3.75c0-.207.168-.375.375-.375h1a.375.375 0 1 1 0 .75h-.625Zm1.875 0a.375.375 0 1 1 0-.75h2.5a.375.375 0 0 1 0 .75H8ZM7.625 5.25c0 .207.168.375.375.375h2a.375.375 0 0 0 0-.75H8a.375.375 0 0 0-.375.375Zm0 1.5c0 .207.168.375.375.375h2.5a.375.375 0 0 0 0-.75H8a.375.375 0 0 0-.375.375ZM1.5 7.125a.375.375 0 1 1 0-.75H4a.375.375 0 1 1 0 .75H1.5ZM1.125 5.25c0 .207.168.375.375.375h2a.375.375 0 1 0 0-.75h-2a.375.375 0 0 0-.375.375ZM1.5 8.625a.375.375 0 1 1 0-.75h2a.375.375 0 1 1 0 .75h-2Zm6.125-.375c0 .207.168.375.375.375h2a.375.375 0 0 0 0-.75H8a.375.375 0 0 0-.375.375Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextColumnBreak12);
export default Memo;
