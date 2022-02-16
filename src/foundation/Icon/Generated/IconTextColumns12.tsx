import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextColumns12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextColumns12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2 4.125a.375.375 0 1 1 0-.75h2.5a.375.375 0 1 1 0 .75H2Zm5.125-.375c0 .207.168.375.375.375H10a.375.375 0 0 0 0-.75H7.5a.375.375 0 0 0-.375.375Zm0 1.5c0 .207.168.375.375.375h2a.375.375 0 1 0 0-.75h-2a.375.375 0 0 0-.375.375Zm0 1.5c0 .207.168.375.375.375H10a.375.375 0 0 0 0-.75H7.5a.375.375 0 0 0-.375.375ZM2 7.125a.375.375 0 1 1 0-.75h2.5a.375.375 0 1 1 0 .75H2ZM1.625 5.25c0 .207.168.375.375.375h2a.375.375 0 1 0 0-.75H2a.375.375 0 0 0-.375.375ZM2 8.625a.375.375 0 1 1 0-.75h2a.375.375 0 1 1 0 .75H2Zm5.125-.375c0 .207.168.375.375.375h2a.375.375 0 1 0 0-.75h-2a.375.375 0 0 0-.375.375Z"
            />
        </svg>
    );
}

const Memo = memo(IconTextColumns12);
export default Memo;
