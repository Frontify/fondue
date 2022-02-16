import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentLeft12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextAlignmentLeft12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.49 2.875a.375.375 0 0 1-.375.375h-8.24a.375.375 0 1 1 0-.75h8.24c.207 0 .375.168.375.375ZM8.637 9.5H1.864a.375.375 0 1 1 0-.75h6.773a.375.375 0 1 1 0 .75Zm.375-4.554a.375.375 0 0 1-.375.375H1.864a.375.375 0 0 1 0-.75h6.773c.207 0 .375.168.375.375Zm1.478 2.081a.375.375 0 0 1-.375.375h-8.24a.375.375 0 0 1 0-.75h8.24c.207 0 .375.167.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentLeft12);
export default Memo;
