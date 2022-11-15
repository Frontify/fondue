import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerSolidInset12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDividerSolidInset12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 10.125A.125.125 0 0 0 9.125 10V8a.375.375 0 1 1 .75 0v2a.875.875 0 0 1-.875.875H3A.875.875 0 0 1 2.125 10V8a.375.375 0 1 1 .75 0v2c0 .069.056.125.125.125h6Zm0-8.25c.069 0 .125.056.125.125v2a.375.375 0 1 0 .75 0V2A.875.875 0 0 0 9 1.125H3A.875.875 0 0 0 2.125 2v2a.375.375 0 1 0 .75 0V2c0-.069.056-.125.125-.125h6Zm1 4.117a.375.375 0 0 1-.375.375h-7.25a.375.375 0 1 1 0-.75h7.25c.207 0 .375.168.375.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerSolidInset12);
