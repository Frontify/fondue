import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedWidth20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFixedWidth20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.002 4.7a.75.75 0 0 0-1.5 0v10.6a.75.75 0 0 0 1.5 0V4.7ZM2.75 3.95a.75.75 0 0 1 .75.75v10.6a.75.75 0 0 1-1.5 0V4.7a.75.75 0 0 1 .75-.75ZM14 10a.75.75 0 0 1-.75.75h-6.5a.75.75 0 1 1 0-1.5h6.5A.75.75 0 0 1 14 10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedWidth20);
