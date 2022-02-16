import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMarkArea32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMarkArea32"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M12 9.333h8a4 4 0 0 1 4 4v1.334a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4v-1.334a4 4 0 0 1 4-4ZM12 12c-.736 0-1.333.597-1.333 1.333v1.334c0 .736.597 1.333 1.333 1.333h8c.736 0 1.333-.597 1.333-1.333v-1.334c0-.736-.596-1.333-1.333-1.333h-8Z" />
                <path d="M25.333 4H6.667a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h18.666a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-20 4c0-.736.597-1.333 1.334-1.333h18.666c.737 0 1.334.597 1.334 1.333v16c0 .736-.597 1.333-1.334 1.333H6.667A1.333 1.333 0 0 1 5.333 24V8Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconMarkArea32);
export default Memo;
