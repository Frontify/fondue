import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLollipop20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLollipop20"
            {...props}
        >
            <g fill="currentColor">
                <path d="M7.708 6.667V12.5a.625.625 0 1 0 1.25 0V6.667a.625.625 0 1 0-1.25 0Zm3.333 5.833V6.667a.625.625 0 1 1 1.25 0V12.5a.625.625 0 1 1-1.25 0Z" />
                <path
                    fillRule="evenodd"
                    d="M10 1.667A5.833 5.833 0 0 1 15.833 7.5v5.46a2.5 2.5 0 0 1-2.5 2.5h-1.25v.79a2.083 2.083 0 0 1-4.167 0v-.79h-1.25a2.5 2.5 0 0 1-2.5-2.5V7.5A5.833 5.833 0 0 1 10 1.667ZM9.166 15.46v.79a.833.833 0 0 0 1.667 0v-.79H9.166ZM10 2.917A4.583 4.583 0 0 0 5.417 7.5v5.46c0 .69.56 1.25 1.25 1.25h6.666c.69 0 1.25-.56 1.25-1.25V7.5A4.583 4.583 0 0 0 10 2.917Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLollipop20);
export default Memo;
