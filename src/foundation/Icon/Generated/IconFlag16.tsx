import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconFlag16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFlag16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 2.1a.5.5 0 0 1 1 0v.4H13a.5.5 0 0 1 .395.807L11.3 6l2.095 2.693A.5.5 0 0 1 13 9.5H4.5v4.4a.5.5 0 1 1-1 0V2.1Zm1 6.4h7.478l-1.706-2.193a.5.5 0 0 1 0-.614L11.978 3.5H4.5v5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFlag16);
export default Memo;
