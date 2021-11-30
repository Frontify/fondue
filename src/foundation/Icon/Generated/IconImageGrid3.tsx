import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImageGrid3(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconImageGrid3"
            {...props}
        >
            <path d="M4.143 10.429a.714.714 0 0 0-.714.714v2.143c0 .394.32.714.714.714H5.57c.395 0 .715-.32.715-.714v-2.143a.714.714 0 0 0-.715-.714H4.143Zm0-1.429H5.57c1.184 0 2.143.96 2.143 2.143v2.143c0 1.183-.96 2.143-2.143 2.143H4.143A2.143 2.143 0 0 1 2 13.286v-2.143C2 9.959 2.96 9 4.143 9Zm7.143 1.429a.714.714 0 0 0-.715.714v2.143c0 .394.32.714.715.714h1.428c.395 0 .715-.32.715-.714v-2.143a.714.714 0 0 0-.715-.714h-1.428Zm0-1.429h1.428c1.184 0 2.143.96 2.143 2.143v2.143c0 1.183-.96 2.143-2.143 2.143h-1.428a2.143 2.143 0 0 1-2.143-2.143v-2.143c0-1.184.96-2.143 2.143-2.143Zm7.143 1.429a.714.714 0 0 0-.715.714v2.143c0 .394.32.714.715.714h1.428c.395 0 .714-.32.714-.714v-2.143a.714.714 0 0 0-.714-.714H18.43Zm0-1.429h1.428C21.041 9 22 9.96 22 11.143v2.143c0 1.183-.96 2.143-2.143 2.143H18.43a2.143 2.143 0 0 1-2.143-2.143v-2.143c0-1.184.96-2.143 2.143-2.143Z" />
        </svg>
    );
}

const Memo = memo(IconImageGrid3);
export default Memo;
