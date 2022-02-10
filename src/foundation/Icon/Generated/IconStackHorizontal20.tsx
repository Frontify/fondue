import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconStackHorizontal20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconStackHorizontal20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.125 2.708c.53 0 .958.43.958.959v12.666c0 .53-.429.959-.958.959h-2.25a.958.958 0 0 1-.958-.959V3.668c0-.53.429-.958.958-.958h2.25Zm-.292 1.25H9.167v12.084h1.666V3.958Zm-5.116-1.25c.529 0 .958.43.958.959v12.666c0 .53-.43.959-.958.959h-2.25a.958.958 0 0 1-.959-.959V3.668c0-.53.43-.958.959-.958h2.25Zm-.292 1.25H3.758v12.084h1.667V3.958Zm11.109-1.25c.529 0 .958.43.958.959v12.666c0 .53-.429.959-.958.959h-2.25a.958.958 0 0 1-.959-.959V3.668c0-.53.43-.958.959-.958h2.25Zm-.292 1.25h-1.667v12.084h1.667V3.958Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackHorizontal20);
export default Memo;
