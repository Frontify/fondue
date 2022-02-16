import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextAlignmentCentre16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTextAlignmentCentre16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.16 6.595a.5.5 0 0 1-.5.5H4.327a.5.5 0 1 1 0-1h7.333a.5.5 0 0 1 .5.5Zm0 5.572a.5.5 0 0 1-.5.5H4.327a.5.5 0 1 1 0-1h7.333a.5.5 0 0 1 .5.5Zm1.827-8.334a.5.5 0 0 1-.5.5H2.5a.5.5 0 0 1 0-1h10.987a.5.5 0 0 1 .5.5Zm0 5.536a.5.5 0 0 1-.5.5H2.5a.5.5 0 1 1 0-1h10.987a.5.5 0 0 1 .5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentCentre16);
export default Memo;
