import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPills16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPills16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 6.667H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Zm-2 2v-1h2v1H2Zm5-1v1h2v-1H7Zm2-1H7a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Zm3 1v1h2v-1h-2Zm2-1h-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPills16);
export default Memo;
