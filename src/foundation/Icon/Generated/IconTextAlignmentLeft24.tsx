import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTextAlignmentLeft24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTextAlignmentLeft24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.98 5.75a.75.75 0 0 1-.75.75H3.752a.75.75 0 0 1 0-1.5h16.48a.75.75 0 0 1 .75.75ZM17.273 19H3.73a.75.75 0 1 1 0-1.5h13.544a.75.75 0 0 1 0 1.5Zm.75-9.107a.75.75 0 0 1-.75.75H3.73a.75.75 0 0 1 0-1.5h13.544a.75.75 0 0 1 .75.75Zm2.957 4.16a.75.75 0 0 1-.75.75H3.752a.75.75 0 0 1 0-1.5h16.48a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTextAlignmentLeft24);
export default Memo;
