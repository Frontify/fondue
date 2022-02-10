import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextTop32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMediaObjectTextTop32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 5.672a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H9a1 1 0 0 0-1 1Zm1.333 4.005a1 1 0 0 1 1-1h11.334a1 1 0 1 1 0 2H10.333a1 1 0 0 1-1-1ZM6 24v-8c0-.368.298-.666.667-.666h18.666c.369 0 .667.298.667.666v8a.667.667 0 0 1-.667.667H6.667A.667.667 0 0 1 6 24Zm-2-8a2.667 2.667 0 0 1 2.667-2.666h18.666A2.667 2.667 0 0 1 28 16v8a2.667 2.667 0 0 1-2.667 2.667H6.667A2.667 2.667 0 0 1 4 24v-8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextTop32);
export default Memo;
