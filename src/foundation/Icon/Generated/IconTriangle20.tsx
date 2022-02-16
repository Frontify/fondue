import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTriangle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTriangle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.81 16.072h10.38L10 5.692l-5.19 10.38ZM17.5 17.5h-15l7.5-15 7.5 15Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTriangle20);
export default Memo;
