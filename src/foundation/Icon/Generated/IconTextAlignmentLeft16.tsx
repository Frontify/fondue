import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentLeft16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextAlignmentLeft16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.987 3.833a.5.5 0 0 1-.5.5H2.501a.5.5 0 0 1 0-1h10.986a.5.5 0 0 1 .5.5Zm-2.471 8.834h-9.03a.5.5 0 1 1 0-1h9.03a.5.5 0 1 1 0 1Zm.5-6.072a.5.5 0 0 1-.5.5h-9.03a.5.5 0 1 1 0-1h9.03a.5.5 0 0 1 .5.5Zm1.971 2.774a.5.5 0 0 1-.5.5H2.501a.5.5 0 1 1 0-1h10.986a.5.5 0 0 1 .5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentLeft16);
export default Memo;
