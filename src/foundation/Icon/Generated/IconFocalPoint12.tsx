import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFocalPoint12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFocalPoint12"
            {...props}
        >
            <path
                fill="currentColor"
                d="M2.271 2.249h2.125a.375.375 0 1 0 0-.75h-2.5a.375.375 0 0 0-.375.375v2.5a.375.375 0 0 0 .75 0V2.249Zm5.332 0h2.125v2.125a.375.375 0 1 0 .75 0v-2.5a.375.375 0 0 0-.375-.375h-2.5a.375.375 0 0 0 0 .75ZM2.277 9.721h2.125a.375.375 0 0 1 0 .75h-2.5a.375.375 0 0 1-.375-.375v-2.5a.375.375 0 0 1 .75 0v2.125Zm7.457 0H7.609a.375.375 0 0 0 0 .75h2.5a.375.375 0 0 0 .375-.375v-2.5a.375.375 0 0 0-.75 0v2.125ZM6.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
            />
        </svg>
    );
}

const Memo = memo(IconFocalPoint12);
export default Memo;
