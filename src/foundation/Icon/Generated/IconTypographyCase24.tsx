import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTypographyCase24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTypographyCase24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.286 15.942v-5.05H9.468v.923h-1.43v-2.34h7.923v2.34h-1.428v-.924h-1.819v5.051h1.242v1.417h-3.912v-1.417h1.242Z" />
                <path
                    fillRule="evenodd"
                    d="M9.857 3.5h4.286a1.42 1.42 0 0 1 1.428 1.413v1.42h5c.79 0 1.429.635 1.429 1.417v11.333c0 .783-.64 1.417-1.429 1.417H3.43A1.423 1.423 0 0 1 2 19.083V7.75c0-.782.64-1.417 1.429-1.417h5v-1.42c0-.78.64-1.413 1.428-1.413ZM3.43 19.083V7.75h17.14v11.333H3.43Zm6.428-12.75V4.917h4.286v1.416H9.857Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTypographyCase24);
export default Memo;
