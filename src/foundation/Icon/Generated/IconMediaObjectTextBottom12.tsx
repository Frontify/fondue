import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextBottom12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMediaObjectTextBottom12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 8.377a.375.375 0 0 0-.375-.375h-5.25a.375.375 0 1 0 0 .75h5.25A.375.375 0 0 0 9 8.377Zm-.5 1.522a.375.375 0 0 1-.375.375h-4.25a.375.375 0 1 1 0-.75h4.25c.207 0 .375.168.375.375ZM9.75 3v3a.25.25 0 0 1-.25.25h-7A.25.25 0 0 1 2.25 6V3a.25.25 0 0 1 .25-.25h7a.25.25 0 0 1 .25.25Zm.75 3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextBottom12);
export default Memo;
