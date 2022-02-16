import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLockOpen12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLockOpen12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.6 7.972a.833.833 0 1 1 .833 0V8.5a.417.417 0 0 1-.833 0v-.528Z" />
                <path
                    fillRule="evenodd"
                    d="M7.683 4.333v-1.25c0-.69-.56-1.25-1.25-1.25H5.6c-.69 0-1.25.56-1.25 1.25a.417.417 0 0 1-.833 0C3.517 1.933 4.449 1 5.6 1h.833c1.151 0 2.084.933 2.084 2.083v1.25h.416c.69 0 1.25.56 1.25 1.25V9.75c0 .69-.56 1.25-1.25 1.25H3.1c-.69 0-1.25-.56-1.25-1.25V5.583c0-.69.56-1.25 1.25-1.25h4.583ZM3.1 5.167a.417.417 0 0 0-.417.416V9.75c0 .23.187.417.417.417h5.833c.23 0 .417-.187.417-.417V5.583a.417.417 0 0 0-.417-.416H3.1Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconLockOpen12);
export default Memo;
