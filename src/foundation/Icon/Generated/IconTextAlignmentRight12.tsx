import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentRight12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextAlignmentRight12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.625 3c0-.207.168-.375.375-.375h8.24a.375.375 0 0 1 0 .75H2A.375.375 0 0 1 1.625 3Zm1.467 2c0-.207.168-.375.375-.375h6.773a.375.375 0 0 1 0 .75H3.467A.375.375 0 0 1 3.092 5ZM1.625 7c0-.207.168-.375.375-.375h8.24a.375.375 0 0 1 0 .75H2A.375.375 0 0 1 1.625 7Zm1.842 1.625h6.773a.375.375 0 0 1 0 .75H3.467a.375.375 0 1 1 0-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentRight12);
export default Memo;
