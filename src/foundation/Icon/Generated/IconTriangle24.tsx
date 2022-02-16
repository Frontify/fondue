import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTriangle24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTriangle24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.772 19.287h12.456L12 6.83 5.772 19.287ZM21 21H3l9-18 9 18Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTriangle24);
export default Memo;
