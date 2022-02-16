import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentCentre12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTextAlignmentCentre12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.12 4.946a.375.375 0 0 1-.375.375h-5.5a.375.375 0 0 1 0-.75h5.5c.207 0 .375.168.375.375Zm0 4.179a.375.375 0 0 1-.375.375h-5.5a.375.375 0 0 1 0-.75h5.5c.207 0 .375.168.375.375Zm1.37-6.25a.375.375 0 0 1-.375.375h-8.24a.375.375 0 1 1 0-.75h8.24c.207 0 .375.168.375.375Zm0 4.152a.375.375 0 0 1-.375.375h-8.24a.375.375 0 0 1 0-.75h8.24c.207 0 .375.167.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentCentre12);
export default Memo;
