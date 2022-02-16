import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMarkArea12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMarkArea12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M4.5 3.5h3A1.5 1.5 0 0 1 9 5v.5A1.5 1.5 0 0 1 7.5 7h-3A1.5 1.5 0 0 1 3 5.5V5a1.5 1.5 0 0 1 1.5-1.5Zm0 1A.5.5 0 0 0 4 5v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5h-3Z" />
                <path d="M9.5 1.5h-7A1.5 1.5 0 0 0 1 3v6a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 11 9V3a1.5 1.5 0 0 0-1.5-1.5ZM2 3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-7A.5.5 0 0 1 2 9V3Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMarkArea12);
export default Memo;
