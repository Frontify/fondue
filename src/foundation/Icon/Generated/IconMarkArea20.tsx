import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMarkArea20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconMarkArea20"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M7.5 5.833h5a2.5 2.5 0 0 1 2.5 2.5v.834a2.5 2.5 0 0 1-2.5 2.5h-5a2.5 2.5 0 0 1-2.5-2.5v-.834a2.5 2.5 0 0 1 2.5-2.5Zm0 1.667a.833.833 0 0 0-.833.833v.834c0 .46.373.833.833.833h5c.46 0 .833-.373.833-.833v-.834A.833.833 0 0 0 12.5 7.5h-5Z" />
                <path d="M15.833 2.5H4.167a2.5 2.5 0 0 0-2.5 2.5v10a2.5 2.5 0 0 0 2.5 2.5h11.666a2.5 2.5 0 0 0 2.5-2.5V5a2.5 2.5 0 0 0-2.5-2.5ZM3.333 5c0-.46.374-.833.834-.833h11.666c.46 0 .834.373.834.833v10c0 .46-.373.833-.834.833H4.167A.833.833 0 0 1 3.333 15V5Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMarkArea20);
export default Memo;
