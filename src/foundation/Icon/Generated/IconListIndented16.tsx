import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListIndented16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconListIndented16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.524 12.667a.5.5 0 0 1-.5-.5V3.833a.5.5 0 0 1 1 0v8.334a.5.5 0 0 1-.5.5ZM14 3.833a.5.5 0 0 1-.5.5H5a.5.5 0 1 1 0-1h8.5a.5.5 0 0 1 .5.5Zm-9.5 8.334a.5.5 0 0 1 .5-.5h7.333a.5.5 0 1 1 0 1H5a.5.5 0 0 1-.5-.5Zm8.333-5.572a.5.5 0 0 1-.5.5H5a.5.5 0 1 1 0-1h7.333a.5.5 0 0 1 .5.5ZM14 9.369a.5.5 0 0 1-.5.5H5a.5.5 0 1 1 0-1h8.5a.5.5 0 0 1 .5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListIndented16);
export default Memo;
