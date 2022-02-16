import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMagnifier12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMagnifier12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.565 10.23C3.044 10.23 1 8.165 1 5.616 1 3.066 3.044 1 5.565 1c2.522 0 4.566 2.066 4.566 4.615a4.627 4.627 0 0 1-1.008 2.893c.03.019.06.04.086.066l1.63 1.538a.517.517 0 0 1 .024.725.503.503 0 0 1-.716.025l-1.63-1.538a.512.512 0 0 1-.09-.112 4.516 4.516 0 0 1-2.862 1.019Zm0-1.025c1.962 0 3.551-1.607 3.551-3.59 0-1.982-1.59-3.59-3.55-3.59-1.962 0-3.551 1.608-3.551 3.59 0 1.983 1.59 3.59 3.55 3.59Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMagnifier12);
export default Memo;
