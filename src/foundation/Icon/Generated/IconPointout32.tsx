import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPointout32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPointout32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M19.333 18.667a4.667 4.667 0 1 1 0-9.334 4.667 4.667 0 0 1 0 9.334Zm0-2.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M25.333 4H6.667a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h18.666a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-20 4c0-.736.597-1.333 1.333-1.333h18.667c.737 0 1.334.597 1.334 1.333v16c0 .736-.598 1.333-1.334 1.333H6.667A1.333 1.333 0 0 1 5.332 24V8Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPointout32);
export default Memo;
