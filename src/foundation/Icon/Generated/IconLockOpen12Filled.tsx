import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLockOpen12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLockOpen12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.683 4.333v-1.25c0-.69-.56-1.25-1.25-1.25H5.6c-.69 0-1.25.56-1.25 1.25a.417.417 0 0 1-.833 0C3.517 1.933 4.449 1 5.6 1h.833c1.151 0 2.084.933 2.084 2.083v1.25h.416c.69 0 1.25.56 1.25 1.25V9.75c0 .69-.56 1.25-1.25 1.25H3.1c-.69 0-1.25-.56-1.25-1.25V5.583c0-.69.56-1.25 1.25-1.25h4.583ZM5.6 7.972a.833.833 0 1 1 .833 0V8.5a.417.417 0 0 1-.833 0v-.528Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLockOpen12Filled);
export default Memo;
