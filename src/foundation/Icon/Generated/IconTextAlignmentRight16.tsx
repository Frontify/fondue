import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTextAlignmentRight16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextAlignmentRight16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.167 4a.5.5 0 0 1 .5-.5h10.986a.5.5 0 0 1 0 1H2.666a.5.5 0 0 1-.5-.5Zm1.956 2.667a.5.5 0 0 1 .5-.5h9.03a.5.5 0 0 1 0 1h-9.03a.5.5 0 0 1-.5-.5ZM2.167 9.333a.5.5 0 0 1 .5-.5h10.986a.5.5 0 0 1 0 1H2.666a.5.5 0 0 1-.5-.5ZM4.623 11.5h9.03a.5.5 0 0 1 0 1h-9.03a.5.5 0 0 1 0-1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentRight16);
export default Memo;
