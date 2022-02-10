import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextBrackets12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextBrackets12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M3.75 3.125h-1a.625.625 0 0 0-.625.625v4.5c0 .345.28.625.625.625h1a.375.375 0 1 1 0 .75h-1c-.76 0-1.375-.616-1.375-1.375v-4.5c0-.76.616-1.375 1.375-1.375h1a.375.375 0 1 1 0 .75Z" />
                <path d="M3.879 4.875A.377.377 0 0 1 3.5 4.5c0-.207.17-.375.379-.375H8.12c.21 0 .379.168.379.375s-.17.375-.379.375H3.88Zm.038 1.5c-.23 0-.417-.168-.417-.375s.187-.375.417-.375h4.166c.23 0 .417.168.417.375s-.187.375-.417.375H3.917ZM3.5 7.5c0 .207.17.375.379.375h2.576a.376.376 0 0 0 .378-.375.377.377 0 0 0-.378-.375H3.879A.377.377 0 0 0 3.5 7.5Z" />
                <path d="M9.25 3.125h-1a.375.375 0 1 1 0-.75h1c.76 0 1.375.616 1.375 1.375v4.5c0 .76-.616 1.375-1.375 1.375h-1a.375.375 0 1 1 0-.75h1c.345 0 .625-.28.625-.625v-4.5a.625.625 0 0 0-.625-.625Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconTextBrackets12);
export default Memo;
