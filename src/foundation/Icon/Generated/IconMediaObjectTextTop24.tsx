import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMediaObjectTextTop24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMediaObjectTextTop24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 4.254c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H6.75a.75.75 0 0 0-.75.75Zm1 3.004a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75ZM4.5 18v-6a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5ZM3 12a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMediaObjectTextTop24);
export default Memo;
